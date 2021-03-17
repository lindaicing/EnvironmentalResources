var darkmode;

$(window).ready(function(){
    // Delay showing Transitions ------------------------------------------------------------
    var delay = ( function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    delay(function(){addTransition();}, 10 );
    function addTransition(){
        $("#page, body, nav, #shrink, #shrink span, #darkmode, #switch, #key div, #ethicli").css({
            "-webkit-transition":"all 500ms cubic-bezier(0.515, 0, 0.425, 1)",
            "-webkit-transition":"all 500ms cubic-bezier(0.515, -0.005, 0.425, 1.020)",
            "-moz-transition":"all 500ms cubic-bezier(0.515, -0.005, 0.425, 1.020)",
            "-o-transition":"all 500ms cubic-bezier(0.515, -0.005, 0.425, 1.020)",
            "transition":"all 500ms cubic-bezier(0.515, -0.005, 0.425, 1.020)",
            "-webkit-transition-timing-function":"cubic-bezier(0.515, 0, 0.425, 1)",
            "-webkit-transition-timing-function":"cubic-bezier(0.515, -0.005, 0.425, 1.020)",
            "-moz-transition-timing-function":"cubic-bezier(0.515, -0.005, 0.425, 1.020)",
            "-o-transition-timing-function":"cubic-bezier(0.515, -0.005, 0.425, 1.020)",
            "transition-timing-function":"cubic-bezier(0.515, -0.005, 0.425, 1.020)",
        })
    }

    // Load Components ------------------------------------------------------------
    
    $(function(){
      $("#nav").load("../components/nav.html");
      $("#footer").load("../components/footer.html");

      $("#home").load("../views/home.html"); 
      $("#terms").load("../views/terms.html"); 
      $("#laws").load("../views/laws.html"); 
      $("#timeline").load("../views/timeline.html"); 
      $("#watch").load("../views/watch.html"); 
      $("#read").load("../views/read.html"); 
      $("#peopleprojects").load("../views/peopleprojects.html"); 
    });
})
