import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  console.log("Rendering Dashboard");
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! (React + Vite)</p>
      <button
        onClick={() => {
          localStorage.removeItem("jwt");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Check for JWT in URL first
    const url = new URL(window.location.href);
    const jwtFromUrl = url.searchParams.get("jwt");
    if (jwtFromUrl) {
      localStorage.setItem("jwt", jwtFromUrl);
      // Remove jwt param from URL
      url.searchParams.delete("jwt");
      window.history.replaceState(
        {},
        document.title,
        url.pathname + url.search
      );
    }
    const hasJwt = Boolean(localStorage.getItem("jwt"));
    setAuthed(hasJwt);
    setChecked(true);
    if (!hasJwt) {
      window.location.href =
        import.meta.env.VITE_LOGIN_URL || "http://localhost:3000/login";
    }
  }, []);

  if (!checked) return null;
  if (!authed) return null;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
