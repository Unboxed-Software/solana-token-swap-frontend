import { Box, HStack, Spacer, Stack, Text, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from '@chakra-ui/react'
import { FC, useState } from 'react'
import * as Web3 from '@solana/web3.js'
import { getATA, createATA, uint64 } from './utils'
import { kryptMint, ScroogeCoinMint, token_swap_state_account, swap_authority, pool_krypt_account, pool_scrooge_account, pool_mint, token_account_pool, fee_account } from "./const";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { TOKEN_SWAP_PROGRAM_ID } from './const'
import * as Layout from '../utils/layout'
import { DepositSingleTokenType } from './Deposit'
import { WithdrawSingleTokenType } from './Withdraw'
import { SwapToken } from './Swap'
import { useCurrencyPairState } from '../utils/CurrencyPair';


export const TokenSwapForm: FC = () => {

    return (
        <Box>
            <DepositSingleTokenType />
            <WithdrawSingleTokenType />
            <SwapToken />
            {/* <Button type="submit" className="swap-button" onClick={swapAccounts}>
                ⇅
            </Button> */}
        </Box>
    )
}