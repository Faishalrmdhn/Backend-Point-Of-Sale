const connection = require('../config/mysql');

module.exports = {
    getAllHistory : ()=>{
       return new Promise((resolve, reject)=>{
           connection.query(`SELECT * FROM history`, (error, result)=>{
               !error ? resolve(result) : reject(new Error(error))
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
    postHistory : (setDatas)=>{
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