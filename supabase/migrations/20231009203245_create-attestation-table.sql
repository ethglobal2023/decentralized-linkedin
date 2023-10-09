create table
  public.attestations (
    id uuid not null,
    refUid uuid not null,
    attester_address character varying not null,
    issuer_address character varying not null default ''::character varying,
    recipient_address character varying not null,
    eas_schema_address character varying not null,
    revoked boolean not null default false,
    type character varying not null,
    document json not null,
    created_at timestamp with time zone not null default now(),
    expiration_time bigint not null,
    constraint attestations_pkey primary key (id)
  ) tablespace pg_default;

create index if not exists idx_attestations_issuer_address on public.attestations using btree (issuer_address) tablespace pg_default;

create index if not exists idx_attestations_attester_address on public.attestations using btree (attester_address) tablespace pg_default;

create index if not exists idx_attestations_recipient_address on public.attestations using btree (recipient_address) tablespace pg_default;

create index if not exists idx_attestations_recipient_address_revoked on public.attestations using btree (recipient_address, revoked) tablespace pg_default;