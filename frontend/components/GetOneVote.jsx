'use client';
import { useState, useEffect, useContext } from 'react';
import {
  Tr,
  Td,
  Spinner,
  Alert,
  AlertIcon, Box, Text, useToast, Table,
  useColorModeValue, Button } from '@chakra-ui/react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt,  useAccount } from 'wagmi';
import { RdaContext } from '@/utils';
import Countdown from './Countdown';
import GetOneDispute from './GetOneDispute'
import Resolve from './Resolve';

const GetOneVote = ({ Status, Owner, Ind }) => {
  //UseContext  
  const { contractAddress, contractAbi, getEvents, votingDelay, isVoter, voterTimeRegistration} = useContext(RdaContext);
  
  //State pour la structure Vote
  const [ creationTime, setCreationTime ]  = useState();
  const [ yes, setYes ]  = useState();
  const [ no, setNo ]  = useState();
  const [ totalTokenSquare, setTotalTokenSquare ]  = useState();
  const [ choice, setChoice] = useState()
  const [hasVoted, setHasVoted] = useState();
  
  //State pour la gestion de la transaction de lecture
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [disputer, setDisputer] = useState();
  
  const hoverBgColor = useColorModeValue("green.100", "teal.800");
  const selectedBgColor = useColorModeValue("green.100", "green.700");
  const toast = useToast();
  const address = useAccount();
  
  const { data: newDispute, error: disputeError, isPending: disputeIsPending} = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getDisputeFromCaseIndex',
    args: [Ind]
  });


  useEffect(() => {
    if (disputeError) {
      setError(disputeError.message);
      setIsLoading(false);
    } else if (newDispute) {
      setDisputer(newDispute.owner);
    }
  }, [newDispute, disputeError]);

  //Hook de récupération du vote
  const { data: newVote, error: voteError, isPending: voteIsPending, refetch} = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getVoteFromCaseIndex',
    args: [Ind]
  });

  

  useEffect(() => {
    if (voteError) {
      setError(voteError.message);
      setIsLoading(false);
    } else if (newVote) {
      // refetch()
      setCreationTime(Number(newVote.creationTime));
      setYes(Number(newVote.yes));
      setNo(Number(newVote.no));
      setTotalTokenSquare(Number(newVote.totalTokenSquare));
      setIsLoading(false);
    }
  }, [newVote, voteError]);

  // Hook pour voter
  const { data: hash, writeContract } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.log(error);
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
});

const voteY = async () => {
    setChoice(1);
    vote();
}

const voteN = async () => {
    setChoice(0);
    vote();
}

const vote = async () => {
    writeContract({ 
        address: contractAddress, 
        abi: contractAbi,
        functionName: 'setVote', 
        args: [Ind, choice]
    })
};

const { isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
        hash, 
    })

    useEffect(() => {
        if(isConfirmed) {
            getEvents();
            refetch();
            refetchAll()
            toast({
                title: "You voted successfully for  ".concat(choice),
                status: "success",
                duration: 3000,
                isClosable: true,
            });
    }
}, [isConfirmed])


  if (isLoading) {
    return (
      <Tr>
        <Td colSpan="2">
          <Spinner />
        </Td>
      </Tr>
    );
  }

  if (error) {
    return (
      <Tr>
        <Td colSpan="2">
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Td>
      </Tr>
    );
  }

  return (
    
    <Table >
     

     <Tr ><Td textAlign="center"  colSpan={6}><GetOneDispute  Ind= {Ind}/></Td></Tr>
 {getIsVoteOver(creationTime, votingDelay) ? (
      
      <Tr > <Td textAlign="center" colSpan={6}> <Resolve Owner={getOwner(yes, no,  Owner, disputer)} Id={Ind} /></Td></Tr>) : (
    
       <>
      <Tr>
        {getAllowedToVote(voterTimeRegistration, creationTime, isVoter) == 0 ?  (<Td textAlign="center" colSpan={6}>Vous ne pouvez pas voter. Devenez électeur en bloquant vos tokens RDA pour participer à ce vote</Td>) : null}
        {getAllowedToVote(voterTimeRegistration, creationTime, isVoter) == 1 ?  (<Td textAlign="center" colSpan={6}>Vous vous êtes enregistré trop tard pour participer à ce vote</Td>) : null}
       
      </Tr>

        {getAllowedToVote(voterTimeRegistration, creationTime, isVoter) == 2 ? (
           <>
          {true ? (<>
          <Tr ><Td textAlign='center' colSpan={2}><Button size="sm" colorScheme='teal' onClick={voteY}> Voter pour valider  </Button></Td>
          <Td textAlign='center' colSpan={2}><Button size="sm" colorScheme='teal' onClick={voteN}> Voter pour rejeter </Button></Td>
          <Td textAlign='right' colSpan={1}><Countdown titre={"Temps à avant la fin du vote"} duration={getDuration(creationTime, votingDelay)}/></Td></Tr> </>):(

            <Td textAlign="center" colSpan={6}>Vous avez voté ! </Td>) }
          </> ) : null}</>)}

    <Tr ><Td width="18%" style={{ textAlign: 'center' }} >Vote diplôme vrai </Td><Td width="7%" style={{ textAlign: 'center' }} isNumeric>{yes}</Td>
    <Td width="18%"style={{ textAlign: 'center' }} >Vote diplôme faux </Td><Td width="7%"style={{ textAlign: 'center' }} isNumeric>{no}</Td>
    <Td width="35%"style={{ textAlign: 'center' }} >Poids des tokens engagés </Td><Td width="15%" style={{ textAlign: 'center' }} isNumeric>{totalTokenSquare/10**18}</Td></Tr>
    
    </Table>
    
  )
  
}


export default GetOneVote;


function getDuration(creationTime, contestDelay)
{
  const timestamp = Date.now()/1000;
  // console.log("creation", creationTime)
  // console.log("delay", Number(contestDelay))
  // console.log("heure", timestamp);
  return (creationTime+ Number(contestDelay) - timestamp);
}

function getAllowedToVote(timeRegistration, voteCreationTime, isVoter)
{
  
  if(!isVoter)
    return 0;   //pas voter
  if(timeRegistration > voteCreationTime)
    return 1; //Enregistrement trop tard
  
  console.log("pourquoi 2")
  return 2; //Autorisé à voter

}

function getIsVoteOver(voteCreationTime, votingDelay)
{
  const timestamp = Date.now()/1000;
  if(voteCreationTime+ Number(votingDelay) > timestamp)
      return false;
  
  return true;

}

function getOwner(yes, no,  caseOwner, disputeOwner)
{
  if(yes > no )
    return caseOwner
  else
    return disputeOwner
}

