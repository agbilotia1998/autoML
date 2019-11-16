library(data.table)
library(autoML)
library(autoEDA)
library(wavelets)

# sc <- read.table("/home/symphoria/Documents/autoML/pre_pre_data1.csv", header=F, sep=",")
# wtData <- NULL
# for (i in 1:nrow(sc)) {
#     a <- t(sc[i,])
#     wt <- dwt(a, filter="haar", boundary="reflection")
#     wtData <- rbind(wtData, unlist(c(wt@W,wt@V[[wt@level]])))
# }
# wtData <- as.data.frame(wtData)
# write.csv(wtData, 'new_data.csv')

set.seed(1991)
options(scipen = 999)

full <- fread("/home/symphoria/Documents/autoML/reduced_data.csv",
              data.table = FALSE,
              stringsAsFactors = FALSE)

res <- autoML(train = full,
              id = "ID")

print(res$result)

write.csv(res$trainedModels$kmeans_full$model$learner.model$cluster, "/home/symphoria/Documents/autoML/classified.csv")