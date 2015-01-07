var AdUnit = Class({
	type: function(type){
		if(typeof type === 'undefined')
		{
			return this._type;
		}
		else
		{
			this._type = type;
			return true;
		}
	},
	version: function(version){
		if(typeof version === 'undefined')
		{
			return this._version;
		}
		else
		{
			this._version = version;
			return true;
		}
	},
	id: function(id){
		if(typeof id === 'undefined')
		{
			return this._id;
		}
		else
		{
			this._id = id;
			return true;
		}
	},
	all:function(type, version, id){
		if(typeof version === 'undefined' || typeof id === 'undefined' || typeof type === 'undefined')
		{
			return [this._type, this._version, this._id];
		}
		else
		{
			this.type(type);
			this.version(version);
			this.id(id);
		}
	}
})


var DiagnosticLayer = Class({

	console:{
		show:function(options){
			var htmlOptions = {
				title : "<h3>BRT Slider Debug Console</h3>",
				adType : "<p><b>Ad Type:</b> " + options[0] + " </p>",
				adVersion : "<p><b>Ad Version:</b> " + options[1] + " </p>",
				adID : "<p><b>Ad ID:</b> " + options[2] + " </p>",
				jqueryVersion: "<p><b>jQuery version</b> (loaded): " + jQuery.fn.jquery + "</p>"
			}

			if(window.location.href.indexOf("brt_console") > -1)
			{
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
				div.innerHTML =  htmlOptions.title + htmlOptions.adType + htmlOptions.adVersion + htmlOptions.adID + htmlOptions.jqueryVersion;
				div.setAttribute('class', 'note');
				document.body.appendChild(div);
			}
			return true;
		}
	}
});


var Ad = Class({}).mixin(AdUnit,DiagnosticLayer);

var slider1 = new Ad();
slider1.all("slider", 26.1, 13433);

slider1.console.show(slider1.all());
