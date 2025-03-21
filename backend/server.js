const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

const authRoutes = require("./routes/auth");
const googleAuthRoutes = require("./routes/googleAuth");
require("./config/passport"); // Import Passport config

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/auth", googleAuthRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));





/*
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful!", token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/













/*
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;
const WINDOW_SIZE = 10;
const numberStore = [];

const THIRD_PARTY_APIS = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibonacci",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/random",
};

// Function to fetch numbers with a timeout of 500ms
const fetchNumbers = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error("Error fetching numbers:", error.message);
    return [];
  }
};

// API Endpoint
app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  const apiUrl = THIRD_PARTY_APIS[numberid];
  
  if (!apiUrl) {
    return res.status(400).json({ error: "Invalid number ID. Use 'p', 'f', 'e', or 'r'." });
  }
  
  const windowPrevState = [...numberStore];
  const fetchedNumbers = await fetchNumbers(apiUrl);
  
  // Add unique numbers to the store (FIFO behavior)
  fetchedNumbers.forEach((num) => {
    if (!numberStore.includes(num)) {
      if (numberStore.length >= WINDOW_SIZE) numberStore.shift();
      numberStore.push(num);
    }
  });
  
  const avg = numberStore.length > 0 ? (numberStore.reduce((a, b) => a + b, 0) / numberStore.length).toFixed(2) : 0;
  
  res.json({
    windowPrevState,
    windowCurrState: numberStore,
    numbers: fetchedNumbers,
    avg: parseFloat(avg),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/