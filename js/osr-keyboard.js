'use strict';

(function($){
	var currentKeyboardContext, reservedOldValueForKeyboard = "";
	var currentKeyboardCounter, keyboardCounter = 0;

	setInterval(function(){
		var inputs = $('input');
	    inputs.each(function(i){
	        $(inputs[i]).focus(function(){
	            $(this).osrKeyboard();
	        });
	    });
	}, 2000);

	$.fn.osrKeyboard = function(action, options){
		if(currentKeyboardCounter != $(this).data("keyboard-counter")){
			currentKeyboardCounter = $(this).data("keyboard-counter");
			reservedOldValueForKeyboard = "";
		}
		currentKeyboardContext = this;
		
		$(currentKeyboardContext)[0].setSelectionRange(reservedOldValueForKeyboard.length, reservedOldValueForKeyboard.length);

		if($(this).data('keyboard_init')){
			show_keyboard();
			return;
		}
		if(options == undefined && typeof action === 'object'){
			options = action;
			action = undefined;
		}

		if(action == 'show' || action == undefined){
			var defaultEnterAction;
			if(options && options.onEnter){
				defaultEnterAction = options.onEnter;
			}else{
				defaultEnterAction = function(){
					reservedOldValueForKeyboard = "";
					$('#osrKeyboard').hide();
				}
			}

			init_keyboard(this, defaultEnterAction);
			$(this).data('keyboard_init', true);
		}
		return this;
	};

	function init_keyboard(_this, enterAction){
		$(_this).data("keyboard-counter", keyboardCounter++);
		if($('#osrKeyboard').length == 0){
			$('body').append(build_keyboard_interface())
					 .append(build_css());
			$('#osrKeyboard span').click(function(e){
				var input_val = $(this).data('bind');
				if(input_val === 'close'){
                    $('#osrKeyboard').hide();
					return false;
				}
				input_val = parseInt(input_val);

				fireKeyEvent($(currentKeyboardContext)[0], 'keydown', input_val);
				$(currentKeyboardContext).val(function(index, val){
					if(input_val === 8){
						reservedOldValueForKeyboard = reservedOldValueForKeyboard.substr(0, reservedOldValueForKeyboard.length - 1);
					}else if(input_val === 13){
						enterAction();
					}else{
						reservedOldValueForKeyboard += String.fromCharCode(input_val);
					}
					return reservedOldValueForKeyboard;
				}).trigger("input");				
			});

			show_keyboard();
		}
	}

	function show_keyboard(){
		if($('#osrKeyboard:visible').length == 0){
			$('#osrKeyboard').css("width", $(window).width() + 2).show();
			$('#osrKeyboard').show();
		}
	}

	function fireKeyEvent(el, evtType, keyCode){  
	    var doc = el.ownerDocument,  
	        win = doc.defaultView || doc.parentWindow,  
	        evtObj;

	    if(doc.createEvent){  
	        if(win.KeyEvent) {  
	            evtObj = doc.createEvent('KeyEvents');  
	            evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, 0 );  
	        }  
	        else {  
	            evtObj = doc.createEvent('UIEvents');  
	            Object.defineProperty(evtObj, 'keyCode', {  
	                get : function() { return this.keyCodeVal; }  
	            });       
	            Object.defineProperty(evtObj, 'which', {  
	                get : function() { return this.keyCodeVal; }  
	            });  
	            evtObj.initUIEvent( evtType, true, true, win, 1 );  
	            evtObj.keyCodeVal = keyCode;  
	            if (evtObj.keyCode !== keyCode) {  
	                console.log("keyCode " + evtObj.keyCode + " doesn't match " + evtObj.which);  
	            }  
	        }  
	        el.dispatchEvent(evtObj);  
	    }   
	    else if(doc.createEventObject){  
	        evtObj = doc.createEventObject();  
	        evtObj.keyCode = keyCode;  
	        el.fireEvent('on' + evtType, evtObj);  
	    }  
	} 


	function build_keyboard_interface(){
		return "<div id='osrKeyboard' style='position:absolute; margin-left: -10px; bottom: 0; height: 238px; background: #525252; display:none;'>" +
					"<span class='osrKeyboard-close' data-bind='close' style='position: absolute; right: 20px; top: 10px; color: white; font-size: 32px; font-weight: 900; cursor: pointer;'>&times;</span>" +
					"<div class='osrKeyboard-key-areas' style='width: 552px; margin: 10px auto;''>" +
						"<table style='width: 550px'>" +
							"<tr>" +
								"<td><span data-bind='49'>1</span></td>" +
								"<td><span data-bind='50'>2</span></td>" +
								"<td><span data-bind='51'>3</span></td>" +
								"<td><span data-bind='52'>4</span></td>" +
								"<td><span data-bind='53'>5</span></td>" +
								"<td><span data-bind='54'>6</span></td>" +
								"<td><span data-bind='55'>7</span></td>" +
								"<td><span data-bind='56'>8</span></td>" +
								"<td><span data-bind='57'>9</span></td>" +
								"<td><span data-bind='48'>0</span></td>" +
								"<td><span data-bind='8' class='osrKeyboard-backspace' style='font-size: 16px;padding-top: 14px;height:34px;'>BKSP</span></td>" +
							"</tr>" +
							"<tr>" +
								"<td><span data-bind='81'>Q</span></td>" +
								"<td><span data-bind='87'>W</span></td>" +
								"<td><span data-bind='69'>E</span></td>" +
								"<td><span data-bind='82'>R</span></td>" +
								"<td><span data-bind='84'>T</span></td>" +
								"<td><span data-bind='89'>Y</span></td>" +
								"<td><span data-bind='85'>U</span></td>" +
								"<td><span data-bind='73'>I</span></td>" +
								"<td><span data-bind='79'>O</span></td>" +
								"<td><span data-bind='80'>P</span></td>" +
								"<td style='position:relative;'><span class='osrKeyboard-enter-upper osrKeyboard-enter'  data-bind='13'></span></td>" +
							"</tr>" +
							"<tr>" +
								"<td><span data-bind='65'>A</span></td>" +
								"<td><span data-bind='83'>S</span></td>" +
								"<td><span data-bind='68'>D</span></td>" +
								"<td><span data-bind='70'>F</span></td>" +
								"<td><span data-bind='71'>G</span></td>" +
								"<td><span data-bind='72'>H</span></td>" +
								"<td><span data-bind='74'>J</span></td>" +
								"<td><span data-bind='75'>K</span></td>" +
								"<td><span data-bind='76'>L</span></td>" +
								"<td colspan='2'><span class='osrKeyboard-enter-lower osrKeyboard-enter' style='width:102px;border-top-right-radius: 0px;' data-bind='13'>ENTER</span></td>" +
							"</tr>" +
							"<tr>" +
								"<td><span data-bind='90'>Z</span></td>" +
								"<td><span data-bind='88'>X</span></td>" +
								"<td><span data-bind='67'>C</span></td>" +
								"<td><span data-bind='86'>V</span></td>" +
								"<td><span data-bind='66'>B</span></td>" +
								"<td><span data-bind='78'>N</span></td>" +
								"<td><span data-bind='77'>M</span></td>" +
								"<td colspan='4'><span class='osrKeyboard-space' style='width: 210px;' data-bind='32'>SPACE</span></td>" +
							"</tr>" +
						"</table>" +
					"</div>" +
				"</div>";
	}

	function build_css(){
		return "<style>" +
					"#osrKeyboard {" +
						"z-index: 99999;" +
					"}" +
					"#osrKeyboard table td span{" +
					    "height: 36px;" +
					    "width: 48px;" +
					    "border: 1px solid #FAFAFA;" +
					    "font-size: 18px;" +
					    "display: block;" +
					    "text-align: center;" +
					    "padding-top: 12px;" +
					    "border-radius: 3px;" +
					    "background: #FAFAFA;" +
					    "color: #23282d;" +
					    "cursor: pointer;" +
					"}" +
					"#osrKeyboard table td span.osrKeyboard-enter-upper{" +
						"position: absolute;" +
					    "top: 0;" +
					    "height: 43px;" +
					    "border-bottom: none;" +
					    "z-index: 9;" +
					    "background: #FAFAFA;" +
					    "border-bottom-left-radius: 0px;" +
					    "border-bottom-right-radius: 0px;"
					"}"
				"</style>";
	}

}(jQuery));