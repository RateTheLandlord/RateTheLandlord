FROM node:alpine

RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./backend/package*.json /app/
COPY ./.env /app/

RUN npm install

# Copy the rest of our Nest folder into /app
COPY ./backend /app

EXPOSE 5000

# Build Nest
RUN npm run build

# Run npm dev, as we would via the command line 
CMD ["npm", "run", "start:prod"]