import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import refreshApi from './refreshApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const root = ReactDOM.createRoot(document.getElementById('root'))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      // refresh={refreshApi}
      >
        <ToastContainer />
        {/* cookieSecure={window.location.protocol === "https:"}> */}
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);




// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// 
// ReactDOM.render(
// <React.StrictMode>
{/* <App /> */ }
{/* </React.StrictMode>, */ }
  // document.getElementById('root')
// );