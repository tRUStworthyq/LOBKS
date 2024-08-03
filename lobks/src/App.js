import React from "react";
import ListBooks from "./components/ListBooks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import CreateBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import View from "./components/View";
import Sign from "./pages/Sign";
import BanPage from "./pages/BanPage";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import MyListPage from "./pages/MyListPage";

function App() {

  
    return (
    <Router>
      <div className="App">
          <div>
            <Routes>
              <Route path="/sign" exact Component={Sign}></Route>
              <Route path="/ban-page" exact Component={BanPage}></Route>
              <Route path="/user-panel" exact Component={UserPanel}></Route>
              <Route path="/admin-panel" exact Component={AdminPanel}></Route>
              <Route path="/my-list" exact Component={MyListPage}></Route> 
              <Route path="/" exact Component={ListBooks}></Route>
              <Route path="/add_book" Component={CreateBook}></Route>
              <Route path="/update_book/:id" Component={UpdateBook}></Route>
              <Route path="/:id" Component={View}></Route>
            </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;
