// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
// NOTE: THIS has not been fully tested
import { ethers } from "ethers";
import * as CryptoJS from "crypto-js";

let device_key: string;
let device_pubkey;
let private_key;
let signupdata;
let pin_salt: string;
let key256Bits_from_pin;

export let wallet: any;

export async function startup() {
  if (localStorage.getItem("deviceprivatekey")) {
    device_key = localStorage.getItem("deviceprivatekey")!;
    device_pubkey = localStorage.getItem("devicepublickey");
  }
  // await checkLoginStatusSupabase();
}

export function createNewWallet(pin: string) {
  let userWallet;
  let deviceWallet;
  if (localStorage.getItem("deviceprivatekey")) {
    device_key = localStorage.getItem("deviceprivatekey")!;
    device_pubkey = localStorage.getItem("devicepublickey");
  }

  if (!pin_salt) {
    pin_salt = ethers.Wallet.createRandom().privateKey;
    //pin_salt = CryptoJS.lib.WordArray.random(128 / 8);
  }

  if (!device_key) {
    deviceWallet = ethers.Wallet.createRandom();
    localStorage.setItem("devicepublickey", deviceWallet!.address);
    localStorage.setItem("deviceprivatekey", deviceWallet!.privateKey);
    device_pubkey = localStorage.getItem("devicepublickey");
    device_key = localStorage.getItem("deviceprivatekey")!;

    console.log(
      "No device key found on signu[] createing a new one " +
        deviceWallet.privateKey.substring(0, 10)
    );
  }

  key256Bits_from_pin = derivePinSaltKey(pin, pin_salt);

  userWallet = ethers.Wallet.createRandom();
  console.log("address:", userWallet!.address);
  console.log("privateKey:", userWallet!.privateKey);
  console.log("privateKey type:", typeof userWallet!.privateKey);

  private_key = userWallet!.privateKey;

  let pin_encrypted_private_key = CryptoJS.AES.encrypt(
    userWallet!.privateKey,
    key256Bits_from_pin
  ).toString();
  let device_encrypted_private_key = CryptoJS.AES.encrypt(
    userWallet!.privateKey,
    device_key
  ).toString();
  console.log(
    "🚀 ~ file: embedded_wallet.ts:72 ~ createNewWallet ~ device_encrypted_private_key:",

    device_encrypted_private_key
  );
  console.log(
    "🚀 ~ file: embedded_wallet.ts:63 ~ createNewWallet ~ private_key:",
    private_key
  );

  return {
    pubkey: userWallet!.address,
    pin_encrypted_private_key: pin_encrypted_private_key,
    pin_salt: pin_salt,
    device_encrypted_private_key: device_encrypted_private_key,
  };
}

export function derivePinSaltKey(pin: string, pin_salt: string) {
  return pin_salt + pin + pin_salt.substring(0, 5);
  /*
  return CryptoJS.PBKDF2(pin, pin_salt, {
    keySize: 256 / 32,
    iterations: 1000,
  });
  */
}

export function decryptWithPin(
  pin: string,
  pin_salt: string,
  pin_encrypted_private_key: string
) {
  key256Bits_from_pin = derivePinSaltKey(pin, pin_salt);
  private_key = CryptoJS.AES.decrypt(
    pin_encrypted_private_key,
    key256Bits_from_pin
  ).toString(CryptoJS.enc.Base64);
  console.log(
    "pin+salt decrypted private key from db :" + private_key.substring(0, 10)
  );
  wallet = new ethers.Wallet(private_key);
  return wallet;
}

// export function decryptWithDeviceKeyImplied() {
//   if (
//     logedinuser &&
//     logedinuser.user_metadata &&
//     logedinuser.user_metadata.device_encrypted_private_key
//   ) {
//     if (localStorage.getItem("decryptWithDeviceKeyImplied() deviceprivatekey"))
//       return decryptWithDeviceKey(
//         logedinuser.user_metadata.device_encrypted_private_key,
//         localStorage.getItem("deviceprivatekey")
//       );
//     else {
//       console.error(
//         "decryptWithDeviceKeyImplied() ~ deviceprivatekey not found in local storage"
//       );
//       return undefined;
//     }
//   } else {
//     console.error(
//       "decryptWithDeviceKeyImplied() ~ logged in user object user.user_metadata.device_encrypted_private_key not found"
//     );
//     return undefined;
//   }
// }

export function decryptWithDeviceKey(
  device_key: string,
  device_encrypted_private_key: string
) {
  console.log("device", device_key, device_encrypted_private_key);

  private_key = CryptoJS.AES.decrypt(
    device_encrypted_private_key,
    device_key
  ).toString(CryptoJS.enc.Utf8);

  console.log("🚀 ~ file: embedded_wallet.ts:142 ~ private_key:", private_key);

  // privateKeyExample = CryptoJS.enc.Utf8.parse(device_key);

  // private_key = CryptoJS.AES.decrypt(device_encrypted_private_key, device_key, {
  //   // 4. Use decrypt instead of encrypt
  //   iv: privateKeyExample,
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7,
  // }).toString(CryptoJS.enc.Utf8);
  console.log("🚀 ~ file: embedded_wallet.ts:142 ~ private_key:", private_key);
  // const privateKeyString = private_key.toString(CryptoJS.enc.Utf8);
  console.log(
    "device key decrypted private key from db :" + private_key.substring(0, 10)
  );
  // wallet = new ethers.Wallet(private_key);
  return private_key;
}

// export async function checkLoginStatusSupabase() {
//   try {
//     const {
//       data: { user },
//     } = await  .auth.getUser();

//     if (user) {
//       console.log("user is logged in with email");
//       decryptWithDeviceKeyImplied();
//       console.log(
//         "checkLoginStatusSupabase( ) ~~ Logged IN" +
//           user.id.substring(0, 5) +
//           " pubkey decrypted: " +
//           (wallet?.address || "no wallet")
//       );
//       logedinuser = user;
//       return user;
//     } else {
//       console.log("checkLoginStatusSupabase( ) ~~ not logged in");
//       return undefined;
//     }
//   } catch {
//     console.error(
//       " checkLoginStatusSupabase( ) ~~ error maybe client.auth.getUser() failed "
//     );
//     return undefined;
//   }
// }

export async function signOutSupabase() {
  console.log("signOutSupabase() ~~ Signing out of supabase ");
  wallet = undefined;
  // await checkLoginStatusSupabase();
}
