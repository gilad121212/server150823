const jsonfile = require('jsonfile')
 
const file = 'j.json'
const obj = { name: 'JP' }
jsonfile.writeFile(file, obj, function (err) {
    if (err) console.error(err)
  })
  
jsonfile.readFile(file, function (err, obj) {
  if (err) console.error(err)
  console.dir(obj)
})
