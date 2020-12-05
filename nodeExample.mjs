import base64 from "./b64.mjs";

let encoded = base64("e", "Hello");
let decoded = base64("d", encoded);

console.log(`Hello encoded: ${encoded}
${encoded} decoded: ${decoded}`);

/* Output:
Hello encoded: SGVsbG8=
SGVsbG8= decoded: Hello
*/
