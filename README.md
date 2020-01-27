# Daniel González - Innocv

This project its a MERN SPA as a technical interview for Innocv.

The main function is create, see, update and delete users. (AKA CRUD)

## Back End 🗂

I used Node.js, built with Express and MongoDB as database.

I made a seed to populate the DB with users. Just write "node bin/seeds.js". 

Endpoints
- GET ALL: Get all users from database
- GET: Specify and user id to get a user
- CREATE: Create a new user
- UPDATE: Update an existing user
- REMOVE: Remove an existing user

I added authentication with Passport, so the user model has "username" and "password" too.

Don't forget to add a .env file with these params:
- PORT=3001
- ENV=development
- REACT_APP_WEB_URL=http://localhost:3000
- DBURL='mongodb://localhost/innocv'

## Front End 🖥️

Here in the Front I've used React.js and Sass.

All made in a SPA no refresh needed and it's responsive! ;D
I've used Bootstrap for a couple buttons.

Endpoints
- "/" To get all users
- "/users/:id" Get user profile
- "/new" Create new users
- "/login" Login page
- "/signup" Signup page
- "/????" A 404 error page
- "/secret" Top secret panel 👀

It has two languages! (ENG🇬🇧 ESP🇪🇸)

Don't forget to add a .env file with these params:
- REACT_APP_API_URL=http://localhost:3001/api

### Now the bad news :(

I couldn't do the date form validation and couldn't do unit testing for components... Seriously, I don't know how to do them. I really don't know what to test in the components. 

### Conclusion

I had a lot of fun doing this mini-project. I've consolidated things that were a little confusing for me. I did new things also. It would be incredible if someone could explain or show me the things that I did bad and the things that I haven't done.

Cheers!