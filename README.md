# Code Editor with WebSocket Collaboration

This project is a collaborative code editor built with React and WebSocket. It allows multiple users to edit HTML, CSS, and JavaScript code in real-time, with the ability to review and pull changes from other users' editors.
[For Latest changes please clone the test branch instead]
Live Website: [code-editor-collaborate.vercel.app/](code-editor-collaborate.vercel.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm run start:port3000`

Runs the app on port 3000 using `cross-env`.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run start:port3001`

Runs the app on port 3001 using `cross-env`.  
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm run start:port3002`

Runs the app on port 3002 using `cross-env`.  
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Project Structure

### App.js

Main application component that sets up the layout, initializes WebSocket connections, and manages the state for HTML, CSS, and JavaScript editors.

### Editor.js

Individual code editor component that integrates with CodeMirror and WebSocket for real-time collaboration. Supports reviewing and pulling changes from other users.

### useLocalStorage.js

Custom hook for managing state with localStorage, ensuring data persistence across sessions.

### server.js

WebSocket server that handles real-time communication between clients. Broadcasts changes made by one user to all other connected users.

## Live Deployment
The project is deployed live on Vercel at: code-editor-collaborate.vercel.app/

## Future Enhancements
1)Add user authentication and authorization
2)Enhance real-time collaboration features with more granular control
3)Improve the user interface for a better user experience
4)Add more advanced code editing features and integrations

## Running the WebSocket Server

To start the WebSocket server, run:

```bash
node server.js
The server will be running on ws://localhost:8080.
