import { stripHtml } from "string-strip-html";

export const clearData = ( data ) => {
    const output = { ...data };
    for(let param in data) {
        if(typeof output[param] === 'string'){
        output[param] = (stripHtml(data[param]).result).trim();
        }
    }
    return output;
}