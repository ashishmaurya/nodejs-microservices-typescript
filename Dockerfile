# Start with fully-featured Node.js base image
FROM node:14.4.0 AS build

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

# Copy dependency information and install all dependencies
COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

# Copy source code (and all other relevant files)
COPY --chown=node:node tsconfig.json tsconfig.json
COPY --chown=node:node src ./src


# Build code
RUN npm run build

# Run-time stage
FROM node:lts-alpine

# Set non-root user and expose port 8080
USER node
EXPOSE 8080

RUN mkdir /home/node/app
WORKDIR /home/node/app

# Copy dependency information and install production-only dependencies
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --production

# Copy results from previous stage
COPY --chown=node:node --from=build /home/node/app/dist ./dist

CMD [ "node", "dist/server.js" ]