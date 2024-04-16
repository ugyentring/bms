require("dotenv").config();
const ethers = require("ethers");
const sepolia_url = process.env.sepolia_url;
const private_key = process.env.private_key;
const contractAddress = process.env.contract_address;

const provider = new ethers.providers.JsonRpcProvider(sepolia_url);
const signer = new ethers.Wallet(private_key, provider);
const { abi } = require("./artifacts/contracts/Booklist.sol/Booklist.json");

const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require("express");
const app = express();
app.use(express.json());

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await contractInstance.getBookList(true);
    res.send(books);
  } catch (error) {
    console.log("Error fetching all books", error);
    res.status(500).send("Error fetching all books");
  }
});

// Get finished books
app.get("/books/finished", async (req, res) => {
  try {
    const books = await contractInstance.getFinishedBook();
    res.send(books);
  } catch (error) {
    console.log("Error fetching finished books", error);
    res.status(500).send("Error fetching finished books");
  }
});

// Get unfinished books
app.get("/books/unfinished", async (req, res) => {
  try {
    const books = await contractInstance.getUnfinishedBook();
    res.send(books);
  } catch (error) {
    console.log("Error fetching unfinished books", error);
    res.status(500).send("Error fetching unfinished books");
  }
});

// Add a new book
app.post("/books", async (req, res) => {
  const { name, year, author, isCompleted } = req.body;

  try {
    await contractInstance.addBook(name, year, author, isCompleted);
    res.send("Book added successfully");
  } catch (error) {
    console.log("Error adding book", error);
    res.status(500).send("Error adding book");
  }
});

// Update a book's completion status
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    await contractInstance.setCompleted(id, isCompleted);
    res.send("Book completion status updated successfully");
  } catch (error) {
    console.log("Error updating book completion status", error);
    res.status(500).send("Error updating book completion status");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
