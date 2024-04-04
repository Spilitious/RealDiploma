import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { ethers } from 'ethers';

import { RdaAddress, RdaAbi  } from '@/constants'
import  Browser from './Browser'
import ApproveButton from './ApproveButton'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { getEventSelector } from 'viem';
// import WorkflowManager from './WorkflowManager';
// import ActionContainer from './ActionContainer';
// import Events from './Events';


const CreateCase = () => {
    
        const currentDate = new Date("1981-09-02"); 
        const timestamp = Math.floor(currentDate.getTime() / 1000); // Convertir en secondes
       

        const { contractAddress, contractAbi, getEvents, price, contestDelay, votingDelay } = useContext(RdaContext);
        const [ lastName, setLastName ]  = useState();
        const [ firstName, setFirstName ]  = useState();
        const [ birthday, setBirthday ]  = useState();
        const [ school, setSchool ]  = useState();
        const [ title, setTitle ]  = useState();
        const [ diplomaDate, setDiplomaDate ]  = useState();
        const [ needApproval, setNeedApproval] = useState(true);
        const [ approval, setApproval] = useState(0);
        const [ lastFunctionCalled, setLastFunctionCalled] = useState();
        
        const toast = useToast();
        const { address } = useAccount();
    
        const { data: allowance, error: allowanceError, isPending :allowanceIsPending, refetch } = useReadContract({
            address: RdaAddress, 
            abi: RdaAbi,
            functionName: 'allowance',
            account: address,
            args : [address, contractAddress]
           
        })

        useEffect(() => {
            if(allowanceError)
                console.log(allowanceError);
            else if(allowanceIsPending) 
                console.log("allowance pending");
            else if(allowance < ethers.parseEther('100'))
               setNeedApproval(true);
            else
            {
                setNeedApproval(false);
                setApproval(Number(allowance))
            }   
        }, [allowance, allowanceIsPending, allowanceError])


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
    

        const createNewFile = async () => {
            let date = new Date(birthday);
            const birthdaySec = Math.floor(date.getTime() / 1000); 
            date = new Date(diplomaDate)
            const diplomaDateSec = Math.floor(date.getTime() / 1000);

            writeContract({ 
                address: contractAddress, 
                abi: contractAbi,
                functionName: 'createCase', 
                args: [lastName, firstName, birthdaySec, school, title, diplomaDateSec]
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
                setLastName("")
                setFirstName("")
                setBirthday("")
                setSchool("")
                setTitle("")
                setDiplomaDate("")
                toast({
                    title: "Diploma registered successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }

        }, [isConfirmed])
      
      
        return (
            <>
            
            {isConfirmed    
            &&  <Alert mt="1rem" status='success'>
                    <AlertIcon />
                    Diploma registered successfully.
                </Alert>}
            <Flex 
                justifyContent="space-between"
                alignItems="center"
                width="70%"
                mt="1rem"
                direction="column"
            >
                 <Table>
                 <Box marginBottom={10} fontSize="xl"  textAlign="center" > Veuillez renseigner les éléments du diplôme que vous souhaitez déposer </Box>
                 <Tbody>
                   
                    <Tr> <Input borderColor="teal.500"
                                                    borderWidth="2px"
                                                    placeholder="Entrez le nom de famille inscrit sur le diplôme" value={lastName} onChange={(e) => setLastName(e.target.value)} /></Tr>
                    
                    <Tr> <Input borderColor="teal.500"
                                                    borderWidth="2px"
                                                    placeholder="Entrez le prénom inscrit sur le diplôme" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></Tr>
                    <Tr><Input borderColor="teal.500"
                                                    borderWidth="2px"
                                                    placeholder={"Entrez la date(AAAA/MM/JJ) de naissance inscrite sur le diplôme "} value={birthday} onChange={(e) => setBirthday(e.target.value)} /></Tr>
                    <Tr><Input borderColor="teal.500"
                                                    borderWidth="2px"
                                                    placeholder={"Entrez l'école qui a délivré le diplôme"} value={school} onChange={(e) => setSchool(e.target.value)} /></Tr>
                    <Tr><Input borderColor="teal.500"
                                                    borderWidth="2px"
                                                    placeholder={"Entrez l'intitulé du diplôme"} value={title} onChange={(e) => setTitle(e.target.value)} /></Tr>
                    <Tr><Input borderColor="teal.500"
                                                    borderWidth="2px"
                                                    placeholder={"Entrez la date(AAAA/MM/JJ) d'obtention du diplôme "} value={diplomaDate} onChange={(e) => setDiplomaDate(e.target.value)} /></Tr>
                {/* <Button colorScheme='teal' size='xs' m={4}  onClick={approve}>Submit </Button> */}
                </Tbody>
                </Table>
              
                <Box fontSize="sm" color="gray.500" align="left">*Le prix du dépôt d'un dîplome est fixé à {Number(price)/10**18} tokens </Box>
                {needApproval ? (
                    <Box>
                     <ApproveButton amount={Number(price)}/>
                     </Box>)
                    //  <Button colorScheme='teal' size='xs' m={4}  onClick={createNewFile}> Submit </Button>) 
                     : (
                        <Box >
                        
                     <Button colorScheme='teal'  size='md' m={4}  
                             isDisabled={!isEnable(lastName, firstName, birthday, school, title, diplomaDate)}
                             onClick={createNewFile}> Valider </Button>
                     </Box>)

                }
                </Flex>
                </>)
      
      
    }

export default CreateCase;

function isEnable(lastName, firstName, birthday, school, title, diplomaDate) {
    
    if(lastName == '')
        return false;
    if(firstName == '')
        return false;
    if(birthday == '')
        return false;
    if(title == '')
        return false;
    if(school == '')
        return false;
    if(!isValidDate(birthday))
        return false;
    if(!isValidDate(diplomaDate))
        return false;

    return true;
}


function isValidDate(dateStr) {
    return !isNaN(new Date(dateStr));
  }