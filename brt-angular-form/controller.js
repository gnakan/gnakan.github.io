angular.module('app').controller("MainController", function(){
	var vm = this;
	vm.ads = [
		{
			title: "WWE 160x320",
			type: "Slider",
			placementID: "83748374",
			published: true
		},
		{
			title: "Trulia Home 500x250",
			type: "In-Image",
			placementID: "639633",
			published: true
		},
		{
			title: "Google Labs 500x500",
			type: "Holographic",
			placementID: "2387232",
			published: false
		}

	];

	vm.new = {};
	vm.createAd = function(){
		vm.ads.push(vm.new);
		vm.new = {};
	}
});