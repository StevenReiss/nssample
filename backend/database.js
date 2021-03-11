/********************************************************************************/
/*										*/
/*		database.js							*/
/*										*/
/*	Database query methods							*/
/*										*/
/********************************************************************************/



/********************************************************************************/
/*										*/
/*	Constants								*/
/*										*/
/********************************************************************************/

const DB_URL = 'mongodb://bdognom-v2.cs.brown.edu';
const DB_NAME = 'cdquery';


/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');




/********************************************************************************/
/*										*/
/*	Initializations 							*/
/*										*/
/********************************************************************************/

const client = new MongoClient(DB_URL,{ useUnifiedTopology: true } );

let db = null;
client.connect(function(err) {
		  assert.equal(null,err);
		  console.log("Connected successfully to server");
		  db = client.db(DB_NAME);
		} );



/********************************************************************************/
/*										*/
/*	Query function								*/
/*										*/
/********************************************************************************/

function nosql(wds,next)
{
   const collection = db.collection('cds');
   let rslt = [];

// let x = collection.find( { $text : { $search: wds } } ).limit(500)
//    .toArray((err,itms) => process(err,itms,next) );

   let x = collection.find( { $text : { $search: wds } } ).limit(1000)
      .forEach((d) => { addRelevant(rslt,wds,d); },(err) => { process(err,rslt,next) } );
}


function addRelevant(rslt,wds,d)
{
   wds = wds.replace('"','').replace('"','');
   wds = wds.toLowerCase().trim();

   let fnd = false;
   for (let t of d.tracks) {
      if (t.name == null) continue;
      let ttl = t.name.toLowerCase();
      if (ttl.includes(wds)) {
	 fnd = true;
	 break;
       }
    }
   if (fnd) rslt.push(d);
}



function process(err,itms,next)
{
   if (next != null) next(err,itms);
}



/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.nosql = nosql;



/* end of database.js */




















































































































































































