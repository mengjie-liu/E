$(document).ready(function () {
  // $(window).resize(function () {
  //   var height = $(window).height();
  //   var width = $(window).width();

  //   if (width > height) {
  //     // Landscape
  //   } else {
  //     console.log("ll");
  //     $(".canv").css("transform", "rotate(90deg)");
  //     // Portrait
  //     // $("#mode").text("PORTRAIT");
  //   }
  // });

  // $(function() {
  var width = $(window).width();
  var height = $(window).height();
  var alphaRate, betaRate, gammaRate;
  var alpha, beta, gamma;

  function requestDeviceMotion() {
    if (
      typeof window.DeviceMotionEvent !== "undefined" &&
      typeof window.DeviceMotionEvent.requestPermission === "function"
    ) {
      window.DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("devicemotion", (e) => {
              alphaRate = e.rotationRate.alpha;
              betaRate = e.rotationRate.beta;
              // gammaRate = e.rotationRate.gamma;
              console.log(alphaRate + ", " + betaRate);
              // if (Math.round(Math.abs(alphaRate)) >= 10) {
              //   console.log(betaRate);
              //   if (alphaRate >= 1.5) {
              //     console.log(alphaRate);
              //   } else if (alphaRate <= -1.5) {
              //     // console.log(alphaRate);
              //     $(".image").ripples(
              //       "drop",
              //       (width * 1) / 5 + ((width * 3) / 5) * Math.random(),
              //       height + 170,
              //       200,
              //       0.0015 * aradious
              //     );
              //   }
              // }

              // if (Math.round(Math.abs(gammaRate)) >= 10) {
              //   // console.log(betaRate);
              //   let gradious = scale(
              //     Math.round(Math.abs(gammaRate)),
              //     0,
              //     200,
              //     0,
              //     100
              //   );
              //   if (gammaRate >= 1.5) {
              //     console.log(gammaRate);
              //     $(".image").ripples(
              //       "drop",
              //       -190,
              //       (height * 1) / 5 + ((height * 3) / 5) * Math.random(),
              //       200,
              //       0.00025 * gradious
              //     );
              //   } else if (gammaRate <= -1.5) {
              //     // console.log(alphaRate);
              //     $(".image").ripples(
              //       "drop",
              //       width + 190,
              //       (height * 1) / 5 + ((height * 3) / 5) * Math.random(),
              //       200,
              //       0.00025 * gradious
              //     );
              //   }
              // }
            });
          }
        })
        .catch(console.error);
    } else {
      console.log("not permitted");
    }
  }

  function scale(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  $(document).click(function () {
    requestDeviceMotion();
  });
  // });

  var movementStrength = 950;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();
  $(window).mousemove(function (e) {
    var pageX = e.pageX - $(window).width() / 2;
    var pageY = e.pageY - $(window).height() / 2;
    var newvalueX = $(window).width() / 2 + width * pageX * -1;
    var newvalueY = $(window).height() / 2 + height * pageY * -1;
    $(".canv").css({ left: newvalueX + "px", top: newvalueY + "px" });
  });

  function calculateCenter(image) {
    var rect1 = image.getBoundingClientRect();
    var x = rect1.left + rect1.width * 0.5;
    var y = rect1.top + rect1.height * 0.5;
    return { x: x, y: y };
  }

  function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
  }

  function distanceFromCenter(image, mouseX, mouseY) {
    var imageCenter = calculateCenter(image);
    return getDistance(imageCenter.x, imageCenter.y, mouseX, mouseY);
  }

  function adjustImage(image, mX, mY) {
    var distance = distanceFromCenter(image, mX, mY);

    const baseScale = 0.8;
    const maxScaling = 2.75;
    // const maxScaling = 1;
    const scalingFactor = 2.5;

    const adjustedScaling = maxScaling - (distance / 1000) * scalingFactor;
    const scaling = adjustedScaling >= baseScale ? adjustedScaling : baseScale;

    gsap.to(image, { duration: 0.01, scale: scaling, ease: "power2.in" });
  }

  $(document).mousemove(function (e) {
    const mX = e.pageX;
    const mY = e.pageY;
    const images = $("img");

    images.each(function () {
      adjustImage(this, mX, mY);
    });
  });

  $(".canv div")
    .mouseenter(function () {
      let divclass = $(this).attr("class");
      if ($(`#${divclass}`).hasClass("hidden")) {
        $(".bgvd video").attr("src", "");
      } else {
        $(".bgvd video").attr("src", `assets/${divclass}.mp4`);
      }
      // console.log(divclass);
    })
    .mouseleave(function () {
      $(".bgvd video").attr("src", "");
    });

  $(".sub-nav a").click(function () {
    let subclass = $(this).attr("id").slice(0, -1);
    if ($(this).hasClass("disabled")) {
      $(this).removeClass("disabled");
      // $(this).siblings().addClass("disabled");
      $(`.${subclass}`).removeClass("hidden");
      // $(`.${subclass}`).siblings().css("opacity", "0");
      // console.log(subclass);
    } else {
      $(this).addClass("disabled");
      $(`.${subclass}`).addClass("hidden");
    }
  });

  $(".left-sub-nav a").click(function () {
    let subclass = $(this).parent().attr("class");
    console.log(subclass);
    $(`#${subclass}`).siblings().addClass("hidden");
    $(`#${subclass}`).removeClass("hidden");
  });

  $(".canv img")
    .mouseenter(function () {
      console.log($(this).parent().parent().attr("class"));
      if ($(this).parent().parent().hasClass("hidden")) {
        $(".title").html("");
      } else {
        let content = $(this).next().html();
        // console.log(content);
        $(".title").html(content);
      }
    })
    .mouseleave(function () {
      $(".title").html("");
    });
});
