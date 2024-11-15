#################
## BUILD STAGE ##
#################
FROM node:23-alpine as build

WORKDIR /usr/src/app

COPY ./ ./

RUN yarn install --frozen-lockfile

RUN yarn test --passWithNoTests

RUN yarn build

#################
## FINAL STAGE ##
#################
FROM node:23-alpine as app

WORKDIR /usr/src/app

# Copy config files
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/nest-cli.json ./nest-cli.json
COPY --from=build /usr/src/app/drizzle.config.js ./drizzle.config.js

# Copy source code files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/drizzle ./drizzle

# Copy and handle entrypoint file
COPY ./infra/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Install dependencies
RUN yarn install --production=true --frozen-lockfile

# Config app user
RUN adduser -D appuser
RUN chown -R appuser /usr/src/app
USER appuser

# Run app with entrypoint file
ENTRYPOINT "./entrypoint.sh"
