FROM node:alpine

ENV PORT 8080

RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./backend/package*.json /app/
COPY ./.env /app/

RUN npm install --omit=dev

# Copy the rest of our Nest folder into /app
COPY ./backend /app

ENV NODE_ENV=production

# Build Nest
RUN npm run build

EXPOSE 8080

# Run npm dev, as we would via the command line 
CMD ["npm", "run", "start:prod"]