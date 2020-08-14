//LOGIC untuk aplikasi backend
const {getAllProduct,getProductById,postProduct,patchProduct,deleteProduct} = require('../model/product')
const helper = require('../helper/index')

module.exports = {
    getAllProduct: async(request, response)=>{
        try {
            const result = await getAllProduct();
            return helper.response(response, 200, "Success Get Product!", result)
        } catch (error){
            return helper.response(response, 400, "Bad Request!", error)
        }
    },
    getProductById: async(request, response)=>{
        try{
            // const id = request.params.id
            const {id} = request.params
            const result = await getProductById(id) //(id) dilempar ke model 
            if(result.length>0){
                return helper.response(response, 200, "Success Get Product By ID",
                result)
            } else {
                return helper.response(response, 404, `Product by ID : ${id} Not Found`)
            }
            // console.log(result);
        } catch (error){
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    postProduct: async (request, response)=>{
        try{
            const {product_name, product_price, product_status}
            = request.body;
            const setData = {
                //kiri mysql kanan postman
                product_name, //:product_name
                product_price, //:product_price
                product_created_at : new Date(),
                product_status //:product_status
            }
            const result = await postProduct(setData);
            return helper.response(response, 201, "Product Created", result)
        }catch(error){
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    patchProduct: async (request, response) => {
        try {
          const { id } = request.params
          const { product_name, product_price, product_status } = request.body
          const setData = {
            product_name,  
            product_price,
            product_updated_at: new Date(),
            product_status
          }
          const checkId = await getProductById(id)
          if (checkId.length > 0) {
            const result = await patchProduct(setData, id)
            return helper.response(response, 201, "Product Updated", result)
          } else {
            return helper.response(response, 404, `Product By Id : ${id} Not Found`)
          }
        } catch (error) {
          return helper.response(response, 400, "Bad Request", error)
        }
      },
      //=====================================================================
      deleteProduct: async (request, response) => {
        try {
          const { id } = request.params
          const result = await deleteProduct(id)
          return helper.response(response, 201, "Product Deleted", result)
        } catch (error) {
          return helper.response(response, 400, "Bad Request", error)
        }
      }
}
