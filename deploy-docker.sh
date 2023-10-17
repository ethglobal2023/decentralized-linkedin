#!/bin/sh

docker container stop dili
docker container rm dili

# PORT= is used by the backend
docker run -d -p 3000:3000 -p 3005:3005 --restart unless-stopped --name dili \
    -e "NODE_ENV=production" \
    -e "PORT=3005" \
    -e "LOG_LEVEL=debug" \
    -e "SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTIxMDksImV4cCI6MjAxMjg4ODEwOX0.d7WKH6x2tRcyh42ydu7GVI148PjoFS1BEOc4Adzo7dA" \
    -e "SUPABASE_PROJECT_ID=qbuoensvkofstuhnfxzn" \
    -e "VITE_API_BASE_URL=http://localhost:3005/api" \
    test:latest
