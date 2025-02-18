import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from './store/store.js';
import { ConfigProvider } from 'antd';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins"
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
)
