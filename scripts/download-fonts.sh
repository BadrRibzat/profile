#!/bin/bash

# Create fonts directory
mkdir -p public/fonts

# Download Noto Sans fonts
echo "Downloading Noto Sans fonts..."
curl -L "https://github.com/google/fonts/raw/main/ofl/notosans/NotoSans%5Bwdth%2Cwght%5D.ttf" -o public/fonts/NotoSans-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/notosans/NotoSans-Italic%5Bwdth%2Cwght%5D.ttf" -o public/fonts/NotoSans-Bold.ttf

# Download Noto Sans Arabic
echo "Downloading Noto Sans Arabic fonts..."
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansarabic/NotoSansArabic%5Bwdth%2Cwght%5D.ttf" -o public/fonts/NotoSansArabic-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansarabic/NotoSansArabic%5Bwdth%2Cwght%5D.ttf" -o public/fonts/NotoSansArabic-Bold.ttf

# Download Noto Sans JP
echo "Downloading Noto Sans JP fonts..."
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf" -o public/fonts/NotoSansJP-Regular.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf" -o public/fonts/NotoSansJP-Bold.ttf

echo "Fonts downloaded successfully!"
