FROM node:18.18

WORKDIR /usr/local/app

ENV PORT=4000

COPY package.json package-lock.json /usr/local/app

RUN npm install && npm cache clean --force

COPY ./ ./

CMD [ "npm", "start" ]
