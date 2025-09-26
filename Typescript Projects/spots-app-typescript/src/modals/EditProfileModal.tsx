import { useState, ChangeEvent, FormEvent } from 'react';

type Profile = {
  name: string;
  title: string;
  image: string;
};

type Props = {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  onClose: () => void;
};

function EditProfileModal({ profile, setProfile, onClose }: Props) {
  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) {
      setError('Name and Title cannot be empty.');
      return;
    }

    const newProfile: Profile = {
      name,
      title,
      image: imageFile ? URL.createObjectURL(imageFile) : profile.image,
    };

    setProfile(newProfile);
    onClose();
  };

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
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
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;