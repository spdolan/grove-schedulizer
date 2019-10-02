<summary>Schedulizer for Grove Co.</summary> 
  
* This application takes tasks from Grove's task endpoint [https://scheduler-challenge.grove.co/] , and converts them into a viewable schedule.
* The app currently only looks at the month of October 2019, but could be opened for any date range.
* Schedulizer also will send browser Notifications if the user so desires, but the User must click the
* 'Notify Me' button above the schedule for the day. Note: this will only notify the User for the 
* current day's tasks (not the selected day).

<details><summary>Getting Things Together</summary> 
  
* Navigate the root folder, run 'npm install' on your local machine for dependencies.

</details>
<details><summary>Getting Things Running</summary> 
  
* Within your terminal, after the above installations have run successfully: 
  * run 'npm start' within the root folder, to start the React app (default to localhost:3000).


</details>
<details><summary>Once You're Running</summary> 
  
* Navigate to localhost:3000, and see what's happening for the day!
* Click the 'Notify Me' button to receive browser notifications - if you browser supports them.
  * These notifications will only run for the current day's tasks.
  * You will still be able to view any future or past tasks - provided they are within October 2019.

</details>


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
