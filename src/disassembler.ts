import { ByteArray32 } from "./ByteArray32";
import { BInstruction32, IInstruction32, Instruction32, JInstruction32, RInstruction32, SInstruction32, UInstruction32 } from "./Instructions";
import { InstructionType } from "./InstructionType";
import { RISCVBaseInstruction } from "./RISCVBaseInstruction";

const opcodefmt:{[opcode: number]: InstructionType} = {
	0x37:   "U",
	0x17:   "U",
	0x6f:   "J",
	0x67:   "I",
	0x63:   "B",
	0x03:   "I",
	0x23:   "S",
	0x13:   "I",
	0x33:   "R",
	0x0f:   "I",
	0x73:   "I",
};

/**
 * AssemblyPart is a Opcode or Operand from bits
*/
type AssemblyPart=(bits:ByteArray32) => number;
const opcode:AssemblyPart=(bits:ByteArray32) => bits.getBitsLE(0, 6);
const rd:AssemblyPart=(bits:ByteArray32) => bits.getBitsLE(7, 11);
const funct3:AssemblyPart=(bits:ByteArray32) => bits.getBitsLE(12, 14);
const rs1:AssemblyPart=(bits:ByteArray32) => bits.getBitsLE(15, 19);
const rs2:AssemblyPart=(bits:ByteArray32) => bits.getBitsLE(20, 24);
const funct7:AssemblyPart=(bits:ByteArray32) => bits.getBitsLE(25, 31);

export function format(opcode:number) : InstructionType{
    return opcodefmt[opcode];
}

export function instrName(bits:ByteArray32) : RISCVBaseInstruction{
    const opcodeNum=opcode(bits);
    const opcodeType=format(opcodeNum);
    // const ins=new Instruction("", [1,2,3], bits, format(opcodeNum))
    switch (opcodeType) {
        case "R": switch (funct3(bits)) {
            case 0: return funct7(bits) ? "sub": "add";
            case 1: return "sll";
            case 2: return "slt";
            case 3: return "sltu";
            case 4: return "xor";
            case 5: return funct7(bits) ? "sra": "srl";
            case 6: return "or";
            case 7: return "and";
            } break;

        case "I": switch(opcodeNum) {
            case 0x67: return "jalr";
            case 0x03: switch (funct3(bits)) {
                   case 0: return "lb";
                   case 1: return "lh";
                   case 2: return "lw";
                   case 4: return "lbu";
                   case 5: return "lhu";
                   } break;
            case 0x13: switch (funct3(bits)) {
                   case 0: return "addi";
                   case 1: return "slli";
                   case 2: return "slti";
                   case 3: return "sltiu";
                   case 4: return "xori";
                   case 5: return funct7(bits) ? "srai": "srli";
                   case 6: return "ori";
                   case 7: return "andi";
                   } break;
            case 0x0f: switch (funct3(bits)) {
                   case 0: return "fence";
                   case 1: return "fence.i";
                   } break;
            case 0x73: switch (funct3(bits)) {
                   case 0: return rs2(bits) ? "ebreak": "ecall";
                   case 1: return "csrrw";
                   case 2: return "csrrs";
                   case 3: return "csrrc";
                   case 5: return "csrrwi";
                   case 6: return "csrrsi";
                   case 7: return "csrrci";
                   } break;
            } break;
        case "S": switch(funct3(bits)) {
            case 0: return "sb";
            case 1: return "sh";
            case 2: return "sw";
            } break;
        case "B": switch(funct3(bits)) {
            case 0: return "beq";
            case 1: return "bne";
            case 4: return "blt";
            case 5: return "bge";
            case 6: return "bltu";
            case 7: return "bgeu";
            } break;
        case "U": switch(opcodeNum) {
            case 0x37: return "lui";
            case 0x17: return "auipc";
            } break;
        case "J": return "jal";
        default: throw new Error(`No opcode found value:${opcodeNum} type:${opcodeType}`);
        }
        
}

export function bitsToInstruction(bits:ByteArray32) : Instruction32{
    const opcodeNum=opcode(bits);
    const opcodeType=format(opcodeNum);
    switch(opcodeType){
        case "B":   return new BInstruction32(bits);
        case "I":   return new IInstruction32(bits);
        case "J":   return new JInstruction32(bits);
        case "R":   return new RInstruction32(bits);
        case "S":   return new SInstruction32(bits);
        case "U":   return new UInstruction32(bits);
        default: throw new Error("No opcode type found");
    }
}