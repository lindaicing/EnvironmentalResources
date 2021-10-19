const pageID = ["home", "definition", "legislation_us", "legislation_itl", "organizations", "timeline", "read", "watch", "listen", "projects", "people", "life"] ;
const pageNames = ["Home", "Definitions", "Legislation in US", "Legislation International", "Organizations", "Timeline", "Reading Nook", "Video Corner", "Podcasts", "Projects", "People", "Lifestyle"];
const pageDesc = [
    "Homepage",
    "Important Definitions",
    "Important United States environmental legislation",
    "Important international environmental legislation",
    "Important organizations with environmental influence",
    "Timeline of major environmental events",
    "Recommended articles, books, and scientific journals",
    "Recommended documentaries, movies, and videos",
    "Recommended audiobooks and podcasts",
    "Neat environmentally-related projects",
    "Influential and interesting people involved in environmental activities",
    "How can you be more environmentally aware in your everyday life?"
];
let navLinks = [];

$(document).ready(function(){
    $("#preloader").delay(1500).fadeOut("slow");
    
    for(i=0; i<pageID.length; i++) {
        let setupID = "#"+pageID[i];
        let setupDirectory = "pages/" + pageID[i] + ".html";
        $(function(){ $(setupID).load(setupDirectory); });
        $("#pagelist").append("<div class='pages' id='" + pageID[i] + "'</div>"); 

        navLinks.push("nav_" + pageID[i]) //Setup nav
        $("#navlinkslist").append("<li class='navlinks' id='" + navLinks[i] + "' title='" + pageDesc[i] + "' >" + pageNames[i] + "</li>"); 
    }

    $("#home").addClass("show");
    $(".tags").css({ "display":"none" })
    $("#nav_home").addClass("current");

    // Nav Setup ----------------------------------------------------------------------
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
        updateTags(pageID[focusID]);
    });

    $("#navtoggle").click(function(){  $("body").toggleClass("navclosed"); });
    $(window).resize(function() { checkMobile(); });

    function updateScroller(currentPage){
        let navScrollerSpacing = 37;
        // if($(window).width() < 650) { navScrollerSpacing = 38; }
        const SCROLLERHEIGHT = currentPage * navScrollerSpacing;
        $("#scroller").css({ "margin-top": SCROLLERHEIGHT });
    }

    // Transitions --------------------------------------------------------------------
    let delay = ( function() { // Delay showing Transitions 
        var timer = 0;
        return function(callback, ms) {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();
    delay(function(){startupTransition();}, 10 );
    function startupTransition(){
        $("nav, #maincontent, .pages > div, .tags li").css({
            "transition": "all 800ms cubic-bezier(0.5, 0, 0.5, 1)",
            "transition-timing-function": "cubic-bezier(0.5, 0, 0.5, 1)"
        })
    }
    function mobileTransition(){
        $("nav, #navlinkslist, #maincontent, .pages > div, .tags li").css({
            "transition": "all 800ms cubic-bezier(0.5, 0, 0.5, 1)",
            "transition-timing-function": "cubic-bezier(0.5, 0, 0.5, 1)"
        })
    }

    checkMobile();
    function checkMobile() {
        $("nav, #navlinkslist, #maincontent").css({
            "transition": "none",
            "transition-timing-function": "none"
        })
        if($(window).width() >= 650) { 
            $("#navtoggle i").removeClass("fa-bars");
            $("#navtoggle i").addClass("fa-chevron-left");
        } else if ($(window).width() < 650 && $(window).width() > 600) {
            $("body").removeClass("navclosed");
            $("#navtoggle i").addClass("fa-bars");
            $("#navtoggle i").removeClass("fa-chevron-left");
        } else {
            $("#navtoggle i").addClass("fa-bars");
            $("#navtoggle i").removeClass("fa-chevron-left");
            $("body").addClass("navclosed");
        }
        let delay = ( function() { // Delay showing Transitions 
            var timer = 0;
            return function(callback, ms) {
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })();
        delay(function(){mobileTransition();}, 10 );
    }

    // Tags ---------------------------------------------------------------------------
    function updateTags(focusPage){
        $(".tags").empty();
        if($("#home").hasClass("show")) {
            $(".tags").css({ "display":"none" })
        } else {
            $(".tags").css({ "display":"flex" })
            let tags = [];
            let renderedtags = "";
            let H2ID = []

            $(".pages.show h2").each(function(){
                let H2TEXT = focusPage + "-" + $(this).text();
                H2ID.push( H2TEXT.replace(/ /g,'') );
                $(this).attr("id", H2TEXT.replace(/ /g,'')); //Add ID to H2s
                tags.push($(this).text());
            })
    
            for(i=0; i<tags.length; i++){
                renderedtags +="<li><a href='#"+H2ID[i]+"'>"+tags[i]+"</a></li>";
            }
            $(".tags").append(renderedtags);
        }
    }

    // Dark -------------------------------------------------------------------
    $("#darkmode").click(function(){  
        $("body").toggleClass("dark"); 
        localStorage.setItem("Darkmode", $("body").hasClass("dark"));
    });
    if(localStorage.getItem("Darkmode")) { $("body").addClass("dark"); }

    // Upcoming Functions -------------------------------------------------------------
    tagSort(); function tagSort(){
        // Sort by...
        // - Author (listen, read)
        // - Media type: Book, article, scientific journal, etc. (read)
        // - YouTube, Netflix, Etc. (listen, watch)
        // - US vs International (timeline, pages combine?, organizations)
        // - Vegan, Plant-Based, Product, Service (life)
        // - Legislation, events, or both (timeline) 
    }
})

