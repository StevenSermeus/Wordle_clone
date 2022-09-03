const db = require('../models');


module.exports = () => {
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync Db');
    });
}