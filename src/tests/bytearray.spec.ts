import { ByteArray64 } from "../ByteArray64";
import { ByteArray32 } from "../ByteArray32";
import { binaryToDecimal } from "../number-systems";



// let bits64arr0=new ByteArray64("004000ef");
// let bits64arr1=new ByteArray64("00450513");
// let bits64arr2=new ByteArray64("00c005b3");
// let bits64arr3=new ByteArray64("fff70713");

describe("ByteArray32 Tests", function() {

    it("binary",function(){
        let bits32arr0=new ByteArray32("004000ef");
        let bits32arr1=new ByteArray32("00450513");
        let bits32arr2=new ByteArray32("00c005b3");
        let bits32arr3=new ByteArray32("fff70713");

        expect(bits32arr0.binary).toEqual("10000000000000011101111")
        expect(bits32arr1.binary).toEqual("10001010000010100010011")
        expect(bits32arr2.binary).toEqual("110000000000010110110011")
        expect(bits32arr3.binary).toEqual("11111111111101110000011100010011")
    });

    it("decimal",function(){
        let bits32arr0=new ByteArray32("004000ef");
        let bits32arr1=new ByteArray32("00450513");
        let bits32arr2=new ByteArray32("00c005b3");
        let bits32arr3=new ByteArray32("fff70713");

        expect(bits32arr0.decimal).toEqual(4194543)
        expect(bits32arr1.decimal).toEqual(4523283)
        expect(bits32arr2.decimal).toEqual(12584371)
        expect(bits32arr3.decimal).toEqual(4294379283)
    });

    it("hex",function(){
        let bits32arr0=new ByteArray32("004000ef");
        let bits32arr1=new ByteArray32("00450513");
        let bits32arr2=new ByteArray32("00c005b3");
        let bits32arr3=new ByteArray32("fff70713");

        expect(bits32arr0.hex).toEqual("004000ef")
        expect(bits32arr1.hex).toEqual("00450513")
        expect(bits32arr2.hex).toEqual("00c005b3")
        expect(bits32arr3.hex).toEqual("fff70713")
    });
        
    it("Get bit",function(){
        let bits32arr0=new ByteArray32("004000ef");
        let bits32arr1=new ByteArray32("00450513");
        let bits32arr2=new ByteArray32("00c005b3");
        let bits32arr3=new ByteArray32("fff70713");

        let bin0=bits32arr0.binary.split("");
        bin0.forEach((char,i)=>{
            let LEPos=bin0.length-1-i;
            expect(parseInt(char)).toEqual(bits32arr0.getBitLE(LEPos))
        });

        let bin1=bits32arr1.binary.split("");
        bin1.forEach((char,i)=>{
            let LEPos=bin1.length-1-i;
            expect(parseInt(char)).toEqual(bits32arr1.getBitLE(LEPos))
        });

        let bin2=bits32arr2.binary.split("");
        bin2.forEach((char,i)=>{
            let LEPos=bin2.length-1-i;
            expect(parseInt(char)).toEqual(bits32arr2.getBitLE(LEPos))
        });

        let bin3=bits32arr3.binary.split("");
        bin3.forEach((char,i)=>{
            let LEPos=bin3.length-1-i;
            expect(parseInt(char)).toEqual(bits32arr3.getBitLE(LEPos))
        });

    });
    
    it("Set bit",function(){
        let bits32arr0=new ByteArray32("004000ef");
        let bits32arr1=new ByteArray32("00450513");
        let bits32arr2=new ByteArray32("00c005b3");
        let bits32arr3=new ByteArray32("fff70713");

        bits32arr0.setBitLE(0,0);
        expect(bits32arr0.getBitLE(0)).toEqual(0);
        bits32arr0.setBitLE(0,1);
        expect(bits32arr0.getBitLE(0)).toEqual(1);
    });

    it("Get bits",function(){
        let bits32arr0=new ByteArray32("004000ef");
        let bits32arr1=new ByteArray32("00450513");
        let bits32arr2=new ByteArray32("00c005b3");
        let bits32arr3=new ByteArray32("fff70713");

        expect(bits32arr0.getBitsLE(0,3)).toEqual(binaryToDecimal("1111"));
        expect(bits32arr1.getBitsLE(0,3)).toEqual(binaryToDecimal("0011"));
        expect(bits32arr2.getBitsLE(0,3)).toEqual(binaryToDecimal("0011"));
        expect(bits32arr3.getBitsLE(0,3)).toEqual(binaryToDecimal("0011"));

        expect(bits32arr0.getBitsLE(29,31)).toEqual(binaryToDecimal("000"));
        expect(bits32arr1.getBitsLE(29,31)).toEqual(binaryToDecimal("000"));
        expect(bits32arr2.getBitsLE(29,31)).toEqual(binaryToDecimal("000"));
        expect(bits32arr3.getBitsLE(29,31)).toEqual(binaryToDecimal("111"));
    });

    it("Set bits",function(){
        let bits32arr0=new ByteArray32("004000ef");
        let bits32arr1=new ByteArray32("00450513");
        let bits32arr2=new ByteArray32("00c005b3");
        let bits32arr3=new ByteArray32("fff70713");

        bits32arr0.setBits(420);
        expect(bits32arr0.decimal).toEqual(420);

        bits32arr0.setBits(bits32arr0.maxValue);
        expect(bits32arr0.decimal).toEqual(bits32arr0.maxValue);

        expect(bits32arr0.getBitsLE(0,2)).toEqual(binaryToDecimal("111"));
    });
});