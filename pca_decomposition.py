import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import fileinput

input_file = "new_data.csv"

df = pd.read_csv(input_file)
df.drop(df.columns[[0]], axis=1, inplace=True)
df = StandardScaler().fit_transform(df)

pca = PCA(n_components=11)
principalComponents = pca.fit_transform(df)
principalDf = pd.DataFrame(data = principalComponents)
print(principalDf)
principalDf.to_csv("reduced_data.csv")

for line in fileinput.input('reduced_data.csv', inplace=True):
    if fileinput.isfirstline():
        print("ID" + line, end='')
    else:
        print(line, end='')