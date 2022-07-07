var sha256 = require('crypto-js/sha256');

class Block{
	constructor(index, data, prev_hash)
	{
		this.index = index;
		this.time = Date.now();
		this.data = data;
		this.prev_hash = prev_hash;
		this.hash = this.calculateHash();
    this.nonce = 0;
	}
	
	calculateHash(nonce) {
		return sha256(this.index + this.time + this.data + this.prev_hash + nonce).toString();
	}

  mine() {
    for(let i = 0; i < 1000000; i++)
    {
      if(this.calculateHash(i).startsWith("0000"))
      {
        this.nonce = i;
        console.log("Block mined at nonce", i);
        this.hash = this.calculateHash(i);
        break;
      }
      else {
      }
    }
    return this.calculateHash(this.nonce);
  }
}

class Blockchain{
	constructor()
	{
		this.chain = [];
	}
  
	addBlock(block) {
    block.mine();
		this.chain.push(block);
	}
	
	prevHash() {
		return this.chain[this.chain.length-1].hash;
	}
}

var Coin = new Blockchain;
Coin.addBlock(new Block(0, "Ciao Mondo!", "0"));
Coin.addBlock(new Block(1, "Second Block", Coin.prevHash()));
console.log(JSON.stringify(Coin, 0, 32));
