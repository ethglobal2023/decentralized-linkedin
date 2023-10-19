FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app/
WORKDIR /app/
RUN apt update && apt install -y python3 make g++
RUN pnpm i
RUN pnpm turbo build
WORKDIR /app/lib
RUN pnpm i
RUN pnpm build
WORKDIR /app/backend
RUN pnpm i
RUN pnpm build

EXPOSE 3005
CMD [ "pnpm", "start" ]