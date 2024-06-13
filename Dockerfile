##### Stage 1

FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

##### Stage 2

FROM nginx:alpine

COPY --from=build /app/dist/security-dashboard/browser /usr/share/nginx/html

COPY ./config/angular-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000
