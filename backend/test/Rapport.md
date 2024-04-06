TEST
    Deployment 3 contracts
    
      RealDiplomaToken Deployment
      
        ✔ should revert because not the owner
        ✔ should get _totalSupply
      DiplomaFile Deployment
        ✔ price should be equal to variable price
      DiplomaNFT Deployment
        ✔ name should be equal to RealDiplomaNFT
    Phase 1 : BecomeVoter & CreateFile
      Function becomeAVoter
        ✔ should revert cause of Allowance
        ✔ should revert cause of nonUser2 has no token
        ✔ should revert cause already a voter
        ✔ should revert cause too small amount
        ✔ should add one Deposit to Deposits
        ✔ should add one Deposit with the good parameters
        ✔ should set the mapping mapVoters
        ✔ should emit : CreateNewDepositEvent
        ✔ should emit : BecomeAVoter
      Function createCase
        ✔ should revert cause nonUser1 has no allowance
        ✔ should revert cause of nonUser2 has priceHT token, not enough to pay the fees
        ✔ should revert because Nonuser2 has no token
        ✔ should set mapping CaseToDeposit
        ✔ should set mapping CaseToDiploma
        ✔ should add one Deposit to Deposits
        ✔ should add one Deposit with the good parameters
        ✔ should add one Diploma to Diplomas
        ✔ should add one Diploma with the good parameters
        ✔ should add one Case to Cases
        ✔ should send the fees to the daoAddress
        ✔ should add one Case with the good parameters
        ✔ should emit 3 events : CreateNewDiplomaEvent, CreateNewDepositEvent, CreateNewFileEvent  (50ms)
    Phase 2 : SimpleResolve - DisputeCase - getDispute
      Function simpleResolve
        ✔ should revert because the index does not exist in Cases - 1st require
        ✔ should revert because the delay is not past yet
        ✔ should revert because the case is not pending (3013ms)
        ✔ should revert because user1 is not the owner of the deposit (3009ms)
        ✔ should set the deposit of the case to 0 (3016ms)
        ✔ should set status to validated (3035ms)
        ✔ should emit CloseDepositEvent  (3014ms)
        ✔ should emit : SimpleResolve  (3009ms)
      Function disputeCase
        ✔ should revert because the index does not exist in Cases - 1st require
        ✔ should revert because the delay has past (3011ms)
        ✔ should revert because the case is already disputed
        ✔ should revert cause of Allowance
        ✔ should revert cause of user2 has no token
        ✔ should add one Deposit to Deposits
        ✔ should add one Deposit with the good parameters
        ✔ should set the mapping DisputeToDiploma
        ✔ should add one Dispute to Disputes
        ✔ should add one Dispute with the good parameters
        ✔ should set the status of the case to disputed
        ✔ should send the fees to the daoAddress
        ✔ should emit CreateNewDepositEvent
        ✔ should emit CreateNewDisputeEvent
      Function mintDiploma
        ✔ should revert because the index does not exist in Cases 
        ✔ should revert because the diploma is your own (3023ms)
        ✔ should revert because the diploma is not validated (3023ms)
        ✔ should revert because the diploma is already minted (3077ms)
        ✔ should create a NFT with the good parameters (3057ms)
        ✔ should mint the NFT to user0 (3055ms)
        ✔ should emit MintNFTEvent (3048ms)
      Function getDispute
        ✔ should retrun the Dispute 
      Function getDisputes
        ✔ should retrun the array of Disputes
    Phase 3 : setVote - getVotes & getVote 
      Function setVote
        ✔ should revert because the index does not exist in Votes
        ✔ should revert because nonUser1 is not a voter
        ✔ should revert because the vote was started before voter3 became a voter
        ✔ should revert because the vote is close (5014ms)
        ✔ should revert because already voted 
        ✔ should add one vote for no
        ✔ should add one vote for yes
        ✔ should set hasVoted[voter1][0] to true
        ✔ should add "almost square" to totalTokenSquare
        ✔ should emit : SetVoteEvent
      Function getVotes
        ✔ should retrun the array of votes
      Function getVoteFromCaseIndex
        ✔ should return votes[0]
    Phase 4 : resolveAfterVoting
      Function resolveAfterVoting
        ✔ should revert because the index does not exist in Votes
        ✔ should revert because the vote is not disputed
        ✔ should revert because the vote is not close yet
        ✔ should set the status to validated (4016ms)
        ✔ should revert cause not the owner of the stack (4016ms)
        ✔ should transfer the token - case of validation (4024ms)
        ✔ should set the status to rejected (4018ms)
        ✔ should revert cause not the owner of the stack (4017ms)
        ✔ should transfer the token - case of rejection (4021ms)
        ✔ should emit : ResolveAfterVoteEvent (4017ms)
    Phase 5 : getReward
      Function getReward
        ✔ should revert because the index does not exist in Votes
        ✔ should revert because the case is not resolved yet
        ✔ should revert because voter2 has not voted
        ✔ should revert because voter1 has already claimed 
        ✔ should set the hasClaimed to true
        ✔ should transfer the token to voter2
        ✔ should emit : GetRewardEvent(msg.sender, amount);
        


  86 passing (2m)


  
-----------------------|----------|----------|----------|----------|----------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------------|----------|----------|----------|----------|----------------|
 contracts/            |      100 |    97.22 |      100 |      100 |                |
  DepositFactory.sol   |      100 |       90 |      100 |      100 |                |
  DiplomaFactory.sol   |      100 |      100 |      100 |      100 |                |
  DiplomaFile.sol      |      100 |    98.08 |      100 |      100 |                |
  DiplomaNft.sol       |      100 |      100 |      100 |      100 |                |
  RealDiplomaToken.sol |      100 |      100 |      100 |      100 |                |
  VoteFactory.sol      |      100 |      100 |      100 |      100 |                |
-----------------------|----------|----------|----------|----------|----------------|
All files              |      100 |    97.22 |      100 |      100 |                |
-----------------------|----------|----------|----------|----------|----------------|

Les branches non testés sont associés aux deux fonctions transfer qui envoie des tokens aux utilisateurs. Le chemin non testé correspond au revert de ces deux fonctions, revert qu'il n'est possible d'obtenir que lorsque le contrat n'a plus suffisamment de fonds, cas qui consisterait à un hack du contrat.   
