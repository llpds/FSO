# The first FROM is now a stage called build-stage

FROM node:20 AS build-stage

ENV REACT_APP_BACKEND_URL http://localhost:8080/api

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build


FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html