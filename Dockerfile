FROM node:18-alpine as build

# setting the workdir kinda mkdir and cd's us into that folder
WORKDIR /app

COPY package* ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]