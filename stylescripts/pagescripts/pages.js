$("a").attr("target", "_blank"); //open new pages for all links
$(".tags a").attr("target", "");

// Transitions --------------------------------------------------------------------
var delay = ( function() { // Delay showing Transitions 
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
delay(function(){glassTransition();}, 10 );
function glassTransition(){
    $(".pages > div, .tags li").css({
        "transition": "all 800ms cubic-bezier(0.5, 0, 0.5, 1)",
        "transition-timing-function": "cubic-bezier(0.5, 0, 0.5, 1)"
    })
}
