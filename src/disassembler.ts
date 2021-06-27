import { Instruction } from "./Instruction";
import { binToDecimal } from "./number-systems";

const opcodefmt = {
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

export function format(opcode:number) : string{
    //@ts-ignore
    return opcodefmt[opcode];
}

export function instrName(ins:Instruction) : string{
    switch (format(ins.opcode)) {
        case "R": switch (ins.funct3) {
            case 0: return ins.funct7 ? "sub": "add";
            case 1: return "sll";
            case 2: return "slt";
            case 3: return "sltu";
            case 4: return "xor";
            case 5: return ins.funct7 ? "sra": "srl";
            case 6: return "or";
            case 7: return "and";
            } break;

        case "I": switch(ins.opcode) {
            case 0x67: return "jalr";
            case 0x03: switch (ins.funct3) {
                   case 0: return "lb";
                   case 1: return "lh";
                   case 2: return "lw";
                   case 4: return "lbu";
                   case 5: return "lhu";
                   } break;
            case 0x13: switch (ins.funct3) {
                   case 0: return "addi";
                   case 1: return "slli";
                   case 2: return "slti";
                   case 3: return "sltiu";
                   case 4: return "xori";
                   case 5: return ins.funct7 ? "srai": "srli";
                   case 6: return "ori";
                   case 7: return "andi";
                   } break;
            case 0x0f: switch (ins.funct3) {
                   case 0: return "fence";
                   case 1: return "fence.i";
                   } break;
            case 0x73: switch (ins.funct3) {
                   case 0: return ins.rs2 ? "ebreak": "ecall";
                   case 1: return "csrrw";
                   case 2: return "csrrs";
                   case 3: return "csrrc";
                   case 5: return "csrrwi";
                   case 6: return "csrrsi";
                   case 7: return "csrrci";
                   } break;
            } break;
        case "S": switch(ins.funct3) {
            case 0: return "sb";
            case 1: return "sh";
            case 2: return "sw";
            } break;
        case "B": switch(ins.funct3) {
            case 0: return "beq";
            case 1: return "bne";
            case 4: return "blt";
            case 5: return "bge";
            case 6: return "bltu";
            case 7: return "bgeu";
            } break;
        case "U": switch(ins.opcode) {
            case 0x37: return "lui";
            case 0x17: return "auipc";
            } break;
        case "J": return "jal";
        }
        return "";
}