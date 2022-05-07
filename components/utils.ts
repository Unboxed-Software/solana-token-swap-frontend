import * as Web3 from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { ASSOCIATED_TOKEN_PROGRAM_ID } from './const';
import * as BufferLayout from '@solana/buffer-layout';
import assert from 'assert';
import BN from 'bn.js';


export async function getATA(mint: Web3.PublicKey, owner: Web3.PublicKey) {
    let ata = await getAssociatedTokenAddress(
      mint, // mint
      owner, // owner
    )
    return ata
  }
  
  export async function createATA(mint: Web3.PublicKey, owner: Web3.PublicKey, payer: Web3.PublicKey){
      // get or create ATA
      let ata = await getAssociatedTokenAddress(
          mint, // mint
          owner, // owner
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

  export async function getAssociatedTokenAddress(
    mint: Web3.PublicKey,
    owner: Web3.PublicKey,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): Promise<Web3.PublicKey> {

    const [address] = await Web3.PublicKey.findProgramAddress(
        [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
        associatedTokenProgramId
    );

    return address;
}

export async function createAssociatedTokenAccount(
  connection: Web3.Connection,
  payer: Web3.Signer,
  mint: Web3.PublicKey,
  owner: Web3.PublicKey,
  confirmOptions?: Web3.ConfirmOptions,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): Promise<Web3.PublicKey> {
  const associatedToken = await getAssociatedTokenAddress(mint, owner, programId, associatedTokenProgramId);

  const transaction = new Web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
          payer.publicKey,
          associatedToken,
          owner,
          mint,
          programId,
          associatedTokenProgramId
      )
  );

  await Web3.sendAndConfirmTransaction(connection, transaction, [payer], confirmOptions);

  return associatedToken;
}

export function createAssociatedTokenAccountInstruction(
  payer: Web3.PublicKey,
  associatedToken: Web3.PublicKey,
  owner: Web3.PublicKey,
  mint: Web3.PublicKey,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): Web3.TransactionInstruction {
  const keys = [
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: associatedToken, isSigner: false, isWritable: true },
      { pubkey: owner, isSigner: false, isWritable: false },
      { pubkey: mint, isSigner: false, isWritable: false },
      { pubkey: Web3.SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: programId, isSigner: false, isWritable: false },
      { pubkey: Web3.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
  ];

  return new Web3.TransactionInstruction({
      keys,
      programId: associatedTokenProgramId,
      data: Buffer.alloc(0),
  });
}

export const uint64 = (property: string = 'uint64'): Object => {
  return BufferLayout.blob(8, property);
}

export class Numberu64 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }
    assert(b.length < 8, 'Numberu64 too large');

    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }
}