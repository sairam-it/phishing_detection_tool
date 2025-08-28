from fastapi import FastAPI
from pydantic import BaseModel
from url_checker import check_url   # 👈 imports function from url_checker.py

app = FastAPI()

class URLInput(BaseModel):
    url: str

@app.post("/scan/url")
def scan_url(data: URLInput):
    result = check_url(data.url)
    return result
