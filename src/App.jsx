import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Landing from './pages/Landing.jsx';
import ProjectList from './pages/ProjectList.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminProjects from './pages/admin/AdminProjects.jsx';
import AdminReferences from './pages/admin/AdminReferences.jsx';
import AdminProjectEdit from './pages/admin/AdminProjectEdit.jsx';
import { useAuth } from './auth/useAuth.js';

// Guards every admin route except the login. Somebody who is not signed in is
// sent to the login screen with the page they asked for kept in location state,
// so the login can put them back there once they are through.
function RequireAuth() {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <Routes>
      {/* The public site. Layout is what renders the navbar and the footer,
          and it also owns the scroll-to-top-on-navigation effect. */}
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* The admin, a sibling of the Layout block rather than a child of it:
          the client asked for no navbar and no black footer on these screens.
          One consequence worth knowing — nothing out here scrolls the window
          back to the top between pages, because that effect lives in Layout. */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />

        {/* The master-detail split shell. T3 writes
            src/pages/admin/AdminLayout.jsx and plugs it into the pathless
            <Route> below as element={<AdminLayout />}; these two panes then
            render inside its <Outlet />. Until then the route group has no
            element of its own, so the panes render bare. Nothing else moves. */}
        <Route>
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/references" element={<AdminReferences />} />
        </Route>

        {/* Outside the split shell on purpose: the editor gets the whole
            screen, with no master pane beside it. */}
        <Route path="/admin/projects/new" element={<AdminProjectEdit />} />
        <Route path="/admin/projects/:id/edit" element={<AdminProjectEdit />} />
      </Route>
    </Routes>
  );
}
