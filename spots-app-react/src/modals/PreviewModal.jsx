function PreviewModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="modal" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="modal-content preview-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={post.image} alt="Preview" />
        <h3>{post.title}</h3>
      </div>
    </div>
  );
}

export default PreviewModal;
