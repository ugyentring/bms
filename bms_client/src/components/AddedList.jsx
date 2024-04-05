import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AddedList = ({ state }) => {
  const [lists, setLists] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const listDetails = async () => {
      try {
        const lists = await contract.getBookList(true);
        const formattedLists = lists.map((book) => ({
          ...book,
          id: book.id.toString(),
          year: book.year.toNumber(),
        }));
        setLists(formattedLists);
        console.log(formattedLists);
      } catch (error) {
        console.error("Error fetching book list:", error);
      }
    };
    if (contract) {
      listDetails();
    }
  }, [contract]);

  return (
    <div className="container-fluid" style={{ marginTop: "50px" }}>
      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "100px",
        }}
      >
        List of Books Added!
      </h3>
      {lists.map((book, index) => (
        <div key={index}>
          <p>Id: {book.id}</p>
          <p>Name: {book.name}</p>
          <p>Year: {book.year}</p>
          <p>Author: {book.author}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

AddedList.propTypes = {
  state: PropTypes.shape({
    contract: PropTypes.shape({
      getBookList: PropTypes.func.isRequired,
    }),
  }).isRequired,
};

export default AddedList;
