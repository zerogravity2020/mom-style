import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import { observer } from "mobx-react"
import { SafeAreaView } from 'react-native-safe-area-context'
import HTML from 'react-native-render-html'
import Store from '../store/index'
import CartModule from '../store/cart'
import OrderModule from '../store/order'
import Button from '../components/Button'
import Input from '../components/Input'
import Radio from '../components/Radio'
import Product from '../components/product/index'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'
import * as navigator from '../navigator'

@observer
class Order extends Component {
	componentDidMount() {
		OrderModule.load()
		console.log()
	}

	render() {
		const {cartList, getTotalPrice} = CartModule
		const {getCurrency} = Store
		const {billingList, orderList, formDisabled, formLoading} = OrderModule
		const {theme} = this.props

		const billing = billingList.map(method => 
			<Radio 
				title={method.title}
				checked={method.id === orderList.payment_method}
				onPress={title => OrderModule.selectType(title, method.id)}
				key={`method-${method.id}`}
			/>
		)

		return (
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "75"}
								  keyboardVerticalOffset={90}
								  style={theme === 'dark' ? styles.pageDark : styles.page}>
				<SafeAreaView style={styles.main}>
					<ScrollView style={styles.body}
								showsVerticalScrollIndicator={false}>
						{cartList.map((product, index) => 
							<Product 
								item={product}
								key={`cart-product-${product.id}`}
								onPress={() => {CartModule.setItem(`revise-${product.id}`, product); navigator.navigate('Product', {screen: 'Card', params: {productId: product.id, categoryId: product.categories[0].id}})}}
								listView={true}
								orderView={true}
								index={index}
							/>
						)}
						<View style={styles.content}>
							<HTML html={`<p>Кількість товарів: <b>${cartList.length} шт.</b><br>До оплати: <b>${getTotalPrice}${getCurrency}</b></p>`}
							      tagsStyles={{p: styles.p}}
								  baseFontStyle={theme === 'dark' ? styles.textBaseDark : styles.textBase}/>
							<Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Контактні дані</Text>
							<Input placeholder="Ім'я *"
								   value={orderList.billing.first_name}
								   textContentType="name"
								   onChangeText={value => OrderModule.changeField('first_name', value)} />
							<Input placeholder="Прізвище *"
								   value={orderList.billing.last_name}
								   textContentType="familyName"
								   onChangeText={value => OrderModule.changeField('last_name', value)} />
							<Input placeholder="Телефон *"
								   value={orderList.billing.phone}
								   textContentType="telephoneNumber"
								   keyboardType="phone-pad"
								   onChangeText={value => OrderModule.changeField('phone', value)}
								   type="phone" />
							<Input placeholder="Email *"
								   value={orderList.billing.email}
								   textContentType="emailAddress"
								   keyboardType="email-address"
								   onChangeText={value => OrderModule.changeField('email', value)} />
							<Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Дані для доставки</Text>
							<Input placeholder="Адреса *"
								   value={orderList.billing.address_1}
								   textContentType="none"
								   onChangeText={value => OrderModule.changeField('address_1', value)} />
							<Input placeholder="Місто *"
								   value={orderList.billing.city}
								   textContentType="addressCity"
								   onChangeText={value => OrderModule.changeField('city', value)} />
							<Input placeholder="Область *"
								   value={orderList.billing.state}
								   textContentType="addressState"
								   onChangeText={value => OrderModule.changeField('state', value)} />
							<Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Спосіб оплати</Text>
							<View style={[styles.checkboxGroup, theme === 'dark' && styles.checkboxGroupDark]}>
								{billing}
							</View>
						</View>
					</ScrollView>
					<View style={theme === 'dark' ? styles.bottomPageDark : styles.bottomPage}>
						<Button caption="Замовити"
								onPress={() => OrderModule.createOrder(cartList)}
								disabled={formDisabled || formLoading}
								loading={formLoading}/>
					</View>
				</SafeAreaView>
			</KeyboardAvoidingView>
		)
	}
}

export default Theme(Order)
