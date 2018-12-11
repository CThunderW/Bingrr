// image sizes are "w92", "w154", "w185", "w342", "w500", "w780"
// Require all modules
const path = require("path");
// const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const cookieSession = require("cookie-session");
const express = require("express");
const session = require("express-session");
const connectRedis = require("connect-redis");
const User = require("./models/user");
const knex = require("knex");
const http = require("http");
const app = express();
const server = http.Server(app);
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const $ = require("jquery");
var cors = require("cors");
// const cache = require("./cache");
const cache = require("express-redis-cache")();
// var cache = require("express-redis-cache")({
//   host: "http://localhost",
//   port: 3333
// });

// let store = new RedisStore({ port: 6379, host: "localhost" });
const RedisStore = connectRedis(session);
let redisCache = new RedisStore({ port: 3333, host: "localhost" });
if (process.env.REDIS_URL) {
  store = new RedisStore({ url: process.env.REDIS_URL });
}
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["id", "userName", "password"],
//     maxAge: 24 * 60 * 60 * 1000
//   })
// );
app.use(
  session({
    secret: "Portia and Pascal",
    name: "session",
    store: new RedisStore({ port: 6379, host: "localhost" }),
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }
  })
);

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
};
app.use(cors(corsOptions));
// Declare that we will be using ejs views.

//
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

// Make userName a local variable that can be called everywhere.
// app.use((request, response, next) => {
//   const userName = request.cookies.userName;
//   response.locals.userName = "";
//   if (userName) {
//     response.locals.userName = userName;
//     console.log(`Signed in as ${userName}`);
//   }
//   next();
// });

// Method override to make the delete function work with express
app.use(
  methodOverride((req, res) => {
    if (typeof req.body === "object" && req.body._method) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// app.use(async (req, res, next) => {
//   try {
//     const { userId } = req.session;
//     if (userId) {
//       const user = await User.findById(userId);
//       req.currentUser = user;
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// redis session management

app.use(async (req, res, next) => {
  try {
    const { userId } = req.session;
    console.log("106: ", req.session);
    if (userId) {
      const user = await User.findById(userId);
      req.currentUser = user;
      console.log("line 103", req.currentUser);
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

server.listen(4321, function() {
  console.log("server running on 4321");
});
