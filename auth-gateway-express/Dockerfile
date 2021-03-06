FROM node:14.16.0-alpine3.12

WORKDIR /opt/app

COPY index.js /opt/app/index.js
COPY config-prod.json /opt/app/config.json
COPY lib /opt/app/lib
COPY package.json /opt/app/package.json
COPY package-lock.json /opt/app/package-lock.json

RUN npm install

ENTRYPOINT ["node", "index.js"]

EXPOSE 3000