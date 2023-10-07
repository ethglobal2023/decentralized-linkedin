## Installation

1. cp env.example .env
1. Fill out the .env file. All fields are required unless otherwise noted.
   2. You can run Postgres locally with: `docker run -d -v ./private/postgres-data:/var/lib/postgresql/data --name decentralized-linkedin-postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres`
1. `pnpm install`
1. `pnpm run dev` (runs nodemon)


## Deployment
[Github Actions are used to deploy to Heroku](./.github/workflows/deploy.yml)

#### Manual Deployment (Not Recommended)
2. `brew tap heroku/brew && brew install heroku`
2. heroku login (ask @ad0ll for access)
3. git remote add heroku-api https://git.heroku.com/decentralized-linkedin-api.git                                                                                       21:15:54
4. git remote add heroku-web https://git.heroku.com/decentralized-linkedin-web.git       
5. Push to heroku-api or heroku-web:
   1. `git push heroku-api main`
   2. `git push heroku-web main`
