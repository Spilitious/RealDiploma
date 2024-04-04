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
    }

      

    useEffect(() => {
        getEvents(); // Récupérer les événements
    }, [], events);

    useEffect(() => {
        // Filtrer les événements pour ne garder que les événements de type 'CreateNewCaseEvent'
        const diplomaAddedEvents = events.filter(event => event.type === 'CreateCase');
        // diplomaAddedEvents.reverse();
        
        const dipAddedEvents = events.filter(event => event.type === 'CreateDiploma');
        dipAddedEvents.reverse();
        
        setDiplomas(diplomaAddedEvents.map((event) => ( 
        <Box  key={event.index}
             //_hover={{ bg : hoverBgColor  }}
              onClick={() => handleRowClick(event.index)}
              overflowY="auto"
              width="1000px"
              borderColor="teal.500" borderWidth="2px">
             <GetOneDiploma key={event.index} Id={event.index} />
            </Box>)))
         
    }, [events]);

    return (

        <TableContainer
            height='100%'
            width="100%"
            overflowY="auto"
            // overflowX="auto"
            bg={tableBgColor}>
                
            <Table>
                    {diplomas} 
            </Table>
        </TableContainer>

    );
};

export default DiplomasTable;