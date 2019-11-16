import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

input_file = "new_data.csv"

df = pd.read_csv(input_file)
del df['ID']
df = StandardScaler().fit_transform(df)

pca = PCA(n_components=11)
principalComponents = pca.fit_transform(df)
principalDf = pd.DataFrame(data = principalComponents)
print(principalDf)
principalDf.to_csv("reduced_data.csv")