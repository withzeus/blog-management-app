import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Private from "./components/privateRoute/PrivateRoute";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";
import PageLayout from "./components/layout/PageLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditPostPage from "./pages/EditPostPage";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <PageLayout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<Private />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/edit-post/:id" element={<EditPostPage />} />
            </Route>
          </Routes>
        </PageLayout>
      </AuthProvider>
    </Router>
  );
};

export default App;
