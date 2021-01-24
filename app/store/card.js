import { makeObservable, observable, computed, action, toJS } from "mobx"
import { Keyboard } from 'react-native'
import { showMessage } from "react-native-flash-message"
import Service from '../services/services'
import Store from './index'

class CardModule {
    @observable item = {
                    attributes: [],
                    variations: [],
                    images: [],
                    attributes: [],
                    featured: null,
                    sku: '',
                    on_sale: null,
                    sale_price: '',
                    price_html: '',
                    average_rating: null,
                    stock_quantity: null,
                    reviews_allowed: null,
                    cross_sell_ids: []
                }
    @observable variations = []
    @observable cross_sell = []
    @observable category_products = []
    @observable isLoading
    @observable activeAttribute
    @observable isModalOpen = false
    @observable currentSlide = {}
    @observable visibleForm = false
    @observable form = {
        first_name: '',
        email: '',
        height: '',
        phone: '',
        tits: '',
        thigh: '',
        term_pregnancy: '',
        product: ''
    }
    @observable isFormLoading = false

    constructor() {
        makeObservable(this)
    }

    @computed
    get card() {
        return this.item
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
    get getAciveAttribute() {
        return this.activeAttribute
    }

    @computed
    get getCrossSell() {
        return this.cross_sell
    }

    @computed
    get modalOpen() {
        return this.isModalOpen
    }

    @computed
    get getCurrentSlide() {
        return this.currentSlide
    }

    @computed
    get getCategoryProducts() {
        return this.category_products.filter(item => item.id !== this.card.id)
    }

    @computed 
    get isFormVisible() {
        return this.visibleForm
    }

    @computed 
    get formLoading() {
        return this.isFormLoading
    }

    @action
    load = async (id, category) => {
        this.visibleForm = false
        this.item = []
        this.activeAttribute = null
        this.cross_sell = []
        this.isLoading = true
        this.currentSlide = {}
        this.isModalOpen = false
        if (!Store.isAuth) {
            this.form.first_name = ''
            this.form.email = ''
            this.form.phone = ''
        } else {
            this.form.first_name = Store.profileData.billing.first_name
            this.form.email = Store.profileData.billing.email
            this.form.phone = Store.profileData.billing.phone
        }

        await Service.Product(id)
                .then(res => {
                    this.item = res.data
                    this.itemvariation_id = null
                    this.itemselected_attribute = null
                    this.currentSlide = res.data.images[0]
                })
                .finally(() => {this.isLoading = false})
                
        if (this.item.variations.length > 0) {
            await Service.ProductVariations(id)
                    .then(res => {this.variations = res.data})
        }

        if (this.item.cross_sell_ids.length > 0) {
            let query = toJS(this.item.cross_sell_ids).join()
            await Service.Products(`include=${query}`)
                    .then(res => this.cross_sell = res.data)
        }

        await Service.Products(`category=${category}`)
                .then(res => {this.category_products = res.data})
    }

    @action
    setAttribute(option) {
        let variations = this.variations
        this.activeAttribute = option
        for (let i in variations){
            for (let x in variations[i].attributes) {
                if (variations[i].attributes[x].option === option) {
                    this.item.variation_id = variations[i].attributes[x].id
                    this.item.selected_attribute = option
                }
            }
        }
    }

    @action
    openModal(value) {
        this.isModalOpen = value
    }

    @action
    changeSlider(index) {
        this.currentSlide = this.item.images[index]
    }

    @action
    changeInput(value, field){
        this.form[field] = value
    }

    @action
    changeVisibleForm(status) {
        this.visibleForm = status
    }

    @action
    createHelpForm = async () => {
        Keyboard.dismiss()
        this.isFormLoading = true
        this.form.product = `${toJS(this.item.name)}-#${toJS(this.item.id)}-відправлено з мобільного додатка`
        const form = new FormData()
        const data = toJS(this.form)
        for (const field in data) {
            form.append(field, data[field])
        }
        await Service.HelpForm(form)
                .then(res => {
                        if (res.data.status === 'validation_failed') {
                            showMessage({
                                type: "danger",
                                icon: "danger",
                                message: "Помилка",
                                description: res.data.message
                            })
                        } else {
                            this.visibleForm = false
                            showMessage({
                                type: "success",
                                icon: "success",
                                position: "center",
                                message: "Успіх",
                                description: res.data.message
                            })
                        }
                    }
                )
                .catch(e => console.log(e))
                .finally(() => this.isFormLoading = false)
    }
}

export default new CardModule