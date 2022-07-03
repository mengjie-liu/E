$(document).ready(function () {
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
});
