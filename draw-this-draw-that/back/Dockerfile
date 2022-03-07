FROM node:16

WORKDIR /src/usr/workdir
COPY . .
RUN ["npm", "i"]
EXPOSE 8080

CMD ["npm", "run", "dev"]