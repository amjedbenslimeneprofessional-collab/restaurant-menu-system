import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';

const MenuPage = lazy(() => import('../Views/Menu/Menu.jsx'));
const ItemPage = lazy(() => import('../Views/Item/Item.jsx'));


const RenderRoutes = () => (
  <Routes>
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/menu/:itemId" element={<ItemPage />} />
    <Route path="*" element={<Navigate to="/menu" replace />} />
  </Routes>
);


export default RenderRoutes;