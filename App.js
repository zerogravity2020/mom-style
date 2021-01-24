import React, { PureComponent } from 'react'
import { Text, View, StatusBar, Platform, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import FlashMessage from "react-native-flash-message"
import { ModalPortal } from 'react-native-modals'
import {enableScreens} from 'react-native-screens'
import Constants from 'expo-constants'
import * as SplashScreen from 'expo-splash-screen'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import Ripple from 'react-native-material-ripple'
import * as navigator from './app/navigator'
import { Observer } from "mobx-react"

import Icon from 'react-native-vector-icons/FontAwesome'
import constants from './app/constants'
import styles from './app/styles/styles'
import Store from './app/store/index'
import Storage from './app/store/storage'
import PagesModule from './app/store/pages'
import ProductModule from './app/store/product'
import CategoriesModule from './app/store/categories'
import CartModule from './app/store/cart'
import UserModule from './app/store/user'
// Screens
import Home from './app/views/Home'
import Products from './app/views/Products'
import Catalog from './app/views/Catalog'
import Cart from './app/views/Cart'
import Favorites from './app/views/Favorites'
import Revised from './app/views/Revised'
import More from './app/views/More'
import Search from './app/views/Search'
import Card from './app/views/Card'
import Reviews from './app/views/Reviews'
import Order from './app/views/Order'
import SignIn from './app/views/SignIn'
import SignUp from './app/views/SignUp'
import Blog from './app/views/Blog'
import Customer from './app/views/Customer'
import CustomerOrders from './app/views/CustomerOrders'
import CustomerAddress from './app/views/CustomerAddress'
import Restore from './app/views/Restore'

enableScreens()

const RootStack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

function Stack() {
	return (
		<RootStack.Navigator
				initialRouteName="Inside"
				screenOptions={{
					statusBarStyle: 'light-content',
					headerTintColor: constants.palette.gray,
					headerStyle: {elevation: 0},
					headerRight: () => (
						<>
							<Ripple rippleColor={constants.palette.main}
								rippleCentered={true}
								onPress={() => navigator.navigate('Search')}
								style={styles.headerBtn}>
								<Icon name="search" color={constants.palette.gray} size={22} />
							</Ripple>
							<Ripple rippleColor={constants.palette.main}
								rippleCentered={true}
								onPress={() => navigator.navigate('Cart')}
								style={styles.headerBtn}>
								<Icon name="shopping-cart" color={constants.palette.gray} size={24} />
								{
									<Observer>{() => 
										<View style={[styles.badge, styles.headerBadge]}>
											<Text style={styles.badgeText}>{CartModule.cartList.length}</Text>
										</View>}
									</Observer>
								}
							</Ripple>
						</>
				),
			}}>
			<RootStack.Screen name="Inside" component={Tabs} options={{title: 'Mom_style_ua'}} />
			<RootStack.Screen name="Products" component={Products} options={{title: 'Товари'}} />
			<RootStack.Screen name="Search" component={Search} options={{title: 'Пошук', headerRight: () => {}}} />
			<RootStack.Screen name="Product" component={TopTabs} options={{title: 'Товар'}} />
			<RootStack.Screen name="Order" component={Order} options={{title: 'Замовлення', headerRight: () => {}}} />
			<RootStack.Screen name="User" component={UserTabs} options={{title: 'Авторизація', headerRight: () => {}}} />
			<RootStack.Screen name="Revised" component={Revised} options={{title: 'Переглянуті товари', headerRight: () => {}}} />
			<RootStack.Screen name="Blog" component={Blog} options={{title: 'Блог', headerRight: () => {}}} />
			<RootStack.Screen name="Customer" component={Customer} options={{title: 'Профіль', headerRight: () => {}}} />
			<RootStack.Screen name="CustomerOrders" component={CustomerOrders} options={{title: 'Замовлення', headerRight: () => {}}} />
			<RootStack.Screen name="CustomerAddress" component={CustomerAddress} options={{title: 'Адреса доставки', headerRight: () => {}}} />
			<RootStack.Screen name="Restore" component={Restore} options={{title: 'Відновлення паролю', headerRight: () => {}}} />
		</RootStack.Navigator>
	)
}

const TopTabs = () => {
	return (
		<TopTab.Navigator
			initialRouteName="Card"
			swipeEnabled={false}
			tabBarOptions={{
				activeTintColor: constants.palette.main,
				labelStyle: { fontSize: 14 },
				indicatorStyle: { backgroundColor: constants.palette.main },
			}}
			lazy={true}
		>
			<TopTab.Screen
				name="Card"
				component={Card}
				options={{ tabBarLabel: 'Все про товар' }}
			/>
			<TopTab.Screen
				name="Reviews"
				component={Reviews}
				options={{ tabBarLabel: 'Відгуки' }}
			/>
		</TopTab.Navigator>
	)
}

const UserTabs = () => {
	return (
		<TopTab.Navigator
			initialRouteName="SignIn"
			tabBarOptions={{
				activeTintColor: constants.palette.main,
				labelStyle: { fontSize: 14 },
				indicatorStyle: { backgroundColor: constants.palette.main },
			}}
		>
			<TopTab.Screen
				name="SignIn"
				component={SignIn}
				options={{ tabBarLabel: 'Вхід' }}
			/>
			<TopTab.Screen
				name="SignUp"
				component={SignUp}
				options={{ tabBarLabel: 'Реєстрація' }}
			/>
		</TopTab.Navigator>
	)
}

const Tabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			inactiveColor={constants.palette.gray}
			activeColor={constants.palette.main}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: 'Головна',
					tabBarIcon: ({ color, size }) => (
						<Icon name="home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Catalog"
				component={Catalog}
				options={{
					tabBarLabel: 'Каталог',
					tabBarIcon: ({ color, size }) => (
						<Icon name="th-large" size={24} color={color} />
					),
				}}
			/>
			
			<Tab.Screen
				name="Cart"
				component={Cart}
				options={{
					tabBarLabel: 'Корзина',
					tabBarIcon: ({ color, size }) => (
						<>
							<Icon name="shopping-cart" size={24} color={color} />
							{
								<Observer>{() => 
									<View style={styles.badge}>
										<Text style={styles.badgeText}>{CartModule.cartList.length}</Text>
									</View>}
								</Observer>
							}
						</>
					),
				}}
			/>
			<Tab.Screen
				name="Favorites"
				component={Favorites}
				options={{
					tabBarLabel: 'Улюблені',
					tabBarIcon: ({ color, size }) => (
						<>
							<Icon name="heart" size={22} color={color} />
							{
								<Observer>{() => 
									<View style={styles.badge}>
										<Text style={styles.badgeText}>{CartModule.favoritesList.length}</Text>
									</View>}
								</Observer>
							}
						</>
					),
				}}
			/>
			<Tab.Screen
				name="More"
				component={More}
				options={{
					tabBarLabel: 'Меню',
					tabBarIcon: ({ color, size }) => (
						<Icon name="bars" color={color} size={24} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}

class Navigation extends PureComponent {
	async componentDidMount() {
		try {
			await SplashScreen.preventAutoHideAsync()
		} catch (e) {
			console.log(e)
		}
		this.load()
	}

	load = async() => {
		try {
			this.registerForPushNotificationsAsync()
			await Store.load()
			await PagesModule.loadPages()
			await Store.init()
			await CartModule.loadItems()
			await CategoriesModule.loadCategories()
			await ProductModule.loadProducts()
			await ProductModule.loadAttributes()
			if (Store.isAuth) {
				await UserModule.loadCustomer(Store.user)
			}
		} catch (e) {
			console.log(e)
		} finally {
			await SplashScreen.hideAsync()
		}
	}

	registerForPushNotificationsAsync = async () => {
		let token
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!')
				return
			}
			token = (await Notifications.getExpoPushTokenAsync()).data
			Storage.setItem('push-token', token)
		} else {
			alert('Must use physical device for Push Notifications')
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: constants.palette.main,
			})
		}

		return token
	}

	render() {
		return (
			<NavigationContainer
				ref={navigator.navigationRef}
				onReady={() => {
					navigator.isReadyRef.current = true
				}}
				theme={this.props.theme}>
				<Stack />
			</NavigationContainer>
		)
	}
}

export default React.memo(() => {
    const theme = useColorScheme()
    const palette = {
    	dark: {
    		...DarkTheme,
    		colors: {
    			primary: constants.palette.white,
				background: constants.paletteDark.bg,
				card: constants.paletteDark.bgLight,
				border: constants.paletteDark.gray,
				notification: constants.paletteDark.main,
			},
    	},
    	light: {
    		...DefaultTheme,
    		colors: {
				primary: constants.palette.white,
				background: constants.palette.bg,
				card: constants.palette.bg,
				text: constants.palette.text,
				border: constants.palette.gray,
				notification: constants.palette.main,
			},
    	}
    }
    return (
    	<AppearanceProvider>
    		{/*<StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />*/}
			<Navigation theme={theme === 'dark' ? palette.dark : palette.light} />
			<ModalPortal />
			<FlashMessage
				duration={3000}
			/>
	    </AppearanceProvider>
	)
})