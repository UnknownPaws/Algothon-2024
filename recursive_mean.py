import pandas as pd
import cryptpandas as crp
import numpy as np
from pprint import pprint
import os

filein = open('out.txt', 'r')
file = filein.readline().strip()
passcode = filein.readline().strip()
filein.close()
df = crp.read_encrypted(path=f"{os.getcwd()}/time-series/{file}", password=f'{passcode}')
# Decrypt the data
submission = {}
df = df.replace([np.inf, -np.inf], np.nan)
df = df.fillna(0)
submission.update({col: 0 for col in df.columns if col.startswith('strat_')})

def mean_sectioned_series(df, sections):
  section_len = df.shape[0] // sections

  rows = []

  for i in range(sections):
      start_idx = i * section_len
      end_idx = (i + 1) * section_len if i < sections - 1 else df.shape[0]
      
      section_mean = df.iloc[start_idx:end_idx, 1:].mean()
      rows.append(section_mean)

  avg_df = pd.DataFrame(rows, columns=df.columns[1:])
  avg_df.index = [f"Average {i+1}" for i in range(sections)]

  return avg_df

resolution = 6
avg_df = mean_sectioned_series(df, resolution)

pos_count = 0
sub_make = {}

while(pos_count < 10):
  pos_count = 0
  sub_make = submission.copy()
  for col in avg_df.columns:
    if col.startswith('strat_'):
        if (avg_df[col] < 0).all():
            sub_make[col] = -0.1
            pos_count += 1
        elif (avg_df[col] > 0).all():
            sub_make[col] = 0.1
            pos_count += 1
  resolution = max(1, resolution - 1) 
  avg_df = mean_sectioned_series(df, resolution)

submission = sub_make.copy()

abs_sum = sum(abs(value) for value in submission.values())

submission = {key: value / abs_sum for key, value in submission.items()}

submission['team_name'] = 'eo.sh.ba'
submission['passcode'] = 'dog'

pprint(submission)
