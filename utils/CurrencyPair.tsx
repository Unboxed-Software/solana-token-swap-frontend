import { MintInfo } from "@solana/spl-token";
import React, { useCallback, useContext, useEffect, useState } from "react";


export interface CurrencyContextState {
    mintAddress: string;
    //account?: TokenAccount;
    mint?: MintInfo;
    amount: string;
    setAmount: (val: string) => void;
    setMint: (mintAddress: string) => void;
    convertAmount: () => number;
    sufficientBalance: () => boolean;
  }
  
  export interface CurrencyPairContextState {
    A: CurrencyContextState;
    B: CurrencyContextState;
    setLastTypedAccount: (mintAddress: string) => void;
  }

  const CurrencyPairContext = React.createContext<CurrencyPairContextState | null>(
    null
  );

  export const useCurrencyPairState = () => {
    const context = useContext(CurrencyPairContext);
    return context as CurrencyPairContextState;
  };