import { ByteArray } from "./ByteArray";

export class ByteArray64 extends ByteArray{
    constructor(hex?:string){
        hex ? super(Buffer.from(hex, "hex")) : super(8);
    }

    public readBytes(): number {
        return Number(Buffer.from(this.buffer).readBigUInt64BE());
    }

    public writeBytes(num:number): void {
        if(num<0) num = this.maxValue+1-num;
        const newBuffer=Buffer.alloc(this.length);
        newBuffer.writeUInt32BE(num >> 8,0);
        newBuffer.writeUInt32BE(num & 0x00ff,4);
        let i=0;
        for(const byte of newBuffer){
            this[i++]=byte;
        }
    }

    public readSBytes() : number{
        return Number(Buffer.from(this.buffer).readBigInt64BE());
    }

    public writeSBytes(num:number): void{
        const newBuffer=Buffer.alloc(this.length);
        const is32BitSigned=Math.abs(num) <= 0xffffffff;
        if(is32BitSigned){
            newBuffer.writeInt32BE(num & 0xffffffff, 4);
        }else{
            newBuffer.writeBigInt64BE(BigInt(num));
            // newBuffer.writeInt32BE(num >> 8, 0);
            // newBuffer.writeInt32BE(num & 0xffffffff, 4);
        }
        let i=0;
        for(const byte of newBuffer){
            this[i++]=byte;
        }
    }
}