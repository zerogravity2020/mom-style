import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html'
import * as navigator from '../navigator'
import Store from '../store/index'
import CartModule from '../store/cart'
import Empty from '../components/Empty'
import Button from '../components/Button'
import Product from '../components/product/index'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

@observer
class Cart extends Component {
	componentDidMount() {
		// CartModule.loadItems()
	}

	_renderItem = ({item, index}) => {
		const {theme} = this.props
		
		return <Product 
					item={item}
					onPress={() => {CartModule.setItem(`revise-${item.id}`, item); navigator.navigate('Product', {screen: 'Card', params: {productId: item.id, categoryId: item.categories[0].id}})}}
					listView={true}
					cartView={true}
					index={index}
			   />
    }

    _renderEmpty = () => {
    	const {theme} = this.props
    	return <Empty icon="opencart" caption="Товарів ще немає" />
    }

    render() {
		const {cartList, getTotalPrice} = CartModule
		const {getCurrency} = Store

		const {theme} = this.props

		return (
			<View style={theme === 'dark' ? styles.pageDark : styles.page}>
				<FlatList data={cartList}
						  keyExtractor={(item, index) => `cart-product-${item.id}`}
						  renderItem={this._renderItem}
						  ListEmptyComponent={this._renderEmpty}
						  initialNumToRender={6}
						  removeClippedSubviews={true}
						  disableVirtualization={true}
						  showsVerticalScrollIndicator={false} />
				{cartList.length > 0 &&
					<View style={theme === 'dark' ? styles.bottomPageDark : styles.bottomPage}>
						<HTML html={`<p>Кількість товарів: <b>${cartList.length} шт.</b><br>До оплати: <b>${getTotalPrice}${getCurrency}</b></p>`} 
							  tagsStyles={{p: styles.p}}
							  baseFontStyle={theme === 'dark' ? styles.textBaseDark : styles.textBase}/>
						<Button caption="Оформити замовлення" onPress={() => navigator.navigate('Order')} />
					</View>
				}
			</View>
		)
	}
}

export default Theme(Cart)
