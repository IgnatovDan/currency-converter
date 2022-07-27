import Header from '../header/header';
import Main from '../main/main';
import Footer from '../footer/footer';

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
