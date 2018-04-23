"use strict";

const _ = require("underscore");

//--------------------------------------------------------------------;
//set hashes list;

let hash = [];

hash["app_id"] = "1106775473"; //int >0;
hash["time_stamp"] = Math.round(new Date().getTime() / 1000); //int >0;
hash["nonce_str"] = "fa577ce340859f9fe"; //string upTo 32 bytes;
hash["sign"] = ""; //string 32 bytes;
hash["session"] = "100"; //string UTF-8, not null, upTo 32 bytes;
hash["question"] = "你叫啥"; //string UTF-8, not null, upTo 300 bytes;

console.log(hash);

//--------------------------------------------------------------------;
// var appkey;

let appkey = "v1irTeNouD9mqPO1";

//--------------------------------------------------------------------;
//re-order the hash list;

let reOrderHash = _.pairs(hash).sort();

console.log(reOrderHash);

//--------------------------------------------------------------------;
//add URLstring;

let string = "";
for (let index = 0; index < reOrderHash.length; index++) {
  if (reOrderHash[index][1] !== null) {
    string =
      string +
      reOrderHash[index][0] +
      "=" +
      encodeURIComponent(reOrderHash[index][1]).toUpperCase() +
      "&";
  }
}

console.log(string);

//--------------------------------------------------------------------;
//add app_key;

string = string + "app_key=" + appkey;

console.log(string);