# Use Node.js 20 Alpine image from AWS public ECR
FROM public.ecr.aws/docker/library/node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start", "--", "--hostname", "0.0.0.0"]