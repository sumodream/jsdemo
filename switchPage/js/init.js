var current = {row : 1,col : 1};
var next = {row : 0,col : 0};
const TOWORDS = {
	UP : 1,
	DOWN : 2
};
var animate = false;
var speed = 300;
function data(towards) {
	var nextPage = ".page-" + next.row + "-" + next.col;
	var  currentPage = ".page-" + current.row + "-" + current.col;
	switch(towards) {
		case TOWORDS.UP:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case TOWORDS.DOWN:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	animate = true;
	$(currentPage).removeClass("hide");
	$(nextPage).addClass("hide");
	$(currentPage).addClass(inClass);
	setTimeout(function() {
		$(nextPage).removeClass('page-current');
		$(nextPage).removeClass(outClass);
		$(nextPage).addClass("hide");
		$(nextPage).find("p").addClass("hide");
        $(nextPage).find("div").addClass("hide");       
		$(currentPage).addClass('page-current');
		$(currentPage).removeClass(inClass);
		$(currentPage).find("p").removeClass("hide");
        $(currentPage).find("div").removeClass("hide");       
		animate = false;
	}, speed);
}
function pageUp() {
	if (animate)
		return;
	next.row = current.row;
	next.col = current.col;
	if (next.row != 4) {
		current.row = next.row + 1;
		current.col = 1;
		data(TOWORDS.UP);
	}
};
function pageDown() {
	if (animate)
		return;
	next.row = current.row;
	next.col = current.col;
	if (next.row != 1) {
		current.row = next.row - 1;
		current.col = 1;
		data(TOWORDS.DOWN);
	}
};
$(document).ready(function() {
    var mc = new Hammer(document.getElementById("pageWrap"));
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	mc.on("panup", function(ev) {
	   pageUp();
	});
	mc.on("pandown", function(ev) {
	   pageDown();
	});
});
