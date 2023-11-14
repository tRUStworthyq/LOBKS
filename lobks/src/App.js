import React from "react";
import ListBooks from "./components/ListBooks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import CreateBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import View from "./components/View";

function App() {

  
    return (
    <Router>
      <div className="App">
          <Header />
          <div>
            <Routes> 
              <Route path="/" exact Component={ListBooks}></Route>
              <Route path="/add_book" Component={CreateBook}></Route>
              <Route path="/update_book/:id" Component={UpdateBook}></Route>
              <Route path="/:id" Component={View}></Route>
            </Routes>
          </div>
          <Footer />
      </div>
    </Router>
  )
}

export default App;
