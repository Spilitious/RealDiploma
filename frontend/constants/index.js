export const logo = "https://media.discordapp.net/attachments/1215573414840897556/1219021237981024336/Design_sans_titre.png?ex=6609c8ff&is=65f753ff&hm=0f36b1f1fe393335f684784dd5e6814b332bcaf21c6bd785c435d7db605c2dcc&=&format=webp&quality=lossless&width=705&height=705"
export const bg ='https://media.discordapp.net/attachments/1215308279606022174/1219249220582641664/anorak21_background_image_vor_votingdApp_teal_variation_colors__0d095143-b712-4647-9083-3ac4f167e83d.png?ex=660a9d52&is=65f82852&hm=a3cb589995b6f7f2fcc6d16a365182b29ae0e683d9b1081f7c01416b66eafc45&=&format=webp&quality=lossless&width=936&height=936'

export const RdaAddress = "0x77aaAD3Aea730f733f06160a2e703e5ED3624ae7";
export const contractAddress = "0x8c6f27F64FC25FE22558a195B37d11E9a4FB2Edf";
export const RdaAbi = [    {
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "allowance",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "needed",
      "type": "uint256"
    }
  ],
  "name": "ERC20InsufficientAllowance",
  "type": "error"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "balance",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "needed",
      "type": "uint256"
    }
  ],
  "name": "ERC20InsufficientBalance",
  "type": "error"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "approver",
      "type": "address"
    }
  ],
  "name": "ERC20InvalidApprover",
  "type": "error"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    }
  ],
  "name": "ERC20InvalidReceiver",
  "type": "error"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    }
  ],
  "name": "ERC20InvalidSender",
  "type": "error"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }
  ],
  "name": "ERC20InvalidSpender",
  "type": "error"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }
  ],
  "name": "OwnableInvalidOwner",
  "type": "error"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "OwnableUnauthorizedAccount",
  "type": "error"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "Approval",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "Transfer",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }
  ],
  "name": "allowance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "decimals",
  "outputs": [
    {
      "internalType": "uint8",
      "name": "",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }
  ],
  "name": "mint",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "name",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "owner",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "symbol",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "transfer",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "transferFrom",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
]

/******************************************************* *************** **************************************************************************************************  */
/******************************************************* Diploma File **************************************************************************************************  */
/******************************************************* ************* **************************************************************************************************  */

export const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "contract RealDiplomaToken",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_daoAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorAlreadyVoter",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorAmountMin",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorCaseNotDisputed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorCaseNotPending",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorCaseNotResolved",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorCaseUnknown",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorHasVoted",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorNoReward",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorNotAllowedToVote",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msgError",
        "type": "uint256"
      }
    ],
    "name": "ErrorNotUnlockYet",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorNotValidated",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorNotVoter",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msgError",
        "type": "uint256"
      }
    ],
    "name": "ErrorNotYourCase",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorVoteClosed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorVoteInProgress",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgError",
        "type": "string"
      }
    ],
    "name": "ErrorVoteUnknown",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ErrorMsg",
        "type": "string"
      }
    ],
    "name": "NotYourStack",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BecomeVoterEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "CloseDepositEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "creationTime",
        "type": "uint256"
      }
    ],
    "name": "CreateNewCaseEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "idDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum DepositFactory.DepositType",
        "name": "kind",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "CreateNewDepositEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "birthday",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "school",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "diplomaName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "diplomaDate",
        "type": "uint256"
      }
    ],
    "name": "CreateNewDiplomaEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum DiplomaFile.DisputeProof",
        "name": "proof",
        "type": "uint8"
      }
    ],
    "name": "CreateNewDisputeEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "indexLoserDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "indexWinnerDeposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "bonus",
        "type": "uint256"
      }
    ],
    "name": "ExecuteDealingEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "GetRewardEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "indexFile",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum DiplomaFile.AuthStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "name": "ResolveAfterVoteEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "voteIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "choice",
        "type": "uint256"
      }
    ],
    "name": "SetVoteEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "SimpleResolve",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DisputeDelay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "becomeVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_birthday",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_school",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_diplomaName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_diplomaDate",
        "type": "uint256"
      }
    ],
    "name": "createCase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileIndex",
        "type": "uint256"
      },
      {
        "internalType": "enum DiplomaFile.DisputeProof",
        "name": "_proof",
        "type": "uint8"
      }
    ],
    "name": "disputeCase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBonus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getCase",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DiplomaFile.AuthStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "creationTime",
            "type": "uint256"
          }
        ],
        "internalType": "struct DiplomaFile.File",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCases",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DiplomaFile.AuthStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "creationTime",
            "type": "uint256"
          }
        ],
        "internalType": "struct DiplomaFile.File[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getDeposit",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DepositFactory.DepositType",
            "name": "depositType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct DepositFactory.Deposit",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getDepositFromCaseIndex",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DepositFactory.DepositType",
            "name": "depositType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct DepositFactory.Deposit",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDeposits",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DepositFactory.DepositType",
            "name": "depositType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct DepositFactory.Deposit[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getDiploma",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "lastName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "firstName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "school",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "diplomaName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "diplomaDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct DiplomaFactory.Diploma",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getDiplomaFromCaseIndex",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "lastName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "firstName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "school",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "diplomaName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "diplomaDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct DiplomaFactory.Diploma",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDiplomas",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "lastName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "firstName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "birthday",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "school",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "diplomaName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "diplomaDate",
            "type": "uint256"
          }
        ],
        "internalType": "struct DiplomaFactory.Diploma[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getDispute",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DiplomaFile.DisputeProof",
            "name": "Proof",
            "type": "uint8"
          }
        ],
        "internalType": "struct DiplomaFile.Dispute",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getDisputeDepositFromCaseIndex",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DepositFactory.DepositType",
            "name": "depositType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct DepositFactory.Deposit",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getDisputeFromCaseIndex",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DiplomaFile.DisputeProof",
            "name": "Proof",
            "type": "uint8"
          }
        ],
        "internalType": "struct DiplomaFile.Dispute",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDisputes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "enum DiplomaFile.DisputeProof",
            "name": "Proof",
            "type": "uint8"
          }
        ],
        "internalType": "struct DiplomaFile.Dispute[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getHasClaimed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getHasClaimedOnCase",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getHasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getHasVotedOnCase",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getRewardFromVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getVote",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "creationTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "yes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "no",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalTokenSquare",
            "type": "uint256"
          }
        ],
        "internalType": "struct VoteFactory.Vote",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getVoteFromCaseIndex",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "creationTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "yes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "no",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalTokenSquare",
            "type": "uint256"
          }
        ],
        "internalType": "struct VoteFactory.Vote",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getVoter",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "registrationTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct VoteFactory.Voter",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "creationTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "yes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "no",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalTokenSquare",
            "type": "uint256"
          }
        ],
        "internalType": "struct VoteFactory.Vote[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "price",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileIndex",
        "type": "uint256"
      }
    ],
    "name": "resolveAfterVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_delay",
        "type": "uint256"
      }
    ],
    "name": "setDisputeDelay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_choice",
        "type": "uint256"
      }
    ],
    "name": "setVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_votingDelay",
        "type": "uint256"
      }
    ],
    "name": "setVotingDelay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "simpleResolve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingDelay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
  