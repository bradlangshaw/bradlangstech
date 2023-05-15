'use strict'

var articleheight = parseInt($("article").css('height'), 10);

$(".twitter-timeline").attr("height", ""+ articleheight + "px");

console.log(articleheight);
$(document).ready(function() {

     $("article").addClass("articletransition");
    $("nav").removeClass('navtransition');
    $(".twitter-timeline").addClass('navtransition');
    $(".footer").addClass('footertransition');
    $("#logo").addClass('logotransition');
    if($('.collapse').hasClass("in")){
      $(".navbar").addClass("fixNav");
    };    
console.log();
var projectHeights = $('.project').map(function() {
  return $(this).height();
}).get();


// Math.max takes a variable number of arguments
// `apply` is equivalent to passing each height as an argument
var maxHeight = Math.max.apply(null, projectHeights);
// setTimeout(customInsta(), 2000);
// Set each height to the max height
$('.project').height(maxHeight);
   });

