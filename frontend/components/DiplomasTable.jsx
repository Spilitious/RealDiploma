'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Heading, Box, Table, Thead, Tbody, Button, Tr, Th, TableContainer, useColorModeValue } from '@chakra-ui/react';
import { RdaContext } from '@/utils';
import GetOneDiploma from './GetOneDiploma'; 
import GetOneDip from './GetOneDip';
import ContestProof from './ContestProof';
import GetOneVote from './GetOneVote';

const DiplomasTable = (refreshTable = false) => {
    const { events, getEvents, selectedCase, setSelectedCase } = useContext(RdaContext);
    const [diplomas, setDiplomas] = useState([]);
    const [dips, setDips] = useState([]);
    const [isOpen, setIsOpen] = useState();
    
    const headTextColor = useColorModeValue("green.500", "green.200");
    const tableBgColor = useColorModeValue("gray.50", "gray.700");
    
    const hoverBgColor = useColorModeValue("green.100", "teal.800");
    const selectedBgColor = useColorModeValue("green.100", "green.700");

    //Gestion du clique sur un diplome
    const handleRowClick = (rowNumber) => {
        setSelectedCase(rowNumber);
        openProposal();
    }

    const openProposal = () => {
        // setIsOpen(!isOpen);
        console.log(isOpen);
        if(isOpen)
        {
         setIsOpen(false);
              
        }
        else
        {
            setIsOpen(true);
           
            
        }  

      
      };
    
      

    useEffect(() => {
        getEvents(); // Récupérer les événements
    }, [], events);

    useEffect(() => {
        // Filtrer les événements pour ne garder que les événements de type 'CreateNewCaseEvent'
        const diplomaAddedEvents = events.filter(event => event.type === 'CreateCase');
        diplomaAddedEvents.reverse();
        
        const dipAddedEvents = events.filter(event => event.type === 'CreateDiploma');
        dipAddedEvents.reverse();
        
        setDiplomas(diplomaAddedEvents.map((event) => ( 
        <Box  key={event.index}
            _hover={{ bg : hoverBgColor  }}
              onClick={() => handleRowClick(event.index)}
              // height="20px"
              overflowY="auto"
              width="1000px">
            {/* <GetOneDip key={event.index} Ind={event.index}/> */}
            <GetOneDiploma key={event.index} Id={event.index} />
            
            <Box>
            {/* {true ? <ContestProof Id={event.index} /> : null} */}
            </Box>
            <Box>
            {/* {true ? <GetOneVote Ind={event.index} /> : null} */}
            </Box>
            
            
            </Box>)))

        
       // setDips(dipAddedEvents.map((event) => (<GetOneDip key={event.index} Id={event.index} />))) 
         
    }, [events]);

    return (

        <TableContainer
            height='100%'
            width="100%"
            overflowY="auto"
            // overflowX="auto"
            bg={tableBgColor}>
                
            <Table>
                {/* <Thead > */}
                    {/* <Tr > */}
                        {/* <Th textColor={headTextColor}>Owner </Th> */}
                        {/* <Th textColor={headTextColor} style={{ textAlign: 'center' }} isNumeric>CreationTime</Th>  */}
                        {/* <Th textColor={headTextColor} style={{ textAlign: 'center' }} isNumeric>Status</Th>  */}
                       {/*  */}
                    {/* </Tr> */}
                {/* </Thead> */}
                {/* <Tbody>  */}
                    {diplomas} 
                    {/* {dips} */}
                {/* </Tbody> */}
            </Table>
        </TableContainer>

    );
};

export default DiplomasTable;