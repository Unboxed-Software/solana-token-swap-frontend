import { Box, HStack, Spacer, Stack, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getATA, createATA, uint64 } from './utils'
import { kryptMint, ScroogeCoinMint, token_swap_state_account, swap_authority, pool_krypt_account, pool_scrooge_account, pool_mint, token_account_pool, fee_account } from "./const";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { DepositAllSchema } from '../models/Data'
import { TOKEN_SWAP_PROGRAM_ID } from './const'
import { TokenSwap } from '@solana/spl-token-swap'

export const DepositSingleTokenType: FC = () => {
    const [poolTokenAmount, setAmount] = useState(0)
    const [mint, setMint] = useState(0)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const deposit = new DepositAllSchema(poolTokenAmount, 100, 100)
        handleTransactionSubmit(deposit)
    }

    const handleTransactionSubmit = async (deposit: DepositAllSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        const sourceA = await getATA(kryptMint, publicKey)
        const sourceB = await getATA(ScroogeCoinMint, publicKey)

        const buffer =  deposit.serialize()

        // check balance is not 0 for these token accounts

        const transaction = new Web3.Transaction()
        
        // const depositIX = new Web3.TransactionInstruction({
        // keys: [
        //     { pubkey: token_swap_state_account, isSigner: false, isWritable: false },
        //     { pubkey: swap_authority, isSigner: false, isWritable: false },
        //     { pubkey: publicKey, isSigner: true, isWritable: false },
        //     { pubkey: sourceA, isSigner: false, isWritable: true },
        //     { pubkey: sourceB, isSigner: false, isWritable: true },
        //     { pubkey: pool_krypt_account, isSigner: false, isWritable: true },
        //     { pubkey: pool_scrooge_account, isSigner: false, isWritable: true },
        //     { pubkey: pool_mint, isSigner: false, isWritable: true },
        //     { pubkey: token_account_pool, isSigner: false, isWritable: true },
        //     { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        //   ],
        //   data: buffer,
        //   programId: TOKEN_SWAP_PROGRAM_ID,
        // })

        const depositIX = await TokenSwap.depositAllTokenTypesInstruction(
            token_swap_state_account,
            swap_authority,
            publicKey,
            sourceA,
            sourceB,
            pool_krypt_account,
            pool_scrooge_account,
            pool_mint,
            token_account_pool,
            TOKEN_SWAP_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            poolTokenAmount,
            100,
            100
        )
    
        transaction.add(depositIX)

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
        <form onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel color='gray.200'>
                    Deposit Amount
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
                Deposit
            </Button>
        </form>
        

        </Box>
    )
}