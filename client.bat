@echo off
cd "%~dp0"
start npm run dev -- --port 3000

timeout /t 3 /nobreak >nul
start chrome "http://localhost:3000/"
timeout /t 2 /nobreak >nul
echo Set WshShell = WScript.CreateObject("WScript.Shell") > %temp%\LaunchChrome.vbs
echo WshShell.AppActivate "Google Chrome" >> %temp%\LaunchChrome.vbs
echo WshShell.SendKeys "{F11}" >> %temp%\LaunchChrome.vbs
cscript /nologo %temp%\LaunchChrome.vbs