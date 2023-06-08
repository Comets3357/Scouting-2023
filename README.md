# Scouting 2023


Dashboard Instalation Instructions: 
1. git pull or download the repo
2. run 'npm install' in code/dashboard
3. run 'npx electron-packager . Scouterdeck --platform=win32 --arch=x64' in code/dashboard
   - this will generate a folder called Scouterdeck-win32x64 
   - in this folder is a built application called 'Scouterdeck'. Run it to launch dashbord



Command line commands:
- cd *directory* (navigates to the directory path specified. this can be copied and pasted by navigating to the desired folder and clicking on the url path)

Tablet app commands:
- npm install (installs dependencies)
- npx react-native run-android (runs the app on tablet when tablet is plugged in. make sure tablet asks for USB debugging permission and you accept. also make sure that the right folder path is specified in the metro.config file)

Dashboard app commands:
- npm install (installs dependencies)
- npm start (runs app from terminal which means if you close the terminal the app will quit)
- npx electron-packager . Scouterdeck --platform=win32 --arch=x64 (packages app into an executable so you can open it with a desktop icon)