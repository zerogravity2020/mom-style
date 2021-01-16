import { makeObservable, observable, computed, action } from "mobx"
import Service from '../services/services'

class PagesModule {
    @observable list = []
    @observable isLoading
    @observable page = {}
    @observable isModalVisible = false

    constructor() {
        makeObservable(this)
    }

    @computed 
    get pagesList() {
        return this.list
    }

    @computed
    get loading() {
        return this.isLoading
    }

    @computed
    get pageData() {
        return this.page
    }

    @computed
    get modalVisible() {
        return this.isModalVisible
    }

    @action
    loadPages = async () => {
        this.isModalVisible = false
        this.page = {}
        this.isLoading = true
        await Service.Pages('parent=127') //127 app page parent id
                .then(res => this.list = res.data)
                .finally(() => this.isLoading = false)
    }

    @action
    loadPage(id) {
        this.list.forEach(page => {
            if (page.id == id) {
                this.page = page
            }
        })
        this.isModalVisible = true
    }

    @action
    openModal(value) {
        this.isModalVisible = value
    }
}

export default new PagesModule