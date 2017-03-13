'use strict';

(function($){

	$.fn.osrKeyboard = function(action, options){
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
					$('#osrKeyboard').slideUp();
				}
			}

			show_keyboard(this, defaultEnterAction);
			$(this).on('click', function(e){ $(this).osrKeyboard(); });
		}
		return this;
	}

	function show_keyboard(_this, enterAction){
		if($('#osrKeyboard').length == 0){
			$('body').append(build_keyboard_interface())
					 .append(build_css());
			$('#osrKeyboard span').click(function(e){
				var input_val = $(this).data('bind');
				$(_this).val(function(index, val){
					if(input_val === 'BKSP'){
						return val.substr(0, val.length - 1);
					}else if(input_val === 'ENTER'){
						enterAction();
						return val;
					}else if(input_val === 'SPACE'){
						return val + ' ';
					}else{
						return val + input_val;
					}
				}).focus();				
			});

		}
		if($('#osrKeyboard:visible').length == 0){
			$('#osrKeyboard').css("width", $(window).width() + 2).show();
			$(_this).focus();
		}
	}

	function build_keyboard_interface(){
		return "<div id='osrKeyboard' style='position:absolute; margin-left: -10px; bottom: 0; height: 238px; background: #525252; display:none;'>" +
					"<div class='osrKeyboard-key-areas' style='width: 552px; margin: 10px auto;''>" +
						"<table style='width: 550px'>" +
							"<tr>" +
								"<td><span data-bind='1'>1</span></td>" +
								"<td><span data-bind='2'>2</span></td>" +
								"<td><span data-bind='3'>3</span></td>" +
								"<td><span data-bind='4'>4</span></td>" +
								"<td><span data-bind='5'>5</span></td>" +
								"<td><span data-bind='6'>6</span></td>" +
								"<td><span data-bind='7'>7</span></td>" +
								"<td><span data-bind='8'>8</span></td>" +
								"<td><span data-bind='9'>9</span></td>" +
								"<td><span data-bind='0'>0</span></td>" +
								"<td><span data-bind='BKSP' class='osrKeyboard-backspace' style='font-size: 16px;padding-top: 14px;height:34px;'>BKSP</span></td>" +
							"</tr>" +
							"<tr>" +
								"<td><span data-bind='Q'>Q</span></td>" +
								"<td><span data-bind='W'>W</span></td>" +
								"<td><span data-bind='E'>E</span></td>" +
								"<td><span data-bind='R'>R</span></td>" +
								"<td><span data-bind='T'>T</span></td>" +
								"<td><span data-bind='Y'>Y</span></td>" +
								"<td><span data-bind='U'>U</span></td>" +
								"<td><span data-bind='I'>I</span></td>" +
								"<td><span data-bind='O'>O</span></td>" +
								"<td><span data-bind='P'>P</span></td>" +
								"<td style='position:relative;'><span class='osrKeyboard-enter-upper osrKeyboard-enter'  data-bind='ENTER'></span></td>" +
							"</tr>" +
							"<tr>" +
								"<td><span data-bind='A'>A</span></td>" +
								"<td><span data-bind='S'>S</span></td>" +
								"<td><span data-bind='D'>D</span></td>" +
								"<td><span data-bind='F'>F</span></td>" +
								"<td><span data-bind='G'>G</span></td>" +
								"<td><span data-bind='H'>H</span></td>" +
								"<td><span data-bind='J'>J</span></td>" +
								"<td><span data-bind='K'>K</span></td>" +
								"<td><span data-bind='L'>L</span></td>" +
								"<td colspan='2'><span class='osrKeyboard-enter-lower osrKeyboard-enter' style='width:102px;border-top-right-radius: 0px;' data-bind='ENTER'>ENTER</span></td>" +
							"</tr>" +
							"<tr>" +
								"<td><span data-bind='Z'>Z</span></td>" +
								"<td><span data-bind='X'>X</span></td>" +
								"<td><span data-bind='C'>C</span></td>" +
								"<td><span data-bind='V'>V</span></td>" +
								"<td><span data-bind='B'>B</span></td>" +
								"<td><span data-bind='N'>N</span></td>" +
								"<td><span data-bind='M'>M</span></td>" +
								"<td colspan='4'><span class='osrKeyboard-space' style='width: 210px;' data-bind='SPACE'>SPACE</span></td>" +
							"</tr>" +
						"</table>" +
					"</div>" +
				"</div>";
	}

	function build_css(){
		return "<style>" +
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