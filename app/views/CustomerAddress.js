import React, { Component } from 'react'
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import { observer } from "mobx-react"
import { SafeAreaView } from 'react-native-safe-area-context'
import Store from '../store/index'
import UserModule from '../store/user'
import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

@observer
class CustomerAddress extends Component {
    componentDidMount() {
        // UserModule.loadCustomer(Store.user)
    }
    
    render() {
        const {userData, loadingCustomerForm, loadingPageCustomer} = UserModule
        const {theme} = this.props
        
        if (loadingPageCustomer) return <Loader />
        else return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "75"}
                                  style={theme === 'dark' ? styles.pageDark : styles.page}
                                  keyboardVerticalOffset={90}>
                <SafeAreaView style={styles.main}>
                    <ScrollView style={styles.content}
                                showsVerticalScrollIndicator={false}>
                        <Input placeholder="Адреса"
                               value={userData.billing.address_1}
                               textContentType="none"
                               onChangeText={value => UserModule.changeInput('customer', value, 'address_1')} />
                        <Input placeholder="Місто"
                               value={userData.billing.city}
                               textContentType="addressCity"
                               onChangeText={value => UserModule.changeInput('customer', value, 'city')} />
                        <Input placeholder="Область"
                               value={userData.billing.state}
                               textContentType="addressState"
                               onChangeText={value => UserModule.changeInput('customer', value, 'state')} />
                    </ScrollView>
                    <View style={theme === 'dark' ? styles.bottomPageDark : styles.bottomPage}>
                        <Button caption="Оновити"
                                disabled={loadingCustomerForm}
                                loading={loadingCustomerForm} 
                                onPress={() => UserModule.updateCustomer()} />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

export default Theme(CustomerAddress)