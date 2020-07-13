FROM node:lts-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

# --only=development
RUN apk add --no-cache make gcc g++ python && \
  npm install

RUN npm rebuild bcrypt --build-from-source

RUN apk del make gcc g++ python

COPY . .

RUN npm run build

# TODO: change node image by pm2
FROM node:stable-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
