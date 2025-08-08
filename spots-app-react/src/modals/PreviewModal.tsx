type Post = {
  image: string;
  title: string;
  liked: boolean;
};

type Props = {
  post: Post;
  onClose: () => void;
};

function PreviewModal({ post, onClose }: Props) {
  if (!post) return null;

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content preview-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={post.image} alt="Preview" />
        <h3>{post.title}</h3>
      </div>
    </div>
  );
}

export default PreviewModal;
