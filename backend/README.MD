## Installation

1. cp env.example .env
1. Fill out the .env file. All fields are required unless otherwise noted.
   2. You can run Postgres locally with: `docker run -d -v ./private/postgres-data:/var/lib/postgresql/data --name decentralized-linkedin-postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres`
1. `pnpm install`
1. `pnpm run dev` (runs nodemon)


## Deployment

TBD
