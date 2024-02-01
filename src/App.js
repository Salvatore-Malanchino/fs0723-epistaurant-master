import './App.css'
// manca il file css di Bootstrap! importiamolo qua in App.js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import CustomNavbar from './components/CustomNavbar'
import HomepageCarousel from './components/HomepageCarousel'
import BookingForm from './components/BookingForm'
import BookingList from './components/BookingList'

// questo è un import più selettivo, che nella fase di finalizzazione del progetto
// risulterà in una cartella meno pesante (peserà meno MB)

// import { Button } from 'react-bootstrap'
// questo import non è il massimo, perchè anche solo per importare il Button trascina dentro il componente
// l'intera libreria react-bootstrap

function App() {
  return (
    <>
      <header>
        <CustomNavbar subtitle="Il miglior ristorante italiano del web!" />
      </header>
      <main>
        <BookingList />
        <BookingForm />
        <HomepageCarousel />
      </main>
    </>
  )
}

export default App
