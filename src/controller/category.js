const {getAllCategory, getCategoryById, postCategory,patchCategory,deleteCategory} = require('../model/category');
const helper = require('../helper/index');


module.exports = {
    getAllCategory: async (request, response)=> {
        try{
            const result = await getAllCategory();
            return helper.response(response,200, "Success Get Category", result)
        } catch(error){
            return helper.response(response, 400, "Bad Request!", error)
        }
    },
    getCategoryById: async(request, response)=>{
        try{
            // const id = request.params.id
            const {id} = request.params
            const result = await getCategoryById(id) //(id) dilempar ke model 
            if(result.length>0){
                return helper.response(response, 200, "Success Get Category By ID",
                result)
            } else {
                return helper.response(response, 404, `Category by ID : ${id} Not Found`)
            }
            // console.log(result);
        } catch (error){
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    postCategory: async (request, response)=>{
        try{
            const {category_status}= request.body;
            const setData = {
                category_created_at : new Date(),
                category_status 
            }
            const result = await postCategory(setData);
            return helper.response(response, 201, "Category Created", result)
        }catch(error){
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    patchCategory: async (request, response) => {
        try {
          const {id} = request.params
          const {category_status} = request.body
          const setData = {
            category_updated_at: new Date(),
            category_status
          }
          const checkId = await getCategoryById(id)
          if (checkId.length > 0) {
            const result = await patchCategory(setData, id)
            return helper.response(response, 201, "Category Updated", result)
          } else {
            return helper.response(response, 404, `Category By Id : ${id} Not Found`)
          }
        } catch (error) {
          return helper.response(response, 400, "Bad Request", error)
        }
      },
      deleteCategory: async (request, response) => {
        try {
          const { id } = request.params
          const result = await deleteCategory(id)
          return helper.response(response, 201, "category Deleted", result)
        } catch (error) {
          return helper.response(response, 400, "Bad Request", error)
        }
      }
}