$(document).ready(function () {
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

  $(".sub-nav a").click(function () {
    let subclass = $(this).attr("id").slice(0, -1);
    if ($(this).hasClass("disabled")) {
      $(this).removeClass("disabled");
      // $(this).siblings().addClass("disabled");
      $(`.${subclass}`).css("opacity", "1");
      // $(`.${subclass}`).siblings().css("opacity", "0");
      // console.log(subclass);
    } else {
      $(this).addClass("disabled");
      $(`.${subclass}`).css("opacity", "0");
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
      let content = $(this).next().html();
      // console.log(content);
      $(".title").html(content);
    })
    .mouseleave(function () {
      $(".title").html("");
    });
});
