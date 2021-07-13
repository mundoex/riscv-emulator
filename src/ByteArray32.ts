import { ByteArray } from "./ByteArray";

export class ByteArray32 extends ByteArray{
    constructor(hex?:string){
        hex ? super(Buffer.from(hex, "hex")) : super(4);
    }

    public readBytes(): number {
        return Buffer.from(this.buffer).readUInt32BE();
    }
    
    public writeBytes(num: number): void {
        const newBuffer=Buffer.alloc(this.length);
        newBuffer.writeUInt32BE(num);
        let i=0;
        for(const byte of newBuffer){
            this[i++]=byte;
        }
    }
}