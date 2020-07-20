const express = require('express');
const app = express();
const port = process.env.PORT || 2000;
const cors =  require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.status(200).send('Welcome to contact API');
});

const { query } = require('./database')

app.get('/contact', async (req,res) => {
    let getAll = `SELECT * FROM contacts`;
    try {
        let response = await query(getAll);
        res.status(200).send({
            status: 'Success',
            data: response,
            message: 'Data fetched success',
        });
    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message: err.message,
        });
    }
});

app.get('/contact/:id', async (req,res) => {
    let { id } = req.params;
    let getById = `SELECT * FROM contacts WHERE id = ${id}`;
    try {
        let response = await query(getById);
        res.status(200).send({
            status: 'Success',
            data: response,
            message: `Data with id ${id} fetched`
        });
    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message: err.message,
        });
    }
});

app.post('/contact', async (req,res) => {
    let { firstName, lastName, age, photo } = req.body;
    let addContact = `INSERT INTO contacts (firstName, lastName, age, photo) 
    VALUES ('${firstName}', '${lastName}', ${age}, '${photo}')`;
    // let 
    try {
        let response = await query(addContact);
        res.status(200).send({
            status: 'Success',
            data: response,
            message: 'Data successfully added',
        });
    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message: err.message,
        });
    }
});

app.put('/contact/:id', async (req,res) => {
    let { id } = req.params;
    let { firstName, lastName, age, photo } = req.body;
    let editContact = `UPDATE contacts SET 
    firstName = '${firstName}', lastName = '${lastName}', age = ${age}, photo = '${photo}' 
    WHERE id = ${id}`;
    try {
        await query(editContact);
        res.status(200).send({
            status: 'Success',
            message: `Data with id ${id} is edited`,
        });
    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message: err.message,
        });
    }
});

app.delete('/contact/:id', async (req,res) => {
    let { id } = req.params;
    let deleteContact = `DELETE FROM contacts WHERE id = ${id}`;
    try {
        await query(deleteContact);
        res.status({
            status: 'Success',
            message: `Data with id ${id} is deleted`,
        });
    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message: err.message,
        });
    }
})

app.listen(port, () => console.log(`API active at port ${port}`));
