const profile1 = {
    pubKey: "0xb9c5714089478a327f09197987f16f9e5d936e8a",  // maybe keep this for the end with the payload signature
    dids:[
        "did:pkh:arweave:7wIU:kY9RAgTJEImkBpiKgVeXrsGV02T-D4dI3ZvSpnn7HSk",
        "did:pkh:eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a",
    ],
    lastName:"von Neumann",
    firstName:"John",
    preferredName:"von Neumann",
    preferredTitle:"Lecturer",
    preferredLocation:"Zurich and London",
    shortBio:"Hungarian-American mathematician, physicist, computer scientist, engineer and polymath.",
    skill_keywords:[
        "set theory" , "methematics" 
    ],
    languages:[
        {
           name:"english",
           level:"a2"
        },
        {
            name:"german",
            level:"native"
         }
         ,
        {
            name:"hungarian",
            level:"native"
         }
    ],
    occupations:[
        {
          title:"Theoretical Chemistry Researcher",
        company: {
            name:"ETH Zurich",
            dns:"eth.ch",
            preferredIcon:"https://ethz.ch/etc/designs/ethz/img/icons/ETH-APP-Icons-Theme-white/192-xxxhpdi.png"
        },
        links:[
            {href:"ia903008.us.archive.org/31/items/A_C_WalczakTypke___Axiomatic_Set_Theory/Lecturenotes2006-2007eng.pdf", name:"Full thesis"}, 
            {href:"en.wikipedia.org/wiki/Von_Neumann%E2%80%93Bernays%E2%80%93G%C3%B6del_set_theory", name:"Discussion"}
        ],
        description:"Research work related to The axiomatic construction of general set theory",
        keywords:["set theory","ZFC","first order logic"],
        start:"1925-10-12 00:00:00.00Z",
        end:"1929-10-12 00:00:00.00Z"    // RFC 3339  date or  null for still active 
        }
    ], 
    educations:[
        { title:"PHD", 
        company: {
            name:"ETH Zurich",
            dns:"eth.ch",
            preferredIcon:"https://ethz.ch/etc/designs/ethz/img/icons/ETH-APP-Icons-Theme-white/192-xxxhpdi.png"
        },
        links:[
            {href:"ia903008.us.archive.org/31/items/A_C_WalczakTypke___Axiomatic_Set_Theory/Lecturenotes2006-2007eng.pdf", name:"Full thesis"}, 
            {href:"en.wikipedia.org/wiki/Von_Neumann%E2%80%93Bernays%E2%80%93G%C3%B6del_set_theory", name:"Discussion"}
        ],
        description:"PHD title The axiomatic construction of general set theory",
        keywords:["set theory","ZFC","first order logic"],
        start:"1925-10-12 00:00:00.00Z",
        end:"1929-10-12 00:00:00.00Z"    // RFC 3339  date or  null for still active 
        }
    ],
    publications:[
        {
            title:"Preliminary Discussion of the Logical Design of an Electronic Computing Instrument",
            description:"Inasmuch as the completed device will be a general-purpose computing machine it should contain certain main organs relating to arithmetic, memory- storage, control and connection with the human operator. It is intended that the machine be fully automatic in character, i.e. independent of the human operator after the computation starts",
            keywords:[  "Memory Capacity",   "Delay Line",   "Memory Location",    "Function Table",  "Memory Organ" ],
            href:"link.springer.com/chapter/10.1007/978-3-642-61812-3_32",
            cid:"bafybeibhh6xja3u2gtegmz4afhi53r2xijn73al6b7yfdytsn43fcujoeq",
            doi:"doi.org/10.1007/978-3-642-61812-3_32",
            ISBN:"978-3-642-61812-3",
            type:"classic-peer-reviewed",
            idChecks:[
                {  did:"did:pkh:arweave:XXXX:kY9RAgTJEImkBpiKgVeXrsGV02T-D4dI3ZvSpnn7HSk", sig:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" } //External user signs to agree that the profile owner was a meaningful author of this publication  
            ],
            contentChecks:[   
                {  did:"did:pkh:arweave:XXXX:kY9RAgTJEImkBpiKgVeXrsGV02T-D4dI3ZvSpnn7HSk",   sig:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" }   //External user signs to agree that the description and keywords appropriatly describe the publication and indicates that the profile owner has knowledge on these topics 
            ] 
        },
        {
            title:"America's Youth Wants To Know",
            href:"https://www.youtube.com/watch?v=vLbllFHBQM4",
            cid:"bafybeic4gxngkwll4lfoljlvtxij5oewqbxsgayubxhhqdyipjmozp5ymu",   //TODO add other quality formats 
            type:"media-interview"
        },
        {
              //github code can also be here 
        }
    ],
    vc : [    //TODO maybe with IPDL we could link the certifications about publications listed above 
    {
        "@context": [
          "https://www.w3.org/ns/credentials/v2",
          "https://www.w3.org/ns/credentials/examples/v2"
        ],
        "type": "VerifiablePresentation",
        "verifiableCredential": [{
          "@context": [
            "https://www.w3.org/ns/credentials/v2",
            "https://www.w3.org/ns/credentials/examples/v2"
          ],
          "id": "http://university.example/credentials/1872",
          "type": ["VerifiableCredential", "ExampleAlumniCredential"],
          "issuer": "https://university.example/issuers/565049",
          "validFrom": "2010-01-01T19:23:24Z",
          "credentialSubject": {
            "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
            "alumniOf": {
              "id": "did:example:c276e12ec21ebfeb1f712ebc6f1",
              "name": "Example University"
            }
          },
          "proof": {
            "type": "DataIntegrityProof",
            "cryptosuite": "eddsa-2022",
            "created": "2023-06-18T21:19:10Z",
            "proofPurpose": "assertionMethod",
            "verificationMethod": "https://university.example/issuers/565049#key-1",
            "proofValue": "zQeVbY4oey5q2M3XKaxup3tmzN4DRFTLVqpLMweBrSxMY2xHX5XTYV8nQApmEcqaqA3Q1gVHMrXFkXJeV6doDwLWx"
          }
        }],
        "proof": {
          "type": "DataIntegrityProof",
          "cryptosuite": "eddsa-2022",
          "created": "2018-09-14T21:19:10Z",
          "proofPurpose": "authentication",
          "verificationMethod": "did:example:ebfeb1f712ebc6f1c276e12ec21#keys-1",
          "challenge": "1f44d55f-f161-4938-a659-f8026467f126",
          "domain": "4jt78h47fh47",
          "proofValue": "zqpLMweBrSxMY2xHX5XTYV8nQAJeV6doDwLWxQeVbY4oey5q2pmEcqaqA3Q1gVHMrXFkXM3XKaxup3tmzN4DRFTLV"
        }
      }
    ],
    eoaAttestations:[
        //TODO add 
    ]


    



}