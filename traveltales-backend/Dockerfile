FROM node:18-alpine

WORKDIR /usr/src/app

# Install SQLite and netcat (for db check)
RUN apk add --no-cache sqlite libc6-compat && \
    mkdir -p /usr/src/app/db && \
    chown node:node /usr/src/app/db

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Health check and startup
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3001/health || exit 1

CMD ["npm", "start"]