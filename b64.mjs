/* This commentaries are made by hand to be processed by https://github.com/StringManolo/docu */

/* lang -> javascript
* name -> b64.mjs
* title -> B64.mjs - Documentation
* filetype -> ES6 module
* description -> Base64 module developed to provide base64 to Quickjs compatible with Quickjs, Node, Browsers.
* summary -> Base64 implementation, compatible with Quickjs, Node, Browsers..
*/

let encodeB64 = data => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  const charsToBin = data => [...data]
    .map(ch => ch
      .codePointAt()
      .toString(2)
      .padStart(8,0)
    )
    .join("")

  let dataBin = charsToBin(data);
  
  const splitIn6 = data => {
    let chunks = [];
    for (let i = 0, e = 6, charsLength = data.length; i < charsLength; i += 6, e += 6) {
      chunks.push(data.substring(i, e));
    }
    return chunks;
  }

  dataBin = splitIn6(dataBin);

  const binaryToText = data => {
    let end = [];
    for (let i in data) {
      if (data[i].length == 6) {
        end.push(charset[parseInt(data[i],2).toString(10)]);
      } else {
        let padding = 6 - data[i].length;
        if (padding / 2 == 1) {
          end.push(charset[parseInt(data[i]+"00",2).toString(10)] + "=");
        } else if(padding / 2 == 2) {
          end.push(charset[parseInt(data[i]+"0000",2).toString(10)] + "==");
        }
      }
    }
    return end.join("");
  }


  return binaryToText(dataBin);
};


let decodeB64 = data => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  const paddingChars = (data.match(/=/g) || []).length;

  let dataBin = [];
  for (let i = 0, aux; i < data.length-paddingChars; ++i) {
    for (let j in charset) {
      if (charset[j] === data[i]) {
        aux = (j >>> 0).toString(2)
        if (aux.length < 6) {
          while (aux.length < 6) {
            aux = "0" + aux;
          }
        }
        dataBin.push(aux);
      }
    }
  }

  if (paddingChars === 1) {
    dataBin.push("00");
  } else if (paddingChars === 2) {
    dataBin.push("0000");
  }

  dataBin = dataBin.join("");
  dataBin = dataBin.match(/.{1,8}/g);

  let end = "";

  for (let i in dataBin) {
    if (+dataBin[i]) {
      end += String.fromCharCode(parseInt(dataBin[i], 2));
    }
  }

  return end;
};

/* function -> base64
* summary -> Encode/Decode base64
* param -> mode -> String -> "e" | "d" to encode or decode
* param -> data -> String -> Base64 string to decode or text to encode
* return -> end -> String -> Base64 encoded string or Utf-8 decoded string
*/
let base64 = (mode, data) => (mode == "e" ? encodeB64(data) : decodeB64(data));

export default base64;
