# Pinterest Clone Project "Tinterest"

This is a Pinterest clone project. You can access the page here.
https://tinterest-me.onrender.com

Homepage


Technologies used in this project: python, flask, html, css, javascript, JSX, React, Redux, FontAwesome for icons, Google Fonts for fonts.

To launch the full application locally, please perform the following steps:

1. Clone this repository (only this branch)

2. Install dependencies

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
7. cd into frontend (react-app folder), run npm install, and then run npm start.
