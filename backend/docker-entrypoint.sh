#!/bin/bash
set -e

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
sleep 15

echo "Clearing Laravel caches..."
# Clear all caches to avoid issues
rm -rf bootstrap/cache/*.php
rm -rf storage/framework/cache/data/*
rm -rf storage/framework/sessions/*
rm -rf storage/framework/views/*

echo "Starting Laravel server..."

# Execute the main command
exec "$@"