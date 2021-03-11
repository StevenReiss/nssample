var observableModule = require("tns-core-modules/data/observable");
var frameModule = require('ui/frame');

function getResults(keys)
{
  console.log("GET RESULTS " + keys);
  let prslt = fetch("http://bdognom-v2.cs.brown.edu:7778/jsonquery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songtitle: keys })
  })
    .then((r) => { console.log("GOT: " + r); return r; })
    .then((r) => r.json())
    .then((resp) => { console.log("RESP: " + resp.length + " " + resp[0]); return resp; })
    .then((resp) => showCDS(resp,keys))
    .catch((e) => console.log("error" + e));
  prslt = null;
  return prslt;
}


function showCDS(cddata,keys)
{ 
  frameModule.Frame.topmost().navigate({
    moduleName: "views/cdlist/cdlist-page",
    context: { cddata: cddata, title: keys }
  } );
}


function HomeViewModel()
{
  var viewModel = observableModule.fromObject({
    onButtonTap: function () {
      getResults(this.textFieldValue);
    },

    textFieldValue: "",
  });

  return viewModel;
}

module.exports = HomeViewModel;
