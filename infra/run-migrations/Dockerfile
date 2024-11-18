FROM node:23-alpine

WORKDIR /usr/src/app

RUN mkdir -p ./src/lib/drizzle && \
    adduser -D appuser && \
    chown -R appuser /usr/src/app && \
    chmod u=rwx /usr/src/app

COPY ./package.json ./package.json
COPY ./drizzle.config.js ./drizzle.config.js
COPY ./drizzle ./drizzle
COPY ./src/lib/drizzle/schema.ts ./src/lib/drizzle/schema.ts

USER appuser

RUN yarn install --frozen-lockfile

CMD ["yarn", "migration:up"]
