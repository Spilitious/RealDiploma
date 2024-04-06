'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Heading, Box, Table, Thead, Tbody, Button, Tr, Th, Text, TableContainer, useColorModeValue } from '@chakra-ui/react';
import { RdaContext } from '@/utils';
import GetOneDiploma from './GetOneDiploma'; 
import GetOneDip from './GetOneDip';
import ContestProof from './ContestProof';
import GetOneVote from './GetOneVote';

const DiplomasTable = (refreshTable = false) => {
    const { events, getEvents, selectedCase, setSelectedCase } = useContext(RdaContext);
    const [diplomas, setDiplomas] = useState([]);
    const headTextColor = useColorModeValue("green.500", "green.200");
    const tableBgColor = useColorModeValue("gray.50", "gray.700");
    const hoverBgColor = useColorModeValue("green.100", "teal.800");
    const selectedBgColor = useColorModeValue("green.100", "green.700");

    //Gestion du clique sur un diplome
    const handleRowClick = (rowNumber) => {
        setSelectedCase(rowNumber);
    }

    useEffect(() => {
        getEvents(); 
    }, [], events);

    useEffect(() => {
        
        // Filtrer les événements pour ne garder que les événements de type 'CreateNewCaseEvent'
        const diplomaAddedEvents = events.filter(event => event.type === 'CreateCase');
        setDiplomas(diplomaAddedEvents.map((event) => ( 
        <Box  key={event.index}
              //   onClick={() => handleRowClick(event.index)}
                marginBottom={10}
                bg="gray.200"
                borderColor="teal.500" 
                borderWidth="2px"
             
               >
             <Text marginTop={3} textAlign="center" fontSize="xl"  fontWeight="bold"> Diplôme n° {Number(event.index)+1} </Text>
             <GetOneDiploma marginBottom={10} key={event.index} Id={event.index} />
        </Box>)))
         
    }, [events]);

    return (
    <TableContainer  width="70%" overflowY="auto">
        <Table 
            
            //width="90%"
           
            // overflowX="auto"
            // bg={tableBgColor}
            >
                
           
                    {diplomas} 
           
        </Table></TableContainer>

    );
};

export default DiplomasTable;