//LOGIC untuk aplikasi backend
const {getProduct,getWithOutSort,getProductById,getProductByName,postProduct,patchProduct,deleteProduct,getProductCount} = require('../model/product')
const helper = require('../helper/index')
const qs = require('querystring')
// const { response } = require('express')

const getPrevLink = (page, currentQuery)=>{
 if(page > 1){
  const generatedPage = {
    page:page - 1
  }
  const resultPrevLink = {...currentQuery, ...generatedPage}
  return qs.stringify(resultPrevLink)
} else{
   return null
 }
}
const getNextLink = (page, totalPage, currentQuery)=> {
  if (page < totalPage){
    const generatedPage = {
      page:page +1 
    }
  const resultNextLink = {...currentQuery, ...generatedPage}
  return qs.stringify(resultNextLink)
  } else{
    return null
  }
}

module.exports = {
    getAllProduct: async(request, response)=>{ 
          let {sort, limit, page, ascdsc} = request.query
          page = parseInt(page)
          limit = parseInt(limit)
          let totalData = await getProductCount()
          let totalPage = Math.ceil(totalData/limit)
          let offset = page * limit - limit;
          let prevLink= getPrevLink(page, request.query)
          let nextLink= getNextLink(page, totalPage,request.query)
          const pageInfo = {
            page,
            totalPage,
            limit,
            totalData,
            prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
            nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`
          }

          const withOutSort = await getWithOutSort(limit, offset)
        try {
          if (typeof sort === 'undefined'){
            return helper.response(response, 200, "Success Get Product", withOutSort)
          }else {
            const result = await getProduct(sort, limit, offset, ascdsc);
            return helper.response(response, 200, `Success Get Product with sort by ${sort}`, result, pageInfo)
          }             
        } catch (error){
            return helper.response(response, 400, "Bad Request!", error)
        }
    },
    getProductById: async(request, response)=>{
        try{
            const {id} = request.query
            const result = await getProductById(id) 
            if(result.length>0){
                return helper.response(response, 200, `Success Get Product By ID: ${id}`,
                result)
            } else {
                return helper.response(response, 404, `Product by ID : ${id} Not Found`)
            }
        } catch (error){
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    getProductByName : async(request, response)=>{
      try{ 
        const {name, limit} = request.query
        const result = await getProductByName(name, limit)
        console.log(name)
        console.log(limit)
        // if(result.length>0){
          return helper.response(response, 200, `Success Get Product By Name: ${name}`,result)
        // }else {
        //   return helper.response(response, 404, `Product By Name: ${name} not found`)
        // }     
      } catch(error){
        return helper.response(response, 400, "Bad Request", error)
      }
    },
    postProduct: async (request, response)=>{
        try{
            const {product_name, product_price, product_status,category_id}
            = request.body;
            const setData = {
                //kiri mysql kanan postman
                product_name, //:product_name
                product_price, //:product_price
                product_created_at : new Date(),
                product_status, //:product_status
                category_id
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
          const { product_name, product_price, product_status,category_id} = request.body
          const setData = {
            product_name,  
            product_price,
            product_updated_at: new Date(),
            product_status,
            category_id
          }
          const checkId = await getProductById(id)
          if (checkId.length > 0) {
            const result = await patchProduct(setData, id)
            return helper.response(response, 201, "Product Updated", result) //ingin menampilkan apa?
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
          const cekId = await getProductById(id)
          if(cekId.length > 0){
            const result = await deleteProduct(id)
            return helper.response(response, 201, "Product Deleted", result)
          } else {
            return helper.response(response, 404, `Data By Id: ${id} unknown / has been deleted`)
          }
        } catch (error) {
          return helper.response(response, 400, "Bad Request", error)
        }
      }
}
