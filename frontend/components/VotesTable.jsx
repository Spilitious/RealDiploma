'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Heading, Box, Table, Thead, Tbody, Tr, Th, TableContainer, useColorModeValue } from '@chakra-ui/react';
import { RdaContext } from '@/utils';
import GetOneDiploma from './GetOneDiploma'; 
import GetOneDip from './GetOneDip';

const VotesTable = (refreshTable = false) => {
    const { events, getEvents } = useContext(RdaContext);
    const [votes, setVotes] = useState([]);
   
    
    const headTextColor = useColorModeValue("green.500", "green.200");
    const tableBgColor = useColorModeValue("gray.50", "gray.700");
    

    useEffect(() => {
        getEvents(); // Récupérer les événements
    }, [], events);

    useEffect(() => {
        // Filtrer les événements pour ne garder que les événements de type 'CreateNewCaseEvent'
        const voteAddedEvents = events.filter(event => event.type === 'CreateContest');
        voteAddedEvents.reverse();
             
        setVotes(voteAddedEvents.map((event) => (<GetOneDiploma key={event.index} Id={event.index} />)))

        
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
                    {votes} 
                    {/* {dips} */}
                {/* </Tbody> */}
            </Table>
        </TableContainer>

    );
};

export default DiplomasTable;