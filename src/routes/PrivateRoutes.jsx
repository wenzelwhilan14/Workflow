import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { getUser } from "../services/AuthServices";
import { useEffect, useState } from "react";
import PageHome from "../pages/PageHome";
import PageRuta from "../pages/PageRuta";

const PrivateRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return user ? (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<PageHome />} />
        <Route path="ruta/:id" element={<PageRuta />} />
      </Route>
    </Routes>
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default PrivateRoutes;
