import { Flex, Button, useToast, Input, Box, Alert, AlertIcon,useColorModeValue, Text} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';

import { RdaAddress, RdaAbi  } from '@/constants'
import  Browser from './Browser'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
// import WorkflowManager from './WorkflowManager';
// import ActionContainer from './ActionContainer';
// import Events from './Events';


const DiplomaList = () => {
    
        const currentDate = new Date("1981-09-02"); 
        const timestamp = Math.floor(currentDate.getTime() / 1000); // Convertir en secondes
        const { contractAddress, contractAbi } = useContext(RdaContext);
        const { diplomas, setDiplomas }  = useContext(RdaContext);
      
        const toast = useToast();
        const { address } = useAccount();
          // Utilisez useColorModeValue pour définir les couleurs en fonction du mode clair ou sombre
          const textColor = useColorModeValue("green.500", "green.200");
          const voterTextColor = useColorModeValue("black", "gray.200");
         const boxBgColor = useColorModeValue("white", "gray.700");

         /*
        const { data: diplomasRda, error: diplomasError, isPending : diplomasIsPending } = useReadContract({
            // adresse du contrat
            address: contractAddress,
            // abi du contrat
            abi: contractAbi,
            // nom de la fonction dans le smart contract
            functionName: 'getCases',
            // qui appelle la fonction ?
            account: address,
           
        })
    
        useEffect(() => {
            if(diplomasError)
                console.log(diplomasError);
            if(!diplomasIsPending && !diplomasError) {
                setDiplomas(diplomasRda);
                console.log('je suis là')
                
            }
        }, [diplomasError, diplomasRda])
        
        */
      
        return (
            <Flex direction="column" align="center" m={4}>
              <Text fontWeight="bold" color={textColor} mb={4}>
                Diploma Count: {diplomas.length}
              </Text>
              {diplomas.map(([index, owner, creationTime], dex) => (
                <Flex key={dex} justify="center" mb={2}>
                  <Box
                    as="span"
                    display="inline-flex" // Utilisez inline-flex pour centrer le contenu à l'intérieur
                    alignItems="center" // Centrer le contenu verticalement
                    justifyContent="center" // Centrer le contenu horizontalement
                    color={voterTextColor}
                    borderRadius="full"
                    px="2"
                    py="1"
                    bg={boxBgColor}
                  >
                    {index} {owner} {creationTime}
                  </Box>
                </Flex>
              ))}
            </Flex>
          );
        };

export default DiplomaList;