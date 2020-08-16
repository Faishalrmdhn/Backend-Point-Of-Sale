//untuk menghubungkan antara ENDPOINT dalam ROUTES & LOGIC CONTROLLER
//isinya query sql utk menghubungkan ke dalam database
const connection = require('../config/mysql')

module.exports = {
  getProduct: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM product LIMIT ? OFFSET ?",[limit, offset],(error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  //===========================================================
  getProductCount:()=>{
  return new Promise ((resolve, reject)=>{
  connection.query("SELECT COUNT(*) as total FROM product", (error,result)=> {
    !error ? resolve(result[0].total) : reject(new Error(error))
  })
})
  },
  //===========================================================
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product WHERE product_id = ?`, id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error)) //product_id dari postman
      })
    })
  },
  getProductByName: (name)=>{
    return new Promise((resolve,reject)=>{
      connection.query(`SELECT * FROM product WHERE product_name LIKE "%${name}%"` ,(error, result)=>{
        !error ? resolve(result) : reject (new Error(error))
      })
    })
  },
  postProduct: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO product SET ?", setData, (error, result) => {
         
        if (!error) { //memasukkan apa yg diinputkan user
          const newResult = { // apa yg ditampilkan
            product_id : result.insertId, 
            ...setData
          }
          resolve(newResult)
          // console.log(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  patchProduct: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE product SET ? WHERE product_id = ?", [setData, id], (error, result) => {
        if (!error) {
          const newResult = {
            product_id: id,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM product WHERE product_id = ?", id, (error, result) => {
        if (!error) {
          const newResult = {
            id: id
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}