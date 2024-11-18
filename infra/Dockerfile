#################
## BUILD STAGE ##
#################
FROM node:23-alpine as build

WORKDIR /usr/src/app

COPY ./ ./

RUN yarn install --frozen-lockfile && \
    yarn test --passWithNoTests && \
    yarn build

#################
## FINAL STAGE ##
#################
FROM node:23-alpine as app

WORKDIR /usr/src/app

RUN adduser -D appuser && \
    chown -R appuser /usr/src/app && \
    chmod u=rwx /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/nest-cli.json ./nest-cli.json
COPY --from=build /usr/src/app/drizzle.config.js ./drizzle.config.js
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/drizzle ./drizzle

USER appuser

RUN yarn install --production=true --frozen-lockfile

CMD ["node", "./dist/main.js"]
