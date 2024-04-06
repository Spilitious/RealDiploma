import { Flex, Image, Box, useColorMode } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { logo, bg } from '@/constants';
import Toggle from './Toggle';

const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="docked" // Assure que le header reste au-dessus du contenu lors du scroll
      justifyContent="space-between"
      alignItems="center"
      p="2rem"
      height="5rem" // Hauteur ajustée du header
      color="white" // Couleur du texte en blanc pour contraster avec le fond
      bgGradient="linear(to-b, gray.500, white)"
    >
      {/* Couche d'arrière-plan floutée */}
      <Box
        position="absolute"
        width="full" // Assure que le fond couvre toute la largeur
        height="full" // Assure que le fond couvre toute la hauteur du header
        bgImage={`url(${bg})`} // URL de l'image d'arrière-plan
        bgPos="center"
        bgSize="cover"
        filter="blur(8px)" // Applique un effet de flou
        zIndex="-1" // Place le fond derrière le contenu
      />

      {/* Contenu de l'en-tête : Logo et Toggle à gauche, ConnectButton à droite */}
      <Box display="flex" alignItems="center">
      <Image
          src="./public/Icone2.png" // chemin local de votre image
        alt="Description de l'image"
        w={50} // largeur de l'image
        h={50} // hauteur de l'image
    />
        {/* Ajout de marge à gauche du Toggle pour éviter le chevauchement */}
        {/* <Toggle ml="2rem" /> ml (margin left) ajoute de l'espace à gauche */}
      </Box>

      <ConnectButton showBalance={false} />
    </Flex>
  );
}

export default Header;