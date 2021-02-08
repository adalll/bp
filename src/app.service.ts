import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  mnemonicGenerate,
  cryptoWaitReady,
  signatureVerify,
  mnemonicToMiniSecret,
  mnemonicValidate,
  naclKeypairFromSeed,
  createKeyDerived,
  hdLedger,
  keyFromPath,
  mnemonicToLegacySeed,
  keyExtractPath,
  keyExtractSuri,
  schnorrkelDeriveHard,
  schnorrkelKeypairFromSeed,
  schnorrkelDeriveSoft,
} from '@polkadot/util-crypto';
import { u8aToHex, stringToU8a } from '@polkadot/util';

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

const subkey = require('subkey');

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit(): Promise<any> {
    await cryptoWaitReady();

    const mnemonic =
      'oyster leisure hair peace exotic okay boss able aspect outdoor tuition music';
    const mnemonic2 =
      'oyster leisure hair peace exotic okay boss able aspect outdoor tuition music//0';
    const seed = mnemonicToMiniSecret(mnemonic);
    console.log('seed', u8aToHex(seed));
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
    const pair = keyring.addFromUri(mnemonic);
    console.log('pair', u8aToHex(pair.publicKey), pair.address);
    const pair2 = keyring.addFromUri(mnemonic2);
    console.log('pair2', u8aToHex(pair2.publicKey), pair2.address);
    const pair3 = pair.derive('//0');
    console.log('pair3', u8aToHex(pair3.publicKey), pair3.address);

    // const seed = mnemonicToMiniSecret(mnemonic)
    //
    const keypair = schnorrkelKeypairFromSeed(seed);
    const { publicKey, secretKey } = keypair;

    // const pair4 = keyring.addFromUri(u8aToHex(secretKey))
    // console.log('pair4', u8aToHex(pair4.publicKey), pair4.address)

    console.log(u8aToHex(publicKey), u8aToHex(secretKey));

    // const seed = hdLedger(mnemonic, path)
    //
    // console.log(u8aToHex(seed.secretKey), u8aToHex(seed.publicKey))
    //
    // const pair4 = keyring.addFromSeed(seed.secretKey );
    // console.log(u8aToHex(pair4.publicKey), pair4.address)

    // const isValidMnemonic = mnemonicValidate(stashMnemonic);
    // console.log(`isValidMnemonic: ${isValidMnemonic}`);

    // Create valid Substrate-compatible seed from mnemonic
    // const seed = mnemonicToMiniSecret(mnemonic);
    //
    // const pair3 = keyring.addFromSeed(seed, { name: 'stash' });
    //
    // console.log(u8aToHex(seed))
    // console.log(pair.decodePkcs8(pair.toJson().encoded))
    //
    // console.log()

    // console.log(u8aToHex(pair.publicKey))
    // console.log(u8aToHex(pair3.publicKey))

    // const derivedSeed = keyFromPath(,['//0'], 'sr25519')
    //
    // console.log(u8aToHex(derivedSeed));
    //
    // const pair2 = keyring.addFromSeed(derivedSeed);

    // console.log(u8aToHex(pair.derive('//0').publicKey));
    // console.log(u8aToHex(pair2.publicKey));

    // Generate new public/secret keypair for Alice from the supplied seed
    //const { publicKey, secretKey } = naclKeypairFromSeed(seed);

    //console.log(publicKey, pair.publicKey);

    //console.log(u8aToHex(publicKey), u8aToHex(secretKey))

    // const derivedSeed = createKeyDerived(seed, 0);
    //
    // console.log(u8aToHex(derivedSeed));
    //
    // const pair2 = keyring.addFromSeed(derivedSeed);
    //
    // console.log(u8aToHex(pair.derive('//0').publicKey));
    // console.log(u8aToHex(pair2.publicKey));

    // console.log('address', stashPair.address)
    // console.log('publicKey:', u8aToHex(stashPair.publicKey))
    //console.log('publicKey:', stashPair.toJson())
    // console.log('publicKey:', keyring.decodeAddress('5FnMKzuhDeMYL6Aow2UCzUFy3K414mCsZZmsiwtb5yiXj6BC'))
    // console.log(stashPair.derive('//0/2').decodePkcs8())

    // const message = stringToU8a('this is our message');
    // const signature = stashPair.sign(message);
    // const { isValid } = signatureVerify(message, signature, stashPair.address);

    // keyring.setSS58Format(2);
    // console.log('Kusama', stashPair.address);
    // keyring.setSS58Format(0);
    // console.log('Polkadot', stashPair.address);
    //
    // console.log(keyring.decodeAddress('CxDDSH8gS7jecsxaRL9Txf8H5kqesLXAEAEgp76Yz632J9M')); // to public key
    // // 5CSbZ7wG456oty4WoiX6a1J88VUbrCXLhrKVJ9q95BsYH4TZ
    // console.log(keyring.encodeAddress(stashPair.publicKey, 42));

    //console.log(!!"0");

    // const date = new Date();
    // const date2 = new Date();
    // console.log(date);
    //
    // let dates: Date[] = [];
    // dates.push(new Date(date.setHours(date.getHours()-1)));
    // dates.push(new Date(date.setHours(date.getHours()-2)));
    // dates.push(new Date(date.setHours(date.getHours()-2)));
    // dates.push(new Date(date.setHours(date.getHours()+27)));
    // dates.push(new Date(date.setHours(date.getHours()-17)));
    // dates.push(new Date(date.setHours(date.getHours()+20)));
    // dates.push(new Date(date.setHours(date.getHours()-122)));
    //
    // console.log(dates);
    //
    //
    // const findDate = new Date(date2.setHours(date2.getHours()-4));
    // console.log(findDate);
    //
    // dates = dates.sort((a,b) => +a - +b).filter(date => date < findDate);
    // console.log(dates);
    //
    // const closest = dates[dates.length-1];
    //
    // // const closest = dates.reduce((p,c) =>
    // //   Math.abs(+p - +findDate) < Math.abs(+c - +findDate)
    // //     ? p
    // //     : c
    // // );
    //
    // console.log(closest);
    //
    // //console.log(dates);
    //
    // //console.log(new Date(date.setMonth(date.getMonth()-24)));
  }

  getHello(): string {
    return 'Hello World!';
  }
}
