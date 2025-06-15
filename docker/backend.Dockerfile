FROM python:3.10-slim

# Cài đặt Node.js
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Cài đặt Python dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy .env file
COPY docker/.env .

# Cài đặt Python packages
COPY server/ml_scripts/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Cài đặt Node.js dependencies
COPY server/package*.json ./
RUN npm install

# Copy source code
COPY server/ .

# Tạo volume cho ML models
VOLUME ["/app/server/ml_scripts/models"]

# Thêm script để chạy Python scripts
COPY docker/run_ml_scripts.sh /app/
RUN chmod +x /app/run_ml_scripts.sh

CMD ["npm", "start"]