import { ByteArray64 } from "./ByteArray64";

export class Register extends ByteArray64{
    constructor(){
        super();
    }

    public getValue() : number{
        return this.readSBytes();
    }

    public setValue(value:number) : void{
        return this.writeSBytes(value);
    }
}