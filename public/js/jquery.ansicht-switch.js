/************************************************ 
*  jQuery iphoneSwitch plugin                   *
*                                               *
*  Author: Daniel LaBare                        *
*  Date:   2/4/2008                             *
************************************************/
jQuery.fn.ansichtSwitch = function(start_state, switched_on_callback, switched_off_callback, options) {
	var state = start_state == 'on' ? start_state : 'off';
	// define default settings
	var settings = {
		mouse_over: 'pointer',
		mouse_out:  'default',
		switch_on_container_path: 'images/ansicht_switch_container_on.png',
		switch_off_container_path: 'images/ansicht_switch_container_off.png',
		switch_path: 'images/ansicht_switch.png',
		switch_height: 22,
		switch_width: 89
	};
	if(options) {
		jQuery.extend(settings, options);
	}
	// create the switch
	return this.each(function() {
		var container;
		var image;
		// make the container
		container = jQuery('<div class="ansicht_switch_container" style="height:'+settings.switch_height+'px; width:'+settings.switch_width+'px; position: relative; overflow: hidden"></div>');
		// make the switch image based on starting state
		image = jQuery('<img class="ansicht_switch" style="height:'+settings.switch_height+'px; width:'+settings.switch_width+'px; background-image:url('+settings.switch_path+'); background-repeat:none; background-position:'+(state == 'on' ? 0 : -89)+'px" src="'+(state == 'on' ? settings.switch_on_container_path : settings.switch_off_container_path)+'" /></div>');
		// insert into placeholder
		jQuery(this).html(jQuery(container).html(jQuery(image)));
		jQuery(this).mouseover(function(){
			jQuery(this).css("cursor", settings.mouse_over);
		});
		jQuery(this).mouseout(function(){
			jQuery(this).css("background", settings.mouse_out);
		});
		// click handling
		jQuery(this).click(function() {
			if(state == 'on'){
				switched_off_callback();
			} else {
				switched_on_callback();
			}
		});	
		
		if(state == 'on') {
			jQuery(this).find('.ansicht_switch').animate({backgroundPosition: -89}, "slow", function() {
			});
			state = 'off';
		}
		else {
			jQuery(this).find('.ansicht_switch').animate({backgroundPosition: 0}, "slow", function() {
			});
			state = 'on';
		}	

	});
};
