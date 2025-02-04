var howManyUsers = 1;
var footerActiv = 0;
var footerHeightMin = "45px";
var footerHeightMax = "175px";
var footerDifference = "130px";
var footerSpeed = 500;

var dragActiv = 0;
var timelineDragMax = 300;
var timelineDragNormal = 138
var timelineDragMin = 44;
var timelineDragMapMin = 44-138;
var timelineDragMapMax = 300-138;
var timelineStatus = 1;
var timelineSpeed = 500;
var animateMapToTimeline;

function initializeTimeline(){
	setTimelineAndMapBottom();
	setFooterHeight();
	setFooterBottom();
	timelineDragMove();
	timelineAnimation();
 }

function setTimelineAndMapBottom(){
	setTimelineBottom();
	setMapBottom();
	setFooterBottom();
}

function setFooterHeight() {
	$("#footer").dblclick(function(){
	if(footerActiv == 0){
		footerActiv = 2;
		$("#footer").animate({height:footerHeightMax}, footerSpeed, footerAcitv);
		$("#timeline").animate({bottom:"+=" + footerDifference}, footerSpeed);
		$("#map").animate({bottom:"+=" + footerDifference}, footerSpeed);
	} else if(footerActiv ==1){
		footerActiv = 3;
		$("#footer").animate({height:footerHeightMin}, footerSpeed, footerAcitv);
		$("#timeline").animate({bottom:"-=" + footerDifference}, footerSpeed);
		$("#map").animate({bottom:"-=" + footerDifference}, footerSpeed );	
		}	
	});
}

function footerAcitv(){
	if(footerActiv == 2 ){
		footerActiv = 1;
	}else if(footerActiv ==3){
		footerActiv = 0;
	}
}

function setFooterBottom(){
	$("#footer").css("bottom", function(bottomPx) {
  		return bottomPx = 0;
	});
}

function setTimelineBottom(){
	$("#timeline").css("bottom", function(bottomPx) {
  		return bottomPx = $("#footer").css("height");
	});
}

function setMapBottom(){
	$("#map").css("bottom", function(bottomPx) {
  			return bottomPx = parseInt($("#footer").css("height")) + parseInt($("#timeline").css("height"));
		});	
}

function timelineDragMove(){
	$('#timeline').mousedown(function(){
  		dragActiv = 1;
  		startPosition = event.pageY-this.offsetTop;
  	});
  	$(document).mouseup(function(){
  		dragActiv = 0;
  	});
  	$(document).mouseleave(function(){
  		dragActiv = 0;
  	});
  	$(document).mousemove(function(){
  		if(dragActiv == 1){
  			timelineStatus = 5;
  			$("#timeline").css("height", function(newHeight) {
				if(parseInt($("#timeline").css("height")) > timelineDragMax){
					dragActiv = 0;
					return timelineDragMax;
				}else if(parseInt($("#timeline").css("height")) <timelineDragMin){
					dragActiv = 0;
					return timelineDragMin;
				}else{
  					return newHeight = parseInt($("#timeline").css("height")) + (startPosition - (event.pageY - this.offsetTop));
  					
  				}		
  			});
  			setMapBottom();
  		}
  	});

}

function timelineAnimation(){
	$('#timeline').dblclick(function(){
		if(timelineStatus == 1){
			timelineStatus = 101;
			$("#timeline").animate({height: timelineDragMin}, timelineSpeed, setTimelineStatus);	
			$("#map").animate({bottom:"+=" + timelineDragMapMin}, timelineSpeed );	
		}else if(timelineStatus == 2){
			timelineStatus = 102;
			$("#timeline").animate({height: timelineDragNormal}, timelineSpeed, setTimelineStatus);
			$("#map").animate({bottom:"-=" + timelineDragMapMin}, timelineSpeed );
		}else if(timelineStatus == 3){
			timelineStatus = 103;
			$("#timeline").animate({height: timelineDragMax}, timelineSpeed, setTimelineStatus );
			$("#map").animate({bottom:"+=" + timelineDragMapMax}, timelineSpeed );
		}else if(timelineStatus == 4){
			timelineStatus = 104;
			$("#timeline").animate({height: timelineDragNormal}, timelineSpeed, setTimelineStatus );
			$("#map").animate({bottom:"-=" + timelineDragMapMax}, timelineSpeed);
		}else if(timelineStatus = 5 && parseInt($("#timeline").css("height")) < timelineDragNormal) {
			timelineStatus = 102;
			animateMapToTimeline = parseInt($("#footer").css("height")) + timelineDragNormal;
			$("#timeline").animate({height: timelineDragNormal}, timelineSpeed, setTimelineStatus);
			$("#map").animate({bottom: animateMapToTimeline}, timelineSpeed);
		}else if(timelineStatus = 5 && parseInt($("#timeline").css("height")) > timelineDragNormal) {
			timelineStatus = 104;
			animateMapToTimeline = parseInt($("#footer").css("height")) + timelineDragNormal;
			$("#timeline").animate({height: timelineDragNormal}, timelineSpeed, setTimelineStatus);
			$("#map").animate({bottom: animateMapToTimeline}, timelineSpeed);
		}
	});
}

function setTimelineStatus(){
	if(timelineStatus == 101){
		timelineStatus = 2;
	}else if(timelineStatus == 102){
		timelineStatus = 3;
	}else if(timelineStatus == 103){
		timelineStatus = 4;
	}else if(timelineStatus == 104){
		timelineStatus = 1;
	}
	
}
