const express = require("express");
const router = express.Router();
const db = require("../config/dbconfig");

/* Test delivery route */
router.get("/", function (req, res, next) {
  res.send("delivery route accessed");
});
/**
 * Route for inserting order into database
 */
router.post("/add", function (request, response) {
  console.log("data recieved from client", request.body);
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "orders",
    records: [request.body],
  };
  db.insert(options, (err, res) => {
    if (err) {
      console.log("error in insert operation", err);
      response.status(500).send({ error: err });
    } else {
      console.log(res);
      response.send({ result: "Order added successfully" });
    }
  });
});

/**
 * Route for fetching all food items from database
 */
router.get("/getAllItems", function (request, response) {
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "foodItems",
    searchAttribute: "results",
    searchValue: "*",
    attributes: ["*"],
  };
  db.searchByValue(options, (err, res) => {
    if (err) {
      console.log("error occured while fetching data", err);
      response.status(500).send({ Error: err });
    } else {
      console.log("result", res);
      const foodItemsData = res.data[0].results;
      response.send({ results: foodItemsData });
    }
  });
});

/*
 * Route for listing all orders from database
 */
router.get("/getAllOrders", function (request, response) {
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "orders",
    searchAttribute: "name",
    searchValue: "*",
    attributes: ["*"],
  };
  db.searchByValue(options, (err, res) => {
    if (err) {
      console.log("error occured while fetching data", err);
      response.status(500).send({ Error: err });
    } else {
      console.log("result", res);
      const ordersData = res.data;
      response.send({ results: ordersData });
    }
  });
});

/*
 * Route for deleting an order from database
 */

router.delete("/delete", function (request, response) {
  console.log("data recieved from client", request.body);
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "orders",
    hashValues: [request.body.id],
  };
  db.delete(options, (err, res) => {
    if (err) {
      console.log("error in insert operation", err);
      response.status(500).send({ error: err });
    } else {
      console.log(res);
      response.send({ result: "Order removed successfully" });
    }
  });
});

module.exports = router;
