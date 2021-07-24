const pageID = ["home", "definition", "legislation_us", "legislation_itl", "timeline", "read", "watch", "projects", "people", "life"] 
const pageNames = ["Home", "Definitions", "Legislation in US", "Legislation International", "Timeline", "Reading Nook", "Video Corner", "Projects", "People", "Lifestyle"]
let navLinks = [];

$(document).ready(function(){
    for(i=0; i<pageID.length; i++) {
        let setupID = "#"+pageID[i];
        let setupDirectory = "pages/" + pageID[i] + ".html";
        $(function(){ $(setupID).load(setupDirectory); });
        $("#pagelist").append("<div class='pages' id='" + pageID[i] + "'</div>"); 

        navLinks.push("nav_" + pageID[i]) //Setup nav
        $("#navlinkslist").append("<li class='navlinks' id='" + navLinks[i] + "'>" + pageNames[i] + "</li>"); 
    }

    $("#home").addClass("show");
    $("#nav_home").addClass("current");
    $("a").attr("target", "_blank"); //open new pages for all links

    // Nav Setup --------------------------------------------------------------------
    $(".navlinks").click(function(){
        $(".navlinks").removeClass("current"); //Hides all link highlights
        for(i=0; i<pageID.length; i++) { 
            $(".pages").removeClass("show"); //Hides all pages
        }
        let locNavID = $(this).attr('id');
        let focusID = navLinks.indexOf(locNavID); //reverse-search nav link index, lowkey jank
        let focusPage = "#" + pageID[focusID];
        $(focusPage).addClass("show");
        $(this).addClass("current");
        updateScroller(focusID);
    });

    $("#navtoggle").click(function(){ 
        $("body").toggleClass("navclosed"); 
    });

    function updateScroller(currentPage){
        const SCROLLERHEIGHT = currentPage * 36.8;
        $("#scroller").css({ "margin-top": SCROLLERHEIGHT });
    }

    // Transitions --------------------------------------------------------------------
    var delay = ( function() { // Delay showing Transitions 
        var timer = 0;
        return function(callback, ms) {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();
    delay(function(){startupTransition();}, 10 );
    function startupTransition(){
        $("nav, #maincontent").css({
            "transition": "all 800ms cubic-bezier(0.5, 0, 0.5, 1)",
            "transition-timing-function": "cubic-bezier(0.5, 0, 0.5, 1)"
        })
    }

    // Upcoming Functions --------------------------------------------------------------------
    function darkmode(){}; // In Progress
})

