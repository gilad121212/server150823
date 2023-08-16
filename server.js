const express = require('express')
const data = require('./data.js')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000
const saltRounds = 1;
app.use(express.json())


app.get('/users', (req, res) => {
    res.send({
        data
    })
})
app.get('/users/:id', (req, res) => {
    let flag = 0
    let userId = req.params.id;
    for (let obj = 0; i < data.length; i++) {
        if (data[i].id === Number(userId)) {
            res.send(data[obj])
            flag++
        }
    }
    if (flag === 0) {
        res.send("id not exists")
    }
})

app.post('/nwe', (req, res) => {
    const body = req.body
    let password = body.password
    body.password = bcrypt.hashSync(password, saltRounds);
    body.id = uuidv4()
    data.push(body)
    res.send(data)
})


app.put('/update/:id', (req, res) => {
    const body = req.body
    let userId = req.params.id;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === Number(userId)) {
            for (const key in body) {
                if (key === "password") {
                    data[i][key] = bcrypt.hashSync(body[key], saltRounds);
                } else {
                    data[i][key] = body[key]
                }
            }
        }
    }
    res.send(data)
})


app.put('/delete/:id', (req, res) => {
    const newData = []
    let flag = 0
    let userId = req.params.id;
    for (let i = 0; i < data.length; i++) {
        console.log("for")
        if (data[i].id !== Number(userId)) {
            console.log("if")
            newData.push(data[i])
        } else { flag++ }
    }
    if (flag === 0) {
        res.send("id not acsist")

    } else { res.send(newData) }

})
app.post("/checkUser", (req, res) => {
    console.log("gilad")
    let flag = 0
    const user = req.body
    for (let obj of data) {
        console.log("sinai")
        let n = bcrypt.compareSync(user.password, obj.password)
        console.log(n)
        if (obj.emile === user.emile && n) {
            res.send("User is connected")
            flag++
        }

    }
    if (flag === 0) {
        res.send(" wrong credentials")
    }
})



app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
})