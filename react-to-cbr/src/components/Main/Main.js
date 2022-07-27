import Converter from "../converter/converter";

import './main.css';
import './__converter/main__converter.css';

function Main() {
  return (
    <main className="main">
      <Converter classes="main__converter"></Converter>
    </main>
  );
}

export default Main;
