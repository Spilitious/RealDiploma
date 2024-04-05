'use client';
import { useState, useEffect, useContext } from 'react';
import {
  Tr,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue } from '@chakra-ui/react';
import { useReadContract } from 'wagmi';
import { RdaContext } from '@/utils';

const GetOneDiploma = ({ Ind }) => {
  const { contractAddress, contractAbi,} = useContext(RdaContext);
  
  
  const [ lastName, setLastName ]  = useState();
  const [ firstName, setFirstName ]  = useState();
  const [ birthday, setBirthday ]  = useState();
  const [ school, setSchool ]  = useState();
  const [ title, setTitle ]  = useState();
  const [ diplomaDate, setDiplomaDate ]  = useState();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // const [selectedRow, setSelectedRow] = useState(null);
  const hoverBgColor = useColorModeValue("green.100", "teal.800");
  const selectedBgColor = useColorModeValue("green.100", "green.700");
  // const { isOpen, onOpen, onClose } = useDisclosure();  // Pour l'utilisation de la modal
  
//   const [isOpen, setIsOpen] = useState(false)

  const { data: newDiploma, error: diplomaError, isPending: diplomaIsPending } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getDiplomaFromCaseIndex',
    args: [Ind]
  });


  useEffect(() => {
    if (diplomaError) {
      setError(diplomaError.message);
      setIsLoading(false);
    } else if (newDiploma) {
      setLastName(newDiploma.lastName);
      setFirstName(newDiploma.firstName);
      setBirthday(Number(newDiploma.birthday));
      setSchool(newDiploma.school);
      setTitle(newDiploma.diplomaName);
      setDiplomaDate(Number(newDiploma.diplomaDate));
      setIsLoading(false);
    }
  }, [newDiploma, diplomaError]);

  if (isLoading) {
    return (
      <Tr>
        <Td colSpan="2">
          <Spinner />
        </Td>
      </Tr>
    );
  }

  if (error) {
    return (
      <Tr>
        <Td colSpan="2">
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Td>
      </Tr>
    );
  }

  return (
    <>
     
        
        <Td borderColor="teal.500" textAlign="center" borderWidth="2px">{lastName} </Td>
        <Td borderColor="teal.500" textAlign="center" borderWidth="2px">{firstName} </Td>
        <Td borderColor="teal.500" textAlign="center" borderWidth="2px" style={{ textAlign: 'center' }} isNumeric>{getDate(birthday)}</Td>
        <Td borderColor="teal.500" textAlign="center" borderWidth="2px">{school} </Td>
        <Td borderColor="teal.500" textAlign="center" borderWidth="2px">{title} </Td>
        <Td borderColor="teal.500" textAlign="center" borderWidth="2px" style={{ textAlign: 'center' }} isNumeric>{getDate(diplomaDate)}</Td>
    </>
  );
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro devant si le jour est inférieur à 10
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si le mois est inférieur à 10
  const year = date.getFullYear();
  
  // Formater la date en chaîne de caractères
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
  }

export default GetOneDiploma;