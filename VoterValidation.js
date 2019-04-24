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
        ///--
        this.hashvoter = this.calculateVoters();
    }

    calculateHash(){
        //return SHA256(this.index + this.previousHash + this.region + this.section + this.voterID + this.timestamp + JSON.stringify(this.data)).toString();
        return SHA256(this.index + this.previousHash + this.region + this.section + this.voterID + this.timestamp + JSON.stringify(this.data) + this.hashvoter).toString();
    }

    ////-> New
    calculateVoters(){
        return SHA256(this.region + this.section + this.voterID).toString();
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

    ////--> New
    addBlockVoter(newVoter){
        newVoter.hashvoter = newVoter.calculateVoters();
        this.chain.push(newVoter);
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

    // isVoterValid(){
    //     for(let i = 1; i< this.chain.length; i++){
    //         const HashVoters = this.chain[i];
    //         //const HashVotersII = this.filter( Block => Voters.includes(Block.hashvoter));

    //         console.log('Valid voter: ' + HashVoters.calculateVoters());
    //         //console.log('Hash Voter: ' + HashVoters.filter( HashVoters.hashvoter , blockvoter.Voters.includes(HashVoters.hashvoter)));
    //         console.log(JSON.stringify(blockvoter, null,4));

    //     }

    // }


}

//////--- New
class Voters{
    constructor(region, section, voterID){
        this.region = region;
        this.section = section;
        this.voterID = voterID;
        this.hash = this.checkingVoters();
    }
    checkingVoters(){
        return SHA256(this.region + this.section + this.voterID).toString();
    }
}
/////-- Build a class for Voters only.
class BlockchainVoters{
    constructor(){
         this.chainV = [this.createGenesisVoter()]
    }

    createGenesisVoter(){
        return new Voters("ANY", "ANY","0");
    }

    /////////-- New
    checkVoter(VoterBlock){
        VoterBlock.hash = VoterBlock.checkingVoters();
        this.chainV.push(VoterBlock);
    }

    // getLatestVoter(){
    //     return this.chainV[this.chainV.length -1];
    // }

    // addBlockVoter(newVoter){
    //     newVoter.previousHash = this.getLatestBlock().hash;
    //     newVoter.hash = newVoter.calculateHash();
    //     this.chain.push(newVoter);
    // }
    
}

let voteblock = new Blockchain();
voteblock.addBlock(new Block(1, "CWB", "090", "075139147", "10/07/2018 - 08:10", {candidate: '01'}));
voteblock.addBlock(new Block(2, "RNP", "087", "052437139", "10/07/2018 - 09:30", {candidate: '02'}));
voteblock.addBlock(new Block(3, "CWB", "087", "000139973", "10/07/2018 - 09:35", {candidate: '01'}));

//voteblock.addBlockVoter(new Block("CWB","090","075139147"));

//voteblock.chain[2].data = {candidate: "01"}

console.log(JSON.stringify(voteblock, null, 4));

console.log('Is blockchain is valid?\r\n' + voteblock.isChainValid());

//////-- New
let blockvoter = new BlockchainVoters();
blockvoter.checkVoter(new Voters("CWB","090","075139147"));
blockvoter.checkVoter(new Voters("RNP","087","052437139"));

//console.log(voteblock.addBlockVoter());


// function isVoterValid(){
//     for(let i = 1; i< voteblock.chain.length; i++){
//         const HashVoters = voteblock.chain[i];
//         const HashVotersII = blockvoter.chainV[i];
//         //const HashVotersII = this.filter( Block => Voters.includes(Block.hashvoter));

//         console.log('Valid voter: ' + HashVoters.calculateVoters());
//         //console.log('Hash Voter: ' , HashVoters.filter( HashVoters.hashvoter => blockvoter.Voters.includes(HashVoters.hashvoter)));
//         //console.log(JSON.stringify(blockvoter, null,4));

//         if(HashVoters.hashvoter !== HashVotersII.checkingVoters()){
//             return "- No. because index " + i + " is not valid.\r\nBlock was not created."
//         }

//         // if(currentBlock.previousHash !== previousBlock.hash){
//         //     return "- No. because index " + i + " is not valid.\r\nBlock was not created."
//         // }
//     }



// }
// isVoterValid();
//console.log(JSON.stringify(blockvoter, null,4));
