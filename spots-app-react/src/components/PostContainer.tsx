import PostCard from './PostCard';

type Post = {
  image: string;
  title: string;
  liked: boolean;
};

interface PostsContainerProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  onPreview: (post: Post) => void;
}

function PostsContainer({ posts, setPosts, onPreview }: PostsContainerProps) {
  const handleLike = (index: number) => {
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
