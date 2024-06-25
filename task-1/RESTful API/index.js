const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const connectDB = require("./pkg/db/mongo");
const { PORT, JWT_KEY } = require("./pkg/config/config");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!JWT_KEY) {
  console.error("JWT_KEY is not defined in the environment variables");
  process.exit(1);
}

app.use(
  jwt({
    secret: JWT_KEY,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: "/test", methods: ["GET"] },
      { url: "/welcome", methods: ["GET"] },
      { url: "/api/auth/login", methods: ["POST"] },
      { url: "/api/auth/register", methods: ["POST"] },
      { url: "/", methods: ["GET"] },
      { url: "/api/kurs", methods: ["GET"] },
      { url: "/api/akademija", methods: ["GET"] },
      { url: /\/api\/kurs\/.*/, methods: ["GET"] },
      { url: /\/api\/akademija\/.*/, methods: ["GET"] },
    ],
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

const akademijaRoutes = require("./routes/akademija");
const kursRoutes = require("./routes/kurs");
const testRoutes = require("./routes/test");
const welcomeRoutes = require("./routes/welcome");
const authRoutes = require("./routes/auth");

app.use("/api/akademija", akademijaRoutes);
app.use("/api/kurs", kursRoutes);
app.use("/", testRoutes);
app.use("/", welcomeRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
