import { ByteArray } from "./ByteArray";

export class ByteArray64 extends ByteArray{
    constructor(hex?:string){
        hex ? super(Buffer.from(hex, "hex")) : super(8);
    }

    public readBytes(): number {
        return Number(Buffer.from(this.buffer).readBigUInt64BE());
    }

    public writeBytes(num: number): void {
        const newBuffer=Buffer.alloc(8);
        newBuffer.writeBigUInt64BE(BigInt(num));
        let i=0;
        for(const byte of newBuffer){
            this[i++]=byte;
        }
    }
}