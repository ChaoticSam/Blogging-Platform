import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import API from '../services/api';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import ProtectedRoute from '../components/ProtectedRoute';
import NewPostModal from '../components/NewPostModal';
import { isAuthenticated } from '../utils/auth';

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: {
    email: string;
  };
  createdAt: string;
}

const DashboardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const { data } = await API.get(`/posts?author=${userId}`);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (isAuthenticated()) {
      fetchPosts();
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleSavePost = async ({ title, content }: { title: string; content: string }) => {
    try {
      await API.post('/posts', { title, content });
      const userId = localStorage.getItem('userId');
      const { data } = await API.get(`/posts?author=${userId}`);
      setPosts(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-blog bg-cover bg-center flex flex-col items-center">
        <Navbar />
        <div className="max-w-2xl mx-auto mt-12 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 transition"
          >
            Create Your Blog
          </button>
          <NewPostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onPost={handleSavePost}
          />
          <h2 className="text-2xl font-bold mb-6">Your Posts</h2>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
