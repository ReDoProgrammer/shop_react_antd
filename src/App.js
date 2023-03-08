import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import PageContent from './Components/PageContent';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <PageContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
