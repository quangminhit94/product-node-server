const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const CONNECTION_INFO = {
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b0d13d601f5e17',
  password: '586f8d12',
  database: 'heroku_9e4d86c8dbf765d'
}

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM PRODUCTS"

// const connection = mysql.createConnection(CONNECTION_INFO) // If we use connection it could be close by default
const pool = mysql.createPool(CONNECTION_INFO) // If we use pool we can hold the connection

// app.use(express.logger());
app.use(cors())
// app.options('*', cors());
app.use(bodyParser.json())
// connection.connect(err => {
//   if (err) return err
// })

app.get('/', (req, res) => {
  res.send('Hello World! I am awake')
})

app.post('/products/add', cors(), (req, res) => {
  const { name, price } = req.body
  const INSERT_PRODUCTS_QUERY = `INSERT INTO PRODUCTS (NAME, PRICE) VALUE ('${name}', ${price})`
  pool.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) return res.send(err)
    console.log(results)
    return res.send(`You add product successful`)
  })
})

app.delete('/products/delete/:product_id', cors(), (req, res) => {
  const id = req.params.product_id
  const DELETE_PRODUCT_QUERY = `DELETE FROM PRODUCTS WHERE PRODUCT_ID = ${id}`
  pool.query(DELETE_PRODUCT_QUERY, (err, results) => {
    if (err) return res.send(err)
    console.log(results)
    return res.send(`You delete product successful`)
  })
})

app.get('/products', (req, res) => {
  pool.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
    if (err) return res.send(err)
    // else here
    return res.json({
      data: results
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port 3000!`))