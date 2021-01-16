import { makeObservable, observable, computed, action } from "mobx"
import Service from '../services/services'

class CategoriesModule {
    @observable list = []
    @observable isLoading

    constructor() {
        makeObservable(this)
    }

    @computed 
    get categoriesList() {
        return this.list
    }

    @computed
    get categoriesLoading() {
        return this.isLoading
    }

    @action
    loadCategories = async () => {
        this.isLoading = true
        await Service.Categories()
                .then(res => this.list = res.data)
                .finally(() => this.isLoading = false)
    }
}

export default new CategoriesModule