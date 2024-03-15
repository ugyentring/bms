const { expect } = require("chai");
const { ethers } = require("hardhat");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (min - max)) + min;
}

describe("BookList Contract", function () {
  let Booklist;
  let booklist;
  let owner;

  const NUM_UNFINISHED_BOOK = 5;
  const NUM_FINISHED_BOOK = 3;

  let unfinishedBooklist;
  let finishedBooklist;

  function verifyBook(bookChain, book) {
    expect(book.name).to.equal(bookChain.name);
    expect(book.year.toString()).to.equal(bookChain.year.toString());
    expect(book.author).to.equal(bookChain.author);
  }

  function verifyBooklist(booksFromChain, booklist) {
    expect(booksFromChain.length).to.not.equal(0);
    expect(booksFromChain.length).to.equal(booklist.length);
    for (let i = 0; i < booklist.length; i++) {
      const bookChain = booksFromChain[i];
      const book = booklist[i];
      verifyBook(bookChain, book);
    }
  }

  beforeEach(async function () {
    Booklist = await ethers.getContractFactory("Booklist");
    [owner] = await ethers.getSigners();
    booklist = await Booklist.deploy();

    unfinishedBooklist = [];
    finishedBooklist = [];

    for (let i = 0; i < NUM_UNFINISHED_BOOK; i++) {
      let book = {
        name: getRandomInt(1, 1000).toString(),
        year: getRandomInt(1800, 2024),
        author: getRandomInt(1, 1000).toString(),
        isCompleted: false,
      };
      await booklist.addBook(
        book.name,
        book.year,
        book.author,
        book.isCompleted
      );
      unfinishedBooklist.push(book);
    }

    for (let i = 0; i < NUM_FINISHED_BOOK; i++) {
      let book = {
        name: getRandomInt(1, 1000).toString(),
        year: getRandomInt(1800, 2024),
        author: getRandomInt(1, 1000).toString(),
        isCompleted: true,
      };
      await booklist.addBook(
        book.name,
        book.year,
        book.author,
        book.isCompleted
      );
      finishedBooklist.push(book);
    }
  });

  describe("Add Book", function () {
    it("it should emit addBook event", async function () {
      let book = {
        name: getRandomInt(1, 1000).toString(),
        year: getRandomInt(1800, 2024),
        author: getRandomInt(1, 1000).toString(),
        isCompleted: false,
      };
      await expect(
        await booklist.addBook(
          book.name,
          book.year,
          book.author,
          book.isCompleted
        )
      )
        .to.emit(booklist, "AddBook")
        .withArgs(owner.address, NUM_FINISHED_BOOK + NUM_UNFINISHED_BOOK);
    });
  });

  describe("Get Book", function () {
    it("it should return the correct finished books", async function () {
      const booksFromChain = await booklist.getUnfinishedBook();
      expect(booksFromChain.length).to.equal(NUM_UNFINISHED_BOOK);
      verifyBooklist(booksFromChain, unfinishedBooklist);
    });
    it("should return the correct finished books", async function () {
      const booksFromChain = await booklist.getFinishedBook();
      expect(booksFromChain.length).to.equal(NUM_FINISHED_BOOK);
      verifyBooklist(booksFromChain, finishedBooklist);
    });
    it("Returns empty when there are no unfinished books", async function () {
      for (let i = 0; i < NUM_UNFINISHED_BOOK; i++) {
        await booklist.setCompleted(i, true);
      }
      const booksFromChain = await booklist.getUnfinishedBook();
      expect(booksFromChain.length).to.equal(0);
    });
  });
  describe("Set Completed", function () {
    it("Should emit setFinished event", async function () {
      const BOOK_ID = 0;
      const BOOK_FINISHED = true;
      await expect(booklist.setCompleted(BOOK_ID, BOOK_FINISHED))
        .to.emit(booklist, "SetFinished")
        .withArgs(BOOK_ID, BOOK_FINISHED);
    });
  });

  describe("BookList Contract", function () {
    let booklist;

    beforeEach(async function () {
      const Booklist = await ethers.getContractFactory("Booklist");
      booklist = await Booklist.deploy();
    });

    describe("Get Unfinished Books with None Available", function () {
      it("should return an empty array when there are no unfinished books", async function () {
        const unfinishedBooksFromChain = await booklist.getUnfinishedBook();
        expect(unfinishedBooksFromChain.length).to.equal(0);
      });
    });
  });
});
