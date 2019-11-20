printf "Stripping Headers...\0"
python3 script.py
printf "done\n"

printf "Computing DWT..."
Rscript dwt.r
printf "done\n"

printf "Applying PCA..."
python3 pca_decomposition.py
printf "done\n"

printf "Classifying data..."
Rscript test.r
printf "done\n"

printf "Associating labels..."
python3 do_classes.py
printf "done\n"