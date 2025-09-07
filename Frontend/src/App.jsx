import React from 'react'
import NewsBody from './components/NewsBody'
import { NewsProvider } from './components/NewsContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {

  return (
    <NewsProvider>
      <div
        className="App"
        style={{
          backgroundColor: "rgb(252, 245, 235)"
          // backgroundImage: "url('https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=1170&auto=format&fit=crop')",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // // backgroundAttachment: "fixed", // 👈 keeps it fixed when scrolling
          // // position: "fixed",
          // // zIndex : 1,
          // height: "100vh",
          // width: "100vw"
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/news" element={<NewsBody />} />
          </Routes>
        </Router>
      </div>
       <ToastContainer position="top-right" autoClose={3000} />

    </NewsProvider>
  );
}

export default App;
