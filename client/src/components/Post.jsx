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
      console.log(file, mediaUrl)
    } catch (error) {
      console.error("Error in uploading to IPFS or adding post", error);
    }
  };

  return (
    <>
      <form onSubmit={handlePost}>
        <span>Content: </span>
        <input id="content" />
        <br />
        <span>Image</span>
        <input
          type="file"
          id="media"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button type="submit">Post</button>
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
