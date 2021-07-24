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

    $(".navlinks").click(function(){
        $(".navlinks").removeClass("show"); //Hides all link highlights
        for(i=0; i<pageID.length; i++) { $(".pages").removeClass("show"); } //Hides all pages
        let locNavID = $(this).attr('id');
        let focusID = navLinks.indexOf(locNavID); //reverse-search nav link index, lowkey jank
        let focusPage = "#" + pageID[focusID];
        $(focusPage).addClass("show");
    });
})

