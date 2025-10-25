# First Stage 
# Use a base image with your application's runtime 
FROM node:20-alpine AS builder

# set working directory inside the container
WORKDIR /app


# Copy app dependencies 
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of your application code
COPY . .

RUN npm run build


# Second stage
FROM node:20-alpine 

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Set environment variable for production
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install 
# install necessary lib for prodcution run

#Expose the port your application listens on
EXPOSE 4000

#Define the command to run your application when the container start
CMD ["npm", "start"]


