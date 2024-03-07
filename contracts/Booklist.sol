// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.6 <0.9.0;

contract Booklist{

    struct Book{
        uint id;
        string name;
        uint year;
        string author;
        bool isCompleted;
    }

    Book[] private bookList;
    mapping(uint256 => address) bookToOwner;

    event AddBook(address, bookRecipient, uint bookId);

    function addBook(string memory name, uint year, string memory author, bool isCompleted) external {
        uint bookId = bookList.length;
        bookList.push(Book(bookId, name, year, author, isCompleted));
        bookToOwner[bookId] = msg.sender;
        emit AddBook(msg.sender ,bookId);
    }

    function getFinishedBook()external view returns(Book[] memory){
        return getBookList(true);
    }

    function getBookList(bool finished) private view returns (Book[] memory) {
        Book[] memory temp = new Book[](bookList.length);
        uint counter = 0;
        for (uint index = 0; index < bookList.length; index++) {
        if (bookToOwner[index] == msg.sender && bookList[index].isCompleted ==
        finished) {
        temp[counter] = bookList[index];
        counter++;
    }
}
        Book[] memory result = new Book[](counter);
        for (uint index = 0; index < counter; index++) {
        result[index] = temp[index];
    }
    return result;
    }
}