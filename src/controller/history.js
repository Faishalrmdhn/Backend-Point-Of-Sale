const {getAllHistory,getHistoryById, postHistory, patchHistory} = require('../model/history')
const {postOrders} = require('../model/orders')
const helper = require ('../helper/index')
const qs = require('querystring')

module.exports = {
getAllHistory : async (request, response)=> {
    try{
        const result = await getAllHistory();
        return helper.response(response,200, "Success Get History", result)
    } catch(error){
        return helper.response(response, 400, "Bad Request!", error)
    }
},

getHistoryById : async (request, response)=>{
    try{
        const {id} = request.params
        const result = await getHistoryById(id)
        // const result2 = await getAllOrders()
        
        // console.log(result2)
        if(result.length>0){
            return helper.response(response, 200, `Success Get History By ID : ${id} `,
            result)
        } else {
            return helper.response(response, 404, `History by ID : ${id} Not Found`)
        }
    }catch (error) {
        return helper.response(response, 400, "Bad Request!", error)
    }
},
postHistory: async (request, response)=>{
    let history_subtotal = 0;
    let invoice = Math.floor(Math.random() * 1000000);
    try{
        const setData = {
            invoice, 
            history_subtotal,
            history_created_at : new Date()
        }
        const result = await postHistory(setData);
        let idHistory = result.history_id;
        return helper.response(response, 201, "History Created", result)
    }catch(error){
        return helper.response(response, 400, "Bad Request", error)
    }
},
patchHistory: async (request, response) => {
    try {
      const {id} = request.params
      const {order_id, history_subtotal} = request.body
      const setData = {
            order_id, 
            history_subtotal,
            history_updated_at: new Date()
      }
      const checkId = await getHistoryById(id)
      if (checkId.length > 0) {
        const result = await patchHistory(setData, id)
        return helper.response(response, 201, "History Updated", result)
      } else {
        return helper.response(response, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error)
    }
  }
}

