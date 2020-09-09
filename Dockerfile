FROM node:lts-alpine As development

ENV NPM_CONFIG_LOGLEVEL silent
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN apk add --no-cache make gcc g++ python

RUN npm install --only=development
RUN npm rebuild bcrypt --build-from-source

# Uninstall building dependencies
RUN apk del make gcc g++ python

COPY .env ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY src ./

RUN npm install glob

RUN npm run build

FROM keymetrics/pm2:12-alpine as production

ENV NPM_CONFIG_LOGLEVEL silent
WORKDIR /usr/src/app

# Bundle APP files
COPY --from=development /usr/src/app/dist ./dist
COPY package*.json ./
COPY pm2.json ./
COPY .env ./

# Install app dependencies
RUN npm install --only=production

CMD [ "pm2-runtime", "start", "pm2.json"]
