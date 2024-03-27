$(document).ready(function () {

    $(".menu-icon").click(function () {
      $(".menu").toggleClass("active");
    });
    
    $(".hoverLink").hover(function(){        
        $(this).addClass('highlight') 
    },
    function(){
        $(this).removeClass('highlight'); 
    });
  });