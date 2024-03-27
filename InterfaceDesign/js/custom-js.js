$(document).ready(function(){


    $(window).on("scroll", function(){
        if($(this).scrollTop() > 100){
            $(".header").addClass("scrolledHeader");
        }else{
            $(".header").removeClass("scrolledHeader");
        }
    });
    
    $(".menuTitle").mouseenter(function(){
        $("P.menuTitle").addClass("shrinkP")
        $(this).removeClass("shrinkP")
    });

    $(".menuTitle").mouseleave(function(){
        $("P.menuTitle").removeClass("shrinkP")
    });
});