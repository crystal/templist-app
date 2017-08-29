FROM node:6

COPY . /app
WORKDIR /app
RUN npm install npm@latest
RUN rm -rf /usr/local/lib/node_modules/npm
RUN mv node_modules/npm /usr/local/lib/node_modules/npm
RUN npm install
