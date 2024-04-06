import { Flex, Button, Box, useColorModeValue, Table, Thead, Tbody, Tr, Th, TableContainer,  useToast, Input, Alert, AlertIcon } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';

import { RdaAddress, RdaAbi  } from '@/constants'

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
// import WorkflowManager from './WorkflowManager';
// import ActionContainer from './ActionContainer';
// import Events from './Events';


const Browser = () => {
    
    const { page, setPage } = useContext(RdaContext);
    const hoverBgColor = useColorModeValue("green.300", "teal.300");
    const selectedBgColor =  useColorModeValue("green.100", "teal.100");

    const handleClick = (id) => {
        // alert('vous avez cliqué sur '.concat(id))
        setPage(id);
    }

    return (
        
        <TableContainer
                height='100%'
                width="100%"
                overflowY="auto">
                
                <Table>
               
                <Tbody>
                    <Tr userSelect="none" > 
                        

                        <Th _hover={{ bg : hoverBgColor  }} 
                             style={{textAlign : 'center' }}
                           //  backgroundColor= {{selectedBgColor}}
                             onClick={() => handleClick(0)}>
                             
                        Déposer votre diplôme </Th>

                        <Th _hover={{ bg : hoverBgColor  }} 
                            style={{ textAlign: 'center' }}
                             onClick={() => handleClick(1)}>
                        Devenir juré </Th>

                        <Th _hover={{ bg : hoverBgColor  }}
                             style={{ textAlign: 'center' }}
                             onClick={() => handleClick(2)}>
                        Afficher les diplômes</Th>

                         <Th _hover={{ bg : hoverBgColor  }}
                             style={{ textAlign: 'center' }}
                             onClick={() => handleClick(3)}>
                        Historique</Th>
                        
                    </Tr>
                        </Tbody>
                {/* </Thead > */}
                </Table>
        </TableContainer>
    
    )
      
}

export default Browser;