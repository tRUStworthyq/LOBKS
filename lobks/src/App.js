import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Sign from "./pages/Sign";
import BanPage from "./pages/BanPage";
import UserPanel from "./pages/UserPanel";
import AdminPanelUsers from "./pages/AdminPanelUsers";
import MyListPage from "./pages/MyListPage";
import AuthorInfo from "./pages/AuthorInfo";
import AdminPanelBooks from "./pages/AdminPanelBooks";
import Footer from "./components/Footer";
import Layout from "./Layout";
import AdminPanelAuthors from "./pages/AdminPanelAuthors";
import Auth from "./Auth";

function App() {


  
    return (
    <Router>
      <div className="App">
          <div>
              <Layout>
                <Routes>
                    <Route path="/sign" exact Component={Sign}></Route>
                    <Route path="/ban-page" exact Component={BanPage}></Route>
                    <Route element={<Auth allowedRoles={["user:write"]}/>}>
                        <Route path="/admin-panel-authors" exact Component={AdminPanelAuthors}></Route>
                        <Route path="/admin-panel-users" exact Component={AdminPanelUsers} ></Route>
                        <Route path="/admin-panel-books" exact Component={AdminPanelBooks}></Route>
                    </Route>
                    <Route element={<Auth allowedRoles={["user:read"]}/>}>
                        <Route path="/user-panel" exact Component={UserPanel}></Route>
                        <Route path="/my-list" exact Component={MyListPage}></Route>
                        <Route path="/author/:id" exact Component={AuthorInfo}></Route>
                    </Route>
                </Routes>
              </Layout>
          </div>
          <Footer/>
      </div>
    </Router>
  )
}

export default App;
