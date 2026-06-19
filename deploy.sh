#!/bin/bash
set -e

echo "Starting deployment of ric-gateway..."

cd /var/www/ric-gateway

echo "Discarding any local changes..."
git reset --hard HEAD
git clean -fd

echo "Pulling latest code from main..."
git pull origin main

echo "Installing dependencies..."
pnpm install

echo "Building Next.js app..."
pnpm run build

echo "Restarting app with PM2..."
pm2 restart ric-gateway

echo "Deployment complete"
