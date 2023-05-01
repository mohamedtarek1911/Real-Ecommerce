import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  FormControl,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import logo from "../../images/logo.png";
import login from "../../images/login.png";
import cart from "../../images/cart.png";
import NavbarSearchHook from "./../../hook/search/navbar-search-hook";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "./../../redux/actions/authAction";
import GetAllUserCartHook from "./../../hook/cart/get-all-user-cart-hook";
import { Link } from "react-router-dom";
const NavBarLogin = () => {
  //const dispatch = useDispatch()

  const [OnChangeSearch, searchWord] = NavbarSearchHook();
  let word = "";
  if (localStorage.getItem("searchWord") != null)
    word = localStorage.getItem("searchWord");

  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") != null)
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
    window.location.reload(false);
  };

  const [itemsNum] = GetAllUserCartHook();

  return (
    // <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
    //   <Container>
    //     <Navbar.Brand>
    //       <a href="/">
    //         <img src={logo} className="logo" />
    //       </a>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <FormControl
    //         value={word}
    //         onChange={OnChangeSearch}
    //         type="search"
    //         placeholder="ابحث..."
    //         className="me-2 w-100 text-center"
    //         aria-label="Search"
    //       />
    //       <Nav className="me-auto">
    //         {user != "" ? (
    //           <NavDropdown title={user.name} id="basic-nav-dropdown">
    //             {user.role === "admin" ? (
    //               <NavDropdown.Item href="/admin/allproducts">
    //                 لوحة التحكم
    //               </NavDropdown.Item>
    //             ) : (
    //               <NavDropdown.Item href="/user/profile">
    //                 الصفحه الشخصية
    //               </NavDropdown.Item>
    //             )}
    //             <NavDropdown.Divider />
    //             <NavDropdown.Item onClick={logOut} href="/">
    //               تسجيل خروج
    //             </NavDropdown.Item>
    //           </NavDropdown>
    //         ) : (
    //           <Nav.Link
    //             href="/login"
    //             className="nav-text d-flex mt-3 justify-content-center"
    //           >
    //             <img src={login} className="login-img" alt="sfvs" />
    //             <p style={{ color: "white" }}>دخول</p>
    //           </Nav.Link>
    //         )}

    //         <Nav.Link
    //           href="/cart"
    //           className="nav-text position-relative d-flex mt-3 justify-content-center"
    //           style={{ color: "white" }}
    //         >
    //           <img src={cart} className="login-img" alt="sfvs" />
    //           <p style={{ color: "white" }}>العربه</p>
    //           <span class="position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
    //             {itemsNum || 0}
    //           </span>
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <a>
              <img src={logo} className="logo" />
            </a>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
            value={word}
            onChange={OnChangeSearch}
          />
          <Nav className="me-auto">
            {user != "" ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === "admin" ? (
                  <NavDropdown.Item>
                    <Link className="menu-hover" to="/admin/allproducts">
                      لوحة التحكم
                    </Link>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    <Link className="menu-hover" to="/user/profile">
                      الصفحه الشخصية
                    </Link>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link className="menu-hover" onClick={logOut} to="/">
                    تسجيل خروج
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link
                className="nav-text d-flex mt-3 justify-content-center text-decoration-none"
                to="/login"
              >
                <a className=" mx-2 nav-text d-flex mt-3 justify-content-center text-decoration-none">
                  <img src={login} className="login-img" alt="sfvs" />
                  <p style={{ color: "white" }}>دخول</p>
                </a>
              </Link>
            )}

            <Link
              className="nav-text mx-2 position-relative d-flex mt-3 justify-content-center text-decoration-none"
              to="/cart"
              style={{ color: "white" }}
            >
              <a className="nav-text d-flex mt-3 justify-content-center text-decoration-none">
                <img src={cart} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}>العربه</p>
              </a>
              <span class="position-absolute badge-postion start-0 translate-middle badge rounded-pill bg-danger">
                {itemsNum || 0}
                <span class="visually-hidden">unread messages</span>
              </span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLogin;
