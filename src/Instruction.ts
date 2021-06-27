import { INSTRUCTION_BITS } from "./constants";
import { binaryDigitsToNumber } from "./number-systems";

export class Instruction{
    bits:Uint8Array;

    constructor(instructionString:string="00000000"){
        this.bits=new Uint8Array(Buffer.from(instructionString, "hex"));
    }

    static padInstruction(binaryString:string){
        //Padding
        let zeroPads="";
        const times=INSTRUCTION_BITS-binaryString.length;
        let i=0;
        for (i; i < times; i++) {
            zeroPads+="0";
        }
        binaryString=zeroPads+binaryString;
        return binaryString;
    }

    private calculateAndBits(digits:number){
        return 0xffffffff & binaryDigitsToNumber(digits);
    }

    /**
     * Because i like it in 1 line i swapped the functions for their implementation else just replace with the comment below
     * digits = end-1
     * binaryDigitsToNumber = (1 << digits) - 1;
     * calculateAndBits = 0xffffffff & (1 << digits) - 1
     * @param start bit index
     * @param end bit index
     * @returns decimal value for the bits
     */
    public getBits(start:number, end:number) : number{
        return (Buffer.from(this.bits.buffer).readUInt32BE() & (0xffffffff & (1 << end+1) - 1)) >> start;
    }

    public setBit(index:number, bitValue:number) : void{
        if(INSTRUCTION_BITS-1 > index) throw new Error("Out of bounds index");
        if(bitValue > 1 || bitValue < 0) throw new Error("Invalid bit value");
        throw new Error("Not implemented");
    }

    /**
     * Opcode 0-6
    */
    get opcode(){
        return this.getBits(0, 6);
    }

    /**
     * rd = Destination 7-11
    */
     get rd(){
        return this.getBits(7, 11);
    }

    /**
     * funct3 = Destination 12-14
    */
    get funct3(){
        return this.getBits(12, 14);
    }

    /**
     * rs1 = Destination 15-19
    */
    get rs1(){
        return this.getBits(15, 19);
    }

    /**
     * rs2 = Destination 20-24
    */
    get rs2(){
        return this.getBits(20, 24);
    }

    /**
     * funct7 = Destination 25-31
    */
    get funct7(){
        return this.getBits(25, 31);
    }

    /**
     * imm11_0 = Destination 20-31
    */
    get imm11_0(){
        return this.getBits(20, 31);
    }

    /**
     * imm11_5 = Destination 25-31
    */
    get imm11_5(){
        return this.funct7;
    }

    /**
     * imm31_12 = Destination 12-31
    */
    get imm31_12(){
        return this.getBits(12, 31);
    }

    /**
     * imm4_0 = Destination 7-12
    */
    get imm4_0(){
        return this.rd;
    }

    

}