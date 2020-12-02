<h1 align="center"> Plage Watch <img src='/plage-watch/src/images/plagewatch.jpg' alt='logo' width=50px /></h1> 

## A Web Application to detect plagiarism in Javascript files.


### Steps to Build the application

1. Clone this repository or download the zip file of the entire application.

2. Open the editor of your choice preferably `Visual Studio Code`.

3. Open the project folder using the editor or directly paste the repository link and wait for it to finish loading the folder.

4. Navigate to the `plage-detect` folder using command prompt or terminal: 
```
npm install
``` 
It will install the dependencies on local system mentioned in the `package.json` file present inside `plage-detect` directory.

5. Navigate to the `plage-watch` folder using command prompt or terminal: 
```
npm install
```
It will install the dependencies on local system mentioned in the `package.json` file present inside `plage-watch` directory.


4] Navigate to `plage-detect` folder from command prompt or terminal run command: 
#### `npm install.` 
It will install the dependencies on local system mentioned in package.json file present inside plage-detect.
### Steps to Run the application
1. Front-end
Navigate to the `plage-watch` directory and run the command:
```
npm start
```
2. Back-end
Navigate to the `plage-detect` directory and run the command:
```
npm start
```

### Steps to use the PlagWatch application

5] Navigate to `plage-watch` folder and from command prompt or terminal run command: 
#### `npm install.` 
It will install the dependencies on local system mentioned in package.json file present inside plage-watch.
1. Open Browser (Google Chrome, Safari, etc) and enter the URL `http://localhost:3000/home` on the browser.
  * Note:- It will take some time to open for the first time on browser.

2. Upload 2 submissions by clicking on the upload zone and selecting the zip files or by dragging and dropping the zip files in the drop zones.
##### Note:- the size limit to upload .zip files is 15mb per file.

3. Click on the `Check Plagiarism` button. This loads the plagiarism detection results.

4. Click on the `Compare` button to examine the code similarities side by side.

5. Using the `Next` and `Prev` buttons navigate through all the program similarities.

6. Click `Go Back` button to return to the home screen to upload new submissions.


### Dependencies
1. The application requires the Node version to be above v12.
#### Refer to package.json present inside plage-detect and plage-watch directories.
