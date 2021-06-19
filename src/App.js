import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Footer from '../src/components/commons/Footer/footer'
import Header from '../src/components/commons/Header/header'
import Section from '../src/components/section/section'
import { Fragment } from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Agreement from './components/agreement'
    function App() {
  return (
    <Router>
      <Header />
      {/* <HomeContent /> */}
      <Section />
      <Footer />
    </Router>

  );
}

export default App;
