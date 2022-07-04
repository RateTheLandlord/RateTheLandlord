FROM node:16.13.1-alpine3.14 AS development

WORKDIR /usr/src/app

COPY ["package*.json", "tsconfig*.json", ".env", "./"]

COPY "src" "./src"
RUN npm i
CMD ["npm", "run", "start:dev"]

FROM node:16.13.1-alpine3.14 AS production

WORKDIR /usr/src/app

COPY ["package*.json", "tsconfig*.json", "./"]

COPY "src" "./src"
RUN npm i
RUN npm run build
CMD ["npm", "run", "start:prod"]