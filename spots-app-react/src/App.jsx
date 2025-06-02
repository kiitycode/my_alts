import { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import PostsContainer from './components/PostContainer';
import Footer from './components/Footer';
import EditProfileModal from './modals/EditProfileModal';
import NewPostModal from './modals/NewPostModal';
import PreviewModal from './modals/PreviewModal';

function App() {
  // Profile State
  const [profile, setProfile] = useState({
    name: 'Bessie Coleman',
    title: 'Civil Aviator',
    image: '/circle17icons/image icon(header)/image.png',
  });

  // Post State
  const [posts, setPosts] = useState([
    {
      image: '../public/CIRCLE 17 PICTURES/PICTURES/val-thorens.png',
      title: 'Val Thorens',
      liked: false,
    },
    {
      image: '../public/CIRCLE 17 PICTURES/PICTURES/restaurant-terrace.png',
      title: 'Restaurant Terrace',
      liked: false,
    },
    {
      image: '../public/CIRCLE 17 PICTURES/PICTURES/outdoor-cafe.png',
      title: 'An outdoor cafe',
      liked: false,
    },
        {
      image: '../public/CIRCLE 17 PICTURES/PICTURES/long-bridge.png',
      title: 'A very long bridge',
      liked: false,
    },
        {
      image: '../public/CIRCLE 17 PICTURES/PICTURES/mountain-house.png',
      title: 'Mountain House',
      liked: false,
    },
        {
      image: '../public/CIRCLE 17 PICTURES/PICTURES/tunnel-with-light.png',
      title: 'Tunnel with morning light',
      liked: false,
    },
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  return (
    <>
      <Header />

      <main className="container">
        <ProfileCard
          profile={profile}
          onEdit={() => setShowEditModal(true)}
          onNewPost={() => setShowNewPostModal(true)}
        />

        <PostsContainer
          posts={posts}
          setPosts={setPosts}
          onPreview={(post) => setSelectedPost(post)}
        />
      </main>

      <Footer />

      {/* Modals */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showNewPostModal && (
        <NewPostModal
          onClose={() => setShowNewPostModal(false)}
          onAdd={(newPost) => setPosts([newPost, ...posts])}
        />
      )}

      {selectedPost && (
        <PreviewModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}

export default App;
