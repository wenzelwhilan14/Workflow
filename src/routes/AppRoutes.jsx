import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<PublicRoutes />} />
      <Route path="/home/*" element={<PrivateRoutes />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

export default AppRoutes;
