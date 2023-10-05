import fs from "fs";

class ProductManager {
  constructor(path) {
      this.path = path
  }
  async getProducts(queryObj) {
    const {limit}= queryObj;
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, 'utf-8')
        const productData = JSON.parse(productsFile)
        return limit ? productData.slice(0, +limit) : productData;
      } else {
        return []
      }}
    catch(error){
      return error
    }}
  async addProduct (product){
    try {
      let {title, description, price, thumbnail, code, stock, status, category} = product
        if (!title || !description || !price || !thumbnail || !stock || !code || !status || !category) {
            console.log("Complete all the fields")
            return
        }
    let products = await this.getProducts({})
    const id = !products.length ? 1 : products[products.length - 1].id + 1;
    const codeSearched = products.some(p => p.code === code);

    codeSearched ? console.log("code already registred") : null;
    const newProduct = {id, ...product}
    products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
    console.log('product successfully added')
          }
    catch (error) {
          console.log(error)
          return error
      }}
    async getProductById(id) {
        try {
            const product = await this.getProducts({})
            const productfind = product.find(p=>p.id===id)
            if(!productfind){
                return 'The product was not found'
            } else {
                return productfind
            }
        } catch (error) {
            return error
        }
      }
      async deleteProductById(id) {
        try {
            const product = await this.getProducts({})
            const newArrayId = product.find(p=>p.id!==id)
            let message = ''
            if (!newArrayId){
              console.log(`The product with the id ${id} doesnt exist`)
            }else{
              const newArrayProducts = product.filter(p=> p.id !== id)
            await fs.promises.writeFile(this.path,JSON.stringify(newArrayProducts))
            console.log(`The product with  the ${id} was succesfully eliminated`);}
        } catch (error) {
            return error
        }
      }
      async updateProduct(id, update) {
        try { 
          const products = await this.getProducts({})
          const prodIndex = products.findIndex(p=> p.id == id)
          if (prodIndex !== -1) {
            for (const key in update) {
            if (key == "code" && products[prodIndex].code !== update.code) {                        
              const isCodeAlreadyAdded = products.some((prod)=> prod.code === update.code)
              if (isCodeAlreadyAdded) {
                console.log("Product already exist")
                return
            }                        
        }
        if (products[prodIndex].hasOwnProperty(key)){
          products[prodIndex][key] = update[key]
        }else{
          console.log('The property that you re trying to change doesnt exist in the DB')
          return
      }                                            
  }
  await fs.promises.writeFile(this.path, JSON.stringify(products))
  console.log(`The product with the ID ${id} was upgrade`) 
    }else {
    console.log(`The product with the ${id} doesnt exist`)
}}
catch (error) {
    return error
}
}}

export const manager= new ProductManager("products.json");