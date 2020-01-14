var express = require("express");
var router = express.Router();
var fs = require('fs');
var Reader = require('@maxmind/geoip2-node').Reader;
var mongoDB = require('../db/mongodbDriver');

const db_file_path="./db/GeoIP2-City.mmdb";
var geo2Ip = null;

class Node {
	constructor(body) {
		this._visited = 0;
		this._id = body.id;
		if (body.peers) {//TODO: change
			if (Array.isArray(body.peers[0])) {
				this._peer=body.peers[0];
			}
			else {
				this._peer=body.peers
			}
		} else {
			this._peer=[];
		}
		if (body.ip) {
			this._ip=body.ip;
			try {
				var geoInfo = null;
				geoInfo = geo2Ip.city(body.ip);
				if (geoInfo != null){
					this._city = geoInfo["city"]["names"]["en"];
					this._country = geoInfo["country"]["names"]["en"];
					this._latitude = geoInfo["location"]["latitude"];
					this._longitude = geoInfo["location"]["longitude"];
				}
				if (this._city === "San Jose"){
					console.log("geoInfo is " + JSON.stringify(geoInfo));
					console.log("city is " + this._city + " country is " + this._country + " latitude is " + this._latitude + " longtitude is " + this._longitude);	
				}
			} catch (err) {
				console.log("GEO Error - failed to get the geoInfo for " + body.ip + ", " + err);
			}
		} else {
			this._ip="";
		}
		this._address = body.address
		this._chain_id = body.chain_id
		this._syncing = body.syncing
		this._lastheight = body.LatestFinalizedBlockHeight
		this._version = body.version
		this._git_hash = body.git_hash
	}

	get id() {
		return this._id;
	}
  
	get ip() {
		return this._ip;
	}

	get city() {
		return this._city;
	}

	get peers() {
		return this._peer;
	}

	addpeer (peer) {
		this._peer[peer] = true
	}

	set visited(i) {
		this._visited = 1
	}

	get visited() {
		return this._visited;
	}
	
	get nodejson() {
		return null;
	}
}

class NodeMap {
	constructor(){
		this.clear();
	}
	
	addNode(node){
		if (this.nList.length > 500) {
			this.amount++;
			return;
		}
		var oldNode = this.nMap[node.id]
		if (oldNode === undefined) {
			this.nList.push(node);
			this.amount++;
		} else {
			//update node connections
			for (key in oldNode.peer) {
				if (node[key] === undefined) {
					this.nMap[key].peers[node.id] = undefined;
				}
			}
		}
		this.nMap[node.id] = node;
		// TODO: build node connections
		for (key in node.peer) {
			if (this.nMap[key] === undefined) {
				this.nMap[key] = new Node({id: key});
			}
			this.nMap[key].addpeer(node.id);
		}
	}

	get map() {
		var nodes = [], k = ""
		for (k in this.nMap) {
			nodes.push({Peer: k, Details: this.nMap[k]})
		}
		return {Nodes : nodes};
	}

	clear(){
		this.nList = [];
		this.nMap = {};
		this.amount = 0;
	}
}

router.post("/set", function(req, res, next) {
	newNode = new Node(req.body);
	mongoDB.updateNode(newNode);
	router.map1.addNode(newNode);
	router.map2.addNode(newNode);
	res.send("got it");
});

router.post("/get", function(req, res, next) {
	var toReturn = null, dbResult = {}, testDB2 = {};
	if (router.useOne) {
		toReturn = router.map1.map;
	} else {
		toReturn = router.map2.map;
	}
	// for (k in dbResult) {
	// 	console.log("xj2 k is " + k.toString())
	// 	console.log("xj2 v is " + JSON.stringify(testDB2[k]))
	// }
	res.json(toReturn);
});

router.post("/testdb", async function(req, res, next) {
	var dbPromise = mongoDB.getNodesByPage(req.body.page, req.body.amount);
	console.log("xj6 request body is ", req.body);
	await dbPromise.then(function(value, error) {
		if (error) {
			console.log("failed to get value", error);
			res.json(error);
		} else {
			res.json(value);
		}
	});
});

router.init = function() {
	this.map1 = new NodeMap();
	this.map2 = new NodeMap();
	this.useOne = true;
	setInterval(switchMap, 3600000);
	//start switching every hour
	console.log('initializing geoip2 ip2geo db - ' + db_file_path);
    const dbBuffer = fs.readFileSync(db_file_path);
    geo2Ip = Reader.openBuffer(dbBuffer);
	console.log('initializing geoip2 ip2geo db initialized ');
};

switchMap = function(){
	if (router.useOne) {
		router.map1.clear();
	} else {
		router.map2.clear();
	}
	router.useOne = !router.useOne;
};

module.exports = router;
