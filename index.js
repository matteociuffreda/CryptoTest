var sha256 = require('crypto-js/sha256');

class Transaction{
  constructor(sender, reciver, amount)
  {
    this.sender = sender;
    this.reciver = reciver;
    this.amount = amount;
  }
}

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
Coin.addBlock(new Block(0, "Hello world!", "0"));
Coin.addBlock(new Block(1, {
  Transaction_1 : new Transaction("Alice", "Bob", 2), 
  Transaction_2 : new Transaction("Bob", "John", 1)
}, Coin.prevHash()));

console.log(JSON.stringify(Coin, 0, 32));
