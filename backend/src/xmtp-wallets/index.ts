import { init, fetchQuery } from "@airstack/node";

import { fetchGitcoinPassportUsers } from "../gitcoin-passports/index.js";
import { fetchTalentLayerUsers } from "../talentlayer/index.js";
import * as fs from "fs";

type User = {
  address: string;
  id: string;
  cid?: string;
  tokenId?: string;
  score?: number;
  document: {
    numReviews?: string;
    handle?: string;
    rating?: string;
    description?: any;
    index?: string;
    transactionHash?: string;
  };
};

const talentLayerUsers = await fetchTalentLayerUsers();
const gitcoinPassportUsers = await fetchGitcoinPassportUsers();

// const gitcoinPassportUsers = [
//   {
//     address: "0x3195db4b802f13bee0e7880d581b5fe48d60e992",
//     id: "0xc3e11e0941a93858e92bb7e123ca01857282104f7fb3d244c2df1541b36fb3d356000000",
//     tokenId: "20780",
//     score: 22,
//     document: {
//       index: "20817",
//       transactionHash:
//         "0xc3e11e0941a93858e92bb7e123ca01857282104f7fb3d244c2df1541b36fb3d3",
//     },
//   },
//   {
//     address: "0x1ba52ee3c678f1c177566e51a99fa606c5c7d397",
//     id: "432423423423423423423423423423",
//     tokenId: "20780",
//     score: 256,
//     document: {
//       index: "20817",
//       transactionHash:
//         "0xc3e11e0941a93858e92bb7e123dfgdfgf7282104f7fb3d244c2df1541b36fb3d3",
//     },
//   },
//   {
//     address: "0x6565219e0bb323e56a7e668fd1e629498c9d9aae",
//     id: "0x5c0883fd95f5ee56cf3965bdceecf1d80ffac1df80cbb494e3442b3d83b6cac7a3000000",
//     tokenId: "10196",
//     score: 0,
//     document: {
//       index: "20910",
//       transactionHash:
//         "0x5c0883fd95f5ee56cf3965bdceecf1d80ffac1df80cbb494e3442b3d83b6cac7",
//     },
//   },
// ];

// const talentLayerUsers = [
//   {
//     address: "0x35d47477286dbe0d17ef21fbfd07d3c5adf03ebb",
//     id: "11893",
//     cid: "QmXoz8qkXwquezerP2NTEX3h4Uj1Jebv3iCCxwCmFQEbqB",
//     document: {
//       numReviews: "0",
//       handle: "rschoutens",
//       rating: "0",
//       description: null,
//     },
//   },
//   {
//     id: "69",
//     address: "0x1ba52ee3c678f1c177566e51a99fa606c5c7d397",
//     cid: "QmXoz8qkXwquezerP2NTEX3h4Uj1Jebv3iCCxwCmFQEbqB",
//     document: {
//       numReviews: "0",
//       handle: "aegyptus",
//       rating: "0",
//       description: null,
//     },
//   },
//   {
//     id: "73",
//     address: "0x3d81fa04b30c7ac4571274e17891fbb9be8a5bf3",
//     cid: "QmXoz8qkXwquezerP2NTEX3h4Uj1Jebv3iCCxwCmFQEbqB",
//     document: {
//       numReviews: "0",
//       handle: "pixely",
//       rating: "0",
//       description: null,
//     },
//   },
// ];

// Combine the two arrays
const combinedArray = [...talentLayerUsers, ...gitcoinPassportUsers];

const addressMap: { [key: string]: User } = {};

// Create a map to track unique addresses and their corresponding objects
combinedArray.forEach((user) => {
  console.log("combined user", user);

  const key = user.address;
  console.log("🚀 ~ file: index.ts:44 ~ combinedArray.forEach ~ key:", key);
  if (key in addressMap) {
    // Address already exists in the map, merge the objects
    const existingUser = addressMap[key];

    if ("cid" in user) {
      existingUser.id = `${user.id}`;
      existingUser.cid = `${user.cid}`;
      existingUser.document.numReviews = `${user.document.numReviews}`;
      existingUser.document.handle = `${user.document.handle}`;
      existingUser.document.rating = `${user.document.rating}`;
      existingUser.document.description = user.document.description;
      // You can merge the 'description' property as needed
    } else {
      //   existingUser.id += `, ${user.id}`;
      console.log("user gitc", user);

      existingUser.tokenId = `${user.tokenId}`;
      console.log("before", existingUser);
      existingUser.document.index = `${user.document.index}`;
      console.log("after", user.id);

      existingUser.document.transactionHash = `${user.document.transactionHash}`;
      existingUser.score = user.score;
    }
  } else {
    // Address is unique, add it to the map
    addressMap[key] = { ...user };
  }
});

// Convert the map values back to an array
const mergedArray: User[] = Object.values(addressMap);
console.log("🚀 ~ file: index.ts:72 ~ mergedArray:", mergedArray);
// mergedArray now contains the objects with unique addresses or merged objects

const airstackAPIKeys = [
  "148c64fde3cf4c078d5da3c559b6aac4",
  "169e231a545547c5b40781506374a97a",
  "0704529f3d0540ecaa192a42562bfcf5",
  "4e7245eed2db4b8287fa336d1fc56c6a",
  "f3c4a4085fb644cc9293756decea426d",
];

const XMTPQuery = `query BulkFetchPrimaryENSandXMTP($address: [Identity!]) {
    XMTPs(input: {blockchain: ALL, filter: {owner: {_in: $address}}}) {
      XMTP {
        isXMTPEnabled
        owner {
          addresses
          primaryDomain {
            name
          }
          domains{
            name
            labelName
          }
          socials {
            dappName
            profileName
            profileCreatedAtBlockTimestamp
            profileCreatedAtBlockTimestamp
            profileLastUpdatedAtBlockNumber
            profileLastUpdatedAtBlockTimestamp
            userAddress
            followerCount
            followingCount
            profileBio
            profileUrl
            profileName
            profileImage
            userAssociatedAddresses
            userHomeURL
            identity
          }
          
        }
      }
    }
   
  }`;

let apiKeyIndex = 2;

// Function to get the current API key
function getCurrentApiKey() {
  return airstackAPIKeys[apiKeyIndex];
}

// Function to rotate to the next API key
function rotateApiKey() {
  apiKeyIndex = (apiKeyIndex + 1) % airstackAPIKeys.length;
}

const wallets: string[] = [];
mergedArray.forEach((user) => wallets.push(user.address));

const queryWallets = async (wallets: string[]) => {
  console.log("wallets.length", wallets.length);
  const results = [];
  console.log("started");

  // Batch processing
  const batchSize = 50;
  for (let i = 0; i < wallets.length; i += batchSize) {
    const batch = wallets.slice(i, i + batchSize);

    // API key rotation logic here
    const currentApiKey = getCurrentApiKey();
    let userData;
    if (batch.length > 0) {
      try {
        init(currentApiKey);

        const { data, error } = await fetchQuery(XMTPQuery, { address: batch });
        userData = data;
        console.log("data1", data, error);
        if (typeof userData === "undefined" || error) {
          rotateApiKey();
          const nextApiKey = getCurrentApiKey();
          init(nextApiKey);
          const { data, error } = await fetchQuery(XMTPQuery, {
            address: batch,
          });
          console.log("data2", data, error);

          userData = data;
        }
      } catch (err) {
        console.log("error", err);
      }
      // Make the API request for the batch
      if (userData?.XMTPs.XMTP) {
        results.push(...userData?.XMTPs?.XMTP!);
      }
    }
  }
  return results;
};

queryWallets(wallets).then((allUsers) => {
  console.log("All Users:", allUsers);
  fs.writeFileSync("results3.json", JSON.stringify(allUsers, null, 2));
});

// fs.readFile("./results.json", "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading JSON file:", err);
//     return;
//   }

//   try {
//     // Parse the JSON data
//     const jsonData = JSON.parse(data);

//     // Check if jsonData is an array
//     if (Array.isArray(jsonData)) {
//       const arrayLength = jsonData.length;
//       console.log("Length of the array:", arrayLength);
//     } else {
//       console.error("JSON data is not an array.");
//     }
//   } catch (jsonParseError) {
//     console.error("Error parsing JSON:", jsonParseError);
//   }
// });
// const { data, error } = await fetchQuery(XMTPQuery);

// console.log("data:", data);
// console.log("error:", error);

// node --loader ts-node/esm ./index.ts
