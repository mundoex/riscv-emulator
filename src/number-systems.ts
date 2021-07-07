export function hex2Binary(hex:string){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

export function binaryToDecimal(binary:string){
    return parseInt(binary,2);
}

export function decimalToBinary(decimal:number) : string{
    return Number(decimal).toString(2);
}
