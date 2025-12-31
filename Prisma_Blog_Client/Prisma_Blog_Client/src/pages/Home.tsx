import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import type { Post } from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded-xl">
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p className="text-sm text-gray-600">by {post.author.name}</p>
          <p className="text-gray-700 mt-2">{post.content.slice(0, 80)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
