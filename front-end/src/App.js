import './App.css';
import Router from './routing/router';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <div>
       <Header  />
      </div>

      <div className='body'>
        <Router />
      </div>

      <div style={{marginBottom: '10rem'}}></div>

      <div>
        <Footer />
      </div>
  
    </div>
  );
}

export default App;
