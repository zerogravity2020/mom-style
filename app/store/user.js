import { makeObservable, observable, computed, action, toJS } from "mobx"
import { Keyboard, Platform } from 'react-native'
import { showMessage } from "react-native-flash-message"
import Constants from 'expo-constants'
import Service from '../services/services'
import Storage from './storage'
import Store from './index'
import * as navigator from '../navigator'

class UserModule {
    @observable orders = []
    @observable isLoadingLogin
    @observable isLoadingRegister
    @observable isLoadingRestore
    @observable isLoadingCustomer
    @observable isPageLoadingCustomer
    @observable isPageLoadingCustomerOrders
    @observable isFormLoginDisabled = true
    @observable isFormRegisterDisabled = true
    @observable user = {
        first_name: "",
        last_name: "",
        email: "",
        billing: {
            first_name: "",
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            country: "",
            email: "",
            phone: ""
        },
        shipping: {
            first_name: "",
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            country: ""
        },
    }
    @observable login = {
        username: 'maraf0ndev',
        password: '123456'
    }
    @observable register = {
        email: '',
        first_name: "",
        last_name: ""
    }
    @observable restore = {
        email: '',
        code: '',
        password: ''
    }
    @observable restoreStep = 'reset-password'
    @observable isRefreshing = false

    constructor() {
        makeObservable(this)
    }

    @computed 
    get restoreData() {
        return this.restore
    }

    @computed 
    get restoreFormStep() {
        return this.restoreStep
    }

    @computed 
    get loadingRestoreForm() {
        return this.isLoadingRestore
    }

    @computed 
    get refreshing() {
        return this.isRefreshing
    }

    @computed 
    get ordersList() {
        return this.orders
    }

    @computed
    get userData() {
        return this.user
    }

    @computed
    get formLogin() {
        return this.login
    }

    @computed
    get formRegister() {
        return this.register
    }

    @computed
    get loadingLoginForm() {
        return this.isLoadingLogin
    }

    @computed
    get loadingCustomerForm() {
        return this.isLoadingCustomer
    }

    @computed
    get loadingRegisterForm() {
        return this.isLoadingRegister
    }

    @computed
    get formRegisterDisabled() {
        return this.isFormRegisterDisabled
    }

    @computed
    get formLoginDisabled() {
        return this.isFormLoginDisabled
    }

    @computed
    get loadingPageCustomer() {
        return this.isPageLoadingCustomer
    }

    @computed
    get loadingPageCustomerOrders() {
        return this.isPageLoadingCustomerOrders
    }

    @action
    resetPassword = async(step) => {
        Keyboard.dismiss()
        this.isLoadingRestore = true
        let data = toJS(this.restore)
        if (step === 'reset-password') {
            await Service.ResetPassword({email: data.email})
                    .then(res => {
                        if (res.status == '200') {
                            this.restoreStep = 'validate-code'
                            showMessage({
                                type: "success",
                                icon: "success",
                                message: "Успіх",
                                description: `На email ${this.restore.email} був відправлений лист с кодом`
                            })
                        }
                    })
                    .catch(e => {
                        showMessage({
                            type: "danger",
                            icon: "danger",
                            message: "Помилка",
                            description: "Не існує користувача з таким email"
                        })
                    })
                    .finally(() => this.isLoadingRestore = false)
        } else if (step === 'validate-code') {
            await Service.ValidateCode({email: data.email, code: data.code})
                    .then(res => {
                        if (res.status == '200') {
                            this.restoreStep = 'set-password'
                        }
                    })
                    .catch(e => {
                        showMessage({
                            type: "danger",
                            icon: "danger",
                            message: "Помилка",
                            description: "Не правильний код"
                        })
                    })
                    .finally(() => this.isLoadingRestore = false)
        } else if (step === 'set-password') {
            await Service.SetPassword(data)
                    .then(res => {
                        if (res.status == '200') {
                            this.restoreStep = 'reset-password'
                            this.restore = {
                                email: '',
                                code: '',
                                password: ''
                            }
                            navigator.navigate('User', {screen: 'SignIn'})
                            showMessage({
                                type: "success",
                                icon: "success",
                                message: "Успіх",
                                description: "Ваш пароль успішно змінено"
                            })
                        }
                    })
                    .catch(e => console.log(e))
                    .finally(() => this.isLoadingRestore = false)
        }
    } 

    @action
    changeInput(type, value, field){
        if (type == 'login') {
            this.login[field] = value
            Object.values(this.login).some(field => field.length == 0 ? this.isFormLoginDisabled = true : this.isFormLoginDisabled = false)
        }
        if (type == 'register') {
            this.register[field] = value
            Object.values(this.register).some(field => field.length == 0 ? this.isFormRegisterDisabled = true : this.isFormRegisterDisabled = false)
        } 
        if (type == 'customer') {
            if (field == 'first_name' || field == 'last_name') {
                this.user[field] = value
                this.user.billing[field] = value
                this.user.shipping[field] = value
            }
            else if (field == 'email') {
                this.user[field] = value
                this.user.billing[field] = value
            } else {
                this.user.billing[field] = value
            }
        }
        if (type == 'restore') {
            this.restore[field] = value
        }
    }

    @action
    signUp = async () => {
        Keyboard.dismiss()
        this.isLoadingRegister = true
        await Service.CreateCustomer(toJS(this.register))
                .then(res => {
                    if (res.data.id.length !== 0) {
                        navigator.navigate('User', {screen: 'SignIn'})
                        showMessage({
                            type: "success",
                            icon: "success",
                            message: "Дякуємо за те, що ви з нами",
                            description: "На ваш email ${res.data.email} був відправлений пароль для авторизації"
                        })
                    }
                })
                .catch(e => {
                    this.isLoadingRegister = false
                    showMessage({
                        type: "danger",
                        icon: "danger",
                        message: "Помилка",
                        description: "Не вірно введені дані"
                    })
                })
                .finally(() => {this.isLoadingRegister = false})
    }

    @action
    signIn = async () => {
        Keyboard.dismiss()
        this.isLoadingLogin = true
        await Service.SetToken(toJS(this.login))
                .then(res => {
                    if (!res.data.success) {
                        showMessage({
                            type: "danger",
                            icon: "danger",
                            message: "Помилка",
                            description: res.data.code
                        })
                    } else {
                        Storage.setItem('profile', {token: res.data.data.token, user_id: res.data.data.id})
                        Service.PushToken({ username: toJS(this.login.username), password: toJS(this.login.password), installation_id: Constants.installationId, name_device: Constants.deviceName, platform: Platform.OS, push_token: Storage.getItem('push-token') }, res.data.data.token)
                        this.loadCustomerOrders(res.data.data.id)
                        this.loadCustomer(res.data.data.id)
                        navigator.navigate('Inside', {screen: 'More'})
                    }
                })
                .finally(() => {this.isLoadingLogin = false})

        await Store.init()
    }

    @action
    loadCustomer = async (id) => {
        this.isPageLoadingCustomer = true
        await Service.Customer(id)
                .then(res => {Store.setProfile(res.data); this.user = res.data})
                .finally(() => {this.isPageLoadingCustomer = false})
    }

    @action
    updateCustomer = async () => {
        Keyboard.dismiss()
        this.isLoadingCustomer = true
        await Service.UpdateCustomer(toJS(this.user.id), toJS(this.user))
                .then(res => {
                    if (res.data.id.length !== 0) {
                        this.user = res.data
                        Store.setProfile(res.data)
                        navigator.navigate('Inside', {screen: 'More'})
                        showMessage({
                            type: "success",
                            icon: "success",
                            message: "Успіх",
                            description: "Ваш профіль успішно оновлено"
                        })
                    }
                })
                .catch(e => {
                    this.isLoadingCustomer = false
                    showMessage({
                        type: "danger",
                        icon: "danger",
                        message: "Помилка",
                        description: 'Не вірно введені дані'
                    })
                })
                .finally(() => {this.isLoadingCustomer = false})
    }

    @action
    loadCustomerOrders = async (id) => {
        this.isPageLoadingCustomerOrders = true
        await Service.CustomerOrders(id)
                .then(res => {this.orders = res.data})
                .finally(() => {this.isPageLoadingCustomerOrders = false})
    }

    @action
    refreshCustomerOrders = async (id) => {
        this.isRefreshing = true
        await Service.CustomerOrders(id)
                .then(res => {this.orders = res.data})
                .finally(() => {this.isRefreshing = false})
    }
}

export default new UserModule