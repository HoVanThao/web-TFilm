# Build stage
FROM node:22.14.0 as build
WORKDIR /app
COPY Client/package*.json ./
RUN npm install
COPY Client/ .
RUN npm run build

# Production stage
FROM node:22.14.0
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY Client/package*.json ./
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]