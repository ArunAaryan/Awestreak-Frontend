# Build stage
FROM node:20-alpine

# Install git and set up working directory
RUN apk add --no-cache git
WORKDIR /usr/src/app

# Clone the repository with depth 1 for faster cloning
RUN git clone --depth 1 https://github.com/ArunAaryan/Awestreak-Frontend.git .

# Install dependencies with specific version
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]