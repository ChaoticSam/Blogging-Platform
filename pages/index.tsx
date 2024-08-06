import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: {
    email: string;
  };
  createdAt: string;
}

interface User {
  _id: string;
  email: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]); // state to store posts
  const [users, setUsers] = useState<User[]>([]); // state to store users
  const [selectedUser, setSelectedUser] = useState<string>(''); // State to store selected user for filtering

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts'); // fetch all posts from API
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users'); // Fetch users from API
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch filtered posts based on selected user
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const { data } = await API.get(`/posts?author=${selectedUser}`); // Fetch posts from API for selected user
        setPosts(data);
      } catch (error) {
        console.error('Error fetching filtered posts:', error);
      }
    };
    if (selectedUser) {
      fetchFilteredPosts();
    } else {
      const fetchPosts = async () => {
        try {
          const { data } = await API.get('/posts');
          setPosts(data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      fetchPosts();
    }
  }, [selectedUser]);

  return (
    <div className="min-h-screen bg-blog bg-cover bg-center flex flex-col items-center">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">All Posts</h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="user-select" className="text-gray-700 font-bold">Filter by user:</label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="p-2 border border-gray-300 rounded appearance-none"
            >
              <option value="">All users</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.email}</option>
              ))}
            </select>
            <FontAwesomeIcon icon={faFilter} className="text-gray-700" />
          </div>
        </div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No posts available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
