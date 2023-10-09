create table IF NOT EXISTS
  public.attestations (
    id uuid not null default gen_random_uuid (),
    did character varying not null,
    attester_address character varying not null,
    issuer_address character varying not null default ''::character varying,
    recipient_address character varying not null,
    eas_schema_address character varying not null,
    revoked boolean not null default false,
    type character varying not null,
    document character varying not null,
    created_at timestamp with time zone not null default now(),
    constraint attestations_pkey primary key (id)
  ) tablespace pg_default;

CREATE INDEX IF NOT EXISTS idx_attestations_did ON attestations (did);
CREATE INDEX IF NOT EXISTS idx_attestations_issuer_address  ON attestations (issuer_address);
CREATE INDEX IF NOT EXISTS idx_attestations_attester_address ON attestations (attester_address);
CREATE INDEX IF NOT EXISTS idx_attestations_recipient_address  ON attestations (recipient_address);
CREATE INDEX IF NOT EXISTS idx_attestations_recipient_address_revoked  ON attestations (recipient_address, revoked);