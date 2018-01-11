FROM node:boron
LABEL maintainer='Forest Index Development'

RUN mkdir -p /api/ssl

ADD package.json .babelrc .eslintrc .eslintignore yarn.lock /api/
ADD src /api/src
ADD test /api/test

WORKDIR /api

RUN yarn

EXPOSE 8080 8080
VOLUME /app/src

CMD yarn dev
