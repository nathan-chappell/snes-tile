let stateJson = require('./state1.json');

const btoUint8Array = (b64: string) => {
    const s = atob(b64);
    const array = new Uint8Array(s.length);
    for (let i = 0; i < s.length; ++i) {
        array[i] = s.charCodeAt(i);
    }
    return array;
}

export interface Snes9xState {
    magic: string
    version: number
}

export const parseState = (state: Uint8Array) => {
    
}

export const printState = () => {
    const array = btoUint8Array(stateJson.state1);
    console.log(array);
}