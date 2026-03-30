FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npx", "nx", "serve", "web", "--host=0.0.0.0"]