var observableModule = require("tns-core-modules/data/observable");

function TracksViewModel(ttl,tracks) {
	var viewModel = observableModule.fromObject({
		cdtitle: ttl,
		tracks: tracks
	});

	return viewModel;
}

module.exports = TracksViewModel;
