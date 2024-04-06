import { bg } from '@/constants';
import { Box, Text, Container, useColorModeValue } from '@chakra-ui/react';

const NotConnected = () => {
  // Utiliser useColorModeValue pour définir des couleurs conditionnelles
  const bgGradient = useColorModeValue("linear(to-b, gray.300, gray.600)", "linear(to-b, gray.700, gray.900)");
  const textColor = useColorModeValue("gray.800", "white");
  const boxBgColor = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(23, 25, 35, 0.8)");

  return (
    <Box 
      position="relative" 
      textAlign="center"
      height="100vh" 
      width="100%"
      marginTop={40}
      //bgImage={bg}
      bgPos="center"
      bgSize='cover'
      bgRepeat='no-repeat'
    >
      <Container 
        maxW="container.md" 
        padding={4} 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        height="100%"
      >
        <Text fontSize="4xl" color={textColor} fontWeight="bold" mb={4}>
          Welcome to Real Diploma ! 
        </Text>
        <Box backgroundColor={boxBgColor} borderRadius="md" p={4} color={textColor}>
          Welcome to our decentralized diploma authentification platform. Connect your wallet to continue
        </Box>
      </Container>
    </Box>
  );
}

export default NotConnected;