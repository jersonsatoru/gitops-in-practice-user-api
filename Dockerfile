FROM node:18.12.0-alpine3.16
WORKDIR /app
COPY . .
EXPOSE 4000
RUN npm ci --omit=dev
ENTRYPOINT [ "node", "index.js" ]
