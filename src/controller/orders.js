const {getAllOrders, getOrdersById, postOrders} = require('../model/orders');
const {postHistory} = require ('../model/history')
const helper = require('../helper/index');


module.exports = {
    getAllOrders: async (request, response)=> {
        try{
            const result = await getAllOrders();
            return helper.response(response,200, "Success Get Order", result)
        } catch(error){
            return helper.response(response, 400, "Bad Request!", error)
        }
    },
    getOrdersById: async(request, response)=>{
        try{
            // const id = request.params.id
            const {id} = request.params
            const result = await getOrdersById(id) //(id) dilempar ke model 
            if(result.length>0){
                return helper.response(response, 200, "Success Get Order By ID",
                result)
            } else {
                return helper.response(response, 404, `Order by ID : ${id} Not Found`)
            }
            // console.log(result);
        } catch (error){
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    postOrders: async (request, response)=>{
        try{            
        const test = request.body.orders;
            const testArr = test.map(async(value)=>{
                // console.log(value)
                const setData = {
                    // history_id: 
                    product_id: value.product_id,
                    order_qty: value.order_qty,
                    order_price: value.order_price, 
                    order_created_at : new Date()
                }
                const result = await postOrders(setData);   
                // console.log(setData)
                return helper.response(response, 201, "Orders Created", result)
            })
            // const result = await postOrders(setData);              
        }catch(error){
            // console.log(error)
            return helper.response(response, 400, "Bad Request", error)
        }
    }
}