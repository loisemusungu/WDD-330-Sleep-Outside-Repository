export default class ProductList {
    constructor(category, dataSource, listElement) {
    // I passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.products = [];
    }
  
    async init() {
        // the dataSource will return a Promise, so we need to use await here
      this.products = await this.dataSource.getData();
    }
  }
  