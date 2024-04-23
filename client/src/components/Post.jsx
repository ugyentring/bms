import PropTypes from "prop-types";

const Post = ({ state }) => {
  const handlePost = async (event) => {
    event.preventDefault();

    const { contract } = state;

    const content = document.querySelector("#content").value;
    const mediaInput = document.querySelector("#media");
    const mediaFile = mediaInput.files[0]; 

    console.log(content, mediaFile);

    try {
      // Assuming createPost function accepts content and media file
      const transaction = await contract.createPost(content, mediaFile);
      console.log("Waiting for transaction.....");

      await transaction.wait();
      alert("Transaction successful");
      console.log("Transaction done");
      // window.location.reload();
    } catch (error) {
      console.error("Error adding post", error);
    }
  };

  return (
    <>
      <form onSubmit={handlePost}>
        <span>Content: </span>
        <input id="content" />
        <br />

        <span>File: </span>
        <input type="file" id="media" accept="image/*" /> 
        <br />
        <br />
        <button>Post</button>
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
