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
    let end = "";
    for (let i in data) {
      if (data[i].length == 6) {
        end += charset[parseInt(data[i],2).toString(10)];
      } else {
        let padding = 6 - data[i].length;
        if (padding / 2 == 1) {
          end += charset[parseInt(data[i]+"00",2).toString(10)] + "=";
        } else if(padding / 2 == 2) {
          end += charset[parseInt(data[i]+"0000",2).toString(10)] + "==";
        }
      }
    }
    return end;
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

let base64 = (mode, data) => (mode == "e" ? encodeB64(data) : decodeB64(data));

export default base64;
