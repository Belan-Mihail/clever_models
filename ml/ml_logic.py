import pandas as pd
from sklearn.preprocessing import StandardScaler
import os

def process_data(file):
    filename = file.filename
    extension = os.path.splitext(filename)[1].lower()
    
    if (extension == ".csv"):
        df = pd.read_csv(file)
    else:
        df = pd.read_excel(file)
    
    return {"columns": list(df.columns), "rows": len(df)} 
