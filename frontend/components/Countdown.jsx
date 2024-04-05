import React, { useState, useEffect, useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { RdaContext } from '@/utils';

function Countdown({ titre, duration }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const {refetch} = useContext(RdaContext);

  useEffect(() => {
    if(secondsLeft < 1)
      refetch();

    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => (prevSeconds >= 1 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  
  return (
    <Box
      backgroundColor="red.300"
      color="white"
      padding={1}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      
      <Text fontSize="md"> {titre}</Text>
      <Text fontSize="md" fontWeight="bold" marginTop={2}>{formatTime(secondsLeft)}</Text>
    </Box>
  );
}

export default Countdown;