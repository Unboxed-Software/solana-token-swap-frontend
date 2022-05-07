import * as borsh from '@project-serum/borsh'
import { BN, min } from 'bn.js';
import {Buffer} from 'buffer';
import * as Layout from '../utils/layout'
const BufferLayout = require('buffer-layout');

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

  DEPOSIT_IX_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Layout.uint64("poolTokenAmount"),
    Layout.uint64("maxTokenA"),
    Layout.uint64("maxTokenB")
  ]);


  serialize(): Buffer {
    const data = Buffer.alloc(this.DEPOSIT_IX_DATA_LAYOUT.span);
    this.DEPOSIT_IX_DATA_LAYOUT.encode(
    {
      instruction: 2,
      poolTokenAmount: new BN(this.poolTokenAmount),
      maxTokenA: new BN(this.maxTokenA),
      maxTokenB: new BN(this.maxTokenB)
    },
    data
  );

  return data
  
  }
}

export class WithdrawSchema {
  sourceTokenAmount: number;
  maximumTokenAMount: number;

  constructor(sourceAmount: number, maxAmount: number) {
      this.sourceTokenAmount = sourceAmount;
      this.maximumTokenAMount = maxAmount;
  }

  // WITHDRAW_IX_DATA_LAYOUT = borsh.struct([
  //     borsh.u8("variant"),
  //     borsh.u32("sourceAmount"),
  //     borsh.u32("maxAmount")
  //   ]);

  WITHDRAW_IX_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Layout.uint64("sourceAmount"),
    Layout.uint64("maxAmount"),
  ]);




  serialize(): Buffer {
    const data = Buffer.alloc(this.WITHDRAW_IX_DATA_LAYOUT.span);
    this.WITHDRAW_IX_DATA_LAYOUT.encode(
    {
      instruction: 5,
      sourceAmount: new BN(this.sourceTokenAmount),
      maxAmount: new BN(this.maximumTokenAMount),
    },
    data
  );

  return data
}  

}