import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import Home from "./components/Home";
import AboutPage from "./components/About";
import Nav from "./components/Nav";
import "./App.css";
import { useState } from "react";


function AnimationRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={          
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={           
            <PageWrapper>
              <AboutPage />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}


function PageWrapper({ children }) {
  return (
    <motion.div
     initial={{ opacity: 0, y: 20}}
     animate={{ opacity: 1, y: 0}}
     exit={{ opacity: 0, y: -20}}
     transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}


function Modal({ onClose }) {
  return (
    <motion.div
     className="overlay"
     onClick={onClose}
     initial={{ opacity: 0 }}
     animate = {{opacity:1}}
     exit={{ opacity:0 }}
    >
      <motion.div
       className="modal-card"
       onClick={(e) => e.stopPropagation()}
       initial = {{scale: 0.9, opacity: 0}}
       animate = {{ scale: 1, opacity: 1}}
       exit = {{ scale: 0.9, opacity: 0}}
       transition={{type: "spring", stiffness: 400, damping: 25}}
      >
        <h2>Exited offer for whole sale</h2>
        <p>Get 25% discount of your next purchase</p>
        <p>
          Use promo <strong>SAVE20</strong> while checkout.
        </p>
        <p>This offer is valid till tommorow</p>
        <button className="close-button" onClick={onClose}>
          close
        </button>
      </motion.div>
    </motion.div>
  );
}


function ModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="modal-wrapper">
      <button className="open-button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <AnimatePresence>
        {isOpen && <Modal onClose={() => setIsOpen(false)}/>} 
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
     <Nav />
     <AnimationRoutes />
     <ModalWrapper />
    </BrowserRouter>
  );
}

export default App;