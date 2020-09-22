import { Injectable, OnModuleInit } from '@nestjs/common';
import { litecoin } from './config/network-configs';
import { bitcoinsv } from './config/network-configs';
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

    //const data = '{"sum":"50000","fee":"452","inputs":[{"txId":"b188ea4c9e5631e9e5b099d9f28d47ce09d0df92bbffe2fa49f7b0d29fc3cd6b","hex":"01000000000101fef9a4243f8059c52fb8ea5f432dc5db65cb656800a64cbd81f719a9fb98de630100000000f0ffffff03400d0300000000001976a914dbf95284089cdc64d92a1f6ef3ef50a0b396e15988acc71a0c0000000000160014658fa3b17fc277493a0e792bf2e139209cc757c00000000000000000196a1768747470733a2f2f746c74632e6269746170732e636f6d02483045022100b24ae7a9b4427691a28144d94049867a1ff14fe6d4af8ab34e9143cec259e25c02204925f404f49f8e030846d655594590a3cc5ef0a0c727f691b969729a8b3732c30121022183beb67441a0cd53f94a0682cfc12fbd2d1ef44feef38e4a001ca1444dd94900000000","n":0,"value":"200000","address":"n1a4xHRCNYGQhQDA19j83xdXSsM83oFrkx","type":"pubkeyhash","scriptPubKeyHex":"76a914dbf95284089cdc64d92a1f6ef3ef50a0b396e15988ac"}],"outputs":[{"address":"mqdGFzXHixreCSmicjpcV2RBX5TamMM3zL","amount":"50000"},{"address":"mncPSvtVLBTBRxkXUfuKKwQswSw6HXj8Yu","amount":"149548"}]}';
    const data = '{"sum":"50000","fee":"452","inputs":[{"txId":"b188ea4c9e5631e9e5b099d9f28d47ce09d0df92bbffe2fa49f7b0d29fc3cd6b","hex":"01000000000101fef9a4243f8059c52fb8ea5f432dc5db65cb656800a64cbd81f719a9fb98de630100000000f0ffffff03400d0300000000001976a914dbf95284089cdc64d92a1f6ef3ef50a0b396e15988acc71a0c0000000000160014658fa3b17fc277493a0e792bf2e139209cc757c00000000000000000196a1768747470733a2f2f746c74632e6269746170732e636f6d02483045022100b24ae7a9b4427691a28144d94049867a1ff14fe6d4af8ab34e9143cec259e25c02204925f404f49f8e030846d655594590a3cc5ef0a0c727f691b969729a8b3732c30121022183beb67441a0cd53f94a0682cfc12fbd2d1ef44feef38e4a001ca1444dd94900000000","n":0,"value":"200000","address":"n1a4xHRCNYGQhQDA19j83xdXSsM83oFrkx","type":"pubkeyhash","scriptPubKeyHex":"76a914dbf95284089cdc64d92a1f6ef3ef50a0b396e15988ac"}],"outputs":[{"address":"mqdGFzXHixreCSmicjpcV2RBX5TamMM3zL","amount":"50000"},{"address":"n1a4xHRCNYGQhQDA19j83xdXSsM83oFrkx","amount":"149548"}]}';

    const pkey = JSON.stringify({ 'n1a4xHRCNYGQhQDA19j83xdXSsM83oFrkx': 'cUnTHCW9ANikp5t1eXF6a39qUQb4ombmLXqiDHUTfk2JCHHXtot2' });
    const pkey_bsv = JSON.stringify({ 'n1a4xHRCNYGQhQDA19j83xdXSsM83oFrkx': 'cUnTHCW9ANikp5t1eXF6a39qUQb4ombmLXqiDHUTfk2JCHHXtot2' });

    const hex = this.sign(data, pkey, true);


    console.log('hex', hex);
    // //const wifi = ECPair.toWIF('03450cc14421e64896fc7f96320083d1a50b66b1ec9a75ed2b533338dc7ea8d0ce');
    // ///console.log(wifi);
    // const pkh = lib.crypto.hash160(Buffer.from('03450cc14421e64896fc7f96320083d1a50b66b1ec9a75ed2b533338dc7ea8d0ce'), 'hex');
    // console.log(pkh.toString('hex'));
    //
    //
    // const mapPrivateKeys = new Map();
    // mapPrivateKeys.set('n1a4xHRCNYGQhQDA19j83xdXSsM83oFrkx', 'cUnTHCW9ANikp5t1eXF6a39qUQb4ombmLXqiDHUTfk2JCHHXtot2');
    //
    // const fee = (180 * inputs1.length) + (34 * outputs1.length) + 10 + inputs1.length;
    // console.log(fee);
    // const dataWallet: TransactionForSign = {
    //   fee: fee,
    //   inputs: inputs1,
    //   outputs: outputs1,
    // };
    // const data = JSON.stringify(dataWallet);
    // const signedTx = this.sign(data, mapPrivateKeys, true);
    // console.log(signedTx);
  }

  sign(data: string, privateKey: string, isTx = true): string {

    if (isTx) {
      const dataObj = JSON.parse(data);
      const mapPrivateKeys = JSON.parse(privateKey);
      let signedHex = '';
      const tx = new lib.Psbt({ network: litecoin.testnet });
      for (const input of dataObj.inputs) {
        if (input.type.includes('witness')) {
          tx.addInput({
            hash: input.txId,
            index: input.n,
            witnessUtxo: {
              script: Buffer.from(input.scriptPubKeyHex, 'hex'),
              value: +input.value,
            },
          });
        } else {
          console.log(input);
          tx.addInput({
            hash: input.txId,
            index: input.n,
            nonWitnessUtxo: Buffer.from(
              input.hex,
              'hex',
            ),
          });
        }
      }
      for (const output of dataObj.outputs) {
        tx.addOutput({
          address: output.address,
          value: +output.amount,
        });
      }

      for (const [index, input] of dataObj.inputs.entries()) {
        const keyPair = lib.ECPair.fromWIF(
          mapPrivateKeys[input.address],
          litecoin.testnet,
        );
        tx.signInput(index, keyPair);
        tx.validateSignaturesOfInput(index);
      }
      tx.finalizeAllInputs();
      signedHex = tx.extractTransaction().toHex();
      return signedHex;
    }


    const key = ECPair.fromWIF(privateKey, litecoin.testnet);
    const hash = createHash('sha256')
      .update(data)
      .digest('hex');

    return key.sign(Buffer.from(hash, 'hex')).toString('hex');
  }

  // sign(data: string, mapPrivateKeys: Map<string, string>, isTx?: boolean): string {
  //
  //   const dataObj: TransactionForSign = JSON.parse(data);
  //   let signedHex = '';
  //   if (isTx) {
  //     const tx = new lib.Psbt({ network: litecoin.testnet });
  //     for (const input of dataObj.inputs) {
  //       if (input.type.includes('witness')) {
  //         tx.addInput({
  //           hash: input.txId,
  //           index: input.n,
  //           witnessUtxo: {
  //             script: Buffer.from(input.scriptPubKeyHex, 'hex'),
  //             value: input.value,
  //           },
  //         });
  //       } else {
  //         tx.addInput({
  //           hash: input.txId,
  //           index: input.n,
  //           nonWitnessUtxo: Buffer.from(
  //             input.hex,
  //             'hex',
  //           ),
  //         });
  //       }
  //       tx.addInput({
  //         hash: input.txId,
  //         index: input.n,
  //         nonWitnessUtxo: Buffer.from(
  //           input.hex,
  //           'hex',
  //         ),
  //       });
  //     }
  //     for (const output of dataObj.outputs) {
  //       tx.addOutput({
  //         address: output.address,
  //         value: output.amount,
  //       });
  //     }
  //
  //     for (const [index, input] of dataObj.inputs.entries()) {
  //       const keyPair = lib.ECPair.fromWIF(
  //         mapPrivateKeys.get(input.address),
  //         litecoin.testnet,
  //       );
  //       tx.signInput(index, keyPair);
  //       tx.validateSignaturesOfInput(index);
  //     }
  //     tx.finalizeAllInputs();
  //     signedHex = tx.extractTransaction().toHex();
  //   }
  //   return signedHex;
  // }


  // onModuleInit(): any {
  //   const mapPrivateKeys = new Map();
  //   mapPrivateKeys.set('n1a4xHRCNYGQhQDA19j83xdXSsM83oFrkx', 'cUnTHCW9ANikp5t1eXF6a39qUQb4ombmLXqiDHUTfk2JCHHXtot2');
  //
  //   const fee = (180 * inputs1.length) + (34 * outputs1.length) + 10 + inputs1.length;
  //   const dataWallet: TransactionForSign = {
  //     fee: fee,
  //     inputs: inputs1,
  //     outputs: outputs1,
  //   };
  //   const data = JSON.stringify(dataWallet);
  //   const dataObj: TransactionForSign = JSON.parse(data);
  //
  //
  //
  //   const rawTx = this.createRawTransaction(this.utxo, litecoin.testnet);
  //   const signedHex = this.sign(rawTx, this.privateKey, true);
  //   console.log(signedHex);
  // }


  // createRawTransaction(utxo: any, network: any) {
  //
  //   const psbt = new lib.Psbt({ network: network });
  //   //const transaction = new lib.TransactionBuilder({ network: network });
  //
  //   psbt.addInput({
  //     hash: utxo.txid,
  //     index: utxo.vout,
  //     nonWitnessUtxo: Buffer.from(
  //       utxo.hex,
  //       'hex',
  //     ),
  //   });
  //
  //   psbt.addOutput({
  //     address: 'mmL9KAraKZqKiv8ygS3Uypdoq9yRMvedqv',
  //     value: 5000,
  //   });
  //
  //   psbt.addOutput({
  //     address: 'mx5UhLwvd6GspYBin23syP2pWa828FpEBf',
  //     value: 950000,
  //   });
  //
  //   return JSON.stringify(psbt);
  // }
  //
  //
  // sign(data: string, privateKey: string, isTx?: boolean): string {
  //   let signedHex = '';
  //   if (isTx) {
  //     let psbt = new lib.Psbt();
  //     psbt = JSON.parse(data);
  //     const keyPair = lib.ECPair.fromWIF(
  //       this.privateKey,
  //       litecoin.testnet,
  //     );
  //     psbt.signInput(0, keyPair);
  //     psbt.validateSignaturesOfInput(0);
  //     psbt.finalizeAllInputs();
  //     signedHex = psbt.extractTransaction().toHex();
  //   }
  //   return signedHex;
  // }
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



