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

import GetOneDiploma from './GetOneDiploma';
import ContestProof from './ContestProof';

const ContestDiploma = ({ Ind }) => {
  const { contractAddress, contractAbi,} = useContext(RdaContext);
  
  
    return (
        <Box  _hover={{ bg : hoverBgColor  }}
        onClick={() => handleRowClick(Id)}
        // height="20px"
        overflowY="auto"
        width="1000px">
        <GetOneDiploma key={Ind} Id={Ind} />
        <ContestProof />
        </Box>

);

};


export default DiplomasTable;