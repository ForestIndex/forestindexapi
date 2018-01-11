FROM node:boron
LABEL maintainer='Forest Index Development'

RUN mkdir -p /api

ADD ssl /api/ssl

ADD package.json .babelrc .eslintrc .eslintignore yarn.lock /api/
ADD src /api/src
ADD test /api/test

WORKDIR /api

RUN yarn
RUN yarn build:prod

EXPOSE 443 443

CMD yarn start
