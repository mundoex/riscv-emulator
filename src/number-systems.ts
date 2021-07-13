export function hex2Binary(hex:string){
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

export function binaryToDecimal(binary:string){
    return parseInt(binary,2);
}

export function decimalToBinary(decimal:number) : string{
    return decimal.toString(2);
}

export function decimalToHex(...decimals:Array<number>) : string|string[]{
    return decimals.map(dec=>dec.toString(16));
}