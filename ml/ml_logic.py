import pandas as pd
from sklearn.preprocessing import StandardScaler

def process_data(data):
    
    df = pd.DataFrame(data)
    
    scaler = StandardScaler()
    df_scaled = scaler.fit_transform(df)

    # return as list of lists
    return df_scaled.tolist()
