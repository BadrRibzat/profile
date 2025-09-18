#!/bin/bash

# Create directory structure
mkdir -p public/documents/{education,professional,technical,health,language,packs}

# Copy education documents
cp "public/proof/Transcript - 368861 - Badr (Badr Ribzat) Ribzat (1).pdf" "public/documents/education/alx-transcript.pdf"
cp "public/proof/Third-level preparatory completion certificate.pdf" "public/documents/education/third-level-certificate.pdf"

# Copy professional documents
cp "public/proof/DriverLicenses.pdf" "public/documents/professional/driver-license.pdf"
cp "public/proof/hairstyles diplomas.pdf" "public/documents/professional/hairstyling-diploma.pdf"

# Copy technical documents
cp "public/proof/IBMDesign20250902-32-dlp41b.pdf" "public/documents/technical/ibm-design-certificate.pdf"
cp "public/proof/Full-Stack Software Engineer Accredited Certificates proofs of self though skills.pdf" "public/documents/technical/software-engineering-certificates.pdf"

# Copy health documents
cp "public/proof/self interest certificates in food and beverage health and nutrition and cancer research.pdf" "public/documents/health/nutrition-certificates.pdf"

# Copy language documents
cp "public/proof/self though English learning certificates.pdf" "public/documents/language/english-certificates.pdf"

# Copy proof packs
cp "public/proof/proof-pack-en.pdf" "public/documents/packs/proof-pack-en.pdf"
cp "public/proof/proof-pack-fr.pdf" "public/documents/packs/proof-pack-fr.pdf"
cp "public/proof/proof-pack-de.pdf" "public/documents/packs/proof-pack-de.pdf"
cp "public/proof/proof-pack-es.pdf" "public/documents/packs/proof-pack-es.pdf"
cp "public/proof/proof-pack-ar.pdf" "public/documents/packs/proof-pack-ar.pdf"
cp "public/proof/proof-pack-ja.pdf" "public/documents/packs/proof-pack-ja.pdf"

echo "Documents organized successfully!"
