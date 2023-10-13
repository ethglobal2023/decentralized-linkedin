create table
    public.admin_signers (
                             address character varying not null,
                             created_at timestamp with time zone not null default now(),
                             constraint admin_signers_pkey primary key (address)
) tablespace pg_default;

INSERT INTO  public.admin_signers (address) VALUES ('0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F');