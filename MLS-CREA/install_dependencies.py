import os

dependencies = ["requests", "urllib3", "xmltodict", "json", "python-dotenv", "pymongo[srv]", "geopy"]
for i in dependencies:
    os.system('python -m pip install {}'.format(i))