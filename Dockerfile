# Prisma image from https://github.com/JacobLinCool/node-prisma-alpine

########################
#         DEPS         #
########################

# Install dependencies only when needed
# TODO: re-evaluate if emulation is still necessary on arm64 after moving to node 18
FROM jacoblincool/node-prisma-alpine:4.6.1 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install Prisma Client - remove if not using Prisma
COPY prisma ./

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile --ignore-engines

########################
#        BUILDER       #
########################

# Rebuild the source code only when needed
# TODO: re-evaluate if emulation is still necessary on arm64 after moving to node 18
FROM jacoblincool/node-prisma-alpine:4.6.1 AS builder

ARG DATABASE_URL
ARG LOGTO_ENDPOINT
ARG LOGTO_BASE_URL
ARG LOGTO_COOKIE_SECRET
ARG LOGTO_APP_ID
ARG LOGTO_APP_SECRET
ARG MALOJA_URL
ARG MALOJA_API_KEY
ARG BOOMBOX_MALOJA_REQUIRE_AUTH

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Disable env checks when building in Docker
ENV DOCKER_BUILD YES

RUN yarn build

########################
#        RUNNER        #
########################

# Production image, copy all the files and run next
# TODO: re-evaluate if emulation is still necessary after moving to node 18
FROM jacoblincool/node-prisma-alpine:4.6.1 AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma/engines ./node_modules/@prisma/engines

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Prisma migrations
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start:docker"]