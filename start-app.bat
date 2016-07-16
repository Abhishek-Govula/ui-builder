@echo off
color 0a

echo "Launching the application"
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:9999/" --new-tab

@echo on
node app.js

