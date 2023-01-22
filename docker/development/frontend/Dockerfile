FROM node:alpine

# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./frontend/package*.json  /app/
COPY ./.env /app/

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY ./frontend /app

# Run npm dev, as we would via the command line 
CMD [ "npm", "run", "dev"]