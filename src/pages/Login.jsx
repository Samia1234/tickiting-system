import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">

      <button
        onClick={handleLogin}
        className="rounded-lg bg-emerald-600 px-6 py-3 text-white"
      >
        Login
      </button>

    </div>
  );
}