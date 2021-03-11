var observableModule = require("tns-core-modules/data/observable");
var frameModule = require('ui/frame');

function CdlistViewModel(title, cds) {
	var viewModel = observableModule.fromObject({
		cds: cds,
		songtitle: title,

		onItemTap: function (args) {
			let cd = this.cds[args.index];
			frameModule.Frame.topmost().navigate({
				moduleName: "views/tracks/tracks-page",
				context: { tracks: cd.tracks, cdtitle: cd.title }
			});
		},

	});

	return viewModel;
}

module.exports = CdlistViewModel;
