var Slider = function() {

	function _debug() {
		if((typeof options == "undefined" || options.debug) && typeof console != "undefined" && typeof console.debug == "function") {
			console.debug(arguments);
		}
	}
	
	function _getSessionId() {
		function gen() {
			return Math.floor((1 + Math.random()) * 0x10000)
	            .toString(16)
	            .substring(1);
		}
		return gen() + gen() + "-" + gen() + gen() + "-" + gen() + gen();
	}
	
	var _adTemplate = "<div class='slider' style='visibility:hidden;'><div class='slider-contents'><div class='slider-iframe'><iframe marginheight='0' marginwidth='0' scrolling='no'></iframe></div><div class='slider-navigation'><div class='slider-navigation-logo'><img></div><div class='slider-toggle'><a href='#'><span class='hide'>Hide Ad</span><span class='show'>Show Ad</span></a></div></div></div><div class='slider-tab-toggle'><a href='#'><span>Show Ad</span></a></div></div>";
	var baseOptions = {
		version: "2.6",
		type: "noLogo",
		urls: {
			ad: "optimizedby.brealtime.com",
			css: "//cdn.cpxinteractive.com/slider/defs/0-0.css"
		},
		pid: 0,
		trid: 0,
		width: 728,
		height: 90,
		adTemplate: _adTemplate,
		debug: true,
		id: 1234567890,
		animationDuration: 500,
		animationDelay: 0,
		animationDirection: "left",
		animationEasing: "easeOutBack",
		toolbarPosition: "right",
		horizontalPosition: "left",
		verticalPosition: "center",
		close: {
			permanently: false,
			wTab: false
		},
		// TODO: Make the both of these work together i.e. dont show the slider until a user has hit the page three times, then only show the slider once after that, within the set time range
		freqLimit: 0,
		freqLimitTimeRange: 24,
		reverseFreqLimit: 0,
		reverseFreqLimitTimeRange: 24,
		displayOnMobile: 0,
		displayOnlyIfRoom: 1,
		margin: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	}
	var options = {};
	options = sliderJQ.extend(baseOptions, options);
	if(!window.sliderOptions) {
		window.sliderOptions = {};
	}
	options = sliderJQ.extend(baseOptions, sliderOptions);
	
	//set a session id
	options.sessionId = _getSessionId();
	
	// current time
	var time = new Date;
	options.time = time;
	
	_debug("Slider starting...");
	
	_debug("Slider options", options);
	
	// check browser/os
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};
	
	// functions
	function _registerEvent(json) {
		// TODO: switch on pid or trid
		var payload = {
			productKey: "slider",
			json: json
		};
		if(options.debug) {
			payload.json.debug = true;
		}
		payload.json.version = options.version;
		try {
			_debug("Registering Event", payload.json.action, JSON.stringify(payload));
			// TODO: make this dynamic based on prod or dev
			//sliderJQ.post("http://events.cpxi.com/event/create", JSON.stringify(payload));
		} catch(e) {
			_debug("REGISTER ERROR", e);
		}
	}
	
	function _getCookie(cookieName) {
		_debug("Getting cookie " + cookieName + "...")
		var cookie = sliderJQ.cookie(cookieName);
		if(!cookie) {
			_debug("setting cookie...");
			sliderJQ.cookie(
				cookieName, 
				JSON.stringify({
					timeStamp: options.time.getTime() + (options.freqLimitTimeRange*60000*60), 
					viewCount: 0
				}), 
				{expires: (options.freqLimitTimeRange/24), path: "/"}
			);
		}
		cookie = sliderJQ.cookie(cookieName);
		return JSON.parse(cookie);
	}
	
	function _checkFreqCap() {
		_debug("Checking Frequnency Cap...");
		if(parseInt(options.freqLimit)) {
			_debug("Frequency Cap is in place...");
			var cookie = _getCookie("sliderFreqCap" + options.id);
			if(time.getTime() <= cookie.timeStamp && cookie.viewCount < options.freqLimit) {
				sliderJQ.cookie("sliderFreqCap" + options.id, JSON.stringify({timeStamp: cookie.timeStamp, viewCount: cookie.viewCount + 1}), {expires: (options.freqLimitTimeRange/24), path: "/"});
				return true;
			} else if(time.getTime() >= cookie.timeStamp) {
				sliderJQ.removeCookie("sliderFreqCap" + options.id);
				return true;
			} else if(time.getTime() <= cookie.timeStamp && cookie.viewCount >= options.freqLimit) {
				_debug("Frequency Cap reached...");
				_registerEvent({
					id: options.id,
					pid: options.pid,
					trid: options.trid,
					sessionId: options.sessionId,
					action: "frequency cap reached"
				});
				return false;
			}
		} else {
			_debug("No Frequency Cap in place...");
			return true;
		}
	}
	
	function _checkReverseFreqCap() {
		_debug("Checking Reverse Frequency Cap...");
		if(parseInt(options.reverseFreqLimit)) {
			var cookie = _getCookie("sliderReverseFreqCap" + options.id);
			if(time.getTime() <= cookie.timeStamp && cookie.viewCount >= options.reverseFreqLimit) {
				return true;
			} else if(time.getTime() >= cookie.timeStamp) {
				sliderJQ.removeCookie("sliderReverseFreqCap" + options.id);
				return true;
			} else if(time.getTime() <= cookie.timeStamp && cookie.viewCount < options.reverseFreqLimit) {sliderJQ.cookie("sliderReverseFreqCap" + options.id, JSON.stringify({timeStamp: cookie.timeStamp, viewCount: cookie.viewCount + 1}), {expires: (options.reverseFreqLimitTimeRange/24), path: "/"});
				_registerEvent({
					id: options.id,
					pid: options.pid,
					trid: options.trid,
					sessionId: options.sessionId,
					action: "reverse frequency cap not reached"
				});
				return false;
			}
		} else {
			_debug("No Reverse Frequency Cap in place...");
			return true;
		}
	}
	
	function _checkCaps() {
		var freqCap = _checkFreqCap();
		var reverseFreqCap = _checkReverseFreqCap();
		if(freqCap && reverseFreqCap) {
			return true;
		} else {
			return false;
		}
	}
	
	function _checkScreenWidth() {
		if(top.window.innerWidth < parseInt(options.minScreenWidth)) {
			_registerEvent({
				id: options.id,
				pid: options.pid,
				trid: options.trid,
				sessionId: options.sessionId,
				action: "not displayed screen is too small"
			});
			return false;
		} else {
			return true;
		}
	}
	
	function _init() {
		_displayDebugConsole();
		_registerEvent({
			id: options.id,
			pid: options.pid,
			trid: options.trid,
			sessionId: options.sessionId,
			useragent: navigator.userAgent,
			action: "init"
		});
		var displayAd = true;
		if(options.live) {
			displayAd = _checkCaps();
		}
		_debug("checking for display on mobile...");
		if(!options.displayOnMobile) {
			_debug("don't display on mobile...");
			if(isMobile.any()) {
				_debug("mobile is true, hiding Slider...");
				displayAd = false;
				_registerEvent({
					id: options.id,
					pid: options.pid,
					trid: options.trid,
					sessionId: options.sessionId,
					action: "not displayed on mobile"
				});
			} else {
				_debug("mobile is false, showing Slider...");
			}
		}
		if(displayAd && parseInt(options.minScreenWidth) > 0 && !isMobile.any()) {
			displayAd = _checkScreenWidth();
			sliderJQ(top.window).on("resize", function() {
            	elm = options.elm;
            	if(options.inIframe) {
            		elm = options.parentElm;
            	}
	            if(!_checkScreenWidth()) {
	            	_debug("hiding Slider...");
	            	elm.hide();
	            } else {
	            	_debug("showing Slider...");
	            	elm.show();
	            }
			});
		}
		if(displayAd) {
			if(!window.slider) {
				window.slider = {};
			}
			window.slider[options.id] = {
				clearCookies: function() {
					sliderJQ.removeCookie("sliderFreqCap" + options.id);
					sliderJQ.removeCookie("sliderReverseFreqCap" + options.id);
				},
				options: options
			};
			sliderJQ(document).trigger("slider.load");
		}
	}
	
	function _displayDebugConsole(){
		//console.log(options);
		console.log(document.referrer);
		var htmlOptions = {
			title : "<h3>BRT Slider Debug Console</h3>",
			sliderVersion : "<p><b>Slider Version:</b> " + options.version + " </p>",
			sliderID : "<p><b>Slider ID:</b> " + options.id + " </p>",
			publisherID : "<p><b>Publisher ID:</b> " + options.pid + "</p>",
			cssURL: "<p><b>CSS URL:</b> <a href='" + options.urls.css + "'>" + options.urls.css + "</a></p>",
			adURL: "<p><b>Ad URL:</b> <a href='" + options.urls.ad + "'>" + options.urls.ad + "</a></p>",
			jqueryVersion: "<p><b>jQuery version</b> (loaded): " + jQuery.fn.jquery + "</p>"
		}

		if(window.location.href.indexOf("brt_console") > -1)
		{
			_debug('showing debug');
			var div = document.createElement('div');
			div.style.fontFamily = "sans-serif";
			div.style.fontSize = ".80em";
			div.style.background = "rgb(247, 248, 224)";
			div.style.border = "1px solid rgb(255, 204, 52)";
			div.style.zIndex = "99999999999999999";
			div.style.position = 'fixed';
			div.style.left = "0";
			div.style.top = "0";
			div.style.paddingLeft = "5px";
			div.style.width = "100%";
			div.innerHTML =  htmlOptions.title + htmlOptions.sliderVersion + htmlOptions.sliderID + htmlOptions.publisherID + htmlOptions.adURL + htmlOptions.cssURL + htmlOptions.jqueryVersion;
			div.setAttribute('class', 'note');
			document.body.appendChild(div);

		}

	}

	function _triggerAnimation() {
		sliderJQ(document).trigger("slider.animate.direction." + options.animationDirection);
	}
	
	function _getSliderCloseValue() {
		var navigationMod = 0;
		switch(options.toolbarPosition){
		case "top-right":
		case "top-left":
		case "bottom-right":
		case "bottom-left":
			navigationMod = parseInt(options.elm.find(".slider-navigation").height());
			break;
		case "right-top":
		case "right-bottom":
		case "left-top":
		case "left-bottom":
			navigationMod = parseInt(options.elm.find(".slider-navigation").width());
			break;
		}
		if(options.inIframe) {
			elm = options.parentElm;
		} else {
			elm = options.elm;
		}
		_debug("_getSliderCloseValue()", options.animationDirection);
		switch(options.animationDirection) {
		case "top":
			if(options.close.permanently || options.close.wTab) {
				return (elm.height() + parseInt(elm.css("margin-top")) + 10) * -1;
			} else {
				return (elm.height() + parseInt(elm.css("margin-top")) - navigationMod) * -1;
			}
			break;
		case "right":
			if(options.close.permanently || options.close.wTab) {
				return (elm.width() + parseInt(elm.css("margin-right")) + 10) * -1;
			} else {
				return (elm.width() + parseInt(elm.css("margin-right")) - navigationMod) * -1;
			}
			break;
		case "bottom":
			if(options.close.permanently || options.close.wTab) {
				return (elm.height() + parseInt(elm.css("margin-bottom")) + 10) * -1;
			} else {
				return (elm.height() + parseInt(elm.css("margin-bottom")) - navigationMod) * -1;
			}
			break;
		case "left":
			if(options.close.permanently || options.close.wTab) {
				return (elm.width() + parseInt(elm.css("margin-left")) + 10) * -1;
			} else {
				return (elm.width() + parseInt(elm.css("margin-left")) - navigationMod) * -1;
			}
			break;
		}
	}
	
	function _checkForSlider() {
		_debug("checking for Slider...");
		var timerID = null;
		if(!sliderJQ("#slider-" + options.id).size()) {
			_debug("Slider not available");
			clearTimeout(timerID);
			timerID = setTimeout(_checkForSlider, 100);
		} else {
			_debug("Slider is available", parseInt(sliderJQ("#slider-" + options.id).css("width")));
			options.elm = sliderJQ("#slider-" + options.id);
			options.sliderOpenValue = 0;
			_debug("Setting options.sliderClosedValue");
			options.sliderClosedValue = _getSliderCloseValue();
			_debug("options.sliderClosedValue", options.sliderClosedValue);
			_debug("binding events");
			options.elm.find(".slider-toggle a, .slider-tab-toggle a").on("click", function(e) {
				e.preventDefault();
				_debug("Slider Toggle Clicked...");
				options.animationDelay = 0;
				_triggerAnimation();
			});
			options.elm.find("iframe").load(function() {
				_debug("slider.iframe.loaded");
				sliderJQ(document).trigger("slider.loaded");
				_triggerAnimation();
			});
			if(options.positionTop != "0" || options.positionRight != "0" || options.positionBottom != "0" || options.positionLeft != "0") {
				elm = options.elm;
				if(options.inIframe) {
					elm = options.parentElm;
				}
				if(options.position.top != "0") {
					elm.css("top", options.position.top);
				}
				if(options.position.right != "0") {
					elm.css("right", options.position.right);
				}
				if(options.position.bottom != "0") {
					elm.css("bottom", options.position.bottom);
				}
				if(options.position.left != "0") {
					elm.css("left", options.position.left);
				}
			}
		}
	}
	
	function _centerSliderHorizontal() {
		_debug("_centerSliderHorizontal()");
    	var elm = options.elm;
    	var elmParent = options.parentElm;
    	var value;

		//This is when it is displayed on client site (via a DFP frame)
		if(options.inIframe) 
		{
			elmParent.css({width: '100%'});
			value = (elmParent.width() - elm.width())/2;
		}
		else
		{
			value = (window.innerWidth - elm.width())/2;
		}
       
       //set the left value
        elm.css({
			left: value
		});

	}
	
    function _centerSliderVertical() {
    	_debug("_centerSliderVertical()");
    	var elm = options.elm;
    	var value = (window.innerHeight / 2) - (elm.height() / 2);
		if(options.inIframe) {
			elm = options.parentElm;
			value = (top.window.innerHeight / 2) - (elm.height() / 2);
		}
        elm.css({
            top: value
        });
    }
	
	function _animateSlider(dir, amount) {
		_debug("_animateSlider()", dir, amount, "start");
		if(options.horizontalPosition == "center") {
			_centerSliderHorizontal();
		}
		if(options.verticalPosition == "center") {
			_centerSliderVertical();
		}
		var animationOptions = {};
		animationOptions[dir] = amount;
		var elm = options.elm;
		if(options.inIframe) {
			elm = options.parentElm;
			if(options.close.wTab) {
				var opts = {};
				switch(options.animationDirection) {
					case "top":
						opts["top"] = (options.elm.hasClass("open")) ? -49 : 0;
						break;
					case "right":
						opts["right"] = (options.elm.hasClass("open")) ? -57 : 0;
						break;
					case "bottom":
						opts["bottom"] = (options.elm.hasClass("open")) ? -49 : 0;						
						break;
					case "left":
						opts["left"] = (options.elm.hasClass("open")) ? -57 : 0;
						break;
				}

				options.elm.find(".slider-contents").animate(opts, "fast");
			}

			options.elm.css({
				margin: 0
			});
//			var cssOptions = {};
//			if(options.margin.top != "0") { cssOptions["margin-top"] = options.margin.top; }
//			if(options.margin.right != "0") { cssOptions["margin-right"] = options.margin.right; }
//			if(options.margin.bottom != "0") { cssOptions["margin-bottom"] = options.margin.bottom; }
//			if(options.margin.left != "0") { cssOptions["margin-left"] = options.margin.left; }
//			if(options.position.top != "0") { cssOptions["top"] = options.position.top; }
//			if(options.position.right != "0") { cssOptions["right"] = options.position.right; }
//			if(options.position.bottom != "0") { cssOptions["bottom"] = options.position.bottom; }
//			if(options.position.left != "0") { cssOptions["left"] = options.position.left; }
//			elm.css(cssOptions);
			
			elm.css({
				"margin-top": options.margin.top,
				"margin-right": options.margin.right,
				"margin-bottom": options.margin.bottom,
				"margin-left": options.margin.left,
				"top": 'auto',//options.position.top,
				"right": options.position.right,
				"bottom": -(baseOptions.height),
				"left": options.position.left
			});
		}
		elm
			.delay((options.elm.hasClass("closed")) ? options.animationDelay : 0)
			.animate(
				animationOptions, 
				options.animationDuration, 
				options.animationEasing, 
				function() {
					options.elm.toggleClass("closed").toggleClass("open");
					_registerEvent({
						id: options.id,
						pid: options.pid,
						trid: options.trid,
						sessionId: options.sessionId,
						action: (options.elm.hasClass("closed")) ? "closed" : "open"
					});
					_debug("_animateSlider()", "end");
				}
			);
	}
	
	function _animateSliderTab(dir, amount) {
		if(options.close.wTab) {
			var animationOptions = {};
			animationOptions[dir] = amount;
			options.elm.find(".slider-tab-toggle")
				//.delay(options.animationDelay)
				.animate(
					animationOptions, 
					options.animationDuration,
					"swing"
				);
		}
	}
	
	// bind events
	var loaded = false;
	sliderJQ(document).on("slider.load", function() {
		if(!loaded) {
			_debug("slider.load", "start");
			if(options.live){
				options.inIframe = (top.window == self.window) ? false : true;
			} else {
				options.inIframe = false;
			}
			_debug("In and IFrame?", options.inIframe, (top.window == self.window));
			if(options.inIframe) {
				options.parentElm = sliderJQ(top.document.getElementsByName(window.name));
			}
			// TODO: Fix Generator so it clears cache and we wont have to append a new cache buster when live
			var cssUrl = options.urls.css + "?" + (Math.floor(Math.random() * 1000) + 1);
			var template = sliderJQ(options.adTemplate);
			template.attr("id", "slider-" + options.id)
				.find(".slider-iframe iframe").attr("src", options.urls.ad).end()
				.find(".slider-navigation-logo img").attr("src", options.urls.logo)
			;
			sliderJQ("body")
				.append(template)
				.append("<link rel='stylesheet' type='text/css' href='" + cssUrl + "' />")
			_checkForSlider();
			_registerEvent({
				id: options.id,
				pid: options.pid,
				trid: options.trid,
				sessionId: options.sessionId,
				action: "load"
			});
			loaded = true;
			_debug("slider.load", "end");
		}
	});

	sliderJQ(document).on("slider.loaded", function() {
		_debug("slider.loaded", "start");
		options.elm.addClass("closed").css("visibility", "visible");
		if(options.inIframe) {
			options.elm.addClass("iframed");
			options.sliderClosedValue = _getSliderCloseValue();
			var css = {
				width: options.elm.width(), 
				height: options.elm.height(),
				position: "fixed",
				"z-index": 1234567890
			};
			css[options.verticalPosition] = "0px";
			css[options.horizontalPosition] = "0px";
			switch(options.animationDirection) {
				case "top":
					css["top"] = _getSliderCloseValue();
					css["bottom"] = "initial";
					break;
				case "right":
					css["right"] = _getSliderCloseValue();
					css["left"] = "initial";
					break;
				case "bottom":
					css["bottom"] = _getSliderCloseValue();
					css["top"] = "initial";
					break;
				case "left":
					css["left"] = _getSliderCloseValue();
					css["right"] = "initial";
					break;
			}
			_debug("css", css.width, css.height);
			options.parentElm.css(css);
		}
		if(options.horizontalPosition == "center") {
			sliderJQ(window).on("resize", function() {
	            _centerSliderHorizontal();
			});
		}
		if(options.verticalPosition == "center") {
			sliderJQ(window).on("resize", function() {
	            _centerSliderVertical();
			});
		}
		_registerEvent({
			id: options.id,
			pid: options.pid,
			trid: options.trid,
			sessionId: options.sessionId,
			action: "loaded"
		});
		_debug("slider.loaded", "end");
	});
	
	/*
	 * slider.animate.direction.top
	 */
	sliderJQ(document).on("slider.animate.direction.top", function() {
		_debug("slider.animate.direction.top", "start");
		_animateSlider("top", (options.elm.hasClass("closed")) ? options.sliderOpenValue : _getSliderCloseValue());
		_animateSliderTab("bottom", (options.elm.hasClass("closed")) ? 50 : options.elm.height() * -1); // TODO: Make these params
		_debug("slider.animate.direction.top", "end");
	});
	
	/*
	 * slider.animate.direction.right
	 */
	sliderJQ(document).on("slider.animate.direction.right", function() {
		_debug("slider.animate.direction.right", "start");
		_animateSlider("right", (options.elm.hasClass("closed")) ? options.sliderOpenValue : _getSliderCloseValue());
		_animateSliderTab("left", (options.elm.hasClass("closed")) ? options.elm.width() : -50); // TODO: Make these params
		_debug("slider.animate.direction.right", "end");
	});
	
	/*
	 * slider.animate.direction.bottom
	 */
	sliderJQ(document).on("slider.animate.direction.bottom", function() {
		_debug("slider.animate.direction.bottom", "start");
		_animateSlider("bottom", (options.elm.hasClass("closed")) ? options.sliderOpenValue : _getSliderCloseValue());
		_animateSliderTab("top", (options.elm.hasClass("closed")) ? options.elm.height() : -49); // TODO: Make these params
		_debug("slider.animate.direction.bottom", "end");
	});
	
	/*
	 * slider.animate.direction.left 
	 */
	sliderJQ(document).on("slider.animate.direction.left", function() {
		_debug("slider.animate.direction.left", "start");
		_animateSlider("left", (options.elm.hasClass("closed")) ? options.sliderOpenValue : _getSliderCloseValue());
		_animateSliderTab("right", (options.elm.hasClass("closed")) ? -57 : (options.inIframe) ? (options.elm.width() - 57) * -1 : options.elm.width() * -1); // TODO: Make these params
		_debug("slider.animate.direction.left", "end");
	});
	sliderJQ(document).on("slider.open", function() {
		sliderJQ(document).trigger("slider.animate.direction." + options.animationDirection);
	});
	sliderJQ(document).on("slider.close", function() {
		sliderJQ(document).trigger("slider.animate.direction." + options.animationDirection);
	});
	
	// start the party

	/*
	 * scrolling distance check
	 */
	if(options.scrollingDistance) {
		_debug("scrollingDistance set...");
		options.currentWindowHeight = sliderJQ(window).height();
		options.currentScrollingDistance = 0;
		options.targetScrollingDistance = options.currentWindowHeight * options.scrollingDistance;
		options.shown = false;
		sliderJQ(document).trigger("slider.scrollingdistanceset");
		sliderJQ(window).on("scroll", function(e) {
			_debug("window scrolling...", sliderJQ(window).scrollTop(), options.targetScrollingDistance);
			if(!options.shown && sliderJQ(window).scrollTop() >= options.targetScrollingDistance) {
				_debug("Target Scrolling Distance achieved...");
				// sliderJQ(window).unbind("scroll");
				options.shown = true;
				_init();
			}
		});
		_debug("targetScrollingDistance", options.targetScrollingDistance);
	} else {
		_init();
	}
	
}();
