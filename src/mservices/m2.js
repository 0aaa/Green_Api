exports.M2 = () => {
    const { receive } = require('../rabbitmq/receive');
    const { FROM_M1 } = require('../consts/consts');

    receive(FROM_M1)
}