import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { observer } from "mobx-react"
import CartModule from '../store/cart'
import Empty from '../components/Empty'
import Product from '../components/product/index'
import styles from '../styles/styles'
import * as navigator from '../navigator'
import Theme from '../theme'

@observer
class Revised extends Component {
	componentDidMount() {
		// CartModule.loadItems()
	}
	
	_renderItem = ({item, index}) => {
		return <Product 
					item={item}
					index={index}
					onPress={() => {CartModule.setItem(`revise-${item.id}`, item); navigator.navigate('Product', {screen: 'Card', params: {productId: item.id, categoryId: item.categories[0].id}})}}
			   />
    }

    _renderEmpty = () => {
    	return <Empty icon="eye" caption="Ви ще нічого не переглянули" />
    }

    render() {
		const {revisedList} = CartModule
		const {theme} = this.props

		return (
			<View style={theme === 'dark' ? styles.pageDark : styles.page}>
				<FlatList data={revisedList}
						  keyExtractor={(item, index) => `revised-product-${item.id}`}
						  renderItem={this._renderItem}
						  ListEmptyComponent={this._renderEmpty}
						  numColumns={2}
			              initialNumToRender={6}
						  removeClippedSubviews={true}
						  disableVirtualization={true}
						  showsVerticalScrollIndicator={false} />
			</View>
		)
	}
}

export default Theme(Revised)