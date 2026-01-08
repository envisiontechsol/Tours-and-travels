import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as Page from "../pages";
import { AdminLayout } from "../pages/layout";
import RoutesPath from "./routesPath";

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
          <Route path={RoutesPath.dashboard} element={<Page.Dashboard />} />

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
          <Route
            path={RoutesPath.userItinerary}
            element={<Page.UserItineraryLayout />}
          />
          <Route path={RoutesPath.vehicle} element={<Page.VehicleLayout />} />
          <Route path={RoutesPath.users} element={<Page.UsersLayout />} />
          <Route path={RoutesPath.cms} element={<Page.CMSPage />} />
          <Route path={RoutesPath.reviews} element={<Page.ReviewLayout />} />
          <Route path={RoutesPath.blogs} element={<Page.BlogLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
