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
  
 ![Screen Shot 2020-12-08 at 9 53 23 AM](https://media.github.ccs.neu.edu/user/6143/files/55301400-393b-11eb-8cb3-4b7cb3752e29)

2. Upload 2 submissions by clicking on the upload zone and selecting the zip files or by dragging and dropping the zip files in the drop zones.

![image](https://media.github.ccs.neu.edu/user/6143/files/4c0be800-340d-11eb-83f6-f255ac40b4ba)

#### Note:- Size limit to upload .zip files is 15mb per file.

3. Click on the `Check Plagiarism` button. This loads the plagiarism detection results.

![image](https://media.github.ccs.neu.edu/user/6143/files/c6d50300-340d-11eb-9d65-d78b88fbbf53)

4. Result in the form of percentage and pie chart can be seen now.

 <img width="552" alt="Screen Shot 2020-12-07 at 10 02 28 PM" src="https://media.github.ccs.neu.edu/user/6143/files/f5ece800-38d7-11eb-84de-60ca36cdab16">

5. Click on the `Compare` button to examine the code similarities side by side.

![compare](https://media.github.ccs.neu.edu/user/6143/files/bb370b80-3410-11eb-9fc5-b83db87f3f34)

6. After clicking `Compare Button` the application will navigate to below page where a file by file comparision is provided.

 <img width="1277" alt="Screen Shot 2020-12-07 at 9 33 33 PM" src="https://media.github.ccs.neu.edu/user/6143/files/f2eff880-38d3-11eb-8a6c-0030a09004a8">

#### Note: The lines highlighted in red is detected as plagiarized.

7. Using the `Next` and `Prev` buttons navigate through all the program similarities.

![prevnext](https://media.github.ccs.neu.edu/user/6143/files/41068700-3410-11eb-9010-e2b504c4c518)

8. Click `Go Back` button to return to the home screen to upload new submissions.

![goback](https://media.github.ccs.neu.edu/user/6143/files/5c719200-3410-11eb-9bc7-1929bd08acce)

9. Click on `PlageWatch` icon at top left corner of nav bar and it will always redirect to `Home Page`.

![Screen Shot 2020-12-06 at 9 52 44 AM](https://media.github.ccs.neu.edu/user/6143/files/fe92d080-37a8-11eb-894f-9f0dbdfd64f4)

10. Click on `About` icon at top right corner of nav bar and it will redirect to `About Page`.

![Screen Shot 2020-12-06 at 10 08 26 AM](https://media.github.ccs.neu.edu/user/6143/files/1bc89e80-37ab-11eb-86ac-f761bbe1a683)

11. `About Page` describes user guidelines, unique features of PlageWatch and some general details of the logic to find similarities between two .js files.

<img width="1278" alt="Screen Shot 2020-12-07 at 9 28 44 PM" src="https://media.github.ccs.neu.edu/user/6143/files/41e95e00-38d3-11eb-94cb-49173dd6b252">

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

#### [Manual Testing Results Wiki Page](https://github.ccs.neu.edu/CS-4530-5500-Fall-2020-Term-Project/Team-28/wiki)

#### Refer to package.json present inside plage-detect and plage-watch directories.


