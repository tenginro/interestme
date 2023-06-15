# "Tinterest"
This is a Pinterest clone project. You can access the page here.
https://tinterest-me.onrender.com

## Landing Page
![Screenshot 2023-06-09 at 10 26 25](https://github.com/tenginro/interestme/assets/108156588/4d4ebdd9-6518-463a-a5e9-d1eceb771924)

## Homepage
![Screenshot 2023-06-09 at 13 23 27](https://github.com/tenginro/interestme/assets/108156588/1b426369-d09c-4c32-b636-082c34a4a82a)

## Technologies Used In This Project
Python, Flask, HTML, CSS, JavaScript, JSX, React, Redux, FontAwesome for icons, Google Fonts for fonts.


## To Launch Full Application Locally, Perform Following Steps:

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


7. cd into frontend (react-app folder), run `npm install`, and then run `npm start`.


# Features

## Pins
- CREATE (create a pin - /api/pins)
- READ (read all pins - /api/pins)
- UPDATE (update a pin - /api/pins/<int:id> )
- DELETE (delete a pin - /api/pins/<int:id> )

## Boards
- CREATE (create a board - /api/boards)
- READ 
      (read all boards that the user owned - /api/boards)
      (read one board detail that the user owned - /api/boards/<int:id>)
- UPDATE (update a board - /api/boards/<int:id>)
- DELETE (delete a board - /api/boards/<int:id>)

## Profiles
- CREATE
- READ 
      (read all pins created by the current user -  /api/pins/current) 
      (read all boards and pins saved by the current user -    /api/boards)
      
## Saves (Pins)
- CREATE (save a pin to profile or board  -  /api/pins/<int:id>/save)
- DELETE (unsave a pin   -  /api/pins/<int:id>/unsave )

## Follows
- CREATE (follow a user  - /api/users/<int:id>/follow)
- READ 
  - /api/auth/login
      (read followings for the current user)
      (read followers for the current user)
  - /api/users/<int:id>
      (read followings for another user)
      (read followers for another user)
- DELETE (unfollow a user  - /api/users/<int:id>/follow)

# Future Features

