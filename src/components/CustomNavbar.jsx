// creiamo una Navbar di bootstrap personalizzata per il nostro Epistaurant
// creo questo componente come funzione

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const CustomNavbar = (props) => (
  <Navbar collapseOnSelect expand="md" bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#home">Epistaurant - {props.subtitle}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#booking">Prenota</Nav.Link>
          <Nav.Link href="#admin">Admin</Nav.Link>
          <Nav.Link href="#contacts">Contatti</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default CustomNavbar

// versione alternativa di CustomNavbar in cui estraggo direttamente la prop subtitle con l'object destructuring
//   const CustomNavbar = ({ subtitle }) => (
//     <Navbar collapseOnSelect expand="md" bg="dark" data-bs-theme="dark">
//       <Container fluid>
//         <Navbar.Brand href="#home">Epistaurant - {subtitle}</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link href="#booking">Prenota</Nav.Link>
//             <Nav.Link href="#admin">Admin</Nav.Link>
//             <Nav.Link href="#contacts">Contatti</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   )
