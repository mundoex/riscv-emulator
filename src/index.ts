import { ByteArray32 } from "./ByteArray32";
import { Core } from "./Core";
import { format, instrName } from "./disassembler";
import { BInstruction32, IInstruction32, JInstruction32, RInstruction32, SInstruction32, UInstruction32 } from "./Instructions";
import { decimalToBinary, decimalToHex } from "./number-systems";

var ins1=new ByteArray32("004000ef");
var ins2=new ByteArray32("00800713");
var ins3=new ByteArray32("80000537");
var ins4=new ByteArray32("00052583");
var ins5=new ByteArray32("00450513");
var ins6=new ByteArray32("00052603");
var ins7=new ByteArray32("00c586b3");
var ins8=new ByteArray32("00450513");
var ins9=new ByteArray32("00d52023");
var ins10=new ByteArray32("00c005b3");
var ins11=new ByteArray32("00d00633");
var ins12=new ByteArray32("fff70713");
var ins13=new ByteArray32("fe0714e3");

const instructions=[ins1,ins2,ins3,ins4,ins5,ins6,ins7,ins8,ins9,ins10,ins11,ins12,ins13];
const programBytes=instructions.map(i=>i.hex).join("");

// instructions.forEach((ins:ByteArray32, i:number)=>{
//     
// });

const core=new Core();

core.storeProgram(programBytes);
core.run();
core.print();