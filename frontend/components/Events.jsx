import React, { useContext } from 'react';

import {
  VStack,
  Heading,
  Box,
  Container,
  Circle,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, CheckCircleIcon, BellIcon } from '@chakra-ui/icons';
import { RdaContext } from '@/utils';
import { Yellowtail } from 'next/font/google';

const Events = () => {
  const { events } = useContext(RdaContext);

  return (
    <Box  bg="gray.200"
    borderColor="teal.500" 
    borderWidth="2px">
      <Heading marginTop={6} as="h2" size="xl" textAlign="center">
        Events log
      </Heading>
      <Box>
        <VStack 
          textAlign="start" 
          align="start" 
          mb={5} 
          overflowY="auto"
          marginTop={"30px"}
          maxH={"520px"}
        >
        {events.length > 0 ? (
          events.map((event, index) => (
            <Box marginLeft={10} marginRight={10} key={index} zIndex={5}>
              <Heading>
                {event.name}
              </Heading>
              <MilestoneItem
                icon={getIcon(event.type)}
                color={getColor(event.type)}
              >
                <Badge colorScheme={getColorScheme(event.type)}>{getBadgeText(event)}</Badge>
                <br/>
                <Box fontSize="xs">{getArg(event)}</Box>
              </MilestoneItem>
            </Box>
          ))
        ) : (
          <Heading fontSize="xl" fontWeight="600" my={5}>
           No Event
          </Heading>
        )}
      </VStack>


      </Box>

    </Box>
  );
};

const MilestoneItem = ({ icon: Icon, children, color }) => {
  return (
    <Flex minH={20}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle size={10} bg={color} opacity={0.07} />
        <Box as={Icon} size="2rem" color={color} pos="absolute" left="0.8rem" top="0.6rem" />
        <Box w="1px" flex={1} bg={color} my={0} />
      </Flex>
      <Box pt={{ base: 1, sm: 1 }}>
        {children}
      </Box>
    </Flex>
  );
};

function getArg(event) {
  switch (event.type) {
    case 'BecomeVoter':
      return "".concat(event.address).concat(" locked ").concat(getToken(event.amount)).concat(" RdaToken and is now a voter !")
    case 'CreateCase':
        return "".concat(event.address).concat(" deposited case n°").concat(event.index);
    case 'DisputeCase' : 
      return "".concat(event.address).concat(" dispute case n°").concat(event.index).concat(" with the proof n°").concat(event.proof);
    case 'Resolve':
        return "Case n° ".concat(event.index).concat(" has been ").concat(getStatusText(event.status));
    default:
      return ; // Default icon
  }
}

function getToken(amount) {
    return (amount / 10**18);
}

function getIcon(type) {
  switch (type) {
    case 'BecomeVoter':
      return AddIcon;
    case 'CreateCase':
      return EditIcon;
    case 'DisputeCase':
      return BellIcon;
    case 'Resolve':
        return CheckCircleIcon;
    default:
      return BellIcon; // Default icon
  }
}

function getColor(type) {
  switch (type) {
    case 'becomeVoter':
      return 'red.500';
    case 'CreateCase':
      return 'green.500';
    case 'DipusteCase':
      return 'purple.500';
    case 'Resolve':
        return 'yellow.500';
    default:
      return 'gray.500'; // Default color
  }
}

function getColorScheme(type) {
  switch (type) {
    case 'BecomeVoter':
      return 'red';
    case 'CreateCase':
      return 'green';
    case 'DisputeCase':
      return 'purple';
    case 'Resolve':
        return 'yellow';
    default:
      return 'gray'; // Default color scheme
  }
}

function getBadgeText(event) {
  switch (event.type) {
    case 'BecomeVoter':
      return 'New voter registered';
    case 'CreateCase':
      return 'New diploma registered';
    case 'DisputeCase':
      return 'New diploma disputed';
    case 'Resolve':
        return 'New diploma settled';
    default:
      return 'Unknown Event';
  }
}

function getStatusText(status) {
  switch (status) {
    case 1:
      return 'validated';
    case 3:
      return 'rejected';
    
    default:
      return 'validated';
  }
}


export default Events;