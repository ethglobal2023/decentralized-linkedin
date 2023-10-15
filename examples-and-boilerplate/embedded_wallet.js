
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 
// NOTE: THIS has not been fully tested 


import * as supabase from '@supabase/supabase-js'
import { ethers } from "ethers";
import * as CryptoJS  from 'crypto-js';
 




let device_key ;
let device_pubkey;
//let private_key ;
let client;
let signupdata;
export let logedinuser ;
let pin_salt; 


export let wallet;


export  async function startup(){
     //TODO use enviroment params 
     client = supabase.createClient('https://qbuoensvkofstuhnfxzn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTIxMDksImV4cCI6MjAxMjg4ODEwOX0.d7WKH6x2tRcyh42ydu7GVI148PjoFS1BEOc4Adzo7dA')
    
    if (  localStorage.getItem("deviceprivatekey") ){
        device_key=localStorage.getItem("deviceprivatekey")
        device_pubkey = localStorage.getItem("devicepublickey");
        
     }
   await checkLoginStatusSupabase( );
}



export function createNewWallet(pin){
    if (  localStorage.getItem("deviceprivatekey") ){
        device_key=localStorage.getItem("deviceprivatekey")
        device_pubkey = localStorage.getItem("devicepublickey");
    }

    if(!pin_salt){
        pin_salt = CryptoJS.lib.WordArray.random(128 / 8);
    }

    if(!device_key){
   
        const devicewallet = ethers.Wallet.createRandom()
        localStorage.setItem("devicepublickey", devicewallet.address);
        localStorage.setItem("deviceprivatekey", devicewallet.privateKey);
        device_pubkey = localStorage.getItem("devicepublickey");
        device_key = localStorage.getItem("deviceprivatekey");

        console.log("No device key found on signu[] createing a new one "+devicewallet.privateKey.substring(0,10))
    }
    
    key256Bits_from_pin = derivePinSaltKey(pin,pin_salt)


    wallet = ethers.Wallet.createRandom()
    console.log('address:', wallet.address)
    console.log('privateKey:', wallet.privateKey.substring(0,10))

    private_key=wallet.privateKey;

    let pin_encrypted_private_key = CryptoJS.AES.encrypt(wallet.privateKey, key256Bits_from_pin ).toString();
    let device_encrypted_private_key = CryptoJS.AES.encrypt(wallet.privateKey,device_key ).toString();

    return ({
        pubkey: wallet.address,
        pin_encrypted_private_key: pin_encrypted_private_key,
        pin_salt:pin_salt,
        device_encrypted_private_key: device_encrypted_private_key,
    });
    
}

export function derivePinSaltKey(pin,pin_salt){
    return(CryptoJS.PBKDF2(pin, pin_salt, {keySize: 256 / 32,iterations: 1000}))
};

export function decryptWithPin(pin,pin_salt,pin_encrypted_private_key){
    key256Bits_from_pin = derivePinSaltKey(pin,pin_salt)
    private_key = CryptoJS.AES.decrypt(pin_encrypted_private_key,key256Bits_from_pin ).toString(CryptoJS.enc.Utf8);
    console.log("pin+salt decrypted private key from db :"+ private_key.substring(0,10))
    wallet = new ethers.Wallet(private_key) 
    return wallet;
}


export function decryptWithDeviceKeyImplied(){
    if(logedinuser && logedinuser.user_metadata && logedinuser.user_metadata.device_encrypted_private_key ){
        if( localStorage.getItem("decryptWithDeviceKeyImplied() deviceprivatekey"))
            return decryptWithDeviceKey(logedinuser.user_metadata.device_encrypted_private_key, localStorage.getItem("deviceprivatekey") );
        else {
            console.error("decryptWithDeviceKeyImplied() ~ deviceprivatekey not found in local storage")
            return undefined;
        }
    } 
    else {
        console.error("decryptWithDeviceKeyImplied() ~ logged in user object user.user_metadata.device_encrypted_private_key not found")
        return undefined;
    }
}

export function decryptWithDeviceKey(device_key,device_encrypted_private_key){
    private_key=CryptoJS.AES.decrypt(device_encrypted_private_key, device_key ).toString(CryptoJS.enc.Utf8);
    console.log("device key decrypted private key from db :"+ private_key.substring(0,10))
    wallet = new ethers.Wallet(private_key) 
    return wallet;
}


export async function checkLoginStatusSupabase( ){
    try {
        const { data: { user } } = await client.auth.getUser()

        if(user){
            console.log("user is logged in with email");
            decryptWithDeviceKeyImplied();
            console.log("checkLoginStatusSupabase( ) ~~ Logged IN"+(user.id).substring(0,5)+" pubkey decrypted: "+(wallet?.address||"no wallet"));
            logedinuser=user;
            return user;
        }
        else {
            console.log( "checkLoginStatusSupabase( ) ~~ not logged in");
            return undefined;
        }
    }
    catch{
        console.error(" checkLoginStatusSupabase( ) ~~ error maybe client.auth.getUser() failed ")
        return undefined;
    }
}

export async function signOutSupabase(){
   console.log("signOutSupabase() ~~ Signing out of supabase ")
    const { error } = await client.auth.signOut();
    wallet = undefined;
    await checkLoginStatusSupabase();

}

export async function loginSupabase(email,password){
    try {
        if(!client){
            startup()
        }
        const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password:password,
        })
        try {
            let user = await checkLoginStatusSupabase( );
            return user;
        }
        catch{
            console.error("loginSupabase() ~~  could not get user")
            return undefined;
        }
    } 
    catch(error){
        console.error("loginSupabase() ~~  could not login with password"+ error)
        return undefined;
    }
}

export async function supabaseSignUpWithEmail(email,password,pin){
    try{
        if(!client)
            startup()
        const signupdata = createNewWallet(pin);
        const { data, error } = await client.auth.signUp({
            email: email,
            password:  password,
            options: {
                data: signupdata
            }
        })
        await checkLoginStatusSupabase();
    }
    catch(error){
        await checkLoginStatusSupabase();
        console.error("supabaseSignUpWithEmail() ~~  could not create new user"+ error)
    }
}

