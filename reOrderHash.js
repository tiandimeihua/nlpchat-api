"use strict";

const utf8 = require('utf8');
const moment = require("moment-timezone");
const _ = require("underscore");

//--------------------------------------------------------------------;
//set hashes list;

let Time = moment()
  .tz("Asia/Shanghai")
  .format();

let hash = [];

hash["app_id"] = "1106775473"; //int >0;
hash["time_stamp"] = Date.parse(Time) / 1000; //int >0;
hash["nonce_str"] = "fa577ce340859f9fe"; //string upTo 32 bytes;
hash["sign"] = ""; //string 32 bytes;
hash["session"] = utf8.encode("100"); //string UTF-8, not null, upTo 32 bytes;
hash["question"] = utf8.encode("你叫啥"); //string UTF-8, not null, upTo 300 bytes;

console.log(hash);

//--------------------------------------------------------------------;
//re-order the hash list;

let reOrderHash = _.pairs(hash).sort();

console.log(reOrderHash);
