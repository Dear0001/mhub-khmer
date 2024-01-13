// import React from "react";
// import "./App.css";
// import Navigation from "./components/Pages/Navbar/Navigation";
// import Footer from "./components/Pages/Footer/Foorter";
// import About from "./components/Pages/About/About";

// import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
// import BlogSection from "./components/Pages/Blog/BlogSection";
// import Home from './components/Pages/Home/Home'
// import Contact from './components/Pages/Contact/Contact';
// import Detail from './components/Pages/Detail/Detail'
// import Appetizer from "./components/Pages/Appetizer/Appetizer";


// const App = () => {
//   return (
//     <Router>
//       <Navigation />
//       <Switch>
//           <Route path="/" Component={Home} />
//           <Route path="/about" Component={About} />
//           <Route path="/blog" Component={BlogSection} />
//           <Route path="/contact" Component={Contact} />
//           <Route path="/detail" Component={Detail} />
//           <Route path="/appertizer" Component={Appetizer} />
//         </Switch>
//         <Footer />
//     </Router>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Pages/Navbar/Navigation";
import Footer from "./components/Pages/Foorter";
import About from "./components/Pages/About";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import BlogSection from "./components/Pages/BlogSection";
import Home from './components/Pages/Home';
import Contact from './components/Pages/Contact';
import Detail from './components/Pages/Detail';
import Appetizer from "./components/Pages/Appetizer";
import { CSSTransition } from 'react-transition-group';
import Loading from "./components/UI/Loading";
import Soup from "./components/Pages/TypeSoup";
import Dessert from "./components/Pages/TypeDessert"

// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
   <Loading />
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Router>
      <Navigation />
      <CSSTransition in={loading} timeout={300} classNames="fade" unmountOnExit>
        <LoadingSpinner />
      </CSSTransition>
      <CSSTransition in={!loading} timeout={300} classNames="fade" unmountOnExit>
        <Switch>
          <Route path="/mhub-khmer" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/appertizer" element={<Appetizer />} />
          <Route path="/soup" element={<Soup />} />
          <Route path="/dessert" element={<Dessert />} />
        </Switch>
      </CSSTransition>
      <Footer />
    </Router>
  );
};

export default App;