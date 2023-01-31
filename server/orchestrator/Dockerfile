FROM node:16.16.0

ENV PORT=4000

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]