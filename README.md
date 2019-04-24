# Blockchain-node-js
Overall scripts for Blockchain and Smart Contract work.

These 3 scripts are an essay on how to embedded the Blockchain technology into an eletronic ballot box.

VoteRegister.js -> This is a simple script validating the hash of the current data + previous hash from previous block.

VoteValidation.js -> Use the same logic from VoteRegister.js, where the current hash will be: the current data + voterID + previous hash

votePoW.js -> This script use the proof-of-work to mine the blocks on the entire process of the counting the votes. Change the number of the difficulty of the process (line 41) for less (2, i.e) in case to show a rapid process or increase the difficulty (4, i.e) in fact to see how the process will be delayed more than the first process.
