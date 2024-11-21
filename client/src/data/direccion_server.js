// Direccion del servidor de la API

let DIRECTION;

if (process.env.NODE_ENV === 'production') {
    DIRECTION = 'https://visorprivadoemsv.khoraurbanthinkers.es';
} else {
    DIRECTION = 'http://localhost:3050';
}

export { DIRECTION };
