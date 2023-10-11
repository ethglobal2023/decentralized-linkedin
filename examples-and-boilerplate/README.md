# New Instructions

Assuming you have deno installed
Run   `deno run --allow-read=. --allow-net file_server.ts`
You need a local server hosting the index.html  becuase of CORS  not being allowed on file://

Then navigate to   [`http://localhost:8080/index.html`](http://localhost:8080/index.html)

File upload works well wiht web3.storage.  

The IPFS and Helia and Web3.sotrage  clients are not good at downloading.   We have to use a HTTP IPFS gateway 

Additionally  security settings really did not want to use the gateway which web3.storage suggests   https://dweb.link/ipfs/  because of redirects.    But this would be the gateway which for sure alreayd has the data since its connected to the nodes where we uploaded.  For other gateways it may take some time to propagate the file. Our supabase CID retreival function should work well though because of how it tries 3 different gateways one after another.    But perhaps with better CORS control when we are hosted we could use the dweb.link . 



# Original Readme
## web3.storage in the browser from a CDN

A demo using the [`web3.storage`](https://www.npmjs.com/package/web3.storage) client in the browser to pre-calculate the CID for an asset then store it on web3.storage.

Content addressing, IPFS, Filecoin, web3.storage... it's all pretty rad! Here is gateway URL for the Content ID of this example, (stored via web3.storage of course!) so you can check it out in your browser! https://dweb.link/ipfs/bafybeic5r5yxjh5xpmeczfp34ysrjcoa66pllnjgffahopzrl5yhex7d7i

### Getting started

Open `index.html` in your favourite browser and add your files 🚀. 

You need an API token, which you can get by signing in to web3.storage, and clicking "Create an API token"

### Screenshot

![screenshot of the browser demo](https://user-images.githubusercontent.com/58871/127395300-331a21cf-90ab-4471-93e3-5c7e289ce321.png)

