export function hex2bin(hex:string){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

export function binToDecimal(opcode:Array<number>){
    return parseInt(opcode.join(""),2);
}

export function binaryDigitsToNumber(digits:number) : number{
    return (1 << digits) - 1;
}