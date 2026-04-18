FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
CMD ["npx", "nx", "serve", "web", "--host=0.0.0.0"]