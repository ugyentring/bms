// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Smedia {
    struct Post {
        uint256 postId;
        address author;
        string content;
        string mediaHash;
        uint256 tipAmount;
        uint256 timestamp;
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;

    event PostCreated(
        uint256 postId,
        address author,
        string content,
        string mediaHash,
        uint256 tipAmount,
        uint256 timestamp
    );
    event TipSent(address indexed from, address indexed to, uint256 amount);

    // Function to create a new post
    function createPost(
        string memory _content,
        string memory _mediaHash
    ) public {
        require(bytes(_content).length > 0, "Content can't be empty");

        postCount++;
        posts[postCount] = Post(
            postCount,
            msg.sender,
            _content,
            _mediaHash,
            0,
            block.timestamp
        );

        emit PostCreated(
            postCount,
            msg.sender,
            _content,
            _mediaHash,
            0,
            block.timestamp
        );
    }

    // Function to tip the author of a post
    function tipAuthor(uint256 _postId) public payable {
        require(_postId > 0 && _postId <= postCount, "Invalid postId");
        require(msg.value > 0, "Tip amount must be greater than 0");

        Post storage post = posts[_postId];
        address payable author = payable(post.author);

        author.transfer(msg.value);
        post.tipAmount += msg.value;

        emit TipSent(msg.sender, author, msg.value);
    }

    // Function to get all posts
    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postCount);
        for (uint256 i = 1; i <= postCount; i++) {
            allPosts[i - 1] = posts[i];
        }
        return allPosts;
    }
}
