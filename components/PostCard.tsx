interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: {
    email: string;
  };
  createdAt: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <small className="text-gray-500">By: {post.authorId.email}</small>
    </div>
  );
};

export default PostCard;
