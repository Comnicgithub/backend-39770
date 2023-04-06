class TicketManager {

    #gain

    constructor() {
        this.events = []
        this.#gain = 0.15
    }

    getEvents() {
        console.log(this.events)
        return this.events
    }

    addEvent({ name,place,price,capacity,date }) {
        capacity = capacity ?? 50
        date = date ?? new Date()
        let id = 0
        if (this.events.length===0) {
            id = 1
        } else {
            let lastEvent = this.events[this.events.length-1] //el ultimo elemento tiene indice igual a la longitud del array MENOS 1
            id = lastEvent.id + 1
        }
        price = price + this.#gain * price
        let event = { name,place,price,capacity,date,id, participants: [] }
        //event.participants = []
        this.events.push(event)
    }

}

let ticket = new TicketManager()
//console.log(ticket.gain)
ticket.addEvent({ name: 'alice in borderland', place: 'korea', price: 5,capacity: null, date: undefined })
ticket.addEvent({ name: 'hp', place: 'england', price: 10 })
ticket.addEvent({ name: 'pokemon', place: 'japon', price: 50,capacity: 100000, date: new Date('07/09/2023') })
ticket.addEvent({ name: 'disney', place: 'miami', price: 100,capacity: 5000, date: new Date('07/20/2023') })
ticket.getEvents()