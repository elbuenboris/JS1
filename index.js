class Dato {
    constructor(description, value) {
        this._description = description
        this._value = value
    }

    getDescription() {
        return this._description
    }

    setDescription(newDescription) {
        this._description = newDescription
    }

    getValue() {
        return this._value
    }

    setValue(newValue) {
        this._value = newValue
    }
}

class Ingreso extends Dato {
    constructor(description, value) {
        super(description, value)
        Ingreso._counter ++
        this._id = Ingreso._counter
    }

    getId() {
        return this._id
    }

    static _counter = 0
}

class Egreso extends Dato {
    constructor(description, value) {
        super(description, value)
        Egreso._counter ++
        this._id = Egreso._counter
    }

    getId() {
        return this._id
    }

    static _counter = 0
}

let ingresos = [
    new Ingreso('Salario', 2000),
    new Ingreso('Venta auto', 1600)
]
console.log(ingresos)

let egresos = [
    new Egreso('Renta', 700),
    new Egreso('Ropa', 600)
]

const budgetElem = document.getElementById('budget')
const incomeElem = document.getElementById('income')
const outcomeElem = document.getElementById('outcome')
const percentElem = document.getElementById('percent')
const add = document.getElementById('add-params')
const outcomeListElem = document.getElementById('outcome-output')
const incomeListElem = document.getElementById('income-output')



const totalIngresos = () => {
    let total = 0

    for (ingreso of ingresos) {
        total += ingreso.getValue()
    }

    return total
}

const totalEgresos = () => {
    let total = 0

    for (egreso of egresos) {
        total += egreso.getValue()
    }

    return total
}

const formatoMoneda = (valueToFormat) => {
    const idioma = 'es-MX'
    const formato = {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 2
    }
    
    return valueToFormat.toLocaleString(idioma, formato)  
}

const formatoPorcentaje = (valueToFormat) => {
    const idioma = 'es-MX'
    const formato = {
        style: 'percent',
        maximumFractionDigits: 2
    }

    return valueToFormat.toLocaleString(idioma, formato)
}

const eliminarIngreso = (id) => {
    ingresos = ingresos.filter((item) => item.getId() !== id)
    cargarCabecero()
    console.log(ingresos)
}

const eliminarEgreso = (id) => {
    egresos = egresos.filter(item => item.getId() !== id)
    cargarCabecero()
}

const cargarIngresos = () => {
    const list = document.createElement('ul')
    

    for(ingreso of ingresos) {
        const listElement = document.createElement('li')

        listElement.innerHTML = `
            <span>${ingreso.getDescription()}</span>
            <span>${formatoMoneda(ingreso.getValue())}</span>
            <button onclick="eliminarIngreso(${ingreso.getId()})">x</button>
        `

        list.appendChild(listElement)
    }

    incomeListElem.appendChild(list)
}

const cargarEgresos = () => {
    const list = document.createElement('ul')
    

    for(egreso of egresos) {
        const listElement = document.createElement('li')

        listElement.innerHTML = `
            <span>${egreso.getDescription()}</span>
            <span>${formatoMoneda(egreso.getValue())}</span>
            <button onclick="eliminarEgreso(${egreso.getId()})">x </button>
        `

        list.appendChild(listElement)
    }

    outcomeListElem.appendChild(list)
}

const cargarCabecero = () => {
    outcomeListElem.innerHTML = ''
    incomeListElem.innerHTML = ''

    const ingresos = totalIngresos()
    const egresos = totalEgresos()

    const formatedIncome = formatoMoneda(ingresos)
    const formatedOutcome = formatoMoneda(egresos)

    const presupuesto = formatoMoneda(ingresos - egresos)
    const porcentajeEgreso = formatoPorcentaje(egresos / ingresos)

    budgetElem.innerHTML = presupuesto
    incomeElem.innerHTML = formatedIncome
    outcomeElem.innerHTML = formatedOutcome
    percentElem.innerHTML = porcentajeEgreso

    cargarIngresos()
    cargarEgresos()
}

const cargarApp = () => {
    cargarCabecero()
}

const validateDescription = (description) => {
    if (description.length > 12) {
        return 'invalid length'
    } else if (!isNaN(description)) {
        return 'invalid value'
    } else {
        return null
    }
}

const addInput = () => {
    const option = document.getElementById('add-value').value
    const value = document.getElementById('value')
    const description = document.getElementById('description')

    const error = validateDescription(description.value) 

    if(error){
        switch(error) {
            case 'invalid length':
                alert('maximo 12 caracteres')
                return 

            case 'invalid value': 
                alert('escribe solo letras')
                return

            default: 
                console.error('unhandled error')
                return
        }
    }


    if (!value.value || !description.value) {
        alert('Por favor llene ambos campos')
    } else {
        if (option === 'income') {
            ingresos.push(new Ingreso(description.value, parseInt(value.value)))
            console.log(ingresos)
            cargarCabecero()
        } else {
            egresos.push(new Egreso(description.value, parseInt(value.value)))
            console.log(egresos)
            cargarCabecero()
        }
    
        value.value= ''
        description.value = ''
    }
}

document.body.onload = cargarApp()
add.addEventListener('click', addInput)