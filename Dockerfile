FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ && \
    npm install -g yarn --force

COPY package.json yarn.lock tsconfig.json tsconfig.node.json vite.config.ts ./
RUN yarn install --frozen-lockfile

COPY . .

RUN ls -la /app && ls -la /app/public && ls -la /app/src && cat /app/public/index.html

RUN yarn build

EXPOSE 3000

CMD ["sh", "-c", "yarn install && yarn dev --host --port 3000"]
