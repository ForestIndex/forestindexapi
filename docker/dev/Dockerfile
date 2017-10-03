FROM node:boron
LABEL maintainer='Blue Cactus Web Solutions, LLC'

RUN mkdir -p /api

ADD package.json .babelrc .eslintrc .eslintignore yarn.lock /api/
ADD src /api/src
ADD test /api/test

WORKDIR /api

RUN yarn

EXPOSE 8080 8080

CMD yarn dev
