const http = require('http');

function post(path, data) {
    const dataString = JSON.stringify(data);
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataString.length,
        },
    };

    const req = http.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        res.on('end', () => {
            console.log(`Response for ${path} [Status: ${res.statusCode}]:`, responseData);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request to ${path}: ${e.message}`);
    });

    req.write(dataString);
    req.end();
}

console.log('Testing Life Quote (Valid - Piloto - ARS)...');
post('/api/quotes/life', {
    age: 35,
    beneficiaries: 2,
    occupation: 'Piloto',
    healthStatus: 'None',
    plan: 'Basic',
    features: ['MuerteAccidental']
});

setTimeout(() => {
    console.log('Testing Home Quote (Valid - ARS)...');
    post('/api/quotes/home', {
        province: 'CABA',
        location: 'Palermo',
        rooms: 3,
        dwellingType: 'Apartment',
        occupants: 2,
        plan: 'Premium',
        features: ['Incendio', 'Robo']
    });
}, 1000);
