require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect(`${process.env.DBURL}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "Daniel",
    birthdate: "1994-08-21",
    username: "daniel",
    password: bcrypt.hashSync("daniel", bcrypt.genSaltSync(bcryptSalt)),
},{
  name: "María",
  birthdate: "1989-01-16",
  username: "maria",
  password: bcrypt.hashSync("maria", bcrypt.genSaltSync(bcryptSalt)),
},
{
  name: "Fran",
  birthdate: "1988-04-28",
  username: "fran",
  password: bcrypt.hashSync("fran", bcrypt.genSaltSync(bcryptSalt)),
},
{
  name: "Enrique",
  birthdate: "1988-09-24",
  username: "enrique",
  password: bcrypt.hashSync("enrique", bcrypt.genSaltSync(bcryptSalt)),
},
{
  name: "Rick",
  birthdate: "1970-11-24",
  username: "rick",
  password: bcrypt.hashSync("rick", bcrypt.genSaltSync(bcryptSalt)),
},
{
  name: "Paula",
  birthdate: "1970-11-24",
},
{
  name: "Jesús",
  birthdate: "1970-11-24",
},
{
  name: "Paco",
  birthdate: "1970-11-24",
},
{
  name: "Luis",
  birthdate: "1970-11-24",
},
{
  name: "Marcos",
  birthdate: "1970-11-24",
},
{
  name: "Aida",
  birthdate: "1970-11-24",
},
{
  name: "Estefanía",
  birthdate: "1970-11-24",
},
{
  name: "Esther",
  birthdate: "1970-11-24",
},
{
  name: "Miguel",
  birthdate: "1970-11-24",
},
{
  name: "Carmen",
  birthdate: "1970-11-24",
},
{
  name: "Lorena",
  birthdate: "1970-11-24",
},
{
  name: "Manuel",
  birthdate: "1970-11-24",
},
{
  name: "Jacinto",
  birthdate: "1970-11-24",
},
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})