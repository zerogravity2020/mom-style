import { makeObservable, observable, computed, action, toJS } from "mobx"
import Service from '../services/services'
import Storage from './storage'

class Store {
    @observable currency
    @observable country = {}
    @observable profile_id = null
    @observable profile_token = null
    @observable auth_user = false
    @observable token_refresh
    @observable profile = {}
    constructor() {
        makeObservable(this)
    }

    @computed 
    get profileData() {
        return this.profile
    }

    @computed 
    get getMessage() {
        return this.message
    }

    @computed 
    get getCurrency() {
        return this.currency
    }

    @computed 
    get getCountry() {
        return this.country
    }

    @computed 
    get isAuth() {
        return this.auth_user
    }

    @computed 
    get user() {
        return this.profile_id
    }

    @computed 
    get token() {
        return this.profile_token
    }

    @action
    load = async () => {
        await Service.CurrentCurrency()
                .then(res => {this.currency = res.data.symbol})
        await Service.Country()
                .then(res => {this.country = res.data})
    }

    @action 
    init = async () => {
        // Storage.clear()
        await Storage.load()
        const profile = Storage.getItem('profile')

        if (profile === null) clearInterval(this.token_refresh)
        if (profile !== null) {
            this.auth_user = true
            this.profile_id = profile.user_id
            this.profile_token = profile.token
            this.token_refresh = setInterval(() => {
                Service.TokenValidate(profile.token).then(res => {
                    if (!res.data.success) {
                        this.auth_user = false
                        this.profile_id = null
                        this.profile_token = null
                        clearInterval(this.token_refresh)
                    }
                })
            }, 1000)
        
        } else {
            this.auth_user = false
            this.profile_id = null
            this.profile_token = null
        }
    }

    @action
    setProfile(data) {
        this.profile = data
    }

    @action
    logout() {
        Storage.removeItem('profile')
        this.init()
    }
}

export default new Store