FROM node:13-alpine


RUN mkdir -p /client

COPY . /client

# set default dir so that next commands executes in /home/app dir
WORKDIR /client

# will execute npm install in /home/app because of WORKDIR
RUN npm install

# no need for /home/app/server.js because of WORKDIR
CMD ["npm", "run", "start"]
