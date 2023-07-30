import './App.css';
import Router from './routing/router';
import Header from './components/header/header';
//import Footer from './components/footer/footer';
import ScrollTop from './components/scrolltop';

function App() {
  return (
    <div className="App"> 
        <Header  />
        <Router />
        <ScrollTop />
    </div>
  );
}

export default App;
