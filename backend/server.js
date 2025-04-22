const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cron = require("node-cron");
const {
  updateDescriptionCountsMonthly,
} = require("./controllers/userController");

dotenv.config({ path: "./config.env" });

const apiRouter = require("./routes/apiRoutes");

const app = express();

// //TURN ON CORS for pre flight
app.options("*", cors());

// // TRUST PROXY FOR HEROKU
app.enable("trust proxy");


app.use(
  helmet({
    frameguard: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(cors());

app.use(express.json({ limit: "100kb" }));

// // JSON BODY AND COOKIE PARSERS --------------------
app.use(express.json({ limit: "100kb" }));



const redis = require("redis");

let redisClient;
if (process.env.NODE_ENV !== 'demo') {
  try {
    console.log("Attempting to connect to Redis...");
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
      socket: {
         tls: true,
         rejectUnauthorized: false
      }
    });

    redisClient.on('error', (err) => console.error('Redis Client Error:', err));
    redisClient.on('connect', () => console.log('Redis Client Connected'));

    redisClient.connect().catch(console.error);

  } catch (err) {
      console.error("Failed to initialize Redis:", err);
  }
} else {
  console.log("DEMO MODE: Skipping Redis initialization.");
}

app.use(mongoSanitize());

// //Set Up Config File -----------------------

// // Connect database ------------------------

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .set("strictQuery", true)
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("DB Conneciton was successful");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(`DB Connection Error: ${err.message}`);
    process.exit(1);
  });


app.use(express.static(path.join(__dirname, "public")));


app.use(xss());


// // ROUTES -----------------------

app.use("/api/v1/", apiRouter);



// LISTEN TO SERVER -----------------------
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}!`);
  console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
});

// Run on the first of every month
try {
  // Run job only if not in demo? Or maybe resetting counts is fine?
  // if (process.env.NODE_ENV !== 'demo') {
    cron.schedule(
      "0 0 1 * *",
      () => {
        console.log("Running monthly description count update...");
        updateDescriptionCountsMonthly().catch(err => {
            console.error("Error during scheduled count update:", err);
        });
      },
      {
        scheduled: true,
        timezone: "America/Sao_Paulo",
      }
    );
    console.log("Scheduled monthly description count update.");
  // } else {
  //   console.log("DEMO MODE: Skipping cron job scheduling.");
  // }
} catch (err) {
  console.error("Failed to schedule cron job:", err);
}

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed');
      if (redisClient && redisClient.isOpen) {
        redisClient.quit(() => {
            console.log('Redis client closed');
            process.exit(0);
        });
      } else {
          process.exit(0);
      }
    });
  });
});
