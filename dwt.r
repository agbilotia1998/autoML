library(wavelets)

sc <- read.table("/home/symphoria/Documents/autoML/pre_data.csv", header=F, sep=",")
wtData <- NULL
for (i in 1:nrow(sc)) {
    a <- t(sc[i,])
    wt <- dwt(a, filter="haar", boundary="reflection")
    wtData <- rbind(wtData, unlist(c(wt@W,wt@V[[wt@level]])))
}
wtData <- as.data.frame(wtData)
write.csv(wtData, 'new_data.csv')