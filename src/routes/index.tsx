import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import * as Page from "../pages";
import RoutesPath from "./routesPath";
import { AdminLayout } from "../pages/layout";
import { toast } from "react-toastify";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={RoutesPath.signin} element={<Page.SigninPage />} />
        <Route path={RoutesPath.admin} element={<AdminLayout />}>
          <Route index element={<Page.Dashboard />} />
          <Route
            path={RoutesPath.destination}
            element={<Page.DestinationLayout />}
          />
          <Route path={RoutesPath.activity} element={<Page.ActivityLayout />} />
          <Route
            path={RoutesPath.packageDuration}
            element={<Page.PackageDurationLayout />}
          />
          <Route
            path={RoutesPath.packageType}
            element={<Page.PackageTypeLayout />}
          />
          <Route path={RoutesPath.tags} element={<Page.TagsLayout />} />
          <Route
            path={RoutesPath.tourPackage}
            element={<Page.TourPackageLayout />}
          />
          <Route path={RoutesPath.category} element={<Page.CategoryLayout />} />
          <Route
            path={RoutesPath.topLevelMenu}
            element={<Page.TopLevelMenuLayout />}
          />

          {/* -------------Products---------------------- */}
          {/* <Route path={RoutesPath.approvedProducts}>
            <Route index element={<Page.ApprovedProList />} />
            <Route path=":id" element={<Page.ProductDetails />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
