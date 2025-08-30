from fastapi import FastAPI
from pydantic import BaseModel
from url_checker import check_url   # 👈 imports function from url_checker.py
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class URLInput(BaseModel):
    url: str

@app.post("/scan/url")
def scan_url(data: URLInput):
    result = check_url(data.url)
    return result

# After creating your FastAPI app, add:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
