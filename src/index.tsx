import ReactDOM from 'react-dom';
import Layout from './components/layout';
import { Provider } from 'mobx-react'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider {...store}>
    <Router>
      <Layout />
    </Router>
  </Provider>,
  document.getElementById('root')
);
