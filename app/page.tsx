import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Chat App</h1>
      <p className="mb-8 text-lg">
        A real-time chat application built with Next.js, Strapi, and WebSockets.
      </p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Register
        </Link>
        <Link
          href="/chat"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Chat
        </Link>
      </div>
    </div>
  );
}
