# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

# Install dependencies using Yarn
RUN yarn install 

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE ${SERVER_PORT}

# Start the application
CMD ["yarn", "start"]