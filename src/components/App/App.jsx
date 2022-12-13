import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { pageWithFooter, pageWithHeader } from "../../utils/variables";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Preloader from "../Preloader/Preloader";
import Profile from "../Profile/Profile";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { mainApi } from "../../utils/MainApi.js";
import "./App.scss";
function App() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isPageWithHeader = pageWithHeader.includes(location);
  const isPageWithFooter = pageWithFooter.includes(location);

  const handleLogin = (data) => {
    setIsLoading(true);
    mainApi
      .signIn(data)
      .then((res) => {
        setIsLogin(true);
        navigate("/movies");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (data) => {
    setIsLoading(true);
    mainApi
      .signUp(data)
      .then((res) => {
        setIsLogin(true);
        navigate("/signin");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className='page'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {isPageWithHeader ? <Header isLogin={isLogin} /> : null}
          <Routes>
            <Route
              path='/signup'
              element={
                <Register error={error} handleRegister={handleRegister} />
              }
            />
            <Route
              path='/signin'
              element={<Login error={error} handleLogin={handleLogin} />}
            />
            <Route path='/' element={<Main />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute isLogin={isLogin}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/movies'
              element={
                <ProtectedRoute isLogin={isLogin}>
                  <Movies location={location} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute isLogin={isLogin}>
                  <SavedMovies location={location} />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          {isPageWithFooter ? <Footer /> : null}
        </>
      )}
    </div>
  );
}

export default App;
