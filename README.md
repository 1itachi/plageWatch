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
1. Open Browser (Google Chrome, Safari, etc) and enter the URL `http://localhost:3000/home` on the browser.
#### Note:- It will take some time to open for the first time on browser.
  
  ![image](https://media.github.ccs.neu.edu/user/6143/files/05b68900-340d-11eb-9d21-b7c2ad55b166)

2. Upload 2 submissions by clicking on the upload zone and selecting the zip files or by dragging and dropping the zip files in the drop zones.

![image](https://media.github.ccs.neu.edu/user/6143/files/4c0be800-340d-11eb-83f6-f255ac40b4ba)

#### Note:- Size limit to upload .zip files is 15mb per file.

3. Click on the `Check Plagiarism` button. This loads the plagiarism detection results.

![image](https://media.github.ccs.neu.edu/user/6143/files/c6d50300-340d-11eb-9d65-d78b88fbbf53)

4. Result in the form of percentage and pie chart can be seen now.

![image](https://media.github.ccs.neu.edu/user/6143/files/58447500-340e-11eb-9581-950468354194)

5. Click on the `Compare` button to examine the code similarities side by side.

![compare](https://media.github.ccs.neu.edu/user/6143/files/bb370b80-3410-11eb-9fc5-b83db87f3f34)

6. After clicking `Compare Button` the application will navigate to below page where a file by file comparision is provided.

![leftrightpane](https://media.github.ccs.neu.edu/user/6143/files/42d04a80-3410-11eb-90d4-fc6fee9de961)

#### Note: The lines highlighted in red is detected as plagiarized.

7. Using the `Next` and `Prev` buttons navigate through all the program similarities.

![prevnext](https://media.github.ccs.neu.edu/user/6143/files/41068700-3410-11eb-9010-e2b504c4c518)

8. Click `Go Back` button to return to the home screen to upload new submissions.

![goback](https://media.github.ccs.neu.edu/user/6143/files/5c719200-3410-11eb-9bc7-1929bd08acce)

9. Click on `PlageWatch` icon at top left corner of nav bar and it will always redirect to `Home Page`.

![Screen Shot 2020-12-06 at 9 52 44 AM](https://media.github.ccs.neu.edu/user/6143/files/fe92d080-37a8-11eb-894f-9f0dbdfd64f4)

10. Click on `About` icon at top right corner of nav bar and it will redirect to `About Page`.



11. `About Page` has user guidelines, unique features of PlageWatch and some details of brain which works at the backend to find similarities between two .js files.



### Dependencies
1. Install TypeScript and Node if not already pre-installed into the local system. 
2. The application requires the Node version to be above v12.
3. The application uses React v17.0.1 at the front end.
4. Typescript v4.0 and higher is used at Front end and Back end.
5. Express v4.17.1 is used at server side.

#### Refer to package.json present inside plage-detect and plage-watch directories.
