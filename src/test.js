"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ecpair_1 = require("ecpair");
var ecc = require("tiny-secp256k1");
var bitcoinjs_lib_1 = require("bitcoinjs-lib");
var ECPair = (0, ecpair_1.ECPairFactory)(ecc);
var wif = 'cQYBgCsbCjst9qWXyHxDfbGv6AhoVkAPJfQRJuvbtVYyNLru4RmK';
try {
    var keyPair = ECPair.fromWIF(wif);
    var address = bitcoinjs_lib_1.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    console.log("The address for the given WIF is: ".concat(address));
}
catch (e) {
    console.error("Error: ".concat(e.message));
}
