import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GetPost = ({ state }) => {
  const [posts, setPosts] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const getPosts = async () => {
      const retrievedPosts = await contract.getAllPosts();
      setPosts(retrievedPosts);
    };
    contract && getPosts();
  }, [contract]);

  return (
    <>
      <div>
        {posts.map((post) => {
          <div>
            <p>{post.postCount}</p>;
            <p>{post.content}</p>;
            <p>{post.media}</p>;
          </div>;
        })}
      </div>
    </>
  );
};

GetPost.propTypes = {
  state: PropTypes.shape({
    contract: PropTypes.object,
  }),
};

export default GetPost;
