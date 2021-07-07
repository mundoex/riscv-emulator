import { decimalToBinary, hex2Binary } from "./number-systems";

export abstract class ByteArray extends Uint8Array{
    //el super man constructor lmao
    constructor(bytesSizeOrBufferOrHex:number|Buffer|string){
        switch(typeof bytesSizeOrBufferOrHex){
            case "string": super(Buffer.from(bytesSizeOrBufferOrHex, "hex"));break;
            case "number": super(<number>bytesSizeOrBufferOrHex);break;
            default: super(<Buffer>bytesSizeOrBufferOrHex);break;
        }
    }

     /**
     * Returns the decimal value of the read bytes
     */
    public abstract readBytes() : number;

     /**
     * Writes the decimal value to bytes
     */
    public abstract writeBytes(num:number) : void;

    //4294967295 32bit 18446744073709551615 64bit
    get maxValue(){
        return Math.pow(2, (8*this.length))-1;
    }

    public get binary() : string{
        return decimalToBinary(this.readBytes());
    }

    //Alias for readBytes()
    public get decimal() : number{
        return this.readBytes();
    }

    public get hex() : string{
        return Buffer.from(this.buffer).toString("hex");
    }

    public getBitLE(index:number) : number{
        return (this.readBytes() & (1 << index)) >>> index;
    }

    public setBitLE(index:number, value:number) : void{
        //put bit always to 1 so we can make it 0 if necessary with the xor below
        let decimalValue:number=this.readBytes() | (1 << index);

        //im below xor i make bit 0 if needed
        if(value===0) decimalValue=decimalValue ^ (1 << index);

        //write on buffer
        this.writeBytes(decimalValue);
    }

    public getBitsLE(from:number, to:number) : number{
        if(to<=from) throw new Error("Invalid from->to range");
        const waste = (this.length*8-1) - to;
        return (this.readBytes() << waste) >>> (waste + from);
    }

    public setBits(newNumber:number) : void{
        this.writeBytes(newNumber);
    }
}