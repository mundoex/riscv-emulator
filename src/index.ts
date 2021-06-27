import { instrName } from "./disassembler";
import { Instruction } from "./Instruction";

var ins1=new Instruction("004000ef");
var ins2=new Instruction("00800713");
var ins3=new Instruction("80000537");
var ins4=new Instruction("00052583");
var ins5=new Instruction("00450513");
var ins6=new Instruction("00052603");
var ins7=new Instruction("00c586b3");
var ins8=new Instruction("00450513");
var ins9=new Instruction("00d52023");
var ins10=new Instruction("00c005b3");
var ins11=new Instruction("00d00633");
var ins12=new Instruction("fff70713");
var ins13=new Instruction("fe0714e3");

const instructions=[ins1,ins2,ins3,ins4,ins5,ins6,ins7,ins8,ins9,ins10,ins11,ins12,ins13];

instructions.forEach((ins:Instruction)=>{
    console.log(instrName(ins));
});