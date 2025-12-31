const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="w-full max-w-md p-6 border rounded-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input placeholder="Name" className="w-full border p-2 rounded" />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
