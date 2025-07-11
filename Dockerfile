# LowKey™ - Primal Genesis Engine™ Edition
# Multi-stage Docker build for production deployment

# =============================================================================
# BUILD STAGE
# =============================================================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# =============================================================================
# PRODUCTION STAGE
# =============================================================================
FROM node:18-alpine AS production

# Create app user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S lowkey -u 1001

# Set working directory
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=lowkey:nodejs /app/.next ./.next
COPY --from=builder --chown=lowkey:nodejs /app/public ./public
COPY --from=builder --chown=lowkey:nodejs /app/next.config.js ./
COPY --from=builder --chown=lowkey:nodejs /app/next-env.d.ts ./

# Create necessary directories
RUN mkdir -p /app/logs /app/backups /app/data && \
    chown -R lowkey:nodejs /app

# Switch to non-root user
USER lowkey

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]

# =============================================================================
# DEVELOPMENT STAGE
# =============================================================================
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Start development server
CMD ["npm", "run", "dev"]

# =============================================================================
# TESTING STAGE
# =============================================================================
FROM node:18-alpine AS testing

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=test
ENV CI=true

# Run tests
CMD ["npm", "test"] 