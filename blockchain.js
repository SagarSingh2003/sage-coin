const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index , timestamp , data , previousHash = " "){
            this.index = index;
            this.timestamp = timestamp;
            this.data = data;
            this.previousHash = previousHash;
            this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()                
    }

}

class Blockchain{

    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0 , "26/11/2024" , "Genesis Block Data" , "0")
    }

    insertNewBlock(data){
        const block = new Block(this.chain.length , String(new Date) , data , this.chain[this.chain.length - 1].hash);
        this.chain.push( block)     
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    isChainValid(){
        let prevHash = null;
        
        for(let i = 1 ; i <= this.chain.length - 1 ; i++){
            
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }
            
            if(currBlock.previousHash !== prevBlock.hash ){
                return false;
            }

            prevHash = this.chain.previousHash;
        }

        return true;
    }

}

const sagecoin = new Blockchain();
sagecoin.insertNewBlock({ amount : "20$" , from : "sagar" , to:"diptilal"})
sagecoin.insertNewBlock({ amount : "20$" , from : "diptilal" , to:"masadur"})

console.log(sagecoin.isChainValid());

sagecoin.chain[1].data = { amount : "20$" , from : "sagar" , to:"subhrodip"};

console.log(sagecoin.isChainValid());

console.log(JSON.stringify(sagecoin , null , 4))