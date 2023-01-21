FROM node:alpine

ENV PORT 5000

RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app


# Copy package.json and package-lock.json
# to the /app working directory
COPY ./backend/package*.json ./backend/yarn.lock /app/
COPY ./.env /app/

RUN npm i
RUN npm run build
CMD ["npm", "run", "start:dev"]