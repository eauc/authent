FROM node:8 as api

RUN npm install -g yarn

WORKDIR /app

COPY api/package.json api/yarn.lock ./
RUN yarn install

COPY ./api ./

CMD ["npm","start"]
