import { ByteArray32 } from "./ByteArray32";
import { instrName } from "./disassembler";
import { InstructionType } from "./InstructionType";
import { decimalToHex } from "./number-systems";
import { RISCVBaseInstruction } from "./RISCVBaseInstruction";

export abstract class Instruction32 extends ByteArray32{
    insType:InstructionType;
    constructor(hexOrBits:string|ByteArray32, insType:InstructionType){
        typeof hexOrBits==="string" ? super(hexOrBits) : super(hexOrBits.hex);
        this.insType=insType;
    }
    
    get opcode() : number{
        return this.getBitsLE(0, 6);
    }

    get rd() : number{
        return this.getBitsLE(7, 11);
    }

    get funct3() : number{
        return this.getBitsLE(12, 14);
    }

    get rs1() : number{
        return this.getBitsLE(15, 19);
    }

    get rs2() : number{
        return this.getBitsLE(20, 24);
    }

    get funct7() : number{
        return this.getBitsLE(25, 31);
    }

    get type() : InstructionType{
        return this.insType;
    }

    get name() : RISCVBaseInstruction{
        return instrName(this);
    }

    abstract get op1() : number;
    abstract get op2() : number;

    get op3() : number{
        throw new Error(`No such Op3 for ${this.insType} Instruction`);
    }

    abstract toString() : string;
}

export class RInstruction32 extends Instruction32{
    constructor(hex:string|ByteArray32){
        super(hex, "R");
    }

    get op1(): number {
        return this.rd;
    }

    get op2(): number {
        return this.rs1;
    }

    get op3(): number {
        return this.rs2;
    }

    toString(): string {
        return `${this.name}\t x${this.rd} x${this.rs1} x${this.rs2}`;
    }
}

export class IInstruction32 extends Instruction32{
    constructor(hex:string|ByteArray32){
        super(hex, "I");
    }

    get i11_0() : number{
        return this.getBitsLE(20, 31);
    }

    get op1() : number{
        return this.rd;
    }

    get op2() : number{
        return this.rs1;
    }

    get op3() :number{
        return this.getBitLE(31) ? this.i11_0-(0xfff+1) : this.i11_0;
    }

    toString(): string {
        return `${this.name}\t x${this.op1} x${this.op2} ${this.op3}`;
    }
}

export class SInstruction32 extends Instruction32{
    constructor(hex:string|ByteArray32){
        super(hex, "S");
    }

    get op1(): number {
        return this.rs2;
    }

    get op2(): number {
        return this.rs1;
    }

    get op3(): number {
        return (this.i11_5 << 5) | this.i4_0;
    }

    get i4_0() : number{
        return this.getBitsLE(7, 11);
    }

    get i11_5() : number{
        return this.getBitsLE(25, 31);
    }

    toString(): string {
        return `${this.name}\t x${this.op1} x${this.op2} ${this.op3}`;
    }
}

export class BInstruction32 extends Instruction32{
    constructor(hex:string|ByteArray32){
        super(hex, "B");
    }

    get i11() : number{
        return this.getBitLE(7);
    }

    get i4_1() : number{
        return this.getBitsLE(8, 11);
    }

    get i10_5() : number{
        return this.getBitsLE(25, 30);
    }

    get i12() : number{
        return this.getBitLE(31);
    }

    get op1(): number {
        return this.rs1;
    }

    get op2(): number {
        return this.rs2;
    }

    get op3(): number {
        const imm=(this.i12 << 12) | (this.i11 << 11) | (this.i10_5 << 5) | (this.i4_1 << 1);
        const immS=this.getBitLE(31) ? ((imm >> 1) - (0xfff+1)) * 2 : imm;
        return immS;
    }

    toString(): string {
        return `${this.name}\t x${this.op1} x${this.op2} ${this.op3}`;
    }
}

export class UInstruction32 extends Instruction32{
    constructor(hex:string|ByteArray32){
        super(hex, "U");
    }

    get i31_12() : number{
        return this.getBitsLE(12, 31);
    }

    get op1(): number {
        return this.rd;
    }

    get op2(): number {
        return this.i31_12;
    }

    toString(): string {
        return `${this.name}\t x${this.op1} 0x${decimalToHex(this.op2)}`;
    }
}

export class JInstruction32 extends Instruction32{
    constructor(hex:string|ByteArray32){
        super(hex, "J");
    }

    get i19_12() : number{
        return this.getBitsLE(12, 19);
    }

    get i11() : number{
        return this.getBitLE(20);
    }

    get i10_1() : number{
        return this.getBitsLE(21, 30);
    }

    get i20() : number{
        return this.getBitLE(31);
    }

    get op1(): number {
        return this.rd;
    }

    get op2(): number {
        return (this.i20 << 20) | (this.i19_12 << 12) |(this.i11 << 11) | (this.i10_1 << 1);
    }

    toString(): string {
        return `${this.name}\t x${this.rd} ${this.op2}`;
    }
}