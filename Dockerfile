FROM node:12
WORKDIR src/
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["pm2-docker", "start", "pm2-config.json", "--env",  "dev"]