import { useState, FormEvent } from 'react';

type Post = {
  image: string;
  title: string;
  liked: boolean;
};

type Props = {
  onClose: () => void;
  onAdd: (post: Post) => void;
};

function NewPostModal({ onClose, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile || !title) return;

    const newPost: Post = {
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
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
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
