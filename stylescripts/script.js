const pageID = ["home", "definition", "legislation_us", "legislation_itl", "timeline", "read", "watch", "listen", "projects", "people", "life"] 
const pageNames = ["Home", "Definitions", "Legislation in US", "Legislation International", "Timeline", "Reading Nook", "Video Corner", "Podcasts", "Projects", "People", "Lifestyle"]
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
        updateTags();
    });

    $("#navtoggle").click(function(){  $("body").toggleClass("navclosed"); });

    function updateScroller(currentPage){
        const SCROLLERHEIGHT = currentPage * 36.8;
        $("#scroller").css({ "margin-top": SCROLLERHEIGHT });
    }
    
    // Tags ---------------------------------------------------------------------------
    function updateTags(){
        let tags = [];
        let renderedtags = "";
        let H2ID = []
        $(".tags").empty();

        $(".pages.show h2").each(function(){
            let H2TEXT = $(this).text();
            H2ID.push( H2TEXT.replace(/ /g,'') );
            $(this).attr("id", H2TEXT.replace(/ /g,'')); //Add ID to H2s
            tags.push($(this).text());
        })

        for(i=0; i<tags.length; i++){
            renderedtags +="<li><a href='#"+H2ID[i]+"'>"+tags[i]+"</a></li>";
        }
        $(".tags").append(renderedtags);
    }

    // Dark -------------------------------------------------------------------
    $("#darkmode").click(function(){  
        $("body").toggleClass("dark"); 
        localStorage.setItem("Darkmode", $("body").hasClass("dark"));
    });
    if(localStorage.getItem("Darkmode")) { $("body").addClass("dark"); }

    // Upcoming Functions -------------------------------------------------------------
})

