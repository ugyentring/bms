// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.6 <0.9.0;

contract Booklist {
    struct Book {
        uint id;
        string name;
        uint year;
        string author;
        bool isCompleted;
    }

    Book[] private bookList;
    mapping(uint256 => address) bookToOwner;

    event AddBook(address bookRecipient, uint bookId);
    event SetFinished(uint bookId, bool isCompleted);

    function addBook(
        string memory name,
        uint year,
        string memory author,
        bool isCompleted
    ) external {
        uint bookId = bookList.length;
        bookList.push(Book(bookId, name, year, author, isCompleted));
        bookToOwner[bookId] = msg.sender;
        emit AddBook(msg.sender, bookId);
    }

    function getFinishedBook() external view returns (Book[] memory) {
        return getBookList(true);
    }

    function getUnfinishedBook() external view returns (Book[] memory) {
        return getBookList(false);
    }

    function setCompleted(uint bookId, bool isCompleted) external {
        require(
            bookToOwner[bookId] == msg.sender,
            "Caller is not the owner of the book"
        );
        bookList[bookId].isCompleted = isCompleted;
        emit SetFinished(bookId, isCompleted);
    }

    function getBookList(bool finished) private view returns (Book[] memory) {
        Book[] memory temp = new Book[](bookList.length);
        uint counter = 0;
        for (uint i = 0; i < bookList.length; i++) {
            if (
                bookToOwner[i] == msg.sender &&
                bookList[i].isCompleted == finished
            ) {
                temp[counter] = bookList[i];
                counter++;
            }
        }

        Book[] memory result = new Book[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temp[i];
        }
        return result;
    }
}
