FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /server

COPY . /server
COPY package.json /server
# set default dir so that next commands executes in /home/app dir
WORKDIR /server

# will execute npm install in /home/app because of WORKDIR
RUN npm install
RUN npm install bcrypt

EXPOSE 8800
# no need for /home/app/server.js because of WORKDIR
CMD ["node", "index.js"]

