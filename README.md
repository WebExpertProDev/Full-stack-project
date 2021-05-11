# Housee Frontend

We are using Next.js in this project. To run the project locally,
First make sure you have nodejs version 10 or above installed.
Then, install yarn.

``npm i yarn``

``yarn``

``yarn dev``

Now, go to localhost:3000

To build the project for production

``yarn build && yarn start``

To export static HTML CSS JS

``yarn build && next export``

To run using docker:

``docker build . -t housee_fe``

``docker run -d -p 3333:3000 housee_fe``

