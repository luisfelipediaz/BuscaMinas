FROM node:9.11.1
WORKDIR /usr/src/app

RUN npm install -g @angular/cli

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y chromium

ENV CHROME_BIN=chromium

EXPOSE 4200
EXPOSE 9876