FROM python:3
LABEL maintainer="mattwhitaker.name@gmail.com"
ENV WORKDIR /var/www
WORKDIR $WORKDIR
COPY ./lib $WORKDIR
CMD ["python", "-m", "http.server", "8080"]