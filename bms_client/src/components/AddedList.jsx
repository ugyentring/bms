import { useEffect, useState } from "react";

const AddedList = ({ state }) => {
  const [lists, setLists] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const listDetails = async () => {
      try {
        const lists = await contract.getAllBooks();
        setLists(lists);
        console.log(lists);
      } catch (error) {
        console.error("Error fetching book list:", error);
      }
    };
    if (contract) {
      listDetails();
    }
  }, [contract]);

  return (
    <div className="container-fluid">
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        List of Books Added!
      </h3>
      {lists.map((book) => (
        <div key={book.id}>
          {" "}
          <p>{book.id}</p>
          <p>{book.name}</p>
          <p>{book.year}</p>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default AddedList;
