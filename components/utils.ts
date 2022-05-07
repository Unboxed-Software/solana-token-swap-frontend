import * as Web3 from '@solana/web3.js'
import { TokenSwap, TOKEN_SWAP_PROGRAM_ID } from "@solana/spl-token-swap"
import { createInitializeMintInstruction, AuthorityType, setAuthority, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, getMint, createMint,
  getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, mintTo, mintToChecked } from '@solana/spl-token'
import { web3 } from '@project-serum/anchor'
import { Buffer } from 'buffer';
import * as borsh from "@project-serum/borsh";


export async function getATA(mint: Web3.PublicKey, owner: Web3.PublicKey) {
    let ata = await getAssociatedTokenAddress(
      mint, // mint
      owner, // owner
      true // allow owner off curve
    )
    return ata
  }
  
  export async function createATA(mint: Web3.PublicKey, owner: Web3.PublicKey, payer: Web3.PublicKey){
      // get or create ATA
      let ata = await getAssociatedTokenAddress(
          mint, // mint
          owner, // owner
          true // allow owner off curve
        )
        //console.log(`ata: ${ata.toBase58()}`)
    
          const ix = await createAssociatedTokenAccountInstruction(
            payer, // payer
            ata, // ata
            owner, // owner
            mint // mint
          )
  
      return ix
  }