import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './app.css';
import './__header/app__header.css';

function App() {
  return (
    <div className="app">
      <Header classes="app__header"></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
