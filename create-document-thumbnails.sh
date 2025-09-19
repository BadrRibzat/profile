#!/bin/bash
# create-document-thumbnails.sh

echo "Creating document thumbnails..."

# Create thumbnails directory
mkdir -p public/images/documents

# Function to convert PDF to JPG thumbnail
convert_pdf_to_thumbnail() {
    local pdf_file="\$1"
    local output_name="\$2"
    local category="\$3"
    
    echo "Converting $pdf_file to thumbnail..."
    
    # Use your PDF to JPG converter tool here
    # Example with ImageMagick (if you have it installed):
    # convert "$pdf_file[0]" -thumbnail 400x300 "public/images/documents/${output_name}.jpg"
    
    # Or use your existing tool to convert and then move/rename the file
    # your-pdf-converter-tool "$pdf_file" "public/images/documents/${output_name}.jpg"
    
    echo "Created thumbnail: public/images/documents/${output_name}.jpg"
}

# Convert each document to thumbnail
convert_pdf_to_thumbnail "public/documents/education/alx-transcript.pdf" "alx-transcript" "education"
convert_pdf_to_thumbnail "public/documents/education/third-level-certificate.pdf" "third-level-certificate" "education"
convert_pdf_to_thumbnail "public/documents/professional/driver-license.pdf" "driver-license" "professional"
convert_pdf_to_thumbnail "public/documents/professional/hairstyling-diploma.pdf" "hairstyling-diploma" "professional"
convert_pdf_to_thumbnail "public/documents/technical/ibm-design-certificate.pdf" "ibm-design-certificate" "technical"
convert_pdf_to_thumbnail "public/documents/technical/software-engineering-certificates.pdf" "software-engineering-certificates" "technical"
convert_pdf_to_thumbnail "public/documents/health/nutrition-certificates.pdf" "nutrition-certificates" "health"
convert_pdf_to_thumbnail "public/documents/language/english-certificates.pdf" "english-certificates" "language"

echo "All thumbnails created!"
