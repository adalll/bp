import { Injectable, OnModuleInit } from '@nestjs/common';
import { litecoin } from './config/network-configs';
import { account1, account2, account3, account4, utxo, inputs1, outputs1 } from './config/test-data-configs';

const lib = require('bitcoinjs-lib');
import createHash from 'create-hash';
import { ECPair } from 'bitcoinjs-lib';
import { TransactionForSign } from './types/transaction-for-sign.type';

//#Inputs * 180 + #Outputs * 34 + 10 + #Inputs

@Injectable()
export class BtcService implements OnModuleInit {

  private privateKey = account1.privateKey;
  private utxo = utxo;

  onModuleInit(): any {

    const fee = (180 * inputs1.length) + (34 * outputs1.length) + 10 + inputs1.length;
    const dataWallet: TransactionForSign = {
      fee: fee,
      inputs: inputs1,
      outputs: outputs1,
    };
    const data = JSON.stringify(dataWallet);
    const dataObj: TransactionForSign = JSON.parse(data);
    const rawTx = this.createRawTransaction(this.utxo, litecoin.testnet);
    const signedHex = this.sign(rawTx, this.privateKey, true);
    console.log(signedHex);
  }

  createRawTransaction(utxo: any, network: any) {

    const psbt = new lib.Psbt({ network: network });
    //const transaction = new lib.TransactionBuilder({ network: network });

    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      nonWitnessUtxo: Buffer.from(
        utxo.hex,
        'hex',
      ),
    });

    psbt.addOutput({
      address: 'mmL9KAraKZqKiv8ygS3Uypdoq9yRMvedqv',
      value: 5000,
    });

    psbt.addOutput({
      address: 'mx5UhLwvd6GspYBin23syP2pWa828FpEBf',
      value: 950000,
    });

    return JSON.stringify(psbt);
  }


  sign(data: string, privateKey: string, isTx?: boolean): string {
    let signedHex = '';
    if (isTx) {
      let psbt = new lib.Psbt();
      psbt = JSON.parse(data);
      const keyPair = lib.ECPair.fromWIF(
        this.privateKey,
        litecoin.testnet,
      );
      psbt.signInput(0, keyPair);
      psbt.validateSignaturesOfInput(0);
      psbt.finalizeAllInputs();
      signedHex = psbt.extractTransaction().toHex();
    }
    return signedHex;
  }
}


// const key = ECPair.fromWIF(this.privateKey, NetworkConfig.);
// const hash = createHash('sha256')
//   .update(data)
//   .digest('hex');
//
// return key.sign(Buffer.from(hash, 'hex')).toString('hex');
// const signed = this.sign(psbt.toHex(), this.privateKey);
// console.log(signed);

//const tx = bitcoin.Transaction.fromHex(rawTransaction);
//console.log(tx);

//let keypair = bitcoin.ECPair.makeRandom(ltcnet);
//const pubKey = keyPair.publicKey.buffer;
//const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: ltcnet });

// console.log(keyPair.publicKey);

//console.log(bitcoin.crypto.hash160(keyPair.publicKey).compare(Buffer.from('b5a8b3861eb44bdda58eca1956e1ff7e30493820')));

//console.log(address);
//console.log(keyPair.toWIF());

// psbt.addInput({
//   hash: unspentOutput.txid,
//   index: unspentOutput.vout,
//   witnessUtxo: {
//     script: Buffer.from(
//       'b5a8b3861eb44bdda58eca1956e1ff7e30493820',
//       'hex',
//     ),
//     value: 90000,
//   },
// });


//     const isSegwit = rawTransaction.substring(8, 12) === '0001';
//     if (isSegwit) {
//       // add segwit transaction input
//
//       psbt.addInput({
//         hash: unspentOutput.txid,
//         index: unspentOutput.vout,
//         witnessUtxo: {
//           script: Buffer.from(unspentOutput.scriptPubKey, 'hex'),
//           value: unspentOutput.amount * 100000000, // value in satoshi
//         },
//         redeemScript: Buffer.from(unspentOutput.redeemScript, 'hex'),
//       });
//     } else {
//       // add non-segwit transaction input
//       psbt.addInput({
//         hash: unspentOutput.txid,
//         index: unspentOutput.vout,
//         nonWitnessUtxo: Buffer.from(rawTransaction, 'hex'),
//         redeemScript: Buffer.from(unspentOutput.redeemScript, 'hex'),
//       });
//     }
// // add output - destination address and the amount to transfer to
//     psbt.addOutput({
//       address: '2NF3WNhdXJzgChaAZgdYjHWaAvYG25Nhz58', // destination address
//       value: 0.5 * 100000000, // value in satoshi (0.5 BTC)
//     });
// // If we look closely, We have input of 1 BTC and we are trying to send 0.5 BTC
// // If we just use these configurations to send the transaction, it will consume remaining 0.5 BTC as fees
// // which we wouldn't want
// // So we'll leave some fee for the transaction, let's say 0.001 BTC and send the remaining amount to change address
// // change address is the address you own where change from the transaction can be sent to
//     psbt.addOutput({
//       address: '2MzaZzn4cuAByJrNRpDHEgE8Z55Y7dsi3Gq’, // change address
//       value: 0.499 * 100000000, // value in satoshi (0.499 BTC)
//     });
// // create transaction end
//



