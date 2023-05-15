window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 & window.innerWidth > 991) {
      $("#mainLogo").addClass("shrink");
    } else {
        $("#mainLogo").removeClass("shrink");
    }
  }

  $(window).resize(function() {ResizeFunction()});
 
  function ResizeFunction() {
    if(window.innerWidth < 992){
        $(".reverse-mobile").addClass("flex-column-reverse")
       
    }else{
        $(".reverse-mobile").removeClass("flex-column-reverse")
    }

    $("#particles-js").height($("#main").height() + 150);
  }
document.body.onload = function(){  if(window.innerWidth < 991){
    $(".reverse-mobile").addClass("flex-column-reverse")
}else{
    $(".reverse-mobile").removeClass("flex-column-reverse")
}

$("#particles-js").height($("#main").height() + 150);

}

particlesJS.load('particles-js', '../particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

