import {
    Box
} from "@chakra-ui/react"
import { FC, useState } from "react"
import * as Web3 from "@solana/web3.js"
import {
    kryptMint,
    ScroogeCoinMint,
    tokenSwapStateAccount,
    swapAuthority,
    poolKryptAccount,
    poolScroogeAccount,
    poolMint,
    tokenAccountPool,
    feeAccount,
} from "../utils/constants"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { TOKEN_SWAP_PROGRAM_ID } from "../utils/constants"
import { DepositSingleTokenType } from "./Deposit"
import { WithdrawSingleTokenType } from "./Withdraw"
import { SwapToken } from "./Swap"

export const TokenSwapForm: FC = () => {
    return (
        <Box>
            <DepositSingleTokenType />
            <WithdrawSingleTokenType />
            <SwapToken />
        </Box>
    )
}
