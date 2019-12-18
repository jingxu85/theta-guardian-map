var express = require("express");
var router = express.Router();
var fs = require('fs');
var Reader = require('@maxmind/geoip2-node').Reader;

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
		if (this.nList.length > 100) {
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
			console.log("xj3 k is " + k.toString())
			console.log("xj3 v is " + JSON.stringify(this.nMap[k]))
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
	if (req.body.ip == "73.162.68.245") {// for developping
		for (k in req.body) {
			console.log("xj1 k is " + k.toString())
			console.log("xj1 v is " + req.body[k].toString())
		}	
	}
	newNode = new Node(req.body);
	router.map1.addNode(newNode);
	router.map2.addNode(newNode);
	res.send("got it");
});

router.post("/get", function(req, res, next) {
	var toReturn = null;
	if (router.useOne) {
		toReturn = router.map1.map;
	} else {
		toReturn = router.map2.map;
	}
	for (k in toReturn) {
		console.log("xj2 k is " + k.toString())
		console.log("xj2 v is " + JSON.stringify(toReturn[k]))
	}

	res.json(toReturn);
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
