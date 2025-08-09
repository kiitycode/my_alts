import PostCard from './PostCard';

function PostsContainer({ posts, setPosts, onPreview }) {
  const handleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
    setPosts(updatedPosts);
  };

  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          post={post}
          index={index}
          onLike={handleLike}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

export default PostsContainer;
