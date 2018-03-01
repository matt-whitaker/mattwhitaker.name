FROM node:alpine
LABEL maintainer="mattwhitaker.name@gmail.com"
ENV WORKDIR /var/www
COPY ./lib $WORKDIR
WORKDIR $WORKDIR
RUN ["npm", "install", "-g", "http-server"]
CMD ["http-server", "-p", "8080"]