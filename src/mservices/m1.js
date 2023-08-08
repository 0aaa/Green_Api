exports.M1 = () => {
    const http = require('http');
    const { send } = require('../rabbitmq/send');
    const { receive } = require('../rabbitmq/receive');
    const { log } = require('../log');
    const { FROM_M2, FROM_M1 } = require('../consts/consts');

    http.createServer(async (request, response) => {

        const { headers, method, url } = request;
        let body = [];
        await log(`Request for ${url} received.`);

        request.on('error', async err => {

            await log(`Error has occurred: ${err}.`);
            console.error(err);
        }).on('data', async chunk => {

            await log('Request on data.');
            body.push(chunk);
        }).on('end', async () => {

            await log('Request on end.');
            body = Buffer.concat(body).toString();

            response.on('error', async err => {

                await log(`Error has occurred: ${err}.`);
                console.error(err);
            });

            try {
                send(FROM_M1, JSON.stringify({ headers, method, url, body }));
                receive(FROM_M2);
            } catch (error) {

                await log(`Error has occurred: ${error}.`);
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.end();
            }
            await log('Response completed.');
        });
    }).listen(8080);

    console.log('Server running at http://127.0.0.1:8080/');
}