import * as borsh from "@project-serum/borsh"

export class AirdropSchema {
    amount: number

    constructor(amount: number) {
        this.amount = amount
    }

    AIRDROP_IX_DATA_LAYOUT = borsh.struct([
        borsh.u8("variant"),
        borsh.u32("amount"),
    ])

    serialize(): Buffer {
        // const buffer = Buffer.alloc(1000)
        // this.AIRDROP_IX_DATA_LAYOUT.encode({ ...this, variant: 0 }, buffer)
        // return buffer.slice(0, this.AIRDROP_IX_DATA_LAYOUT.getSpan(buffer))
        const payload = {
            variant: 0,
            amount: this.amount,
        }

        const ixBuffer = Buffer.alloc(9)
        this.AIRDROP_IX_DATA_LAYOUT.encode(payload, ixBuffer)

        return ixBuffer
    }
}
