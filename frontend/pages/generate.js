import Navbar from "../components/Navbar";

export default function Generate() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">AI Generation Page</h1>
      </div>
    </div>
  );
}

