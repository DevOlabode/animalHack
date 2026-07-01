import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/signin");
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}