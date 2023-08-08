exports.log = async (message) => {
    const fs = require('fs/promises');

    try {
        await fs.appendFile('../logs/log.txt', `${new Date(Date.now()).toLocaleString()}\t${message}\n`, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(`logged: ${message}`);
            }
        });
    } catch (exception) {
        console.log(exception);
    }
}