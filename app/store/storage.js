import { AsyncStorage } from 'react-native'
const storage = new Map

class Storage {
    static prefix = 'mom@'

    setKey = (key) => Storage.prefix + key

    setItem = async (key, data) => {
        storage.set(key, data)
        try {
            await AsyncStorage.setItem(this.setKey(key), JSON.stringify(data))
        } catch(error) {
            console.log(error)
        }
    }

    getItem = (key) => {
        if (storage.has(key)) {
            return storage.get(key)
        }

        return null
    }

    removeItem = async (key) => {
        storage.delete(key)
        try {
            await AsyncStorage.removeItem(this.setKey(key))
        } catch(error) {
            console.log(error)
        }
    }

    multiRemoveItems = (prefix) => {
        for (let key of storage.keys()) {
            if (key.includes(prefix)) {
                this.removeItem(key)
            }
        }
    }

    load = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()

            const keysValues = await AsyncStorage.multiGet(keys.filter((key) => key.indexOf(Storage.prefix) > -1))

            keysValues.forEach(([key, value]) => {
                const storageKey = key.replace(Storage.prefix, '')
                storage.set(storageKey, JSON.parse(value))
            })
        } catch (e) {
            console.log(e)
        }
    }

    getStore = () => {
        return storage
    }

    clear() {
        const storageKeys = Array.from(storage.keys())
            .map((key) => this.setKey(key))
        if (storageKeys.length) {
            AsyncStorage.multiRemove(storageKeys)
            storage.clear()
        }
        
    }
}

export default new Storage