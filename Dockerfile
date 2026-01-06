FROM node:alpine
LABEL authors="calebzaleski"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY index.js quotes.json ./

EXPOSE 3001

CMD ["node", "index.js"]