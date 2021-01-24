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
class Customer extends Component {
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
						<Input placeholder="Ім'я"
							   value={userData.first_name}
							   textContentType="name"
							   onChangeText={value => UserModule.changeInput('customer', value, 'first_name')} />
						<Input placeholder="Прізвище"
							   value={userData.last_name}
							   textContentType="familyName"
							   onChangeText={value => UserModule.changeInput('customer', value, 'last_name')} />
						<Input placeholder="Email"
							   value={userData.email}
							   textContentType="emailAddress"
							   keyboardType="email-address"
							   onChangeText={value => UserModule.changeInput('customer', value, 'email')} />
						<Input placeholder="Телефон"
							   value={userData.billing.phone}
							   textContentType="telephoneNumber"
							   keyboardType="phone-pad"
							   onChangeText={value => UserModule.changeInput('customer', value, 'phone')}
							   type="phone" />
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

export default Theme(Customer)