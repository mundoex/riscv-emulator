import { ByteArray32 } from "./ByteArray32";

export class Instruction{
    bits:ByteArray32;

    constructor(instructionString:string="00000000"){
        this.bits=new ByteArray32(instructionString);
    }

    /**
     * Opcode 0-6
    */
    get opcode(){
        return this.bits.getBitsLE(0, 6);
    }

    /**
     * rd = Destination 7-11
    */
     get rd(){
        return this.bits.getBitsLE(7, 11);
    }

    /**
     * funct3 = Destination 12-14
    */
    get funct3(){
        return this.bits.getBitsLE(12, 14);
    }

    /**
     * rs1 = Destination 15-19
    */
    get rs1(){
        return this.bits.getBitsLE(15, 19);
    }

    /**
     * rs2 = Destination 20-24
    */
    get rs2(){
        return this.bits.getBitsLE(20, 24);
    }

    /**
     * funct7 = Destination 25-31
    */
    get funct7(){
        return this.bits.getBitsLE(25, 31);
    }

    /**
     * imm11_0 = Destination 20-31
    */
    get imm11_0(){
        return this.bits.getBitsLE(20, 31);
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
        return this.bits.getBitsLE(12, 31);
    }

    /**
     * imm4_0 = Destination 7-12
    */
    get imm4_0(){
        return this.rd;
    }

    

}