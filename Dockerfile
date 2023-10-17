FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN apt update && apt install -y python3 make g++

FROM base AS prod-deps
RUN apt update && apt install -y python3 make g++ #TODO get me from base image
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
#RUN pnpm i

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN apt update && apt install -y python3 make g++ #TODO get me from base image
RUN pnpm run -r build

FROM base AS backend
COPY --from=prod-deps /app/backend/node_modules/ /app/backend/node_modules
COPY --from=build /app/backend/dist /app/backend/dist
WORKDIR /app/backend/
EXPOSE 3005
CMD [ "pnpm", "start" ]

FROM base AS frontend
COPY --from=prod-deps /app/frontend/app/node_modules/ /app/frontend/app/node_modules
COPY --from=build /app/frontend/app/dist /app/frontend/app/dist
WORKDIR /app/frontend/app/
EXPOSE 3000
CMD [ "pnpm", "serve" ]
