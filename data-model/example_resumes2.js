//  DENO version 


const profile1 = {
    pubKey: "0xb9c5714089478a327f09197987f16f9e5d936e8a",  
    dids:[
        "did:pkh:arweave:7wIU:kY9RAgTJEImkBpiKgVeXrsGV02T-D4dI3ZvSpnn7HSk",
        "did:pkh:eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a",
    ],
    lastName:"von Neumann",
    firstName:null,
    preferredName:"von Neumann",
    preferredTitle:"Lecturer",
    preferredLocation:"Zurich and London",
    description:"Hungarian-American mathematician, physicist, computer scientist, engineer and polymath.",
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
        { title:"Theoretical Chemistry Researcher", 
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

};

//console.log(JSON.stringify(profile1))


function searchTextFromJson( d) {
    let outstr="";
    outstr= outstr+`name ${d.preferredName} \n`;
    outstr= outstr+`first name ${d.firstName} \n`;
    outstr= outstr+`last name ${d.lastName} \n`;
    outstr= outstr+`bio ${d.shortBio} \n`;
    outstr= outstr+`location ${d.preferredLocation} \n`;
    d.skill_keywords.forEach(k => {
        outstr= outstr+`keyword ${k} \n`
    });

    
    d.occupations.forEach(p => {
        outstr= outstr+`job title ${p.title} \n`
        outstr= outstr+`job company name ${p.company.name} ${p.company.dns || ''} \n`
        outstr= outstr+`job description ${p.description} \n`
        
        if(p.keywords)
         outstr= outstr+`${ p.keywords.join("job keyword ") } \n`
    });


    d.publications.forEach(p => {
        outstr= outstr+`publication title ${p.title} \n`
        outstr= outstr+`publication description ${p.description} \n`
        if(p.keywords)
         outstr= outstr+`${ p.keywords.join("publication keyword ") } \n`
    });

    return (outstr)

}


//console.log(searchTextFromJson(profile1))


const MIN_SPACES_IN_VALUE_TO_CONSIDER_NON_TECHNICAL=3;
const MAX_LENGTH_NON_SENTENCE_VALUES=20;
const ALWAYS_PRINT_KEYS_CONTAINING=["name","title","description","title","keyword"];
const NEVER_PRINT_KEYS=["vc","value","link","dns","id","href","icon","type","issuer","isbn","start","end","date","cid","doi","level"];


function keyNamingToTitle(text){
    return (
        text.replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace("_"," ")
    .replace(/([A-Z]+)([A-Z][a-z]+)/g, '$1 $2')
    .replace(/^./, m => m.toUpperCase())
    );
}

function recursionResumeToString( d , prefixpath){
        let out="";

        if( d === null )
            return "";

        if( typeof(d)==="string"  && ( d.split(" ").length>=MIN_SPACES_IN_VALUE_TO_CONSIDER_NON_TECHNICAL || d.length<MAX_LENGTH_NON_SENTENCE_VALUES )){
            return (keyNamingToTitle(prefixpath)+": "+d+`\n`)
        }
        let nextprefixpath=prefixpath;
        if( typeof(d) ==="object"){
            Object.keys(d).forEach(k=>{
                if(!NEVER_PRINT_KEYS.includes(k)){
                    if( isNaN(k)){  
                        out=out+recursionResumeToString(d[k],prefixpath+" "+keyNamingToTitle(k))    
                    }
                    else{
                        out=out+recursionResumeToString(d[k],prefixpath)   
                    }
                }
                    

            })
            return out;
        }
        else 
            return "";


}

console.log(recursionResumeToString(profile1,""));
console.log(`\n\n\n\n\n`);
console.log(JSON.stringify(profile1));



// todo example of inserting 
// todo example of searching 
// todo create stored procedure for search 
// todo create indexes 


//TODO put into settings file 

if(false){

let supabase_url="https://qbuoensvkofstuhnfxzn.supabase.co";
let supabase_anon_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4";
//import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabase = createClient(supabase_url, supabase_anon_key)


  1==1

const { data2,error2 } = await supabase
.from('people_search')
.select("*")
.eq("json->>firstName","Jonn");

1==1
const { data3,error3 } = await supabase.from('people_search').select("*").eq("json->>pubKey","0xb9c5714089478a327f09197987f16f9e5d936aaa");




1===1;



const { data5, error5 } = await supabase
  .from('people')
  .select('pubkey_id, all_text, json->>firstName')
  .eq('pubkey_id',"0xb9c5714089478a327f09197987f16f9e5d936aaa")

  console.log(data5);
1==1;


const { data6, error6 } = await supabase.from('people_search').select("text").textSearch('text', `cat`)
const { data7, error7 } = await supabase.from('people_search').select("text").textSearch('text', `dog & cat`)
const { data8, error8 } = await supabase.from('people_search').select("text").textSearch('text', `'dog' & !'cat'`)
console.log(data8);
1==1;



await supabase .rpc('people_websearch', {query:'"fox dog"'} )

}