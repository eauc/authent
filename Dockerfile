FROM node:8 as api

WORKDIR /app

COPY ./api/package.json ./api/yarn.lock ./
RUN yarn install

COPY ./api .

FROM node:8 as app

WORKDIR /app

COPY ./app/package.json ./app/yarn.lock ./
RUN yarn install

COPY ./app .
RUN npm run build

FROM node:8 as server

WORKDIR /app

COPY --from=api /app .
COPY --from=app /app/build public

CMD ["npm","start"]
