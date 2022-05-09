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

export class WithdrawAllSchema {
  poolTokenAmount: number;
  minTokenA: number;
  minTokenB: number;

  constructor(sourceAmount: number, minA: number, minB: number) {
      this.poolTokenAmount = sourceAmount;
      this.minTokenA = minA;
      this.minTokenB = minB;
  }

  WITHDRAW_IX_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Layout.uint64("poolTokenAmount"),
    Layout.uint64("minTokenA"),
    Layout.uint64("minTokenB")
  ]);




  serialize(): Buffer {
    const data = Buffer.alloc(this.WITHDRAW_IX_DATA_LAYOUT.span);
    this.WITHDRAW_IX_DATA_LAYOUT.encode(
    {
      instruction: 3,
      poolTokenAmount: new BN(this.poolTokenAmount),
      minTokenA: new BN(this.minTokenA),
      minTokenB: new BN(this.minTokenB)
    },
    data
  );

  return data
}  

}

export class SwapSchema {
  amountIn: number;
  minimumAmountOut: number;

  constructor(amount: number, minOut: number) {
      this.amountIn = amount;
      this.minimumAmountOut = minOut;
  }

  SWAP_IX_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u8('instruction'),
    Layout.uint64('amountIn'),
    Layout.uint64('minimumAmountOut'),
  ]);

  serialize(): Buffer {
    const data = Buffer.alloc(this.SWAP_IX_DATA_LAYOUT.span);
    this.SWAP_IX_DATA_LAYOUT.encode(
    {
      instruction: 1,
      amountIn: new BN(this.amountIn),
      minimumAmountOut: new BN(this.minimumAmountOut),
    },
    data
  );

  return data
}  

}