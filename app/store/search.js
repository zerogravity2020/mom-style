import { makeObservable, observable, computed, action } from "mobx"
import Service from '../services/services'

class SearchModule {
    @observable list = []
    @observable isLoading
    @observable searchInput = ''

    constructor() {
        makeObservable(this)
    }

    @computed 
    get items() {
        return this.list
    }

    @computed 
    get loading() {
        return this.isLoading
    }

    @computed 
    get searchText() {
        return this.searchInput
    }

    @action
    load = async (search) => {
        this.isLoading = true
        await Service.Products(`search=${search}`)
                .then(res => this.list = res.data)
                .finally(() => this.isLoading = false)
    }

    @action
    changeInput(search) {
        this.searchInput = search;
        this.load(search)
    }
}

export default new SearchModule