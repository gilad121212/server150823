const express = require('express')
const data = require('./data.js')
const bcrypt = require('bcrypt');
const validator = require("email-validator")
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
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
    for (let obj = 0; obj < data.length; obj++) {
        if (data[obj].id === Number(userId)) {
            res.send(data[obj])
            flag++
        }
    }
    if (flag === 0) {
        res.send("id not exists")
    }
})

app.post('/new', (req, res) => {
    const body = req.body
    schema.is().min(8).is().max(8).has().uppercase().has().lowercase()  
    if (schema.validate(body.password) ){
        if (validator.validate(body.emile)){
            let password = body.password
            body.password = bcrypt.hashSync(password, saltRounds);
            body.id = uuidv4()
            data.push(body)
            res.send(data)
        }else {
            res.send("email is not god")
        }
    }else{
        res.send("password not god")
    }
   
})

app.put('/update/:id', (req, res) => {
    const body = req.body
    let userId = req.params.id;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === userId) {
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
        if (data[i].id !== userId) {
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
app.put('/update1/:id', (req, res) => {
    let flag = 0
    let userId = req.params.id;
    for (let obj of data) {
        if (obj.id == userId) {
            const pro = async () => {
                const d = await fetch("https://dummyjson.com/products")
                const d1 = await d.json()
                obj.prodact = d1.products[0]
                const m = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'PUT',
                body: JSON.stringify(obj),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                const m1 = await m.json()
                res.send(m1)
                flag++
            }
        pro()
        }
    }
    if(flag === 0){
        res.send("the id is not exist")
    }
})
  




app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
})