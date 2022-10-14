const express = require('../node_modules/express');
const router = express.Router();


router.post('/', (req, res) => { // still corresponds to 'login'
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    console.log(req.body);
    res.status(401).send('Please enter a name');
});

module.exports = router;