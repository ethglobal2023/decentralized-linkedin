create table
    public.attestations (
                            id character varying not null,
                            ref_uid character varying not null,
                            attester_address character varying not null,
                            recipient_address character varying not null,
                            eas_schema_address character varying not null,
                            revoked boolean not null default false,
                            type character varying not null,
                            document jsonb not null,
                            created_at timestamp with time zone not null default now(),
                            expiration_time bigint not null,
                            constraint attestations_pkey primary key (id)
) tablespace pg_default;


create index if not exists idx_attestations_attester_address on public.attestations using btree (attester_address) tablespace pg_default;

create index if not exists idx_attestations_recipient_address on public.attestations using btree (recipient_address) tablespace pg_default;

create index if not exists idx_attestations_recipient_address_revoked on public.attestations using btree (recipient_address, revoked) tablespace pg_default;

create index if not exists idx_attestations_ref_uid on public.attestations using btree (ref_uid) tablespace pg_default;

create index if not exists idx_attestations_ref_uid_revoked on public.attestations using btree (ref_uid, revoked) tablespace pg_default;
