FROM node:18-buster-slim AS base

# default environment variables
ENV \
  DEBIAN_FRONTEND=noninteractive \
  TZ=UTC \
  RS_URL=http://restreamer:8080

RUN \
  # add dependencies
  apt-get update \
  && apt-get install -y \
    openssl \
    procps \
    tzdata \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  # create our own user and remove the node user
  && groupadd --gid 1001 app \
  && useradd --create-home --home /app --shell /bin/bash --gid 1001 --uid 1001 app \
  && userdel -r node \
  # create the config directory
  && mkdir /config && chown app:app /config \
  # install the latest version of npm
  && npm install -g npm@latest \
  # create the node_modules directory, make it owned by app user
  && mkdir -p /app/node_modules && chown app:app /app/node_modules

USER app

WORKDIR /app

EXPOSE 3000

##############################

FROM base AS development

ENV NODE_ENV=development

COPY --chown=app:app package*.json ./

RUN npm ci --force && npm cache clean --force

CMD [ "npm", "run", "dev" ]

##############################

FROM development AS build

ENV NODE_ENV=production

COPY --chown=app:app . ./

RUN npm run build

##############################

FROM base AS production

ENV NODE_ENV=production

COPY --from=build --chown=app:app /app/.next ./.next
COPY --from=build --chown=app:app /app/public ./public
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/package.json ./package.json

CMD [ "npm", "run", "start" ]
