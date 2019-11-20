library(data.table)
library(autoML)
library(autoEDA)

set.seed(1991)
options(scipen = 999)

full <- fread("/home/symphoria/Documents/autoML/reduced_data.csv",
              data.table = FALSE,
              stringsAsFactors = FALSE)

res <- autoML(train = full,
              id = "ID")

print(res$result)

write.csv(res$trainedModels$kmeans_full$model$learner.model$cluster, "/home/symphoria/Documents/autoML/classified.csv")