import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

function Countdown({ titre, duration }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0));
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
      backgroundColor="teal.500"
      color="white"
      padding={4}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      
      <Text fontSize="xl"> {titre}</Text>
      <Text fontSize="3xl" fontWeight="bold" marginTop={2}>{formatTime(secondsLeft)}</Text>
    </Box>
  );
}

export default Countdown;