import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import store from './store';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SearchResults from './pages/SearchResults';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;


