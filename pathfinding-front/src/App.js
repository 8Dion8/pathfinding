import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor';

function App() {

  fetch('http://localhost:7801/ping')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

  return (
    <div className="App">
      <Editor />
    </div>
  );
}

export default App;
