import { makeObservable, observable, computed, action } from "mobx"
import { Alert } from 'react-native'
import Storage from './storage'
import Service from '../services/services'
import * as navigator from '../navigator'

class CartModule {
    @observable cart = []
    @observable favorites = []
    @observable revised = []

    constructor() {
        makeObservable(this)
    }

    @computed 
    get cartList() {
        return this.cart.slice().reverse()
    }

    @computed 
    get favoritesList() {
        return this.favorites.slice().reverse()
    }

    @computed 
    get revisedList() {
        return this.revised.slice().reverse()
    }

    @computed 
    get getTotalPrice() {
        return this.cart.reduce((acc, obj) => {return acc + parseInt(obj.price)}, 0)
    }

    @action
    removeItem = (id) => {
        if (id.includes('cart-')) {
            Alert.alert(
                "Видалити товар",
                "Ви дійсно хочете видалити товар з корзини?",
                [
                    {
                        text: 'Ні',
                        style: 'cancel'
                    },
                    { text: 'Так', onPress: () => {Storage.removeItem(id); this.loadItems()} }
                ]
            )
        } else {
            Storage.removeItem(id)
            this.loadItems()
        }
    }

    @action
    setItem = async (key, value) => {
        await Storage.setItem(key, value)
        this.loadItems()
    }

    @action 
    loadItems = async () => {
        this.cart = []
        this.favorites = []
        this.revised = []
        const data = await Storage.getStore()
        for (let key of data.keys()){
            if (key.includes('cart-')) this.cart.push(data.get(key))
            if (key.includes('favorite-')) this.favorites.push(data.get(key))
            if (key.includes('revise-')) this.revised.push(data.get(key))
        }
    }

    @action
    clear() {
        Storage.multiRemoveItems('cart')
        this.loadItems()
        navigator.navigate('Inside', {screen: 'Home'})
    }
}

export default new CartModule