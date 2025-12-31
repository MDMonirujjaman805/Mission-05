/* ================= TYPES ================= */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

/* ================= BASE ================= */

const API_URL = import.meta.env.VITE_API_URL as string;

const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_URL}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
};

/* ================= AUTH ================= */

export const loginUser = (data: LoginPayload) =>
  fetcher<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getMe = () => fetcher<User>("/auth/me");

/* ================= POSTS ================= */

export const getPosts = () => fetcher<Post[]>("/posts");

export const createPost = (data: { title: string; content: string }) =>
  fetcher<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
