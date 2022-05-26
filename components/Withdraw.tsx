import { Box, HStack, Spacer, Stack, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { kryptMint, ScroogeCoinMint, tokenAccountPool, swapAuthority, poolMint, poolKryptAccount, feeAccount, poolScroogeAccount } from '../utils/constants'
import { TOKEN_SWAP_PROGRAM_ID } from '../utils/constants'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const WithdrawSingleTokenType: FC = () => {
    const [amount, setAmount] = useState(0)

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleWithdrawSubmit = (event: any) => {
        event.preventDefault()
        handleTransactionSubmit()
    }

    const handleTransactionSubmit = async () => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
        /*

            build withdrawal transaction here


        */
    }

    return (
        <Box
        p={4}
        display={{ md: "flex" }}
        maxWidth="32rem"
        margin={2}
        justifyContent="center"
    >
        <form onSubmit={handleWithdrawSubmit}>
            <FormControl isRequired>
                <FormLabel color='gray.200'>
                    LP-Token Withdrawal Amount
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
                Withdraw
            </Button>
        </form>
        

        </Box>
    )
}