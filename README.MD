# Decentralized Linkedin (name pending)


## Repo structure:
* frontend: The customer facing UI for the application
* backend: An Express API that interfaces with Ceramic's GraphQL API to store and retrieve data from ComposeDB
* ceramic: Code and scripts for generating code from Ceramic schemas, and scripts that let you run a ceramic node locally. Currently contains UI code for creating and verifying attestations **but this UI code will likely be moved or won't be used in the future**

## How to run everything:

Setup all of the following in this order:
1. [Ceramic node + graphql playground](#ceramic-node--graphql-playground)
2. [Backend](#backend)
3. [Frontend](#frontend)
4. (Optional) [Ceramic reference UI for attestations](#ceramic-reference-ui-for-attestations)

### Ceramic node + graphql playground:
1. Basic setup steps:
```bash
cd ceramic
yarn install
cp .env.example .env
yarn run generate
```
2. Create a file ./ceramic/.composedb.config.json. Paste the below into it, take note of the database url:
    ```json
    {
      "anchor": {},
      "http-api": {
        "cors-allowed-origins": [
          ".*"
        ],
        "admin-dids": [
          "did:key:z6MkgmRLdufP991kDdW7dcvDANM9n4XXBwdRjyvXVLiiV6k3"
        ]
      },
      "ipfs": {
        "mode": "bundled"
      },
      "logger": {
        "log-level": 2,
        "log-to-files": false
      },
      "metrics": {
        "metrics-exporter-enabled": true,
        "metrics-port": 9090
      },
      "network": {
        "name": "testnet-clay"
      },
      "node": {},
      "state-store": {
        "mode": "fs",
        "local-directory": "~/.ceramic/statestore/"
      },
      "indexing": {
        "db": "postgres://postgres:password@localhost:5432/ceramic",
        "allow_queries_before_historical_sync": true,
        "enable_historical_sync": false
      }
    }
    ```
2. Create a file "admin_seed.txt", paste the below into it:
    ```bash
    b0ee9b8ddf1b20daf45d373eef0a360c9734da94a57e005cf60a22ef023ff885
    ````
2. Start the ceramic node + graphql playground:
    ```bash
    yarn dev
    ```
3. Take note of the Ceramic URL: http://localhost:7007
4. Access the GraphQL Playground at http://localhost:5001/graphql
5. Note that the REST API in ./backend must be running to create attestation

### Backend 
1. Basic setup
    ```bash
    bash
    cd backend
    pnpm i
    cp .env.example .env
    ```
2. Fill out the .env file (most of the values there are good already
3. pnpm dev

### Ceramic reference UI for attestations
1. Follow the steps in [Ceramic node + graphql playground](#ceramic-node--graphql-playground)
2. Then, go into .env and set the following variables:
    ```bash
    # Chain ID - Sepolia testnet used in this example
    REACT_APP_CHAIN_ID=11155111
    
    # Alchemy API Key
    REACT_APP_ALCHEMY_API_KEY=<Specifically an alchemy api key. Just the key, no url>
    
    # Author key must be a 64-character alphanumeric seed phrase, and must be DIFFERENT from the one generated in admin_seeed.txt
    AUTHOR_KEY=#
    ```
3. Start the reference UI:
    ```bash
    yarn dev
    ```

