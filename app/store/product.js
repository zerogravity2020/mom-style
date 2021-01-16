import { makeObservable, observable, computed, action, toJS } from "mobx"
import Service from '../services/services'

class ProductModule {
    @observable products = []
    @observable productsCategory = []
    @observable isLoadingProducts
    @observable isLoadingFeatured
    @observable isLoadingSales
    @observable isLoadingProductsCategory
    @observable query = ''
    @observable filter = {
        min_price: 50,
        max_price: 5000,
        on_sale: null,
        featured: null,
        attribute: null,
        attribute_term: []
    }
    @observable attributes = []

    constructor() {
        makeObservable(this)
    }

    @computed
    get filterData() {
        return this.filter
    }

    @computed
    get filterQuery() {
        return this.query
    }

    @computed
    get attributesList() {
        return this.attributes
    }

    @computed
    get productsList() {
        return this.products
    }

    @computed
    get productsCategoryList() {
        return this.productsCategory
    }

    @computed
    get loadingProductsCategory() {
        return this.isLoadingProductsCategory
    }

    @computed
    get productsLoading() {
        return this.isLoadingProducts
    }

    @computed
    get featuredList() {
        return this.products.filter(product => product.featured === true)
    }

    @computed
    get salesList() {
        return this.products.filter(product => product.on_sale === true)
    }

    @action
    changePrice = (value, type) => {
        if (type == 'range') {
            this.filter.min_price = value[0]
            this.filter.max_price = value[1]
        } else {
            if (value == '') this.filter[type] = 0
            else this.filter[type] = parseInt(value)
        }
        this.setFilter()
    }

    @action
    changeAttribute = (attribute, attribute_term) => {
        this.filter.attribute = attribute
        let attribute_terms = this.filter.attribute_term

        if (attribute_terms.indexOf(attribute_term) === -1) {
            attribute_terms.push(attribute_term)
        }  else {
            for (let i in attribute_terms) {
                if (attribute_terms[i] == attribute_term) attribute_terms.splice(i, 1)
            }
            if (attribute_terms.length == 0) this.filter.attribute = null
        }

        this.setFilter()
    }

    @action
    checkAttribute = (attribute_term) => {
        return this.filter.attribute_term.indexOf(attribute_term) !== -1
    }

    @action
    changeOther = (type) => {
        this.filter[type] == null ? this.filter[type] = true : this.filter[type] = null
        this.setFilter()
    }

    @action
    setFilter() {
        for (var i in this.filter) {
            if (this.filter[i] === null || this.filter[i] === undefined) {
                delete this.filter[i]
            }
        }
        
        this.query = new URLSearchParams(this.filter).toString()
    }

    @action
    resetFilter(query) {
        let empty = {
            min_price: 50,
            max_price: 5000,
            on_sale: null,
            featured: null,
            attribute: null,
            attribute_term: []
        }

        this.filter = Object.assign(this.filter, empty)
        this.setFilter()
    }

    @action
    loadProducts = async () => {
        this.isLoadingProducts = true
        await Service.Products('per_page=50')
                .then(res => {this.products = res.data})
                .finally(() => {this.isLoadingProducts = false})
    }

    @action
    loadProductsCategory = async (params) => {
        this.isLoadingProductsCategory = true
        await Service.Products(`category=${params}`)
                .then(res => {this.productsCategory = res.data})
                .finally(() => {
                    this.isLoadingProductsCategory = false
                    this.query = ''
                })
    }

    @action
    loadAttributes = async () => {
        await Service.ProductAttributes()
                .then(res => {
                    for (let i in res.data) {
                        res.data[i]['options'] = []
                    }
                    this.attributes = res.data
                })

        for (let i in this.attributes) {
            let options = await Service.ProductAttributesTerms(toJS(this.attributes[i].id))
            this.attributes[i]['options'] = options.data
        }
    }
}

export default new ProductModule