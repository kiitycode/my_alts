import { useState } from 'react';

function NewPostModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile || !title) return;

    const newPost = {
      image: URL.createObjectURL(imageFile),
      title,
      liked: false,
    };

    onAdd(newPost);
    setTitle('');
    setImageFile(null);
    onClose();
  };

  return (
    <div className="modal" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default NewPostModal;
