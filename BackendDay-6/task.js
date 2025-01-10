const express = require("express");
const fs = require("fs");
const PORT = 3000;
const path = require("path");
const filePath = path.join(__dirname, "data.json");
const app = express();
app.use(express.json());
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "studentsinfo",
  password: "jtd@123",
  port: 5432,
});
function readData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
function writeData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data));
}
app.get("/customers", async (req, res) => {
  try {
    await client.connect();
    const result = await client.query("Select * from customers;");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error executin query", err.stack);
  } finally {
    await client.end();
  }
});
app.post("/customers", async (req, res) => {
  try {
    const newCustomer = req.body;
    await client.connect();
    const customers = await client.query(
      `insert into customers Values(${newCustomer.cust_id},'${newCustomer.cust_name}','${newCustomer.dop}','${newCustomer.address}','${newCustomer.item}',${newCustomer.price},'${newCustomer.gender}',${newCustomer.age});`
    );
    console.log(`(${newCustomer.cust_id},${newCustomer.cust_name})`);
    res.status(201).json(await client.query("select * from customers;"));
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
});
app.put("/customers/:cust_id", async (req, res) => {
  try {
    const cust_id = parseInt(req.params.cust_id);
    await client.connect();
    const customers = await client.query(
      `update customers set cust_name='Haritha' where cust_id=${cust_id}`
    );
    res.status(200).json(customers);
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
});
app.delete("/customers/:cust_id", async (req, res) => {
  try {
    const cust_id = parseInt(req.params.cust_id);
    await client.connect();
    const customers = await client.query(
      `delete from customers where cust_id=${cust_id};`
    );
    res.status(200).json(await client.query("select * from customers;"));
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
});
app.listen(PORT, () => {
  console.log("Server is running");
});
