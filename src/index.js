import React from "react"
import ReactDom from "react-dom"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import "./scss/errorPage.scss";
import "./scss/navHome.scss";
import "./scss/logins.scss";
import "./scss/BandBook.scss";
import "./scss/Search.scss";
import "./scss/goBack.scss";
import "./scss/others.scss";
import "./scss/Publication.scss"
import Login from "./component/Login"
import Sign from"./component/Sign"
import BandBook from "./component/BandBook"
import PageBook from "./component/PageBook" 
import Publication from "./component/Publication"
import Poster from "./component/Poster"
import Commentaire from "./component/Commentaire"
import Advertice from "./component/Advertice"
import Contact from "./component/Contact"
import PublierStep1 from "./component/PublierStep1"
import PublierStep2 from "./component/PublierStep2"
import PublierStep3 from "./component/PublierStep3"
import NavHome from "./nav/NavHome"
import ErrorPage from "./error/ErrorPage"


const MainApp = ()=>{ 
    return(
        <Router>
            <Switch> 
                <Route exact path="/">
                    <NavHome/>
                </Route>
                <Route exact path="/contact">
                    <NavHome/>
                    <Contact/>
                </Route>
                <Route exact path="/Add_BOOK/step1">
                    <NavHome/>
                    <PublierStep1/>
                </Route>
                <Route exact path="/Add_BOOK/step3">
                    <NavHome/>
                    <PublierStep3/>
                </Route>
                <Route exact path="/Add_BOOK/step2">
                    <NavHome/>
                    <PublierStep2/>
                </Route>
                <Route exact path="/books">
                    <NavHome/>
                    <BandBook marginTop="30vh" marginBottom="5vh" bandTitle="MOST POPULAR BOOKS" lang="all" nbr="5"/>
                    <BandBook marginTop="1vh" marginBottom="10vh" bandTitle="Arabic Books" lang="arabic" nbr="3" />
                    <BandBook marginTop="1vh" marginBottom="10vh" bandTitle="History BOOKS" type="history" nbr="1" />
                    <BandBook marginTop="1vh" marginBottom="10vh" bandTitle="FREE BOOKS" prix="0" nbr="1" />
                    <BandBook marginTop="1vh" marginBottom="10vh" bandTitle="Max 18€ BOOKS" prix="18" nbr="3" />
                </Route>
                <Route exact path="/document/:name/:id">
                    <NavHome/>
                    <div className="pageBookContainer">
                        <PageBook/>
                        <Commentaire/>
                    </div>
                </Route>
                <Route exact path="/Post_Books">
                    <NavHome/>
                    <Poster/>
                    <Publication/>
                </Route>
                <Route exact path="/login">
                    <div className="pageLoginContainer">
                        <div className="loginParagraph" id="loginParagraph">
                            <Advertice/>
                        </div>
                            <Login/>
                    </div>
                </Route>
                <Route exact path="/sign">
                    <div className="pageLoginContainer">
                        <div className="loginParagraph" id="signParagraph">
                            <Advertice/>
                        </div>
                        <form className="signContainer" id="signContainer">
                            <Sign/>
                        </form>
                    </div>
                </Route>
                <Route exact path="*">
                    <ErrorPage/>
                </Route>
            </Switch>
        </Router>
    )
}
ReactDom.render(<MainApp/>,document.getElementById("mainApp"));