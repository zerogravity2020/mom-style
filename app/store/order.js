import { makeObservable, observable, computed, action, toJS } from "mobx"
import { Keyboard } from 'react-native'
import { showMessage } from "react-native-flash-message"
import Service from '../services/services'
import CartModule from './cart'
import Store from './index'

class OrderModule {
    @observable list = []
    @observable isLoadingOrder
    @observable billing = []
    @observable order = {
                    payment_method: '',
                    payment_method_title: '',
                    set_paid: false,
                    billing: {
                        first_name: '',
                        last_name: '',
                        address_1: '',
                        address_2: '',
                        city: '',
                        state: '',
                        country: '',
                        email: '',
                        phone: ''
                    },
                    shipping: {
                        first_name: '',
                        last_name: '',
                        address_1: '',
                        address_2: '',
                        city: '',
                        state: '',
                        country: ''
                    },
                    line_items: [],
                }
    @observable isFormLoading
    @observable isformDisabled = true

    constructor() {
        makeObservable(this)
    }

    @computed 
    get items() {
        return this.list
    }

    @computed 
    get billingList() {
        return this.billing.filter(method => method.enabled === true)
    }

    @computed
    get loadingOrder() {
        return this.isLoading
    }

    @computed 
    get orderList() {
        return this.order
    }

    @computed
    get formLoading() {
        return this.isFormLoading
    }

    @computed
    get formDisabled() {
        return this.isformDisabled
    }

    @action
    load = async () => {
        this.isLoadingOrder = true
        if (!Store.isAuth) {
            this.order.billing = {
                first_name: '',
                last_name: '',
                address_1: '',
                city: '',
                state: '',
                country: '',
                email: '',
                phone: ''
            }
            this.order.shipping = {
                first_name: '',
                last_name: '',
                address_1: '',
                city: '',
                state: '',
                country: ''
            }
        } else {
            this.order.billing = Store.profileData.billing
            this.order.shipping = Store.profileData.shipping
            this.isformDisabled = false
        }

        await Service.Billing()
                .then(res => this.billing = res.data)
                .finally(() => this.isLoadingOrder = false)
        await Service.Country()
                .then(res => this.order.billing.country = this.order.shipping.country = res.data.code)
    }

    @action
    createOrder = async (data) => {
        Keyboard.dismiss()
        this.order.line_items = []
        this.isFormLoading = true
        data.map(item => {
            if (typeof item.variation_id === 'undefined') this.order.line_items.push({product_id: item.id, quantity: 1})
            else this.order.line_items.push({product_id: item.id, quantity: 1, variation_id: item.variation_id})
        })
        await Service.CreateOrder(toJS(this.order))
                .then(res => {
                    if (res.data.id.length !== 0) {
                        CartModule.clear()
                        showMessage({
                            type: "success",
                            icon: "success",
                            position: "center",
                            message: "Дякуємо, що обрали нас",
                            description: "Очікуйте на дзвінок від нашого менеджера"
                        })
                    }
                })
                .catch(e => {
                    this.isFormLoading = false
                    showMessage({
                        type: "danger",
                        icon: "danger",
                        message: "Помилка",
                        description: 'Не вірно введені дані'
                    })
                })
                .finally(() => {
                    this.isFormLoading = false
                })
        
    }

    @action
    changeField = (field, value) => {
        if (field == 'phone' || field == 'email') {
            this.order.billing[field] = value
        } else {
            this.order.billing[field] = value
            this.order.shipping[field] = value
        }
        
        this.checkField()
    }

    @action
    selectType = (title, id) => {
        this.order.payment_method = id
        this.order.payment_method_title = title
        // this.checkField()
    }

    @action
    checkField() {
        Object.values(this.order.billing).some(field => field.length == 0 ? this.isformDisabled = true : this.isformDisabled = false)
    }
}

export default new OrderModule