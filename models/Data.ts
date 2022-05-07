import * as borsh from '@project-serum/borsh'
import { min } from 'bn.js';
import {Buffer} from 'buffer';

export class AirdropSchema {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    AIRDROP_IX_DATA_LAYOUT = borsh.struct([
        borsh.u8("variant"),
        borsh.u32("amount")
      ]);

    serialize(): Buffer {
		// const buffer = Buffer.alloc(1000)
		// this.AIRDROP_IX_DATA_LAYOUT.encode({ ...this, variant: 0 }, buffer)
		// return buffer.slice(0, this.AIRDROP_IX_DATA_LAYOUT.getSpan(buffer))
    const payload = {
      variant: 0,
      amount: this.amount
    }

    const ixBuffer = Buffer.alloc(9);
    this.AIRDROP_IX_DATA_LAYOUT.encode(payload, ixBuffer)

    return ixBuffer
	}  

}

export class DepositAllSchema {
  poolTokenAmount: number;
  maxTokenA: number;
  maxTokenB: number;

  constructor(poolAmount: number, maxTokenA: number, maxTokenB: number) {
    this.poolTokenAmount = poolAmount;
    this.maxTokenA = maxTokenA;
    this.maxTokenB = maxTokenB;
  }

  DEPOSIT_IX_DATA_LAYOUT = borsh.struct([
    borsh.u8("instruction"),
    borsh.u32("poolTokenAmount"),
    borsh.u32("maxTokenA"),
    borsh.u32("maxTokenB")
  ]);


  serialize(): Buffer {
    // const buffer = Buffer.alloc(1000)
    // this.DEPOSIT_IX_DATA_LAYOUT.encode({ ...this, variant: 2 }, buffer)
    // return buffer.slice(0, this.DEPOSIT_IX_DATA_LAYOUT.getSpan(buffer))
    const payload = {
      insruction: 2,
      poolTokenAmount: this.poolTokenAmount,
      maxTokenA: 100,
      maxTokenB: 100
    }

    const msgBuffer = Buffer.alloc(1000);
    this.DEPOSIT_IX_DATA_LAYOUT.encode(payload, msgBuffer);
    console.log(msgBuffer);
    const postIxData = msgBuffer.slice(0, this.DEPOSIT_IX_DATA_LAYOUT.getSpan(msgBuffer));

    return postIxData
  }
}

export class WithdrawSchema {
  sourceTokenAmount: number;
  maximumTokenAMount: number;

  constructor(sourceAmount: number, maxAmount: number) {
      this.sourceTokenAmount = sourceAmount;
      this.maximumTokenAMount = maxAmount;
  }

  WITHDRAW_IX_DATA_LAYOUT = borsh.struct([
      borsh.u8("variant"),
      borsh.u32("sourceAmount"),
      borsh.u32("maxAmount")
    ]);



  serialize(): Buffer {

  const buffer = Buffer.alloc(1000)
  this.WITHDRAW_IX_DATA_LAYOUT.encode({ ...this, variant: 5 }, buffer)
  return buffer.slice(0, this.WITHDRAW_IX_DATA_LAYOUT.getSpan(buffer))
}  

}