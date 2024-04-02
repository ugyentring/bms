import { ethers } from "ethers";
import "./addbook.css";

const AddBook = ({ state }) => {
  const addBook = async (event) => {
    event.preventDefault();

    const { contract } = state;

    const name = document.querySelector("#name").value;
    const year = parseInt(document.querySelector("#year").value);
    const author = String(document.querySelector("#author").value);
    const isComplete = document.querySelector("#isCompleted").value === "true";

    console.log(name, year, author, isComplete);

    try {
      const transaction = await contract.addBook(
        name,
        year,
        author,
        isComplete
      );
      console.log("Waiting transaction.....");

      await transaction.wait();
      alert("Transaction successful");
      console.log("Transaction done");
      window.location.reload();
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  return (
    <>
      <form onSubmit={addBook}>
        <span>Book Name: </span>
        <input id="name" />
        <br />

        <span>Publication Year: </span>
        <input id="year" />
        <br />

        <span>Author: </span>
        <input id="author" />
        <br />

        <span>Complete Reading?: </span>
        <select id="isCompleted">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <br />
        <button>Add to List</button>
      </form>
    </>
  );
};

export default AddBook;
