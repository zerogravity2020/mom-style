import { makeObservable, observable, computed, action, toJS } from "mobx"
import { Keyboard } from 'react-native'
import { showMessage } from "react-native-flash-message"
import Service from '../services/services'
import Store from './index'

class ReviewsModule {
    @observable page = 1
    @observable list = []
    @observable isLoading
    @observable form = {
        product_id: '',
        review: '',
        reviewer: '',
        reviewer_email: '',
        rating: 0
    }
    @observable visibleForm = false
    @observable isRefreshing = false
    @observable isFormLoading = false

    constructor() {
        makeObservable(this)
    }

    @computed 
    get items() {
        return this.list
    }

    @computed 
    get formData() {
        return this.form
    }

    @computed 
    get loading() {
        return this.isLoading
    }

    @computed 
    get isFormVisible() {
        return this.visibleForm
    }

    @computed 
    get formLoading() {
        return this.isFormLoading
    }

    @computed 
    get refreshing() {
        return this.isRefreshing
    }

    @action
    load = async(id, page) => {
        if (!Store.isAuth) {
            this.form.reviewer = ''
            this.form.reviewer_email = ''
        } else {
            this.form.reviewer = Store.profileData.billing.first_name
            this.form.reviewer_email = Store.profileData.billing.email
        }
        this.visibleForm = false
        this.page = 1
        this.form.product_id = id
        this.isLoading = true
        await Service.ProductReviews(id, page)
                .then(res => {this.list = res.data})
                .catch(e => console.log(e))
                .finally(() => {this.isLoading = false})
    }

    @action
    onLoadMore = async () => {
        this.page = this.page + 1

        await Service.ProductReviews(this.form.product_id, this.page)
                .then(res => {
                    if (res.config.page === 1) {
                        this.list = res.data
                    } else {
                        this.list = [...this.list, ...res.data]
                    }
                })
    }

    @action
    onRefresh = async() => {
        this.page = 1
        this.isRefreshing = true
        await Service.ProductReviews(this.form.product_id, this.page)
                .then(res => {this.list = res.data})
                .catch(e => console.log(e))
                .finally(() => {this.isRefreshing = false})
    }

    @action
    createReview = async () => {
        Keyboard.dismiss()
        this.isFormLoading = true
        await Service.CreateReview(toJS(this.form))
                .then(res => {
                    this.form.review = ''
                    this.form.rating = 0
                    this.visibleForm = false
                    this.list.unshift(res.data)
                })
                .catch(e => {
                    this.isFormLoading = false
                    showMessage({
                        type: "danger",
                        icon: "danger",
                        message: "Помилка",
                        description: "Не вірно введені дані"
                    })
                })
                .finally(() => {this.isFormLoading = false})
    }

    @action
    changeInput(value, field){
        this.form[field] = value
    }

    @action
    changeVisibleForm(status) {
        this.visibleForm = status
    }
}

export default new ReviewsModule