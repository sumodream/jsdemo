//under here there is function about fuc* dota



var now = {row : 1,col : 1};
var last = {row : 0,col : 0};

const TOWORDS = {
	UP : 1,
	RIGHT : 2,
	DOWN : 3,
	LEFT : 4,
	FADEOUT:5
};
var isAnimating = false;
var ANIMATION_TIME = 700;


function dota(towards) {
	var lastPage = ".page-" + last.row + "-" + last.col;
	var  nowPage = ".page-" + now.row + "-" + now.col;

	switch(towards) {
		case TOWORDS.UP:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case TOWORDS.RIGHT:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case TOWORDS.DOWN:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case TOWORDS.LEFT:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
		case TOWORDS.FADEOUT:
			outClass = 'pt-page-scaleDown';
			inClass = 'pt-page-scaleUp';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function() {
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
        $(lastPage).find("h4").addClass("hide");
        $(lastPage).find("h2").addClass("hide");
        $(lastPage).find("h1").addClass("hide");
        $(lastPage).find("div").addClass("hide");
        $(lastPage).find("a").addClass("hide");
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
        $(nowPage).find("h4").removeClass("hide");
        $(nowPage).find("h2").removeClass("hide");
        $(nowPage).find("h1").removeClass("hide");
        $(nowPage).find("div").removeClass("hide");
        $(nowPage).find("a").removeClass("hide");
		isAnimating = false;
	}, ANIMATION_TIME);
}

function pageUp() {
	if (isAnimating)
		return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 13) {
		now.row = last.row + 1;
		now.col = 1;
		dota(TOWORDS.UP);
	}
};

function pageLeft() {
	if (isAnimating)
		return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 6) {
		now.row = last.row + 1;
		now.col = 1;
		dota(TOWORDS.LEFT);
	}
};

function pageDown() {
	if (isAnimating)
		return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 1) {
		now.row = last.row - 1;
		now.col = 1;
		dota(TOWORDS.DOWN);
	}
};

function pageRight() {
	if (isAnimating)
		return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 1) {
		now.row = last.row - 1;
		now.col = 1;
		dota(TOWORDS.RIGHT);
	}
};
function pageFadeOut() {
	if (isAnimating)
		return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 5) {
		now.row = last.row + 1;
		now.col = 1;
		dota(TOWORDS.FADEOUT);
	}
};




//under here is some page logic
$(document).ready(function() {
	//TODO SHOW 的逻辑
    var mc = new Hammer(document.getElementById("pageWrap"));
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	mc.on("panup", function(ev) {
	   pageUp();
	});
	mc.on("pandown", function(ev) {
	   pageDown();
	});
	$("#pageWrap").find("a").click(function(){
        var realsrc = $(this).attr("src-data");
        if(realsrc!=undefined&&realsrc!=""){
            $("#ifr").attr("src",realsrc);
            $("#ifr").show();
            $("#closeIframe").show();
        }
    })
    $("#closeIframe").click(function(){
        $("#ifr").attr("src","");
        $("#ifr").hide();
        $("#closeIframe").hide();
    });
});








