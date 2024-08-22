import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function TopNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand
        style={{
         marginLeft : "-4em",
         fontSize: "1.5em",
         fontFamily: "fantasy",
        }}
        >EduProjectLog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{
            marginLeft: "20em",
            textDecoration: "none",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          <Nav className="me-auto">
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "13em",
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              },
              fontSize: "1.1em",
              fontWeight: "bold",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
                            
              
            }}>
              <Link to="/viewProject" style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",                                
              }}>View Project</Link>
              <Link to="/AddProject"  style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",                                
              }}>Add Project</Link>
            </div>
          </Nav>
          <Nav>
            {
              localStorage.getItem("token") ? (
                <>
                <label style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}>Welcome, {localStorage.getItem("username")}</label>                
                <Link to="/login" style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}>Logout</Link>
                </>
              ) : (
                <Link to="/login" style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}>Login</Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
