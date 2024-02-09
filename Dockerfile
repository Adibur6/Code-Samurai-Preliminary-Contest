# Use an official Node.js runtime as the base image
FROM node:16.13.0-slim

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE $PORT

# Command to run the Node.js application
CMD ["node", "app.js"]
