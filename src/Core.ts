import { REGISTER_SIZE } from "./constants";
import { instrName } from "./disassembler";
import { Instruction } from "./Instruction";
import { Register } from "./Register";


export class Core{
    readonly zero = new Register();
    ra = new Register();  //x1 return address for jumps Preserved: no
    sp = new Register();  //x2 stack pointer Preserved: yes
    gp = new Register();  //x3 global pointer Preserved: n/a
    tp = new Register();  //x4 thread pointer Preserved: n/a

    t0 = new Register();  //x5 temporary register 0 Preserved: no
    t1 = new Register();  //x6 temporary register 1 Preserved: no
    t2 = new Register();  //x7 temporary register 2 Preserved: no

    srFp = new Register();  //x8  s0 or fp yes Preserved: undefined

    s1 = new Register();  //x9 saved register 1 Preserved: yes

    a0 = new Register();  //x10 return value or function argument 0 Preserved: no
    a1 = new Register();  //x11 return value or function argument 1 Preserved: no
    a2 = new Register();  //x12 function argument 2 Preserved: no
    a3 = new Register();  //x13 function argument 3 Preserved: no
    a4 = new Register();  //x14 function argument 4 Preserved: no
    a5 = new Register();  //x15 function argument 5 Preserved: no
    a6 = new Register();  //x16 function argument 6 Preserved: no
    a7 = new Register();  //x17 function argument 7 Preserved: no

    s2 = new Register();  //x18 saved register 2 Preserved: yes
    s3 = new Register();  //x19 saved register 3 Preserved: yes
    s4 = new Register();  //x20 saved register 4 Preserved: yes
    s5 = new Register();  //x21 saved register 5 Preserved: yes
    s6 = new Register();  //x22 saved register 6 Preserved: yes
    s7 = new Register();  //x23 saved register 7 Preserved: yes
    s8 = new Register();  //x24 saved register 8 Preserved: yes
    s9 = new Register();  //x25 saved register 9 Preserved: yes
    s10 = new Register();  //x26 saved register 10 Preserved: yes
    s11 = new Register();  //x27 saved register 11 Preserved: yes

    t3 = new Register();  //x28 temporary register 3 Preserved: no
    t4 = new Register();  //x29 temporary register 4 Preserved: no
    t5 = new Register();  //x30 temporary register 5 Preserved: no
    t6  = new Register();  //x31 temporary register 6 Preserved: no

    pc = new Register();   //program counter

    constructor(){}

    getRegister(registerIndex:number) : Register{
        switch(registerIndex){
            case 0: return this.zero;
            case 1: return this.ra;
            case 2: return this.sp;
            case 3: return this.gp;
            case 4: return this.tp;

            case 5: return this.t0;
            case 6: return this.t1;
            case 7: return this.t2;

            case 8: return this.srFp;
            case 9: return this.s1;

            case 10: return this.a0;
            case 11: return this.a1;
            case 12: return this.a2;
            case 13: return this.a3;
            case 14: return this.a4;
            case 15: return this.a5;
            case 16: return this.a6;
            case 17: return this.a7;

            case 18: return this.s2;
            case 19: return this.s3;
            case 20: return this.s4;
            case 21: return this.s5;
            case 22: return this.s6;
            case 23: return this.s7;
            case 24: return this.s8;
            case 25: return this.s9;
            case 26: return this.s10;
            case 27: return this.s11;
            case 28: return this.t3;
            case 29: return this.t4;
            case 30: return this.t5;
            case 31: return this.t6;

            default : throw new Error("Register not found");
        }
    }

    //ADDI rd, rs1, imm
    //00000000010100101000001010010011 eg
    //31 20 imm |19 15 rs1|14 12 funct3| 11 7 rd| 6 0 op 
    //12 bits   |5 bits   |3 bits      | 5 bits | 7 bits
    addi(ins:Instruction) : void{
        //console.log(ins.rd,ins.rs1,imm); //debug info
        //if most significative bit is 1 subtract 4096
        const imm=ins.bits.getBitLE(31) ? ins.imm11_0-4096 : ins.imm11_0;
        this.getRegister(ins.rd).setValue(this.getRegister(ins.rs1).getValue()+imm);
    }

    exec(ins:Instruction){
        const instName=instrName(ins);
        switch(instName){
            case "addi":    return this.addi(ins);
            default: throw new Error("No instruction found");
        }
    }
}