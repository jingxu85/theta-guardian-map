var express = require("express");
var router = express.Router();
var fs = require('fs');
var Reader = require('@maxmind/geoip2-node').Reader;

class Node {
	constructor(body) {
		this._visited = 0
		this._id = body.id
		if (body.peers) {
			this._peer=body.peers
		} else {
			this._peer={}
		}
		if (body.ip) {
			this._ip=body.ip
		} else {
			this._ip=""
		}

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
}

class NodeMap {
	constructor(){
		this.clear()
	}
	
	addNode(node){
		if (this.nList.length > 100) {
			amount++
			return
		}
		if (this.nMap[node.id] === undefined) {
			this.nList.push(node)
			amount++
		}
		else {
			//update node connections
			oldNode = this.nMap[node.id]
			for (key in oldNode.peer) {
				if (node[key] === undefined) {
					this.nMap[key].peers[node.id] = null
				}
			}
		}
		this.nMap[node.id] = node
		// TODO: build node connections
		for (key in node.peer) {
			if (this.nMap[key] === undefined) {
				this.nMap[key] = new Node({id: key})
			}
			this.nMap[key].addpeer(node.id)
		}
	}

	clear(){
		this.nList = []
		this.nMap = {}
		this.amount = 0
	}
}

router.post("/set", function(req, res, next) {
	for (k in req.body) {
		console.log("xj1 k is " + k.toString())
		console.log("xj2 v is " + req.body[k].toString())
	}
	console.log("xj3 req.body.back is " + req.body.back)
	newNode = new Node(req.body)
	this.map1.addNode(newNode)
	this.map2.addNode(newNode)
	res.send("got it");
});

router.post("/get", function(req, res, next) {
	// for (k in req.body) {
	// 	console.log("xj1 k is " + k.toString())
	// 	console.log("xj2 v is " + req.body[k].toString())
	// }
	// console.log("xj3 req.body.back is " + req.body.back)
	// TODO:
	res.json({answer: 'take this'});
});

router.switchMap = function(){
	if (this.useOne) {
		this.map1.clear()
	} else {
		this.map2.clear()
	}
	this.useOne = !this.useOne
}

router.init = function() {
	this.map1 = new NodeMap();
	this.map2 = new NodeMap();
	this.useOne = true
	setInterval(this.switchMap(), 3600000)//start switching
}

module.exports = router;
