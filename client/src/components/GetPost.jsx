import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/yuji.jpg";

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
    <div className="flex flex-col items-center mt-2">
      {posts.map((post, index) => (
        <div
          key={index}
          className="w-full max-w-2xl my-2 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <p className="p-4 text-gray-800">
            <img
              style={{ height: "50px", width: "50px" }}
              className="rounded-full mb-2"
              src={Logo}
              alt="profile picture"
            />
            {post.content}
          </p>
          <div className="flex justify-center w-full mb-16">
            <img
              src={Logo}
              // src={post.media}
              alt="Uploaded to IPFS"
              className="max-w-full h-auto border border-gray-900 rounded-md"
              style={{ maxHeight: "400px" }}
            />
          </div>
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
