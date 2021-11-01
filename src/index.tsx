import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import './styles/index.scss';
import App from './components/app/App';
import { store } from './state/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

console.log(
  '88b           d88                                                            88',
);
console.log(
  '888b         d888                                                            ""',
);
console.log(`88'8b       d8'88`);
console.log(
  `88 '8b     d8' 88   ,adPPYba,  ,adPPYba,  ,adPPYba,  ,adPPYYba,  8b,dPPYba,  88`,
);
console.log(
  `88  '8b   d8'  88  a8P_____88  I8[    ""  I8[    ""  ""     'Y8  88P'   "Y8  88  `,
);
console.log(
  `88   '8b d8'   88  8PP"""""""   '"Y8ba,    '"Y8ba,   ,adPPPPP88  88          88  `,
);
console.log(
  `88    '888'    88  "8b,   ,aa  aa    ]8I  aa    ]8I  88,    ,88  88          88  `,
);
console.log(
  `88     '8'     88   '"Ybbd8"'  '"YbbdP"'  '"YbbdP"'  '"8bbdP"Y8  88          88  `,
);
