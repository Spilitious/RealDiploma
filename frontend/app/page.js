'use client';
import RealDiploma from "@/components/RealDiploma";
import { useAccount } from "wagmi";

import NotConnected from "@/components/NotConnected";
//import Voting from "@/components/Voting";

// import { Flex } from "@/node_mochakra-ui/react";

export default function Home() {

const { address, isConnected } = useAccount();



  return (
    <>
      {isConnected ? (
        <>
           <RealDiploma />
        </>
      ) : (
        <>
          <NotConnected />
        </>
      )}
    </>
  );
}