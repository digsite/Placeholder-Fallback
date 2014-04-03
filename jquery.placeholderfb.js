/* 
======================================= 
[ jquery.placeholderfb.js ]
======================================= 

Leading semicolon here just in case any other plugins did not close or concatenate correctly.
Idea for this stolen from jQuery Plugin Boilerpate <http://jqueryboilerplate.com/>
*/
;(function( $ ){

	/*
	//-- PLUGIN FUNCTION
	======================================= 
	*/
	$.fn.placeholderfb = function( options ) {

		return this.each(function() {
			var obj = $(this);

			//-- default settings that can be overridden with options passed in
			var settings = $.extend({
				'color'				: '#cdcdcd'
			}, options);
			
			//-- apply it to only what is needed
			if(!_support_placeholder() && obj.length > 0)
			{
				var defText = obj.attr('placeholder');

				if(defText!=undefined && defText!='')
				{					
					//-- set value to what's found in placeholder
					_set_text(obj, defText);
					//-- don't forget the text color!
					_set_color(obj, settings.color);
					//-- removes specific events before adding new ones
					_remove_events(obj);
					//-- add our event listeners
					obj.on({
						blur:	function(event){
							_add_text(obj, defText, settings);
						},
						focus:	function(event){
							_clear_text(obj, defText);
							//-- reset the text color to use inherit CSS values, 
							//-- so that whatever the user types, it will not be in the placeholder color
							_set_color(obj, "inherit");
						}
					});
				}				
				//-- failsafe to remove any of our event listeners if element doesn't have default text
				//-- keeps javascript clean of erroneous event listeners
				else
				{
					_set_text(obj, '');
					_remove_events(obj);
				}				
			}
		});

	};
	/*
	======================================= 
	


	//-- PRIVATE FUNCTIONS
	=======================================	

	_support_placeholder()

	Utility function that checks to see if the browser supports the placeholder attribute of input tags.
	Found this function at the following URL: 
	http://diveintohtml5.org/detect.html#input-placeholder 
	*/
	function _support_placeholder()
	{
		var i = document.createElement('input');
  		return 'placeholder' in i;
	}

	/*	

	_clear_text( o [jQuery object], dTxt [String] )

	Utility event that takes in the jQuery o, then clears the field if dTxt is found as its value.
	*/
	function _clear_text(o, dTxt){
		if(o.val() == dTxt){
			o.val("");
		}
	}

	/*	

	_add_text( o [jQuery object], dTxt [String], s [Object] )

	Utility event function takes in the the jQuery o, then sets dTxt to the field's value if nothing has been entered in the field
	After adding the default text, set CSS color value from s
	*/
	function _add_text(o, dTxt, s){
		if(o.val() == ""){
			o.val(dTxt);
			o.css("color", s.color);
		}	
	}

	/*	

	_set_text( o [jQuery object], dTxt [String] )

	Utility function that takes in the jQuery o, then set its value to dTxt.
	*/
	function _set_text(o, dTxt){
		o.val(dTxt);
	}

	/*	

	_remove_events( o [jQuery object] )

	Utility function takes in the the jQuery o, and removes events we've attached
	*/
	function _remove_events(o){
		o.off("blur");
		o.off("focus");
	}

	/*	

	_set_color( o [jQuery object], cv [String] )

	Utility function takes in the the jQuery o, sets the CSS color attribute to the color value cv
	*/
	function _set_color(o, cv){
		o.css("color", cv);
	}

	/*
	=======================================
	*/

})( jQuery );
/* 






*/