import { useEffect, useState } from "react";

const AddedList = ({ state }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const listDetails = async () => {
      try {
        const books = await state.contract.getAllBook();
        setLists(books); // Update the state with fetched data
        console.log(books);
      } catch (error) {
        console.error("Error fetching book list:", error);
      }
    };

    state.contract && listDetails();
  }, [state.contract]);

  return (
    <div>
      <h2>Added Books</h2>
      <ul>
        {lists.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddedList;
