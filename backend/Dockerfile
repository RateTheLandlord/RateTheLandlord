FROM node:16.13.1-alpine3.14 As development

WORKDIR /usr/src/app

COPY ["package*.json", "tsconfig*.json", ".env", "./"]

COPY "src" "./src"
RUN npm i
CMD ["npm", "run", "start:dev"]

FROM node:16.13.1-alpine3.14 As production

WORKDIR /usr/src/app

COPY ["package*.json", "tsconfig*.json", ".env", "./"]

COPY "src" "./src"
RUN npm i
RUN npm run build
CMD ["npm", "run", "start:prod"]