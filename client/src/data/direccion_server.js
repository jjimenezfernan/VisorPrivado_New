
let DIRECTION;

if (process.env.NODE_ENV === 'production') {
    DIRECTION = 'https://api.observatoriodedatosepiu.khoraurbanthinkers.es:443';
} else {
    DIRECTION = 'http://localhost:3030';
}

export { DIRECTION };
