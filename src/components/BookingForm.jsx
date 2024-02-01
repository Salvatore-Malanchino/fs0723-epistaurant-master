// il mio backender mi ha detto come dev'essere strutturata una "prenotazione"

// "name" --> string, required
// "phone" --> string/number, required
// "numberOfPeople" --> string/number, required
// "smoking" --> boolean, required
// "dateTime" --> string in ISO format, required
// "specialRequests" --> string

import { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

class BookingForm extends Component {
  state = {
    // come sempre qui dichiaro lo STATO INIZIALE del componente
    // ogni volta che creerete un form in React, dovrete salvarne i valori dentro lo state del componente
    reservation: {
      name: '',
      phone: '',
      numberOfPeople: '1',
      smoking: false,
      dateTime: '',
      specialRequests: '',
    },
  }

  // handler che ho collegato come test a "numberOfPeople", volendo lo potreste riutilizzare anche per tutti gli altri
  handleChange = (e, key) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [key]: e.target.value,
      },
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('stato corrente', this.state.reservation)
    // facciamo ora la chiamata POST per salvare la prenotazione
    fetch('https://striveschool-api.herokuapp.com/api/reservation', {
      method: 'POST',
      body: JSON.stringify(this.state.reservation),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // la response ci vuole dire che il salvataggio della prenotazione è andato a buon fine!
          alert('Prenotazione salvata correttamente, grazie! :)')
          // svuotiamo il form? sì! riportando lo stato al valore iniziale
          this.setState({
            reservation: {
              name: '',
              phone: '',
              numberOfPeople: '1',
              smoking: false,
              dateTime: '',
              specialRequests: '',
            },
          })
        } else {
          throw new Error('Errore nel salvataggio della prenotazione! :(')
        }
      })
      .catch((e) => {
        alert(e)
      })
  }

  render() {
    // console.log('RENDER NEL FORM')
    return (
      <Container className="my-3">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center">Prenota un tavolo</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Come ti chiami?"
                  required
                  value={this.state.reservation.name}
                  // ora mancherebbe che ad ogni keypress venga aggiornata la proprietà "name" dello stato!
                  onChange={(e) => {
                    // alla pressione di ogni tasto, dobbiamo aggiornare nello state.reservation
                    // la proprietà corrispondente a questo campo
                    this.setState({
                      reservation: {
                        // ok, noi qua aggiorniamo il campo "name", ma non vogliamo perdere gli altri campi
                        // contenuti nello state corrente!
                        ...this.state.reservation, // mi porto dentro questo nuovo oggetto gli attuali name,
                        // phone, numberofPeople, etc.
                        name: e.target.value, // qua ci dovrebbe andare man mano che scrivo il contenuto dell'input
                        // ora ho sovrascritto in questo oggetto reservation la proprietà "name"
                      },
                    })
                  }}
                />
              </Form.Group>

              {/* io voglio far vedere questo Alert SOLAMENTE se una condizione sarà soddisfatta */}

              {/* rendering condizionale in JSX con lo short circuit operator */}
              {this.state.reservation.name === 'Al Bano' && (
                <Alert variant="success">Bel nome!</Alert>
              )}

              {/* rendering condizionale in JSX con il ternary operator */}
              {/* {this.state.reservation.name === 'Al Bano' ? (
                <Alert variant="success">Che bel nome Al Bano!</Alert>
              ) : this.state.reservation.name === 'Zucchero' ? (
                <Alert variant="success">Che bel nome Zucchero!</Alert>
              ) : (
                <Alert variant="danger">Che brutto nome!</Alert>
              )} */}

              <Form.Group className="mb-3">
                <Form.Label>Il tuo numero di telefono</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  value={this.state.reservation.phone}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        phone: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>In quanti siete?</Form.Label>
                <Form.Select
                  aria-label="numero-persone"
                  required
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => {
                    this.handleChange(e, 'numberOfPeople')
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                {/* nelle checkboxes si usa prevalentemente la proprietà "checked", che lavora con un valore
                booleano invece di "value", che lavora esclusivamente con i valori "on" e "off" */}
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori?"
                  checked={this.state.reservation.smoking}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        smoking: e.target.checked,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data e ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        dateTime: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Richieste particolari</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Allergie, cani, gatti, etc."
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        specialRequests: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                disabled={
                  this.state.reservation.name === '' ||
                  this.state.reservation.phone === ''
                  //   ...continate voi :)
                }
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BookingForm
