FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ && \
    npm install -g yarn --force

COPY package.json yarn.lock tsconfig.json tsconfig.node.json vite.config.ts ./
RUN yarn install --frozen-lockfile

COPY src /app/src
COPY public /app/public

# Verifica a estrutura do diretório para garantir que todos os arquivos estão presentes
RUN ls -la /app && ls -la /app/public && ls -la /app/src && cat /app/public/index.html

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
