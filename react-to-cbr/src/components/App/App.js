import './app.css';
import './__header/app__header.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header></Header>
      </div>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
