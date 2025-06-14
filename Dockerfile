# Build stage
FROM node:22-alpine

# Install git and set up working directory
RUN apk add --no-cache git
WORKDIR /usr/src/app

# Clone the repository with depth 1 for faster cloning
RUN git clone --depth 1 https://github.com/ArunAaryan/Awestreak-Frontend.git .

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies with specific version
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the React app
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]