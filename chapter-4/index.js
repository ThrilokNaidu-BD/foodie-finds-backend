const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database("./chapter-4/database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// API Endpoints

// 1. Get All Restaurants
app.get("/restaurants", (req, res) => {
  db.all("SELECT * FROM restaurants", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ restaurants: rows });
    }
  });
});

// 2. Get Restaurant by ID
app.get("/restaurants/details/:id", (req, res) => {
const id = req.params.id;
  db.get("SELECT * FROM restaurants WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ restaurant: row });
    }
  });
});

// 3. Get Restaurants by Cuisine
app.get("/restaurants/cuisine/:cuisine", (req, res) => {
  const cuisine = req.params.cuisine;
  db.all("SELECT * FROM restaurants WHERE cuisine = ?", [cuisine], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ restaurants: rows });
    }
  });
});

// 4. Get Restaurants by Filters
app.get("/restaurants/filter", (req, res) => {
  const { isVeg, hasOutdoorSeating, isLuxury } = req.query;
  const query = `
    SELECT * FROM restaurants
    WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?
  `;
  db.all(query, [isVeg, hasOutdoorSeating, isLuxury], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ restaurants: rows });
    }
  });
});

// 5. Get Restaurants Sorted by Rating
app.get("/restaurants/sort-by-rating", (req, res) => {
  db.all("SELECT * FROM restaurants ORDER BY rating DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ restaurants: rows });
    }
  });
});

// 6. Get All Dishes
app.get("/dishes", (req, res) => {
  db.all("SELECT * FROM dishes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ dishes: rows });
    }
  });
});

// 7. Get Dish by ID
app.get("/dishes/details/:id", (req, res) => {
const id = req.params.id;
  db.get("SELECT * FROM dishes WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ dish: row });
    }
  });
});

// 8. Get Dishes by Filter
app.get("/dishes/filter", (req, res) => {
  const { isVeg } = req.query;
  db.all("SELECT * FROM dishes WHERE isVeg = ?", [isVeg], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ dishes: rows });
    }
  });
});

// 9. Get Dishes Sorted by Price
app.get("/dishes/sort-by-price", (req, res) => {
  db.all("SELECT * FROM dishes ORDER BY price ASC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ dishes: rows });
    }
  });
});

// Start the server
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});


