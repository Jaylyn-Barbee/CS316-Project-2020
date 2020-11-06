# CS316-Project-2020

To rundev mode python3 -->  python -m http.server 8000

Instructions on how data was cleaned:
1. Use "DataCleaning.ipynb" to clean the data "python -m notebook"
2. Convert shortListModified.csv to json here --> https://csvjson.com/csv2json and save as recipeList.json in data folder
3. to clean json after using csv to json
    - find & replace ' with "
    - find & replace "{ with {
    - find & repalce }" with }
    - find & replace "": [0-9]+, (in regex mode) with nothing
4. upload new recipeList to firebase