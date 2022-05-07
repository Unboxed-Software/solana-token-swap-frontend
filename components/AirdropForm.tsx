import { Box, HStack, Spacer, Stack, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { AirdropSchema } from '../models/Data'
import { getATA, createATA } from './utils'
import { kryptMint, ScroogeCoinMint, airdropPDA, airdropProgramId } from './const'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const Airdrop: FC = () => {
    const [amount, setAmount] = useState(0)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleKryptSubmit = (event: any) => {
        event.preventDefault()
        const airdrop = new AirdropSchema(amount)
        handleKryptTransactionSubmit(airdrop)
    }

    const handleKryptTransactionSubmit = async (airdrop: AirdropSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        const transaction = new Web3.Transaction()

        const userATA = await getATA(kryptMint, publicKey)
        console.log("ata: ", userATA)

        //const createATAIX = await createATA(kryptMint, userATA, publicKey)
        //transaction.add(createATAIX)

        const buffer = airdrop.serialize()
    
        const airdropIX = new Web3.TransactionInstruction({
            keys: [
              {
                pubkey: publicKey,
                isSigner: true,
                isWritable: true,
              },
              {
                pubkey: userATA,
                isSigner: false,
                isWritable: true,
              },
              {
                pubkey: kryptMint,
                isSigner: false,
                isWritable: true,
              },
              {
                pubkey: airdropPDA,
                isSigner: false,
                isWritable: false,
              },
              {
                pubkey: TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
              }
            ],
            data: buffer,
            programId: airdropProgramId,
          })

        transaction.add(airdropIX)

        try {
            let txid = await sendTransaction(transaction, connection)
            alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
        } catch (e) {
            console.log(JSON.stringify(e))
            alert(JSON.stringify(e))
        }

    }

    const handleScroogeSubmit = (event: any) => {
        event.preventDefault()
        const airdrop = new AirdropSchema(amount)
        handleScroogeTransactionSubmit(airdrop)
    }

    const handleScroogeTransactionSubmit = async (airdrop: AirdropSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        const transaction = new Web3.Transaction()

        const userATA = await getATA(ScroogeCoinMint, publicKey)
        console.log("ata: ", userATA)

        //const createATAIX = await createATA(kryptMint, userATA, publicKey)
        //transaction.add(createATAIX)

        const buffer = airdrop.serialize()
    
        const airdropIX = new Web3.TransactionInstruction({
            keys: [
              {
                pubkey: publicKey,
                isSigner: true,
                isWritable: true,
              },
              {
                pubkey: userATA,
                isSigner: false,
                isWritable: true,
              },
              {
                pubkey: ScroogeCoinMint,
                isSigner: false,
                isWritable: true,
              },
              {
                pubkey: airdropPDA,
                isSigner: false,
                isWritable: false,
              },
              {
                pubkey: TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
              }
            ],
            data: buffer,
            programId: airdropProgramId,
          })

        transaction.add(airdropIX)

        try {
            let txid = await sendTransaction(transaction, connection)
            alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
        } catch (e) {
            console.log(JSON.stringify(e))
            alert(JSON.stringify(e))
        }

    }

    return (
        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            borderWidth={1}
            margin={2}
            justifyContent="center"
        >
            <form onSubmit={handleKryptSubmit}>
                <FormControl isRequired>
                    <FormLabel color='gray.200'>
                        How many Krypt tokens would you like to airdrop yourself?
                    </FormLabel>
                    <NumberInput
                        max={1000}
                        min={1}
                        onChange={(valueString) => setAmount(parseInt(valueString))}
                    >
                        <NumberInputField id='amount' color='gray.400' />
                        <NumberInputStepper color='gray.400'>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <Button width="full" mt={4} type="submit">
                    Airdrop
                </Button>
            </form>
            
            <form onSubmit={handleScroogeSubmit}>
            <FormControl isRequired>
                <FormLabel color='gray.200'>
                    How many Scrooge tokens would you like to airdrop yourself?
                </FormLabel>
                <NumberInput
                    max={1000}
                    min={1}
                    onChange={(valueString) => setAmount(parseInt(valueString))}
                >
                    <NumberInputField id='amount' color='gray.400' />
                    <NumberInputStepper color='gray.400'>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <Button width="full" mt={4} type="submit">
                Airdrop
            </Button>
        </form>
        </Box>
    )
}


