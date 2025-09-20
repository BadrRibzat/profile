#!/bin/bash

# Script to add verification notes to PDF proof packs
echo "Adding verification notes to PDF packs..."

# Create a temporary text file with verification notes
cat > verification-note.txt << 'EOT'
DOCUMENT VERIFICATION NOTES

This document package contains certified copies and translations of original documents.

ALL DOCUMENTS ARE EITHER:
- Original certificates issued by recognized institutions
- Certified true copies of original documents
- Professionally translated for official purposes

CONTACT FOR VERIFICATION:
Badr Ribzat
Email: badrribzat@gmail.com
Portfolio: https://badrribzat.dev

Note: Some documents may require additional verification through the issuing institutions.
Please contact the above email for any verification requests.

===================================================
OFFICIAL TRANSLATION FOR IMMIGRATION PURPOSES
Generated on: $(date +"%Y-%m-%d")
===================================================
EOT

# Add verification notes to each language pack
for lang in en fr de es ar ja; do
  if [ -f "public/documents/packs/proof-pack-${lang}.pdf" ]; then
    echo "Processing proof-pack-${lang}.pdf..."
    
    # Convert text to PDF (using librebarcode6 if available, or simple text)
    if command -v enscript >/dev/null 2>&1; then
      enscript -B -p verification-page.ps verification-note.txt
      ps2pdf verification-page.ps verification-page.pdf
    else
      # Fallback: create a simple text PDF using HTML
      echo "<html><body><pre>$(cat verification-note.txt)</pre></body></html>" | 
      wkhtmltopdf - verification-page.pdf 2>/dev/null || 
      echo "Warning: Could not create PDF, install enscript or wkhtmltopdf for automatic verification pages"
    fi
    
    # Merge verification page with existing PDF (if pdftk is available)
    if command -v pdftk >/dev/null 2>&1 && [ -f "verification-page.pdf" ]; then
      pdftk verification-page.pdf "public/documents/packs/proof-pack-${lang}.pdf" cat output "public/documents/packs/proof-pack-${lang}-verified.pdf"
      mv "public/documents/packs/proof-pack-${lang}-verified.pdf" "public/documents/packs/proof-pack-${lang}.pdf"
      echo "Added verification page to proof-pack-${lang}.pdf"
    else
      echo "Note: Install pdftk to automatically add verification pages:"
      echo "sudo apt install pdftk"
    fi
  fi
done

# Cleanup
rm -f verification-note.txt verification-page.ps verification-page.pdf 2>/dev/null
echo "Verification notes process completed!"
