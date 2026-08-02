FROM node:22-slim
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY api/package.json ./api
COPY web/package.json ./web

RUN pnpm i --frozen-lockfile
