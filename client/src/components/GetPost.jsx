import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GetPost = ({ state }) => {
  const [posts, setPosts] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const getPosts = async () => {
      const retrievedPosts = await contract.getAllPosts();
      setPosts(
        retrievedPosts.map((post) => ({
          content: post.content,
          media: `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${post.mediaHash}`,
        }))
      );
    };
    if (contract) {
      getPosts();
    }
  }, [contract]);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.content}</p>
          <img src={post.media} alt="Uploaded to IPFS" />
        </div>
      ))}
    </div>
  );
};

GetPost.propTypes = {
  state: PropTypes.shape({
    contract: PropTypes.object.isRequired,
  }),
};

export default GetPost;
