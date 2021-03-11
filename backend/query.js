/********************************************************************************/
/*										*/
/*		query.js							*/
/*										*/
/*	Code to handle queries for cd database					*/
/*										*/
/********************************************************************************/


/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

const database = require("./database.js");



/********************************************************************************/
/*										*/
/*	Query handler								*/
/*										*/
/********************************************************************************/

function handleQuery(req,res)
{
   let qr = buildQuery(req);

   database.nosql(qr.ttl,function(e1,d1) { handleQuery1(req,res,e1,d1); } );
}



function handleQuery1(req,res,err,data)
{
   let json = JSON.stringify(data.rows);

   let rdata = { title: "CDQUERY Results",
		 json : json,
		 count: data.rows.length,
		 disks : data.rows };

   res.render('results',rdata);
}



/********************************************************************************/
/*										*/
/*	Json query handler							*/
/*										*/
/********************************************************************************/

function handleJsonQuery(req,res)
{
   let qr = buildQuery(req);

   database.nosql(qr.ttl,function(e1,d1) { handleJsonQuery1(req,res,e1,d1); } );
}



function handleJsonQuery1(req,res,err,data)
{
   let json = JSON.stringify(data);

   console.log("DBO ",json);

   res.end(json);
}



/********************************************************************************/
/*										*/
/*	Build song title query							*/
/*										*/
/********************************************************************************/

function buildQuery(req)
{
   let prms = req.body;
   let keywds = prms.songtitle;
   if (keywds == undefined || keywds == null) keywds = req.query.songtitle;
   let keys = keywds.toLowerCase();
   let keyarr = keys.split(/[ \t,;]+/);

   let q = "SELECT DISTINCT D.title,A.name AS artist,D.length,D.genre,D.year,D.id " +
	   "FROM Disk D,Artist A,Track T";
   for (let i = 0; i < keyarr.length; ++i) {
      let j = i+1;
      q += " , Words W" + j;
    }
   q += " WHERE D.artistid = A.id ";
   q += " AND T.diskid = D.id ";
   for (i = 0; i < keyarr.length; ++i) {
      let j1 = i+1;
      q += " AND W" + j1 + ".word = $" + j1 +
	 " AND W" + j1 + ".type = 'N'" +
	 " AND W" + j1 + ".id = T.id";
    }

   return { query: q, keys: keyarr, ttl: `"${keys}"` };
}



/********************************************************************************/
/*										*/
/*	Handle show single disk 						*/
/*										*/
/********************************************************************************/

function handleShow(req,res)
{
   let diskid = req.params.diskid;

   let q = "SELECT D.title,A.name as artist,D.length,D.genre,D.year " +
	   "FROM Disk D, Artist A " +
	   "WHERE D.id = $1 AND A.id = D.artistid";
   database.query(q,[diskid],function (e1,d1) { handleShow1(req,res,e1,d1); } );
}



function handleShow1(req,res,err,data)
{
   let rdata = { title: "Single Query Result",
		 disktitle: data.rows[0].title,
		 diskartist: data.rows[0].artist,
		 disklength: data.rows[0].length,
		 diskgenre: data.rows[0].genre,
		 diskyear: data.rows[0].year };

   let q = "SELECT T.name,A.name as artist,T.length,T.number " +
	   " FROM Track T,Artist A " +
	   " WHERE T.diskid = $1 AND T.artistid = A.id";

   database.query(q,[req.params.diskid],function(e1,d1) { handleShow2(req,res,rdata,e1,d1); });
}



function handleShow2(req,res,rdata,err,data)
{
   rdata.tracks = data.rows;

   res.render('single',rdata);
}




/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.handleQuery = handleQuery;
exports.handleJsonQuery = handleJsonQuery;
exports.handleShow = handleShow;




/* end of query.js */
