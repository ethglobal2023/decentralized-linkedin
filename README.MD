
> * Frontend Repo moved here -> https://github.com/JidoTaikaSuru/dili-frontend/tree/main
> * Slide deck here -> https://docs.google.com/presentation/d/1dPQ-08J_7O0QjKjYuR_6u7ZK1UDp25OlWW8qciIsuGY/edit?usp=sharing 
> * Demo video -> https://drive.google.com/file/d/1vTmjAkMDlAFjUCIkgS5G0IIzOOxd07Vq/view?usp=share_link

# Decentralinked (Backend)

## Repo structure:
* backend: The backend for the application. Used to issue and verify attestations, store data from TalentLayer, GitCoin, and Lens, and contains the logic for searching
* lib: Common code for issuing and verifying attestations and storing + retrieving resumes from IPFS. Was shared with the front before we moved the frontend out.
* data-model: Reference schema for resumes, also contains draftwork for search
* examples-and-boilerplate: Self explanatory
* archive: Discarded code and artifacts

## How to run everything:
1. `turbo build` at the root
2. `pnpm i` in [./backend](./backend)
3. Create a .env/.envrc file in the root directory of the project with the following contents
```bash
PORT=3005
LOG_LEVEL=debug
SUPABASE_API_KEY=
SUPABASE_PROJECT_ID=https://xxxxxxxxxxx.supabase.co
WEB3_STORAGE_KEY=
```
4. `pnpm dev`
