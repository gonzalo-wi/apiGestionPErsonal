
FROM node:20


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npx tsc


EXPOSE 3000


CMD ["npx", "ts-node", "src/index.ts"]