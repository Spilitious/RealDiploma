'use client';
import { createContext, useState, useEffect } from 'react'
import { contractAddress, contractAbi } from '@/constants'
import { useReadContract, useAccount } from 'wagmi'
import { RdaAddress, RdaAbi  } from '@/constants'

//import { useColorMode } from '@chakra-ui/color-mode';

import { parseAbiItem } from 'viem'
import { publicClient } from '../utils/client'

export const RdaContext = createContext()

export const RdaProvider = ({ children }) => {
    
    const { address } = useAccount();
    const [page, setPage] = useState(0);
    const [price, setPrice] = useState(0);
    const [fee, setFee] = useState(0);
    const [contestDelay, setContestDelay] = useState(0);
    const [votingDelay, setvotingDelay] = useState(0);
    const [events, setEvents] = useState([]);
    // const [diplomas, setDiplomas] = useState([]);
    const [selectedCase, setSelectedCase] = useState(0);

    const [isVoter, setIsVoter] = useState();
    const [voterTimeRegistration, setVoterTimeRegistration] = useState();
    const [voterTokenAmount, setVoterTokenAmount] = useState();
    const [userBalance, setUserBalance] = useState();
    const [userAllowance, setUserAllowance] = useState();
    const [refresh, setRefresh] = useState();

    const refetchAll = () => {
      refetch1();
      refetch2();
      refetch3();
      refetch4();
      refetch5();
      refetch6();
      refetch7();
      setRefresh(!refresh)
    }
   
    /* ******************************************************************* Récupération du prix ****************************************************** */
    const { data: priceRda, error: priceError, isPending :priceIsPending, refetch :refetch1 } = useReadContract({
        // adresse du contrat
        address: contractAddress,
        // abi du contrat
        abi: contractAbi,
        // nom de la fonction dans le smart contract
        functionName: 'price',
        // qui appelle la fonction ?
        account: address,
       
    })

    useEffect(() => {
        if(priceError)
            console.log(priceError);
        if(!priceIsPending && !priceError) {
            setPrice(priceRda);
        }
    }, [priceRda, priceError])

   
    /* ******************************************************************* Récupération des fees ****************************************************** */
    const { data: feeRda, error: feeError, isPending :feeIsPending, refetch :refetch2} = useReadContract({
        // adresse du contrat
        address: contractAddress,
        // abi du contrat
        abi: contractAbi,
        // nom de la fonction dans le smart contract
        functionName: 'fee',
        // qui appelle la fonction ?
        account: address,
       
    })

    useEffect(() => {
        if(feeError)
            console.log(feeError);
        if(!feeIsPending && !feeError) {
            setFee(feeRda);
        }
    }, [feeRda, feeError])

    /* ******************************************************************* Récupération du contestDelay ****************************************************** */
    const { data: contestDelayRda, error: contestDelayError, isPending : contestDelayIsPending, refetch :refetch3 } = useReadContract({
        // adresse du contrat
        address: contractAddress,
        // abi du contrat
        abi: contractAbi,
        // nom de la fonction dans le smart contract
        functionName: 'DisputeDelay',
        // qui appelle la fonction ?
        account: address,
       
    })

    
    useEffect(() => {
        if(contestDelayError)
            console.log(contestDelayError);
        if(!contestDelayIsPending && !contestDelayError) {
            setContestDelay(contestDelayRda);
        }
    }, [contestDelayRda, contestDelayError])

   

    /* ******************************************************************* Récupération du contestDelay ****************************************************** */
    const { data: votingDelayRda, error: votingDelayError, isPending : votingDelayIsPending, refetch :refetch4 } = useReadContract({
        // adresse du contrat
        address: contractAddress,
        // abi du contrat
        abi: contractAbi,
        // nom de la fonction dans le smart contract
        functionName: 'votingDelay',
        // qui appelle la fonction ?
        account: address,
       
    })

    useEffect(() => {
        if(votingDelayError)
            console.log(votingDelayError);
        if(!votingDelayIsPending && !votingDelayError) {
            setvotingDelay(votingDelayRda);
        }
    }, [votingDelayRda, votingDelayError])

    const { data: voter, error: voterError, isPending : voterIsPending, refetch :refetch5} = useReadContract({
      // adresse du contrat
      address: contractAddress,
      // abi du contrat
      abi: contractAbi,
      // nom de la fonction dans le smart contract
      functionName: 'getVoter',
      // qui appelle la fonction ?
      args : [address],
      account: address,
     
    })

  useEffect(() => {
      if(voterError)
          console.log(votingDelayError);
      if(!voterIsPending && !voterError) {
          if(voter.tokenAmount == 0)
            setIsVoter(false);
          else
          {
            setIsVoter(true);
            setVoterTimeRegistration(voter.registrationTime);
            setVoterTokenAmount(voter.tokenAmount)
          }
      }
  }, [voter, voterError])

  /* *************************************************************************** Récupération de la balance de l'utilisateur ************************************** */

  const { data: userB, error: userError, isPending : userIsPending, refetch :refetch6} = useReadContract({
    // adresse du contrat
    address: RdaAddress,
    // abi du contrat
    abi: RdaAbi,
    // nom de la fonction dans le smart contract
    functionName: 'balanceOf',
    // qui appelle la fonction ?
    args : [address],
    account: address,
  })

    useEffect(() => {
      if(userError)
        console.log(userError);
      if(!userIsPending && !userError) 
        setUserBalance(userB);
    }, [userB, userError])

   /* *************************************************************************** Récupération de l'allowance de l'utilisateur ************************************** */

    const { data: userA, error: userAError, isPending : userAIsPending, refetch :refetch7} = useReadContract({
        address: RdaAddress, 
        abi: RdaAbi,
        functionName: 'allowance',
        account: address,
        args : [address, contractAddress]
    })
  
      useEffect(() => {
        if(userAError)
          console.log(userAError);
        if(!userAIsPending && !userAError) 
          setUserAllowance(userA);
      }, [userA, userAError])

    /* ******************************************************************** Gestion des évènements ********************************************************* */

    const getEvents = async() => {
        const createFileEvents = await publicClient.getLogs({
          address: contractAddress,
          event: parseAbiItem('event CreateNewCaseEvent(uint index, address owner, uint creationTime)'),
          // du premier bloc
          fromBlock: 0n,
          // jusqu'au dernier
          toBlock: 'latest' // Pas besoin valeur par défaut
        })
        console.log('createFile Events:', createFileEvents);
    

        const simpleResolveEvents = await publicClient.getLogs({
          address: contractAddress,
          event: parseAbiItem('event SimpleResolve(uint index)'),
          // du premier bloc
          fromBlock: 0n,
          // jusqu'au dernier
          toBlock: 'latest' // Pas besoin valeur par défaut 
        })

        console.log('SimpleResolve Events:', simpleResolveEvents);

        const contestCaseEvents = await publicClient.getLogs({
            address: contractAddress,
            event: parseAbiItem('event CreateNewDisputeEvent(address owner, uint index, uint8 proof)'),
            // du premier bloc
            fromBlock: 0n,
            // jusqu'au dernier
            toBlock: 'latest' // Pas besoin valeur par défaut
          })

        console.log('SimpleResolve Events:', simpleResolveEvents);

        const becomeVoterEvents = await publicClient.getLogs({
            address: contractAddress,
            event: parseAbiItem('event BecomeVoterEvent(address voter, uint amount)'),
            // du premier bloc
            fromBlock: 0n,
            // jusqu'au dernier
            toBlock: 'latest' // Pas besoin valeur par défaut
          })

        const newResolveEvents = await publicClient.getLogs({
            address: contractAddress,
            event: parseAbiItem('event ResolveAfterVoteEvent(uint indexFile, uint8 status)'),
            // du premier bloc
            fromBlock: 0n,
            // jusqu'au dernier
            toBlock: 'latest' // Pas besoin valeur par défaut
          })

        

        /*
        const createNewDiplomaEvents = await publicClient.getLogs({
            address: contractAddress,
            event: parseAbiItem('event CreateNewDiplomaEvent(uint index, string lastName, string firstName, uint birthday, string school, string diplomaName, uint diplomaDate)'),
            // du premier bloc
            fromBlock: 0n,
            // jusqu'au dernier
            toBlock: 'latest' // Pas besoin valeur par défaut
         }) 
*/
        // console.log('CreateNewDiploma Events:', createNewDiplomaEvents);

        const combinedEvents = createFileEvents.map((event) => ({
          type: 'CreateCase',
          address: event.args.owner,
          index : event.args.index,
          creationTime : event.args.creationTime,
          blockNumber: Number(event.blockNumber)
        })).concat(simpleResolveEvents.map((event) => ({
          type: 'Resolve',
          index: event.args.index,
          status: event.args.status,
          blockNumber: Number(event.blockNumber)
        }))).concat(contestCaseEvents.map((event) => ({
            type: 'DisputeCase',
            address: event.args.owner,
            proof: Number(event.args.proof),
            index: Number(event.args.index),
            blockNumber: Number(event.blockNumber)
          }))).concat(becomeVoterEvents.map((event) => ({
            type: 'BecomeVoter',
            address: event.args.voter,
            amount: Number(event.args.amount),
            blockNumber: Number(event.blockNumber)
          }))).concat(newResolveEvents.map((event) => ({
            type: 'Resolve',
            index: event.args.indexFile,
            status: event.args.status,
            amount: Number(event.args.amount),
            blockNumber: Number(event.blockNumber)
          })))
           
        // sort by value
        combinedEvents.sort(function (a, b) {
          return b.blockNumber - a.blockNumber;
        });

        // const cases = createFileEvents.map(event => [Number(event.args.index), event.args.owner, Number(event.args.creationTime)]);
        // setDiplomas(cases);

        setEvents(combinedEvents)

    }

    useEffect(() => {
        const getAllEvents = async() => {
          if(address !== 'undefined') {
            await getEvents();
          }
        }
        getAllEvents();
       
      }, [address])

    /* ******************************************************************** Exportation des variables ********************************************************* */
    const value = {
       
        contractAddress,
        contractAbi,
        page,
        setPage,
        price,
        fee,
        contestDelay,
        votingDelay,
        events,
        getEvents,
        selectedCase,
        setSelectedCase,
        isVoter,
        voterTimeRegistration,
        voterTokenAmount,
        userBalance,
        userAllowance,
        setUserAllowance,
        refetchAll,
        refresh,
       
    
    };

    return (
        <RdaContext.Provider value={value}>
            {children}
        </RdaContext.Provider>
    )
}