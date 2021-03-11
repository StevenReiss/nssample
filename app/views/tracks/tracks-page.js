var frameModule = require("tns-core-modules/ui/frame");
var TracksViewModel = require("./tracks-view-model");

function pageLoaded(args) {
	let page = args.object;
	let title = page.navigationContext.cdtitle;
	let tracks = page.navigationContext.tracks;
	let tracksViewModel = new TracksViewModel(title, tracks);
	page.bindingContext = tracksViewModel;
}

exports.pageLoaded = pageLoaded;
