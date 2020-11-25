FROM node:12.20.0

WORKDIR /app/

COPY . .

RUN npm install -g @quasar/cli

COPY start_dev.sh .

CMD ["/app/start_dev.sh"]