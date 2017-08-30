# Run npm test before build!
FROM node:6

MAINTAINER Alan Marcell
WORKDIR /dir
ENV NODE_ENV=production

ADD package.json .
RUN npm install

ADD /dist ./dist
ADD /public ./public


EXPOSE 8080
RUN ls
CMD ["npm", "run", "serve"]
