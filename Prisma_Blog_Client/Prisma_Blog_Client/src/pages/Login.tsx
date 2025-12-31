import type { FormEvent } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    await loginUser({ email, password });
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <input name="email" placeholder="Email" className="w-full border p-2" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full border p-2"
      />
      <button className="w-full bg-black text-white py-2">Login</button>
    </form>
  );
};

export default Login;
