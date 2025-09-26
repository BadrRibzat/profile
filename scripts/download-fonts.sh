#!/bin/bash

# Create fonts directory
mkdir -p public/fonts

# Download Noto Sans fonts (these are usually static TTFs)
echo "Downloading Noto Sans fonts (static versions)..."
# Using specific static versions for reliability
curl -L "https://github.com/google/fonts/raw/main/ofl/notosans/static/ttf/NotoSans/NotoSans-Regular.ttf" -o public/fonts/NotoSans-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/notosans/static/ttf/NotoSans/NotoSans-Bold.ttf" -o public/fonts/NotoSans-Bold.ttf

# Download Noto Sans Arabic (static versions)
echo "Downloading Noto Sans Arabic fonts (static versions)..."
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansarabic/static/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf" -o public/fonts/NotoSansArabic-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansarabic/static/ttf/NotoSansArabic/NotoSansArabic-Bold.ttf" -o public/fonts/NotoSansArabic-Bold.ttf

# Download Noto Sans JP (static versions)
echo "Downloading Noto Sans JP fonts (static versions)..."
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansjp/static/ttf/NotoSansJP/NotoSansJP-Regular.ttf" -o public/fonts/NotoSansJP-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansjp/static/ttf/NotoSansJP/NotoSansJP-Bold.ttf" -o public/fonts/NotoSansJP-Bold.ttf

echo "Fonts downloaded successfully!"
