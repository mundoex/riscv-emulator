export type RISCVBaseInstruction = 
"lui"   | "auipc"   | "jal"     | "jalr"    |
"beq"   | "bne"     | "blt"     | "bge"     | "bltu"    | "bgeu" |
"lb"    | "lh"      | "lw"      | "lbu"     | "lhu"     | "sb"   | "sh"      | "sw"      | "srai"   |
"addi"  | "slti"    | "sltiu"   |"xori"     | "ori"     | "andi" | "slli"    | "srli"    | "add"     | "sub"     | "sll"     | "slt"     | "sltu" | "xor" | "srl"   | "sra"     | "or"      | "and"     |
"fence" | "fence.i" | "ecall"   | "ebreak"  |
"csrrw"  |"csrrs"   | "csrrc"   |"csrrwi"   | "csrrsi"   | "csrrci";