# ---- Stage 1: Builder ----
# Use an official Node.js Long-Term Support (LTS) image as the base.
# We use the 'alpine' variant for a lightweight, secure base.
FROM node:18-alpine AS builder

# Set the working directory inside the container for all subsequent commands.
WORKDIR /app

# Copy the package.json and package-lock.json files first.
# This allows Docker to use a cached layer for `npm ci` unless these files change.
COPY package*.json ./

# Install project dependencies. `npm ci` is more reliable for CI/CD builds than `npm install`.
RUN npm ci --omit=dev

# Copy the rest of the application's source code.
COPY . .

# If your application requires a build step (e.g., for a React or Vue frontend),
# uncomment and run it here.
# RUN npm run build

# ---- Stage 2: Production ----
# Use the same minimal base image for the final, production-ready image.
FROM node:18-alpine

# Set the working directory for the final application.
WORKDIR /app

# Copy only the necessary files from the 'builder' stage.
# This results in a smaller, more secure final image.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ .

# Expose the port your application will be running on.
# Change this if your app runs on a different port.
EXPOSE 3000

# Run the application as the 'node' user to avoid running as root.
USER node

# Define the command to start your Node.js application.
# It is best practice to use 'node your_main_file.js' instead of 'npm start'
# to ensure signals are handled correctly. Replace 'index.js' with your main file.
CMD ["node", "index.js"]
