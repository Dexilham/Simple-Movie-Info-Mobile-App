FROM node:16.16.0

ENV PORT=4001
WORKDIR /users

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]