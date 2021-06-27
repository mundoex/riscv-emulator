import { REGISTER_SIZE } from "./constants";

const zero = new Uint8Array(REGISTER_SIZE);  //x0 hardwired to 0, ignores writes Preserved: n/a

let ra = new Uint8Array(REGISTER_SIZE);  //x1 return address for jumps Preserved: no
let sp = new Uint8Array(REGISTER_SIZE);  //x2 stack pointer Preserved: yes
let gp = new Uint8Array(REGISTER_SIZE);  //x3 global pointer Preserved: n/a
let tp = new Uint8Array(REGISTER_SIZE);  //x4 thread pointer Preserved: n/a

let t0 = new Uint8Array(REGISTER_SIZE);  //x5 temporary register 0 Preserved: no
let t1 = new Uint8Array(REGISTER_SIZE);  //x6 temporary register 1 Preserved: no
let t2 = new Uint8Array(REGISTER_SIZE);  //x7 temporary register 2 Preserved: no

let srFp = new Uint8Array(REGISTER_SIZE);  //x8  s0 or fp yes Preserved: undefined

let s1 = new Uint8Array(REGISTER_SIZE);  //x9 saved register 1 Preserved: yes

let a0 = new Uint8Array(REGISTER_SIZE);  //x10 return value or function argument 0 Preserved: no
let a1 = new Uint8Array(REGISTER_SIZE);  //x11 return value or function argument 1 Preserved: no
let a2 = new Uint8Array(REGISTER_SIZE);  //x12 function argument 2 Preserved: no
let a3 = new Uint8Array(REGISTER_SIZE);  //x13 function argument 3 Preserved: no
let a4 = new Uint8Array(REGISTER_SIZE);  //x14 function argument 4 Preserved: no
let a5 = new Uint8Array(REGISTER_SIZE);  //x15 function argument 5 Preserved: no
let a6 = new Uint8Array(REGISTER_SIZE);  //x16 function argument 6 Preserved: no
let a7 = new Uint8Array(REGISTER_SIZE);  //x17 function argument 7 Preserved: no

let s2 = new Uint8Array(REGISTER_SIZE);  //x18 saved register 2 Preserved: yes
let s3 = new Uint8Array(REGISTER_SIZE);  //x19 saved register 3 Preserved: yes
let s4 = new Uint8Array(REGISTER_SIZE);  //x20 saved register 4 Preserved: yes
let s5 = new Uint8Array(REGISTER_SIZE);  //x21 saved register 5 Preserved: yes
let s6 = new Uint8Array(REGISTER_SIZE);  //x22 saved register 6 Preserved: yes
let s7 = new Uint8Array(REGISTER_SIZE);  //x23 saved register 7 Preserved: yes
let s8 = new Uint8Array(REGISTER_SIZE);  //x24 saved register 8 Preserved: yes
let s9 = new Uint8Array(REGISTER_SIZE);  //x25 saved register 9 Preserved: yes
let s10 = new Uint8Array(REGISTER_SIZE);  //x26 saved register 10 Preserved: yes
let s11 = new Uint8Array(REGISTER_SIZE);  //x27 saved register 11 Preserved: yes

let t3 = new Uint8Array(REGISTER_SIZE);  //x28 temporary register 3 Preserved: no
let t4 = new Uint8Array(REGISTER_SIZE);  //x29 temporary register 4 Preserved: no
let t5 = new Uint8Array(REGISTER_SIZE);  //x30 temporary register 5 Preserved: no
let t6  = new Uint8Array(REGISTER_SIZE);  //x31 temporary register 6 Preserved: no
let pc = new Uint8Array(REGISTER_SIZE);   //program counter