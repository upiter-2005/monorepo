FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npx", "nx", "serve", "api", "--host=0.0.0.0"]