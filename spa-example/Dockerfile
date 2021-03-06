FROM alpine:3.9.5

RUN apk add nginx tzdata \
  && rm -rf /var/lib/nginx/html/* \
  # forward request and error logs to docker log collector
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log \
  # Manage timezone
  && cp /usr/share/zoneinfo/Europe/Zurich /etc/localtime \
  && echo "Europe/Zurich" > /etc/timezone \
  && apk del tzdata

# Set our mini config
COPY conf/mini.conf /etc/nginx/mini.conf

# Deploy app
COPY build /opt/app/data
COPY conf/config-prod.js /opt/app/data/config.js

EXPOSE 8080

CMD ["nginx", "-c", "/etc/nginx/mini.conf"]
