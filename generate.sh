#!/bin/sh
echo "\nMaking directories...\n"
mkdir -p output/css
mkdir -p output/pdf

echo "Starting static file server...\n"
./node_modules/.bin/http-server output -p 7472 &> ./output/server-blabla.log &

echo "Running generate.sh...\n\n"
time node generate.js

echo "\nKilling static file server...\n"
kill $!

#echo "Running merge-pdfs.sh...\n"
#node merge-pdfs.js

cd output
cd pdf

echo "Merging pdfs...\n"
pdftk *.pdf cat output diary.pdf
echo "Diary.pdf created in /output/pdf\n"

mv Diary.pdf ../
echo "Diary.pdf moved to the output directory...\n"


#cd -
#mkdir -p html
#mv *.html html
exit
