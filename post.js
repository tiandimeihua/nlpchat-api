"use strict";

const _ = require("underscore");
const md5 = require("blueimp-md5");
const axios = require("axios");
const qs = require("qs");

//--------------input your own information here--------------------------------;
// set your appID and appKey;
let appID = yourOwnID;
let appKey = "yourOwnIDKey";

//--------------input your words here------------------------------------------;
// set the words;
let words = "放入你想说的话";

//-----------------------------------------------------------------------------;
//set hashes list;

let hash = [];

let randomString =
  Math.random()
    .toString(36)
    .substring(2, 10) +
  Math.random()
    .toString(36)
    .substring(2, 10) +
  Math.random()
    .toString(36)
    .substring(2, 10) +
  Math.random()
    .toString(36)
    .substring(2, 10);

hash["app_id"] = appID; //int >0;
hash["time_stamp"] = Math.round(new Date().getTime() / 1000); //int >0;
hash["nonce_str"] = randomString; //string upTo 32 bytes;
hash["sign"] = ""; //string 32 bytes;
hash["session"] = "%29xzsfsd+sdfsadf"; //string UTF-8, not null, upTo 32 bytes;
hash["question"] = words; //string UTF-8, not null, upTo 300 bytes;

//console.log(hash);

//-----------------------------------------------------------------------------;
//get sign function;

function getSign(hash, appKey) {
  //---------------------------------------------------------------------------;
  //1.re-order the hash list;
  let reOrderHash = _.pairs(hash).sort();
  //console.log(reOrderHash);

  //---------------------------------------------------------------------------;
  //2.add URLstring;
  let string = "";
  for (let index = 0; index < reOrderHash.length; index++) {
    if (reOrderHash[index][1] !== "") {
      if (reOrderHash[index][1] == encodeURIComponent(reOrderHash[index][1])) {
        string =
          string + reOrderHash[index][0] + "=" + reOrderHash[index][1] + "&";
      } else {
        string =
          string +
          reOrderHash[index][0] +
          "=" +
          encodeURIComponent(reOrderHash[index][1]) +
          "&";
      }
    }
  }

  string = string.replace("%20", "+");
  //console.log(string);

  //---------------------------------------------------------------------------;
  //3.add app_key;
  string = string + "app_key=" + appKey;
  //console.log(string);

  //---------------------------------------------------------------------------;
  //4.MD5+uppercase;
  let sign = md5(string).toUpperCase();
  console.log(sign.length);

  return sign;
}

hash["sign"] = getSign(hash, appKey);
//console.log(hash);

//-----------------------------------------------------------------------------;
//do post;

let options = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify(hash),
  url: "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat"
};

//console.log(options.data);

axios(options)
  .then(function(response) {
    console.log(response.data.data.answer);
  })
  .catch(function(error) {
    console.log(error);
  });
