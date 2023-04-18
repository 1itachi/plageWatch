<h1 align="center"> <img src='/plage-watch/src/images/plagewatch.jpg' alt='logo' width=50px /> Plage Watch </h1> 

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

Note: Make sure to delete tsconfig.json after downloading the application from the ```plage-watch``` folder, and every time you do npm start in the ```plage-watch``` front end folder. 

### Steps to use the PlagWatch application
1. Open Browser (Google Chrome, Safari, etc) and enter the URL `http://localhost:3000/home` on the browser.
#### Note:- It will take some time to open for the first time on browser.
  

2. Upload 2 submissions by clicking on the upload zone and selecting the zip files or by dragging and dropping the zip files in the drop zones.

#### Note:- Size limit to upload .zip files is 15mb per file.

3. Click on the `Check Plagiarism` button. This loads the plagiarism detection results.


4. Result in the form of percentage and pie chart can be seen now.


5. Click on the `Compare` button to examine the code similarities side by side.


6. After clicking `Compare Button` the application will navigate to below page where a file by file comparision is provided.

#### Note: The lines highlighted in red is detected as plagiarized.

7. Using the `Next` and `Prev` buttons navigate through all the program similarities.


8. Click `Go Back` button to return to the home screen to upload new submissions.

9. Click on `PlageWatch` icon at top left corner of nav bar and it will always redirect to `Home Page`.

10. Click on `About` icon at top right corner of nav bar and it will redirect to `About Page`.

11. `About Page` describes user guidelines, unique features of PlageWatch and some general details of the logic to find similarities between two .js files.

12. The live version of PlageWatch can seen on the below link:


#### Backend is hosted on Heroku and Frontend is seperately hosted on Netlify.
The application can be found here: [PlageWatch Web Application](https://plagewatch.netlify.app/)

### Dependencies
1. Install TypeScript and Node if not already pre-installed into the local system. 
2. The application requires the Node version to be above v12.
3. The application uses React v17.0.1 at the front end.
4. Typescript v4.0 and higher is used at Front end and Back end.
5. Express v4.17.1 is used at server side.
6. Mocha v8.1.3 & Chai v4.2.0 is used for Backend testing.
7. We performed manual testing for front end.
8. Manual Testing details are present on the below Wiki link

#### Refer to package.json present inside plage-detect and plage-watch directories.


