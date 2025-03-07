import { Routes, Route } from "react-router-dom";
import PageAuth from "../pages/PageAuth";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageAuth />} />
    </Routes>
  );
};

export default PublicRoutes;
