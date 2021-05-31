import ReactDOM from 'react-dom';
import Layout from './components/layout';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Router>
    <Layout />
  </Router>,
  document.getElementById('root')
);
