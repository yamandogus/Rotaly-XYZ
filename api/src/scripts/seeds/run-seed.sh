#!/usr/bin/env bash

echo "🌱 Starting hotel database seeding..."

cd /home/cagla/projects/Rotaly-XYZ/api

npx ts-node src/scripts/seeds/seed-hotels.ts

echo "✅ Seeding script completed!"
