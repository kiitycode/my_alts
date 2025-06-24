function PostCard({ post, index, onLike, onPreview }) {
  return (
    <div className="post-card">
      <div className="post-card-img">
        <img
          src={post.image}
          alt={post.title}
          className="post-img"
          onClick={() => onPreview(post)}
        />
      </div>
      <div className="title-container">
        <p className="post-name">{post.title}</p>
        <button className="like-btn" onClick={() => onLike(index)}>
          <i className={`${post.liked ? 'fas fa-heart liked' : 'far fa-heart'}`}></i>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
