FROM node:16.13.1-alpine3.14 As development

WORKDIR /usr/src/app

COPY [".", "./"]
RUN npm i
RUN npm run build
CMD ["npm", "run", "start"]