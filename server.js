const express = require('express')
const data = require('./data.js')
const app = express()
const { v4: uuidv4 } = require('uuid');
const port = 3000
app.use(express.json())



app.get('/', (req, res) => {
    res.send(data)
})

app.get('/users', (req, res) => {
    res.send({
        data
    })
})
app.get('/users/:id', (req, res) => {
    let n=0
    let userId = req.params.id;
    for (let i = 0; i< data.length; i++){
        if (data[i].id === Number(userId)){
            res.send(data[i])
            n++
        }
    }
    if (n===0){
        res.send("id not acsist")
    }
})
app.post('/nwe', (req, res) => {
    let count = data.length +1
    const body = req.body
    body.id = uuidv4()
    console.log(body)
    data.push(body)
    res.send(data)


})
app.put('/apdeit/:id', (req, res) => {
    const body = req.body
    console.log(body)
    let userId = req.params.id;
    for (let i = 0; i< data.length; i++){
        if (data[i].id === Number(userId)){
            console.log("if")
            for (const key in body){
                console.log("for")
                data[i][key] = body[key]
            }
        }
    }

 res.send(data)
})
app.put('/delete/:id', (req, res) => {
    const newData = []
    let n = 0
    let userId = req.params.id;
    for (let i = 0; i< data.length; i++){
        console.log("for")
        if (data[i].id !== Number(userId)){
            console.log("if")
            newData.push(data[i])
        }else { n++ }
    }
    if (n === 0){
        res.send("id not acsist")

    }else {res.send(newData)}
    
})




app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
})