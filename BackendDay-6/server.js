const { Client } = require("pg");
// client is a module inside pg

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "studentsinfo",
  password: "jtd@123",
  port: 5432,
});

const runningQueries = async () => {
  try {
    await client.connect(); // Connect to the database
    const result = await client.query("Select * from orders;"); //raw SQL query
    console.log(result.rows); //output the results
  } catch (err) {
    console.error("Error executin query", err.stack);
  } finally {
    await client.end(); //close the connections
  }
};
runningQueries();
