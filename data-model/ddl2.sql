
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
 
 
  select count(*) from farcaster_users;


--{"pubkey":"0x9b4ae7cfee31d23ca8370f4524fc89aadefbce72","preferredname":"btchunter","preferredtitle":"Top manager","description":"just hunter","skill_keywords":"business development,blockchain technology","preferredlocation":null,"id":"11714","cid":"QmUrZtKKTE6raqZKWogJMMeZC1mvPjMimUvBBGu4hzi1Y2","address":"0x9b4ae7cfee31d23ca8370f4524fc89aadefbce72","chain_json":{"handle": "btchunter", "rating": "0", "numReviews": "0", "description": {"name": "hunter", "role": "buyer-seller", "title": "Top manager", "country": null, "headline": null, "timezone": null, "image_url": null, "skills_raw": "business development,blockchain technology"}},"cid_json":{"name": "hunter ◱ ◱", "role": "buyer-seller", "about": "just hunter", "title": "Top manager", "skills": "Business development,Blockchain technology"}}

select  json->>'cid' cid , * from talent_layer_formated  where json->>'cid' is not null and length(json->>'description')>3  ;



select * from rest_cache order by updated_at  desc limit 3;