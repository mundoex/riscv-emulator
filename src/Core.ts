import { ByteArray32 } from "./ByteArray32";
import { bitsToInstruction } from "./disassembler";
import { BInstruction32, IInstruction32, Instruction32, JInstruction32, RInstruction32, SInstruction32, UInstruction32 } from "./Instructions";
import { decimalToHex } from "./number-systems";
import { Register } from "./Register";

export class Core{
    public debugMode:boolean=true;
    public static readonly STEP=4;
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

    pc = 0;   //program counter

    //memory
    memory=new Array<ByteArray32>();

    constructor(){}

    storeProgram(programHex:string){
        const numChunks = Math.ceil(programHex.length / 8);

        for (let i = 0, o = 0; i < numChunks; ++i, o += 8) {
            const hex = programHex.substr(o, 8);
            this.memory.push(new ByteArray32(hex));
        }
    }

    printMemory(){
        this.memory.forEach((bits, i) => console.log(`${decimalToHex(i*4)}:\t${bits.hex}`));
    }

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

    fetch() : ByteArray32{
        const nextInstBits=this.memory[this.pc/Core.STEP];
        this.pc+=Core.STEP;
        return nextInstBits;
    }

    decode(bits:ByteArray32) : Instruction32{
        return bitsToInstruction(bits);
    }

    execute(ins:Instruction32) : void{
        if(this.debugMode) console.log("Executing "+ins.toString());

        switch(ins.name){
            case "jal":     return this.jal(<JInstruction32> ins);
            case "addi":    return this.addi(<IInstruction32> ins);
            case "lui":     return this.lui(<UInstruction32> ins);
            case "lw":      return this.lw(<IInstruction32> ins);
            case "add":     return this.add(<RInstruction32> ins);
            case "sw":      return this.sw(<SInstruction32> ins);
            case "bne":     return this.bne(<BInstruction32> ins);
            default: throw new Error("No instruction name found");
        }
    }

    run(){
        let bits:ByteArray32;
        while((bits=this.fetch()) !== undefined){
            const ins:Instruction32=this.decode(bits);
            this.execute(ins);
        }
    }

    print() : void{
        console.log("Core values in registers:");
        for (let i = 0; i < 32; i++) {
            console.log(`Binary Format x${i}: ${this.getRegister(i).binary}`);
        }
    }

    /*
    The jump and link (JAL) instruction uses the J-type format, where the J-immediate encodes a
    signed offset in multiples of 2 bytes. The offset is sign-extended and added to the pc to form the
    jump target address. Jumps can therefore target a ±1 MiB range. JAL stores the address of the
    instruction following the jump (pc+4) into register rd. The standard software calling convention
    uses x1 as the return address register and x5 as an alternate link register.
    Plain unconditional jumps (assembler pseudo-op J) are encoded as a JAL with rd=x0
    */
    jal(ins:JInstruction32) : void{
        this.getRegister(ins.op1).setValue(this.pc+Core.STEP);
        this.pc=ins.op2;
    }

    /*
    ADDI adds the sign-extended 12-bit immediate to register rs1. Arithmetic overflow is ignored and
    the result is simply the low XLEN bits of the result. ADDI rd, rs1, 0 is used to implement the MV
    rd, rs1 assembler pseudo-instruction.
    */
    addi(ins:IInstruction32) : void{
        this.getRegister(ins.op1).setValue(this.getRegister(ins.op2).decimal + ins.op3);
    }

    /*
    LUI (load upper immediate) is used to build 32-bit constants and uses the U-type format. LUI
    places the U-immediate value in the top 20 bits of the destination register rd, filling in the lowest
    12 bits with zeros.
    */
    lui(ins:UInstruction32) : void{
        this.getRegister(ins.op1).setValue(ins.op2 << 12);
    }

    /*
    The LW instruction loads a 32-bit value from memory into rd. LH loads a 16-bit value from memory,
    then sign-extends to 32-bits before storing in rd. LHU loads a 16-bit value from memory but then
    zero extends to 32-bits before storing in rd. LB and LBU are defined analogously for 8-bit values.
    The SW, SH, and SB instructions store 32-bit, 16-bit, and 8-bit values from the low bits of register
    rs2 to memory.
    */
    lw(ins:IInstruction32) : void{
        //TODO missing 32bits mask and offset requires fix
        this.getRegister(ins.op1).setValue(this.getRegister(ins.op2).getValue());
    }
    //TODO fix:add is setvalue is sending negative value
    add(ins:RInstruction32) : void{
        this.getRegister(ins.op1).setValue(this.getRegister(ins.op2).getValue() + this.getRegister(ins.op3).getValue());
    }
    /*
    Load and store instructions transfer a value between the registers and memory. Loads are encoded
    in the I-type format and stores are S-type. The effective byte address is obtained by adding register
    rs1 to the sign-extended 12-bit offset. Loads copy a value from memory to register rd. Stores copy
    the value in register rs2 to memory.
    The LW instruction loads a 32-bit value from memory into rd. LH loads a 16-bit value from memory,
    then sign-extends to 32-bits before storing in rd. LHU loads a 16-bit value from memory but then
    zero extends to 32-bits before storing in rd. LB and LBU are defined analogously for 8-bit values.
    The SW, SH, and 
    */
    sw(ins:SInstruction32) : void{
        //TODO missing 32bits mask and offset requires fix
        this.getRegister(ins.op2).setValue(this.getRegister(ins.op1).getValue())
    }

    /*
    Branch instructions compare two registers. BEQ and BNE take the branch if registers rs1 and rs2
    are equal or unequal respectively. BLT and BLTU take the branch if rs1 is less than rs2, using
    signed and unsigned comparison respectively. BGE and BGEU take the branch if rs1 is greater
    than or equal to rs2, using signed and unsigned comparison respectively. Note, BGT, BGTU,
    BLE, and BLEU can be synthesized by reversing the operands to BLT, BLTU, BGE, and BGEU,
    respectively
    */
    bne(ins:BInstruction32) : void{
        if(this.getRegister(ins.op1).getValue()!==this.getRegister(ins.op2).getValue()){
            this.pc+=ins.op3;
        }
    }
}