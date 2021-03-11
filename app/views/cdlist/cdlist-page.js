var frameModule = require("tns-core-modules/ui/frame");
var CdlistViewModel = require("./cdlist-view-model");


function pageLoaded(args) {
	let page = args.object;
	let title = page.navigationContext.title;
	let cds = page.navigationContext.cddata;
	let cdlistViewModel = new CdlistViewModel(title, cds);
	page.bindingContext = cdlistViewModel;
}

exports.pageLoaded = pageLoaded;
