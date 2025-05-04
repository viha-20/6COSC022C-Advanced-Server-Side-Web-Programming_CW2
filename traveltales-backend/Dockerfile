# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies (including dev dependencies for building)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app (if needed)
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose the application port
EXPOSE 3001

# Database initialization
RUN npm run migrate

# Run the application
CMD ["npm", "start"]