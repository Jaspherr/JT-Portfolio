import { Analytics } from "@vercel/analytics/react";
import { Route, Routes } from "react-router";

import RouteEffects from "@/components/layout/RouteEffects";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CaseStudyRoute from "@/pages/CaseStudyRoute";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <>
      <SmoothScroll />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<CaseStudyRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <RouteEffects />
      <Analytics />
    </>
  );
}