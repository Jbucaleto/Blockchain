const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, region, section, voterID, timestamp, data, previousHash = ''){
        this.index = index;
        this.region = region;
        this.section = section;
        this.voterID = voterID;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.region + this.section + this.voterID + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock(){
        return new Block(0, 0, 0, 0, "10/07/2018", "Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return "- No. because index " + i + " is not valid.\r\nBlock was not created."
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return "- No. because index " + i + " is not valid.\r\nBlock was not created."
            }
        }
        
        return "- Block is valid. \r\nA new Block has been created."
    }
}

let voteblock = new Blockchain();
voteblock.addBlock(new Block(1, "CWB", "090", "075139147", "10/07/2018 - 08:10", {candidate: '01'}));
voteblock.addBlock(new Block(2, "RNP", "087", "052437139", "10/07/2018 - 09:30", {candidate: '02'}));

voteblock.chain[2].timestamp = "10/007/2018 - 09:30";

console.log(JSON.stringify(voteblock, null, 4));

console.log('Is blockchain is valid?\r\n' + voteblock.isChainValid())