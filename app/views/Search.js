import React, { Component } from 'react'
import { FlatList, Text, TextInput, View } from 'react-native'
import { observer } from "mobx-react"
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchModule from '../store/search'
import Loader from '../components/Loader'
import Separator from '../components/Separator'
import Empty from '../components/Empty'
import Field from '../components/search/index'
import Ripple from 'react-native-material-ripple'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

@observer
class Search extends Component {
	componentDidMount() {
    	// SearchModule.load()
    }

	_renderItem = ({item}) => {
		const {theme} = this.props
		return <Field item={item}  />
    }

    _renderEmpty = () => {
    	const {theme} = this.props
    	return <Empty icon="search-minus" caption="Нічого не знайдено" />
    }

    _renderSeparator = () => {
    	return <Separator />
    }

	render() {
		const {items, loading, searchText} = SearchModule
		const {theme} = this.props
		return (
			<View style={theme === 'dark' ? styles.pageDark : styles.page}>
				<View style={styles.search}>
					<Icon name="search" color={constants.palette.gray} size={24} style={styles.searchLoupe} />
					<TextInput style={[styles.searchText, theme === 'dark' ? [styles.textColorDark, styles.searchTextDark] : styles.textColor]}
							   placeholderTextColor={constants.palette.gray}
							   placeholder="Що ви шукаєте?"
							   value={searchText}
							   onChangeText={value => SearchModule.changeInput(value)} />
					<Separator />
					{searchText.length > 0 &&
						<Ripple style={styles.searchClear}
								rippleColor={constants.palette.main}
								rippleCentered={true}
								onPress={() => {SearchModule.changeInput('')}}>
							<Icon name="remove" size={24} color={constants.palette.gray} />
						</Ripple>
					}
				</View>
				{loading && <Loader />}
				{!loading &&
					<FlatList data={items}
							  keyExtractor={(item, index) => `product-${item.id}`}
							  renderItem={this._renderItem}
							  initialNumToRender={20}
							  removeClippedSubviews={true}
							  disableVirtualization={true}
							  ListEmptyComponent={this._renderEmpty}
							  ItemSeparatorComponent={this._renderSeparator} />
				}
			</View>
		)
	}
}

export default Theme(Search)