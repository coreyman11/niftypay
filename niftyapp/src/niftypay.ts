export type Niftypay = {
  "version": "0.1.0",
  "name": "niftypay",
  "instructions": [
    {
      "name": "verifyNft",
      "accounts": [
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "contractId",
          "type": "publicKey"
        },
        {
          "name": "members",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "createBenefit",
      "accounts": [
        {
          "name": "benefit",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "projectId",
          "type": "publicKey"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "benefitType",
          "type": {
            "defined": "BenefitType"
          }
        },
        {
          "name": "frequency",
          "type": {
            "defined": "Frequency"
          }
        },
        {
          "name": "allowedUsage",
          "type": "u8"
        },
        {
          "name": "discount",
          "type": "u8"
        },
        {
          "name": "businessOwner",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "project",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contractId",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "members",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "benefit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "projectId",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "businessOwner",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "benefitType",
            "type": {
              "defined": "BenefitType"
            }
          },
          {
            "name": "allowedUsage",
            "type": "u8"
          },
          {
            "name": "frequency",
            "type": {
              "defined": "Frequency"
            }
          },
          {
            "name": "discount",
            "type": "u8"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BenefitType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "PercentageDiscount"
          },
          {
            "name": "AmountDiscount"
          },
          {
            "name": "Freebie"
          },
          {
            "name": "GiftCard"
          },
          {
            "name": "Entrance"
          }
        ]
      }
    },
    {
      "name": "Frequency",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "OneTime"
          },
          {
            "name": "Monthly"
          },
          {
            "name": "Weekly"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VerifyNFT",
      "msg": "Error, Not verified"
    },
    {
      "code": 6001,
      "name": "NameNotValid",
      "msg": "Provide a valid project name."
    },
    {
      "code": 6002,
      "name": "NameTooLong",
      "msg": "The provided name should be 50 characters long maximum."
    }
  ]
};

export const IDL: Niftypay = {
  "version": "0.1.0",
  "name": "niftypay",
  "instructions": [
    {
      "name": "verifyNft",
      "accounts": [
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadataAccount",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "contractId",
          "type": "publicKey"
        },
        {
          "name": "members",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "createBenefit",
      "accounts": [
        {
          "name": "benefit",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "projectId",
          "type": "publicKey"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "benefitType",
          "type": {
            "defined": "BenefitType"
          }
        },
        {
          "name": "frequency",
          "type": {
            "defined": "Frequency"
          }
        },
        {
          "name": "allowedUsage",
          "type": "u8"
        },
        {
          "name": "discount",
          "type": "u8"
        },
        {
          "name": "businessOwner",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "project",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contractId",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "members",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "benefit",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "projectId",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "businessOwner",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "benefitType",
            "type": {
              "defined": "BenefitType"
            }
          },
          {
            "name": "allowedUsage",
            "type": "u8"
          },
          {
            "name": "frequency",
            "type": {
              "defined": "Frequency"
            }
          },
          {
            "name": "discount",
            "type": "u8"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BenefitType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "PercentageDiscount"
          },
          {
            "name": "AmountDiscount"
          },
          {
            "name": "Freebie"
          },
          {
            "name": "GiftCard"
          },
          {
            "name": "Entrance"
          }
        ]
      }
    },
    {
      "name": "Frequency",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "OneTime"
          },
          {
            "name": "Monthly"
          },
          {
            "name": "Weekly"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "VerifyNFT",
      "msg": "Error, Not verified"
    },
    {
      "code": 6001,
      "name": "NameNotValid",
      "msg": "Provide a valid project name."
    },
    {
      "code": 6002,
      "name": "NameTooLong",
      "msg": "The provided name should be 50 characters long maximum."
    }
  ]
};
