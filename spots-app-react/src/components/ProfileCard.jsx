function ProfileCard({ profile, onEdit, onNewPost }) {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-img">
          <img src={profile.image} alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="profile-name">
            <h2 className="multiline-ellipsis">{profile.name}</h2>
            <p className="multiline-ellipsis">{profile.title}</p>
          </div>
          <a className="edit-link" href="#" onClick={onEdit}>
            <img src="/circle17icons/edit icon/edit icon.png" alt="Edit Icon" />
            <span>Edit Profile</span>
          </a>
        </div>
      </div>

      <button className="new-post-button" onClick={onNewPost}>
        <img src="/circle17icons/plus icon/plus sign.png" alt="Plus Icon" />
        <span>New Post</span>
      </button>
    </div>
  );
}

export default ProfileCard;
