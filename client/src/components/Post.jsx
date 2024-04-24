import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

const Post = ({ state }) => {
  const [file, setFile] = useState(null);

  const handlePost = async (event) => {
    event.preventDefault();

    const content = document.querySelector("#content").value;
    const mediaInput = document.querySelector("#media");
    const mediaFile = mediaInput.files[0];

    // Handle IPFS upload
    try {
      const formData = new FormData();
      formData.append("file", mediaFile);

      const ipfsResponse = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        },
      });

      const mediaUrl = `https://gateway.pinata.cloud/ipfs/${ipfsResponse.data.IpfsHash}`;

      // Create post with IPFS URL
      const { contract } = state;
      const transaction = await contract.createPost(content, mediaUrl);
      console.log("Waiting for transaction.....");

      await transaction.wait();
      alert("Transaction successful");
      console.log("Transaction done");
      console.log(file, mediaUrl);
    } catch (error) {
      console.error("Error in uploading to IPFS or adding post", error);
    }
  };

  return (
    <>
      <form
        className="bg-gray-300 drop-shadow-xl border border-gray-800 p-3 mt-1"
        onSubmit={handlePost}
      >
        <div className="ml-3 flex flex-col">
          <span>
            Content:
            <input
              className="w-1/2 px-3 py-9 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 my-3 ml-2"
              id="content"
              placeholder="How you are feeling.."
              autoComplete="off"
            />
          </span>

          <span>
            File:
            <input
              className="ml-2 outline-none"
              type="file"
              id="media"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </span>
          <button
            className="flex my-2 bg-yellow-500 max-w-20 py-1 px-6 rounded-md font-semibold text-white"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

Post.propTypes = {
  state: PropTypes.shape({
    contract: PropTypes.object,
  }),
};

export default Post;
