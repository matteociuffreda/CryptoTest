var sha256 = require('crypto-js/sha256');

class Block{
	constructor(index, data, prev_hash)
	{
		this.index = index;
		this.time = Date.now();
		this.data = data;
		this.prev_hash = prev_hash;
		this.hash = this.calculateHash();
	}
	
	calculateHash() {
		return sha256(this.index + this.time + this.data + this.prev_hash).toString();
	}
}

class Blockchain{
	constructor()
	{
		this.chain = [];
	}
	
	addBlock(block) {
    block.calculateHash();
		this.chain.push(block);
	}
	
	prevHash() {
		return this.chain[this.chain.length-1].hash;
	}
}

var Coin = new Blockchain;
Coin.addBlock(new Block(0, "Hello World", "0"));
Coin.addBlock(new Block(1, "Second Block", Coin.prevHash()));
console.log(JSON.stringify(Coin, 0, 32));