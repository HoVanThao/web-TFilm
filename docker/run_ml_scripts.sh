#!/bin/bash

# Chạy content-based model training
echo "Training content-based model..."
python /app/server/ml_scripts/train_content_based.py

# Chạy collaborative filtering model training
echo "Training collaborative filtering model..."
python /app/server/ml_scripts/train_collaborative_filtering.py

# Chạy hybrid model training
echo "Training hybrid model..."
python /app/server/ml_scripts/train_hybrid.py 