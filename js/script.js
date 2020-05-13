// Scroll.js

$(window).on('popstate',function(e){
	e.preventDefault();
	var target = window.location.href.split("#")[1];
	if(target != "" && target!=undefined && document.getElementById(target)!=null){
		$('html, body').stop().animate({'scrollTop': $("#"+target).offset().top}, 500, 'swing', function () {
			window.location.hash = target;
		});
	}
});

$(document).ready(function() {
	SF_scripts();
});

function SF_scripts(){

	$(window).resize(function(){
		resizeVideo();
		showMenuBtn();
	});

	$(window).trigger("resize");

	// open menu on mobile

	function showMenuBtn(){
		if($(window).width()<1199.98){
			$(".open_menu").addClass("d-block");
			$("header nav").addClass("d-none");
			$(".navigation_mobile").removeClass("opened");
		}else{
			$(".open_menu").removeClass("d-block");
			$("header nav").removeClass("d-none");
			$(".navigation_mobile").removeClass("opened");
		}
	}

	$(".open_menu").click(function(event){
		event.preventDefault();
		$(".navigation_mobile").addClass("opened");
	});

	$(".close_menu, header, section, footer, .navigation_mobile .inner a").click(function(event){
		$(".navigation_mobile").removeClass("opened");
	});
	
	// Set | remove z-index for sections, that has dropdown
	
	function SF_dropdown_parent(dropdown){
		// Find dropdown's parent nav|header|section|footer
		var section = dropdown;
		var noBreak = true;
		while(noBreak){
			if(
				section[0].tagName=="NAV" || 
				section[0].tagName=="HEADER" || 
				section[0].tagName=="SECTION" || 
				section[0].tagName=="FOOTER" || 
				section[0].tagName=="BODY"
			){
				noBreak = false;
				break;
			}else{
				section = section.parent();				
			}
		}
		return section;
	}
	function SF_highest_zIndex(){
		// Find nav|header|section|footer with highest z-index on page
		var zIndex = 1;
		var currentzIndex;
		var section;
		$("nav, header, section, footer").each(function(){
			currentzIndex = parseInt($(this).css("z-index"));
			if(zIndex < currentzIndex){
				zIndex = currentzIndex;
				section = $(this);
			}
		});
		return [zIndex, section];
	}
	
	// Set highest z-index for section, that has opened dropdown
	$(".dropdown").on("show.bs.dropdown", function () {
		var section = SF_dropdown_parent($(this));
		section.css("z-index",SF_highest_zIndex()[0]+1);	
	});
	
	// Remove z-index for section, where dropdown was closed
	$(".dropdown").on("hidden.bs.dropdown", function () {
		var section = SF_dropdown_parent($(this));
		section.css("z-index","auto");	
	})
	
	// Navigation dropdown popup

	if($(".js-nav-dropdowns").length>0){
		$("body").click(function(event){
			if($(event.target).closest(".navigation_popup").length==0 && $(event.target).closest(".js-open-nav-dropdown").length==0){
				$(".navigation_popup.opened").removeClass("opened");
				$(".js-open-nav-dropdown i.fa-flip-vertical").removeClass("fa-flip-vertical");
			}
		});
		
		$(".js-nav-dropdowns .js-open-nav-dropdown").click(function(event){
			event.preventDefault();
			var id = $(".js-nav-dropdowns .js-open-nav-dropdown").index($(this));
			if($(".navigation_popup").eq(id).hasClass("opened")){
				$(this).find("i").removeClass("fa-flip-vertical");
				$(".navigation_popup").eq(id).removeClass("opened");
			}else{
				$(".navigation_popup.opened").removeClass("opened");
				$(".js-open-nav-dropdown i.fa-flip-vertical").removeClass("fa-flip-vertical");
				$(".navigation_popup").eq(id).addClass("opened");			
				$(this).find("i").addClass("fa-flip-vertical");
				var section = SF_dropdown_parent($(this));
				section.css("z-index",SF_highest_zIndex()[0]+1);				
			}
		});
	}

	// Resize video, saving aspect ratio

	function resizeVideo(){
		var width, height, ratio;
		$(".video").each(function(){
			ratio = $(this).data("ratio");
			ratio = ratio.split("/");
			ratio = ratio[0]/ratio[1];
			width = $(this).width();
			height = width/ratio;
			$(this).height(height);
		});
	}

	resizeVideo();


	
	

}; // SF_scripts end
