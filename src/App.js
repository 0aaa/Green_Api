exports.App = () => {
    const { M1 } = require("./mservices/m1");
    const { M2 } = require("./mservices/m2");
    
    M1();
    M2();
}