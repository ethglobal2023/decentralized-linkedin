## MVP

- Trust Score Authority specification. A store for user data. Emits events when a user's data changes so other Trust Score Authorities can sync with eachother. 
  - Users can access and modify their data in a Trust Score Authority by logging in w/ socials, email, mobile
  - A user's trust score is calculated when their credentials change
  - An issuer can revoke a user's credentials, and when they do, the credentials will be removed from the user's data. This is the only modification a credential issuer can make
    - At present, this is expected to cause a Trust Score change, but if we don't want to do that, we could let the user keep their trust score and show that the credential has been revoked in the UI
  - The Trust Score Authority will offer storage for arbitrary user data This storage would be used for any data that isn't in credentials or that can't fit in credentials (credentials will have a storage limit). 
    - We'd expect users to store things like resumes, copies of publications, a landing page when viewing their data in the Trust Score Authority UI 
    - We are considering a free storage tier in the Trust Score Authority.
    - We'd offer this storage for a fee to big users/enterprise
    - Users can allow external applications to read data from their storage. This would let you do things like bootstrap accounts in Applications that interact with the Trust Score Authority
    - This storage must be encrypted. Still thinking about e2e encryption (because users can and will lose their keys).
- Application (Credential Issuer) SDK
  - Credential Issuer/Application Specification
    - Applications can modify create/revoke credentials in the Trust Score Authority with pub/priv keys
    - Applications will have to host their own credentials, and those credentials MUST be accessible to the Trust Score Authority so the Trust Score Authority can calculate Trust Scores
      - The Trust Score Authority will also offer a SAAS solution to let issuers optionally store their credentials in the authorities instead of hosting them on their own
      - We could also host credentials by default and set have different tiers for credential storage that would let Application issue X amount of credentials for Y dollars.
    - Issuing a credential to a user does not read that credential into the User's data (meaning it won't be used in their trust score calculation). Users have to read issued credentials into their Trust Score Authority entry (opt-in). Only credentials in the user's data are considered for the trust score.
  - Storage SDK/Specification
    - Both Users and Applications will have the ability to store arbitrary data in the Trust Score Authority.
    - The SDK for Storage will provide tools for:
      - Retrieving data from storage, and then decrypting it for use
      - The transfer of storage from Application storage to User storage and vice versa
      - Encrypting data and then submitting the data to storage
      - Searching storage (will be difficult w/ encryption)
- Credentials SDK for retrieving a user's data from a Trust Score Authority. Includes middlewares for gating features by trust score or credentials.
  - Is used to fetch a user's data from the Trust Score Authority
  - Is used to fetch an Application's data from the Trust Score Authority
  - Is used to "read" a credential issued by an application into User data
- Identity management frontend
  - Something that lets you manage your user data + credentials accross all applications
- (Still needs scoping) Embedded wallet
- (Still needs scoping) E2E encrypted storage
- (Still needs scoping) Autheticating with socials to get access to signer keys for applications that require signatures
- (Still needs scoping) Specific implementation details for encrypted storage. LitProtocol? Account Abstraction?
- (Still needs scoping) Key rotation

Mapping the MVP to the Decentralinked concept:

- Trust Score Authority (central storage for multiple applications) is brand new
- Decentralinked was an "Application/Credential Issuer"
  - Credentials would have been handled by the Credential Issuer SDK
  - Resumes would have been handled with the Storage SDK
- The profile edit, where you could select what credentials to include in your resume, would be the identity management frontend

Out of scope:

- Is syncing user data accross Trust Score Authorities a requirement for the MVP?

## Glossary

* Trust Score Authority:
* Credential: A Verified Credential or an Ethereum Attestation
* Credential Store: A store of all credentials issued by Applications. When a user reads in a credential into their data, they create a pointer to a specific entry in the Credential Store.
* Application: A credential issuer that issues credentials for users to the credential store, and a credential consumer that reads user data from the Trust Score Authority, and if desired, calculates an Application specific trust score for the user.
* User: A recipient of credentials who is provided a trust score by an Application 
* User Data: Credentials + Storage for a given user. The user has full control over their data.
* Storage: Credentials cannot store unlimited data. The Trust Score Authority offers redundant storage to customers who want to store additional data directly in the Trust Score Authority, like resumes and code snippets. Storing with the Trust Score Authority allows for better interoperability between Applications
* Credentials SDK: Tools for issuing and retrieving credentials from the Trust Score Authority
* Storage SDK: Tools for issuing and retrieving 
* 

## Diagrams

[Poorly maintained Excalidraw here](https://excalidraw.com/#room=6dd4c40b23764adad4b8,5DGYpgNQEttBY58phB0Obg)

## User repo/data schema

An application that wants to use a user's trust score can retrieve this object from a Trust Authority. They can then

```json
{
  "global_id": "0xabcdef…12345",
  "application_data_merkle_root": "0xabcdef…12345",
  "signing_keys": [
    // Can be used to verify credentials.
    "0xabcdef…12345",
    "0xabcdef…12345"
  ],
  "applications": [
    {
      "id": "facebook",
      "allow_login": true, //This will be important for recovery
      "application_trust_score": 999, //This is the trust score that the application issued to the user. In the gate middleware, an application can choose to trust the trust score of another application.
      "storage_merkle_root": "0xabcdef…12345",
      "storage": [
        {
          "id": "10991abb-1a04-470d-8e71-b802a5cb3d31",
          "blob": 10110101000100101011100
        }
      ],
      "credentials_merkle_root": "0xabcdef…12345",
      // The only credentials that appear here are credentials that the user has accepted. The full
      "credentials": [
        {
          "id": "10991abb-1a04-470d-8e71-b802a5cb3d31",
          "schema_id": "10991abb-1a04-470d-8e71-b802a5cb3d31",
          "type": "VerifiableCredential | EAS",
          "body": "VC or EAS body here",
          "signature": "" //When the user accepts an issued credential, they create a signature. You should be able to confirm the user accepted the credential by verifying the signature
        }
      ]
    }
  ]
}
```

## Credential issuer schema

An application will issue credentials. Credentials issued here can be referred to in user data.

```json
{
  "issuer_id": "my_issuer_id",
  "issuer_name": "I am an issuer",
  "credentials": {
    "credential_id": {
      "schema_id": "10991abb-1a04-470d-8e71-b802a5cb3d31",
      "type": "credential_type1",
      "body": "VC or EAS body here",
      "signature": "",
      "expires": ""
    }
  }
}
```

## SDK Requirements:

### Trust score gate middleware

Middleware to gate a feature behind trust score. The application owner must either trust another application's trust score -OR- calculate their own trust score

Using your own internal trust score:

```typescript
get("/feature", requireTrustScore(50), feature);
```

Using the trust score from either your own application, or the trust score from another application

```typescript
get(
  "/feature",
  requireTrustScore({
    OR: { ThisApplication: 25, Decentralinked: 50, TalentLayer: 100 },
  }),
  feature
);
```

### Credentials gate middleware

Example middleware signature:

```typescript
get(
  "/feature",
  requireCredentials({
    trustedIssuers: ["Decentralinked", "TalentLayer"],
    credentialTypes: { OR: ["SMS Verification", "Email Verification"] },
  }),
  feature
);
```

### Calculate user's trust score for own application:

Iterate over your own application's credentials, and calculate the trust score for the user for your own application. This can be done with a custom function, or it can be done with a macro

Example of taking a custom

```typescript
calculateTrustScore: (node: Credential): number
```

Example macro, calculate trust score by iterating over credentials and summing the weight of each credential.

```typescript
calculateTrustScoreByWeight({
  weights: {
    credential_type1: 1.5,
    credential_type2: 1,
    public_interview: 1,
  },
});
```

### Rotate key

High level, would

### Publish event

When you change a user's credentials, you will publish an event. Other applications will be listening to this event stream to sync their own data.

## Account recovery (Draft)

- Users are encouraged to link multiple logins to their identity in the trust authority
- A user can authorize a specific login to be able to modify data in an application
- If one login is compromised, then the user can shut it off.
- If a user's signing key is compromised, they can use 2/3 logins to force the key to rotate. Key rotation will decrypt then reencrypt data with a new key
