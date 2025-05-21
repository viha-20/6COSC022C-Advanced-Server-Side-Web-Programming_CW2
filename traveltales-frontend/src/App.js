import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/home/HomePage';
import BlogListPage from './pages/blog/BlogListPage';
import BlogDetailPage from './pages/blog/BlogDetailPage';
import BlogCreatePage from './pages/blog/BlogCreatePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProfileFollowersPage from './pages/profile/ProfileFollowersPage';
import ProfileFollowingPage from './pages/profile/ProfileFollowingPage';
import CountryPage from './pages/country/CountryPage';
import NotFoundPage from './pages/404';
import ProtectedRoute from './components/common/ProtectedRoute';
import './styles/App.css';
import EditBlogPage from './components/blog/EditBlogPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<BlogListPage />} />
                <Route path="/blogs/:id" element={<BlogDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/profile/:id/followers" element={<ProfileFollowersPage />} />
                <Route path="/profile/:id/following" element={<ProfileFollowingPage />} />
                <Route path="/countries" element={<CountryPage />} />
                <Route path="/edit-blog/:id" element={<EditBlogPage />} />
                {/* Protected routes
                <Route element={<ProtectedRoute />}>
                  <Route path="/create-blog" element={<BlogCreatePage />} />
                </Route> */}
                <Route path="/create-blog" element={<BlogCreatePage />} />
                
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;