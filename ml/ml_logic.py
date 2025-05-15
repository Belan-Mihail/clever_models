import pandas as pd
import os
import joblib
import uuid

BASE_TEMP_DIR = "ml/temp"

def first_process_data(file):
    filename = file.filename
    extension = os.path.splitext(filename)[1].lower()
    
    if (extension == ".csv"):
        df = pd.read_csv(file)
    else:
        df = pd.read_excel(file)

    # Create ID for session
    session_id = str(uuid.uuid4())
    session_path = os.path.join(BASE_TEMP_DIR, session_id)
    os.makedirs(session_path, exist_ok=True)

    # save df
    joblib.dump(df, os.path.join(session_path, "df.pkl"))
    
    return {
        "session_id": session_id,
        "columns": list(df.columns),
        "columns_type": [str(dtype) for dtype in df.dtypes],
        "rows_count": len(df)
    }
