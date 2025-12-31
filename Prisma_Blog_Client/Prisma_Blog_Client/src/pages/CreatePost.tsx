const CreatePost: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      <input
        placeholder="Post Title"
        className="w-full border p-2 rounded mb-4"
      />

      <textarea
        rows={8}
        placeholder="Write your content..."
        className="w-full border p-2 rounded mb-4"
      />

      <button className="bg-black text-white px-6 py-2 rounded">Publish</button>
    </div>
  );
};

export default CreatePost;
