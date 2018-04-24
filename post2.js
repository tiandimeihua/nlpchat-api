"use strict";

const _ = require("underscore");
const md5 = require("blueimp-md5");
const axios = require("axios");
const qs = require("qs");

//--------------------------------------------------------------------;
//set hashes list;

let hash = [];

hash["app_id"] = 1106775473; //int >0;
hash["time_stamp"] = Math.round(new Date().getTime() / 1000); //int >0;
hash["nonce_str"] = "fa577ce340859f9fe"; //string upTo 32 bytes;
hash["sign"] = ""; //string 32 bytes;
hash["session"] = "100"; //string UTF-8, not null, upTo 32 bytes;
hash["question"] = "你叫啥"; //string UTF-8, not null, upTo 300 bytes;

//console.log(hash);

//--------------------------------------------------------------------;
// var appkey;
let appkey = "v1irTeNouD9mqPO1";

//--------------------------------------------------------------------;
//get sign function
function getSign(hash, appkey) {
  //--------------------------------------------------------------------;
  //1.re-order the hash list;
  let reOrderHash = _.pairs(hash).sort();
  //console.log(reOrderHash);

  //--------------------------------------------------------------------;
  //2.add URLstring;
  let string = "";
  for (let index = 0; index < reOrderHash.length; index++) {
    if (reOrderHash[index][1] !== "") {
      if (reOrderHash[index][0] == "question") {
        string =
          string +
          reOrderHash[index][0] +
          "=" +
          encodeURIComponent(reOrderHash[index][1]).toUpperCase() +
          "&";
      } else {
        string =
          string + reOrderHash[index][0] + "=" + reOrderHash[index][1] + "&";
      }
    }
  }
  //console.log(string);

  //--------------------------------------------------------------------;
  //3.add app_key;
  string = string + "app_key=" + appkey;
  //console.log(string);

  //--------------------------------------------------------------------;
  //4.MD5+uppercase;
  let sign = md5(string).toUpperCase();
  //console.log(sign);

  return sign;
}

hash["sign"] = getSign(hash, appkey);
//console.log(hash);

let options = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify(hash),
  url: "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat"
};

console.log(options.data);

axios(options)
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
