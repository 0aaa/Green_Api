exports.send = (queueName, payload) => {
    const amqp = require('amqplib/callback_api');

    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            var msg = process.argv.slice(2).join(' ') || payload;

            channel.assertQueue(queueName, {
                durable: true
            });
            channel.sendToQueue(queueName, Buffer.from(msg), {
                persistent: true
            });
            console.log('%s\tsent message\t%s', queueName, msg);
        });
        setTimeout(() => {
            connection.close();
            process.exit(0)
        }, 500);
    });
}