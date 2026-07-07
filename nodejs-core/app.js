import { add as sum, substract } from "./math.js";
import myMessage from "./message.js";

const result = sum(2, 4);
const result1 = substract(10, 4);

console.log(myMessage());

console.log(result, result1);
