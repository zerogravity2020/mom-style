import { makeObservable, observable, computed, action } from "mobx"
import Service from '../services/services'

class PostsModule {
    @observable list = []
    @observable isLoading
    @observable post = {}
    @observable isModalVisible = false

    constructor() {
        makeObservable(this)
    }

    @computed 
    get postsList() {
        return this.list
    }

    @computed
    get loading() {
        return this.isLoading
    }

    @computed
    get postData() {
        return this.post
    }

    @computed
    get modalVisible() {
        return this.isModalVisible
    }

    @action
    loadPosts = async () => {
        this.isModalVisible = false
        this.isLoading = true
        await Service.Posts()
                .then(res => this.list = res.data)
                .finally(() => this.isLoading = false)
    }

    @action
    loadPost(id) {
        this.list.forEach(post => {
            if (post.id == id) {
                this.post = post
            }
        })
        this.isModalVisible = true
    }

    @action
    openModal(value) {
        this.isModalVisible = value
    }
}

export default new PostsModule