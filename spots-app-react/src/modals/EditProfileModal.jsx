import { useState } from 'react';

function EditProfileModal({ profile, setProfile, onClose }) {
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) {
      setError('Name and Title cannot be empty.');
      return;
    }

    const newProfile = {
      name,
      title,
      image: imageFile ? URL.createObjectURL(imageFile) : profile.image,
    };

    setProfile(newProfile);
    onClose();
  };

  return (
    <div className="modal" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
