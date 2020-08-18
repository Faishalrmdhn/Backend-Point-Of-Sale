const connection = require('../config/mysql');

module.exports = {
    getHistory : (sort, limit, offset, ascdsc)=>{
       return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM history ORDER BY ${sort} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`,(error, result) => {
               !error ? resolve(result) : reject(new Error(error))
           })
       }) 
    },
    getWithOutSort : (limit,offset)=> {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM history LIMIT ${limit} OFFSET ${offset}`,(error, result) => {
                   !error ? resolve(result) : reject(new Error(error))
               })
           }) 
    },
    getHistoryCount:()=>{
        return new Promise ((resolve, reject)=>{
        connection.query("SELECT COUNT(*) as total FROM history", (error,result)=> {
          !error ? resolve(result[0].total) : reject(new Error(error))
        })
      })
        },
    getHistoryById : (id)=>{
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM history WHERE history_id = ?`, id, (error, result) => {
              !error ? resolve(result) : reject(new Error(error)) //product_id dari postman
            })
          })
    },
    postHistory : (setData)=>{
        return new Promise ((resolve, reject) =>{
            connection.query(`INSERT INTO history SET ?`, setData, (error,result)=>{
                if (!error){
                    const newResult = {
                        history_id : result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else{
                    reject(new Error(error))
                }
            })
        })
    },
    patchHistory : (setData, id)=>{
        return new Promise ((resolve,reject)=>{
            connection.query("UPDATE history SET ? Where history_id = ?", [setData, id], (error, result)=>{
                if (!error){
                    const newResult = {
                        history_id : id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}