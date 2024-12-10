const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./chapter-4/database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.serialize(() => {
  // Create Restaurants Table
db.run(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      cuisine TEXT,
      isVeg TEXT,
      rating REAL,
      priceForTwo INTEGER,
      location TEXT,
      hasOutdoorSeating TEXT,
      isLuxury TEXT
    )
  `);

  // Create Dishes Table
db.run(`
    CREATE TABLE IF NOT EXISTS dishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      isVeg TEXT,
      rating REAL,
      price INTEGER
    )
  `);

  // Insert Restaurants
  const restaurants = [
    {
      name: "Spice Kitchen",
      cuisine: "Indian",
      isVeg: "true",
      rating: 4.5,
      priceForTwo: 1500,
      location: "MG Road",
      hasOutdoorSeating: "true",
      isLuxury: "false",
    },
    {
      name: "Olive Bistro",
      cuisine: "Italian",
      isVeg: "false",
      rating: 4.2,
      priceForTwo: 2000,
      location: "Jubilee Hills",
      hasOutdoorSeating: "false",
      isLuxury: "true",
    },
    {
      name: "Green Leaf",
      cuisine: "Chinese",
      isVeg: "true",
      rating: 4.0,
      priceForTwo: 1000,
      location: "Banjara Hills",
      hasOutdoorSeating: "false",
      isLuxury: "false",
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO restaurants (name, cuisine, isVeg, rating, priceForTwo, location, hasOutdoorSeating, isLuxury)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  restaurants.forEach((restaurant) =>
stmt.run(
restaurant.name,
      restaurant.cuisine,
      restaurant.isVeg,
      restaurant.rating,
      restaurant.priceForTwo,
      restaurant.location,
      restaurant.hasOutdoorSeating,
      restaurant.isLuxury
    )
  );

  // Insert Dishes
  const dishes = [
    { name: "Paneer Butter Masala", isVeg: "true", rating: 4.5, price: 300 },
    { name: "Chicken Alfredo Pasta", isVeg: "false", rating: 4.7, price: 500 },
    { name: "Veg Hakka Noodles", isVeg: "true", rating: 4.3, price: 250 },
  ];

  const stmt2 = db.prepare(`
    INSERT INTO dishes (name, isVeg, rating, price)
    VALUES (?, ?, ?, ?)
  `);

  dishes.forEach((dish) =>
stmt2.run(dish.name, dish.isVeg, dish.rating, dish.price)
  );

  stmt.finalize();
  stmt2.finalize();
  console.log("Database seeded successfully.");
});

// Close database
db.close((err) => {
  if (err) console.error(err.message);
});