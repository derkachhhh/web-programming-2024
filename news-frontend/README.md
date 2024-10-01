## How to run project

1. Double-click on the index.html file, and it should open in your default web browser (e.g., Chrome, Firefox). 
2. Check that the port the app runs on is listed in the news-backend/news/settings.py CORS_ORIGIN_WHITELIST (or update CORS_ORIGIN_WHITELIST if needed).

OR

1. Run Python's http.server lightweight server to serve the frontend
```
python -m http.server 8001
```