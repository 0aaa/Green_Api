exports.receive = (queueName) => {
    const amqp = require('amqplib/callback_api');
    const { send } = require('./send');
    const { FROM_M1, FROM_M2 } = require('../consts/consts');

    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queueName, {
                durable: true
            });
            channel.prefetch(1);
            console.log('%s\twaiting for messages', queueName);

            channel.consume(queueName, msg => {
                var secs = msg.content.toString().split('.').length - 1;

                console.log('%s\treceived message\t%s', queueName, msg.content);
                if (queueName === FROM_M1) {
                    send(FROM_M2, msg.content.toString());
                }
                setTimeout(() => {
                    console.log('%s\tdone', queueName);
                    channel.ack(msg);
                }, secs * 16);
            }, {
                noAck: false
            });
        });
    });
}