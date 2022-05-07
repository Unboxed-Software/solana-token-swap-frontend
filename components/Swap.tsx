import { Box, HStack, Spacer, Stack, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getATA, createATA } from './utils'
import { kryptMint, ScroogeCoinMint, token_account_pool, token_swap_state_account, swap_authority, pool_mint, pool_krypt_account, fee_account, pool_scrooge_account } from './const'
import { SwapSchema } from '../models/Data'
import { TOKEN_SWAP_PROGRAM_ID } from './const'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'


export const SwapToken: FC = () => {
    const [amount, setAmount] = useState(0)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleSwapSubmit = (event: any) => {
        event.preventDefault()
        const swap = new SwapSchema(amount, 1)
        handleTransactionSubmit(swap)
    }

    const handleTransactionSubmit = async (swap: SwapSchema) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        const transaction = new Web3.Transaction()

        const userA = await getATA(kryptMint, publicKey)
        const userB = await getATA(ScroogeCoinMint, publicKey)

        const buffer = swap.serialize()

        const withdrawIX = new Web3.TransactionInstruction({
            keys: [
                {pubkey: token_swap_state_account, isSigner: false, isWritable: false},
                {pubkey: swap_authority, isSigner: false, isWritable: false},
                {pubkey: publicKey, isSigner: true, isWritable: false},
                {pubkey: userA, isSigner: false, isWritable: true},
                {pubkey: pool_krypt_account, isSigner: false, isWritable: true},
                {pubkey: pool_scrooge_account, isSigner: false, isWritable: true},
                {pubkey: userB, isSigner: false, isWritable: true},
                {pubkey: pool_mint, isSigner: false, isWritable: true},
                {pubkey: fee_account, isSigner: false, isWritable: true},
                {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
              ],
              data: buffer,
              programId: TOKEN_SWAP_PROGRAM_ID,
        })

        transaction.add(withdrawIX)

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
        margin={2}
        justifyContent="center"
    >
        <form onSubmit={handleSwapSubmit}>
            <FormControl isRequired>
                <FormLabel color='gray.200'>
                    Swap Amount
                </FormLabel>
                <NumberInput
                    max={1000}
                    min={1}
                    onChange={(valueString) => setAmount(parseInt(valueString))}
                >
                    <NumberInputField id='amount' color='gray.400' />
                </NumberInput>
            </FormControl>
            <Button width="full" mt={4} type="submit">
                Swap
            </Button>
        </form>
        

        </Box>
    )
}