import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from "mobx-react"
import UserModule from '../store/user'
import Button from '../components/Button'
import Input from '../components/Input'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'
import * as navigator from '../navigator'

@observer
class SignUp extends Component {
    render() {
        const {formRegister, loadingRegisterForm, formRegisterDisabled} = UserModule
        const {theme} = this.props
        
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "75"}
                                  style={theme === 'dark' ? styles.pageDark : styles.page}
                                  keyboardVerticalOffset={140}>
                <SafeAreaView style={styles.main}>
                    <ScrollView style={styles.content}
                                showsVerticalScrollIndicator={false}>
                        <Input placeholder="Ім'я *"
                               value={formRegister.first_name}
                               textContentType="name"
                               onChangeText={value => UserModule.changeInput('register', value, 'first_name')} />
                        <Input placeholder="Прізвище *"
                               value={formRegister.last_name}
                               textContentType="familyName"
                               onChangeText={value => UserModule.changeInput('register', value, 'last_name')} />
                        <Input placeholder="Email *"
                               value={formRegister.email}
                               textContentType="emailAddress"
                               keyboardType="email-address"
                               onChangeText={value => UserModule.changeInput('register', value, 'email')} />
                    </ScrollView>
                    <View style={theme === 'dark' ? styles.bottomPageDark : styles.bottomPage}>
                        <Button caption="Зареєстуватися"
                                disabled={formRegisterDisabled || loadingRegisterForm}
                                loading={loadingRegisterForm} 
                                onPress={() => UserModule.signUp()} />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

export default Theme(SignUp)