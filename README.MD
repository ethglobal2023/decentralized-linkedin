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
2. Start the ceramic node + graphql playground:
```bash
yarn dev
```

### Ceramic reference UI for attestations
1. Follow the steps in [Ceramic node + graphql playground](#ceramic-node--graphql-playground)
2. Then, go into .env and set the following variables:
```bash

```

