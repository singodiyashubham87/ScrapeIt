FROM node:alpine3.19

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["npm", "run", "dev", "--", "--host"] 
