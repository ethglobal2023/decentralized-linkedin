create table
  public.people_search (
    pk text not null,
    "text"  text null,
    "json" jsonb null,
    updated_at timestamp with time zone null,
    created_at timestamp with time zone not null default now(),
    trust_score double precision not null default '0'::double precision,
    preferredname text null,
    constraint searchpeople_pkey primary key (pk)
  ) tablespace pg_default;

create index if not exists people_search_ts_idx on public.people_search using gin (text) tablespace pg_default;

create trigger handle_updated_at before
update on people_search for each row
execute function moddatetime ('updated_at');





select pk, text from people_search where text @@ websearch_to_tsquery('dog and fox')
select pk, text from people_search where text @@ websearch_to_tsquery('dog and cat')
select pk, text from people_search where text @@ websearch_to_tsquery('"fox dog"')
select pk, text from people_search where text @@ websearch_to_tsquery('fox -cat')
select pk, text from people_search where text @@ websearch_to_tsquery('-fox cat')
 


CREATE OR REPLACE FUNCTION people_websearch (query VARCHAR) 
    RETURNS TABLE (
        pk text,
        "json" JSONB
) 
AS $$
BEGIN
    RETURN QUERY SELECT
        pk,"json"
    FROM
        people_search
    WHERE
        text @@  websearch_to_tsquery(query) ;
END; $$ 

LANGUAGE 'plpgsql';



---- What to work on next 
-- THe attester table 

-- public.user_trust_score definition

-- Drop table

-- DROP TABLE public.user_trust_score;

CREATE TABLE public.user_trust_score (
	pk text NOT NULL,
	score float8 NOT NULL DEFAULT 0.0,
	updated_at timestamp NULL DEFAULT now(),
	CONSTRAINT user_trust_score_pkey PRIMARY KEY (pk)
);

select * from auth.users

---{"pubkey": "0x1220c5f43A62c7926cd6c713EaDe594Cc22776F3", "pin_salt": "0xafaf687079a2ad5ebd96a706a494ac9d2b445ea56efbad73949367f4d90a6fc7", "pin_encrypted_private_key": "U2FsdGVkX1/d62yc5PRXoMa5lyoZ8FwOQxWvSCGNBaF6PXsGnJP8h83h1BJ1dqhURHEIP/ySvpkm8nGkcTkQnMnH/R502x7EpOlw8+szhtysGrnZoCy4p8c0mOlj+wGk", "device_encrypted_private_key": "U2FsdGVkX188SBji8lgfRm7+elDV/A0IpIk3P3kLlRCIjVbZ+pWGQ1YCv6MpyXnz2QQ++I1I5KEGBFfv++St4Fm3w6v+O5jG7JtndgWU4lnLB023TlpIqYpYp7j/3WCq"}

select * from rest_cache;

select * from user_trust_score;

select * from attestations;

select  * from attester_a_priori_trust_coef aaptc ;

-- public.attester_a_priori_trust_coef definition

-- Drop table

-- DROP TABLE public.attester_a_priori_trust_coef;

CREATE TABLE public.attester_a_priori_trust_coef (
	pk text NOT NULL,
	coef float8 NOT NULL,
	CONSTRAINT attester_a_priori_trust_coef_pk_key UNIQUE (pk),
	CONSTRAINT attester_a_priori_trust_coef_pkey PRIMARY KEY (pk)
);


select * from attester_a_priori_trust_coef

-- public.talent_layer_formated source




CREATE OR REPLACE VIEW public.talent_layer_formated
AS WITH sq AS (
         SELECT x.address AS pubkey,
            x.chain_json ->> 'handle'::text AS preferredname,
            (x.chain_json -> 'description'::text) ->> 'title'::text AS preferredtitle,
            x.cid_json ->> 'about'::text AS description,
            (x.chain_json -> 'description'::text) ->> 'skills_raw'::text AS skill_keywords,
            (x.chain_json -> 'description'::text) ->> 'country'::text AS preferredlocation,
            x.id,
            x.cid,
            x.address,
            x.chain_json,
            x.cid_json
           FROM ( SELECT a.id,
                    a.cid,
                    a.address,
                    a.chain_json,
                    c.json AS cid_json
                   FROM ( SELECT t.id,
                            t.cid,
                            t.address,
                            (t.document #>> '{}'::text[])::jsonb AS chain_json
                           FROM talent_layer t
                          WHERE t.cid IS NOT NULL AND (((t.document #>> '{}'::text[])::jsonb) ->> 'description'::text) IS NOT NULL) a
                     LEFT JOIN ( SELECT ipfs_cache.cid,
                            ipfs_cache.created_at,
                            ipfs_cache.status,
                            ipfs_cache.content_type,
                            ipfs_cache.gateway,
                            ipfs_cache.body,
                            ipfs_cache.json
                           FROM ipfs_cache
                          WHERE ipfs_cache.content_type = 'application/json'::text) c ON a.cid = c.cid) x
        )
 SELECT sq.pubkey,
    row_to_json(sq.*) AS json
   FROM sq;
  
  
--  drop table farcaster_users 
  --truncate farcaster_users ;
  
  create table
  public.farcaster_users (
    created_at timestamp with time zone not null default now(),
    "userAssociatedAddresse" text not null,
    "profileTokenId" text not null,
    json jsonb null,
    source text null default ''::text,
    "userAssociatedAddresses_all" text[] null,
    constraint farcaster_users_pkey primary key ("userAssociatedAddresse","profileTokenId")
  ) tablespace pg_default;
 
 
 select * from people_search ps  where on_xmtp is null ; 
  select count(*) from farcaster_users;
 select * from farcaster_users fu where  "userAssociatedAddresse"='0xf009162e2495dd1dd54b5470e03004010f931a9f';
 --{"pubkey": "0xf009162e2495dd1dd54b5470e03004010f931a9f", "address": "0xf009162e2495dd1dd54b5470e03004010f931a9f", "description": "The world is beautiful as long as you don't take it hard\nI am an artist\nI am an athlete\nI am a programmer and active in crypto projects\n\nTwitter:ayda6600🥳", "profileImage": "https://i.imgur.com/q1ZP2Fx.jpg", "preferredname": "Ayda", "preferredtitle": "aydasayer", "preferredlocation": null}
--{"pubkey":"0x9b4ae7cfee31d23ca8370f4524fc89aadefbce72","preferredname":"btchunter","preferredtitle":"Top manager","description":"just hunter","skill_keywords":"business development,blockchain technology","preferredlocation":null,"id":"11714","cid":"QmUrZtKKTE6raqZKWogJMMeZC1mvPjMimUvBBGu4hzi1Y2","address":"0x9b4ae7cfee31d23ca8370f4524fc89aadefbce72","chain_json":{"handle": "btchunter", "rating": "0", "numReviews": "0", "description": {"name": "hunter", "role": "buyer-seller", "title": "Top manager", "country": null, "headline": null, "timezone": null, "image_url": null, "skills_raw": "business development,blockchain technology"}},"cid_json":{"name": "hunter ◱ ◱", "role": "buyer-seller", "about": "just hunter", "title": "Top manager", "skills": "Business development,Blockchain technology"}}

select  json->>'cid' cid , * from talent_layer_formated  where json->>'cid' is not null and length(json->>'description')>3  ;

select *    from farcaster_users  where "resumejson" is null;
select *    from farcaster_users  where "resumejson" is not null;


select * from rest_cache order by updated_at  desc limit 3;
 
select * from people_search ps ;


---{"pubkey":"0xa5a67a0db6711bbfe767f6497f8bf2e2f39087c6","preferredname":"woolly","preferredtitle":"dev","description":"woolly\ndeveloping web3","skill_keywords":"software development","preferredlocation":null,"id":"11715","cid":"QmZERzUgo24CYRdPURcinqAYhfETc6NXbfGfZrjfmL9F9Z","address":"0xa5a67a0db6711bbfe767f6497f8bf2e2f39087c6",
	--"chain_json":{"handle": "woolly", "rating": "0", "numReviews": "0", 
		-- "description": {"name": "woolly ◱ ◱", "role": "seller", "title": "dev", "country": null, "headline": null, "timezone": null, "image_url": null, "skills_raw": "software development"}},
	--"cid_json":{"name": "woolly ◱ ◱", "role": "seller", "about": "woolly\ndeveloping web3", "title": "dev", "skills": "Software development"}}



--delete from  people_search where "json" is null ;
select count(*) from people_search;

------


--truncate  people_search; 
insert into people_search(pk,"text","json","source")   
select "userAssociatedAddresse" as pk, human_text_from_json_jsonbin("resumejson") as "text", "resumejson" as "json", 'farcaster' as "source" from farcaster_users f
where f."userAssociatedAddresse"  not in (select pk from people_search) and "resumejson" is not  null;



insert into people_search(pk,"text","json","source")   
select pubkey as pk, human_text_from_json_jsonbin("json"::jsonb) as "text",  "json"::jsonb as "json", 'talentlayer' as "source" from talent_layer_formated f
where f.pubkey  not in (select pk from people_search) and f."json" is not  null;

select * from people_search ps  where source ='talentlayer'
  
--update  people_search set on_xmtp='unknown' where on_xmtp is null 


