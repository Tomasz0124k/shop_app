FROM node:17-alpine

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# add app
COPY . ./

RUN npm run build

EXPOSE 9000

# start app
CMD ["node", "app"]