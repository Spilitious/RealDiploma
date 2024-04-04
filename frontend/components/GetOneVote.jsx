'use client';
import { useState, useEffect, useContext } from 'react';
import {
  Tr,
  Td,
  Spinner,
  Alert,
  AlertIcon, Box,
  useColorModeValue, Button } from '@chakra-ui/react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { RdaContext } from '@/utils';
import Countdown from './Countdown';

const GetOneVote = ({ Ind }) => {
  //UseContext  
  const { contractAddress, contractAbi, getEvents, votingDelay, isVoter, voterTimeRegistration} = useContext(RdaContext);
  
  //State pour la structure Vote
  const [ creationTime, setCreationTime ]  = useState();
  const [ yes, setYes ]  = useState();
  const [ no, setNo ]  = useState();
  const [ totalTokenSquare, setTotalTokenSquare ]  = useState();
  const [ choice, setChoice] = useState(0)
  
  //State pour la gestion de la transaction de lecture
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const hoverBgColor = useColorModeValue("green.100", "teal.800");
  const selectedBgColor = useColorModeValue("green.100", "green.700");
  

  //Hook de récupération du vote
  const { data: newVote, error: voteError, isPending: voteIsPending } = useReadContract({
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
    <>
    <Countdown titre={"Temps à avant la fin du vote"} duration={getDuration(creationTime, votingDelay)}/> 
    <Tr //key={Id} 
       
       // _hover={{ bg : hoverBgColor  }}
        height="20px"
        overflowY="auto"
        >
       
        <Td style={{ textAlign: 'center' }} >Vote Pour </Td><Td style={{ textAlign: 'center' }} isNumeric>{yes}</Td>
        <Td style={{ textAlign: 'center' }} >Vote Contre </Td><Td style={{ textAlign: 'center' }} isNumeric>{no}</Td>
        <Td style={{ textAlign: 'center' }} >Poids des tokens engagnés dans le vote </Td><Td style={{ textAlign: 'center' }} isNumeric>{totalTokenSquare}</Td></Tr>
        <Tr 
        height="20px"
        overflowY="auto">
        {getAllowedToVote(voterTimeRegistration, creationTime, isVoter) == 0 ?  (<Box>Vous ne pouvez pas voter. Devenez électeur en bloquant vos tokens RDA pour participer à ce vote</Box>) : null}
        {getAllowedToVote(voterTimeRegistration, creationTime, isVoter) == 1 ?  (<Box>Vous vous êtes enregistré trop tard pour participer à ce vote</Box>) : null}
        {getAllowedToVote(voterTimeRegistration, creationTime, isVoter) == 2 ? (<Box>
          <Td rowspan={2}><Button size="sm" colorScheme='teal' onClick={voteY}> Vote Yes </Button></Td>
          <Td rowspan={2}><Button size="sm" colorScheme='teal' onClick={voteN}> Vote No </Button></Td>
          </Box> ) :null          
        }

       
    </Tr>
    </>
  );
}


export default GetOneVote;


function getDuration(creationTime, contestDelay)
{
  const timestamp = Date.now()/1000;
  console.log("creation", creationTime)
  console.log("delay", Number(contestDelay))
  console.log("heure", timestamp);
  return (creationTime+ Number(contestDelay) - timestamp);
}

function getAllowedToVote(timeRegistration, voteCreationTime, isVoter)
{
  console.log(timeRegistration)
  console.log(voteCreationTime)
  if(!isVoter)
    return 0;   //pas voter
  if(timeRegistration > voteCreationTime)
    return 1; //Enregistrement trop tard
  
  console.log("pourquoi 2")
  return 2; //Autorisé à voter

}
