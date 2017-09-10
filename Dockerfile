FROM node:boron
LABEL maintainer='Blue Cactus Web Solutions, LLC'

RUN mkdir ~/api

ADD package.json .babelrc .eslintrc .eslintignore yarn.lock ~/api/
ADD src ~/api/src
ADD test ~/api/test

WORKDIR ~/api

RUN yarn
RUN yarn build:prod

VOLUME /home/api/src

EXPOSE 8080 8080

CMD yarn start
