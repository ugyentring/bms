import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AddedList = ({ state }) => {
  const [lists, setLists] = useState([]);
  const [readCount, setReadCount] = useState(0);
  const { contract } = state;

  useEffect(() => {
    const listDetails = async () => {
      try {
        const lists = await contract.getBookList(true);
        const formattedLists = lists.map((book) => ({
          ...book,
          id: book.id.toString(),
          year: book.year.toNumber(),
          isRead: false,
        }));
        setLists(formattedLists);
      } catch (error) {
        console.error("Error fetching book list:", error);
      }
    };
    if (contract) {
      listDetails();
    }
  }, [contract]);

  const handleMarkAsRead = (index) => {
    const newLists = [...lists];
    newLists[index].isRead = !newLists[index].isRead;
    setLists(newLists);
    setReadCount(newLists.filter((book) => book.isRead).length);
  };

  return (
    <div className="container-fluid" style={{ marginTop: "50px" }}>
      <h3
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
      >
        List of Books Added!
      </h3>
      <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
        Books Read: {readCount}
      </h4>
      {lists.map((book, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p>Id: {book.id}</p>
          <p>Name: {book.name}</p>
          <p>Year: {book.year}</p>
          <p>Author: {book.author}</p>
          <button onClick={() => handleMarkAsRead(index)}>
            Mark as {book.isRead ? "Unread" : "Read"}
          </button>
          <hr />
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
