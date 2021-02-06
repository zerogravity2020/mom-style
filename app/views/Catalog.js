import React, { Component } from 'react'
import { FlatList, View} from 'react-native'
import { observer } from "mobx-react"
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoriesModule from '../store/categories'
import Loader from '../components/Loader'
import Category from '../components/category/index'
import styles from '../styles/styles'
import Theme from '../theme'

@observer
class Catalog extends Component {
    _renderItem = ({item, index}) => {
        return <Category item={item} index={index} />
    }

    render() {
        const {categoriesList} = CategoriesModule
        const {theme} = this.props

        return (
            <View style={theme === 'dark' ? styles.pageDark : styles.page}>
                <FlatList data={categoriesList}
                          keyExtractor={(item, index) => `category-${item.id}`}
                          renderItem={this._renderItem}
                          removeClippedSubviews={true}
                          disableVirtualization={true}
                          showsVerticalScrollIndicator={false} />
            </View>
        )
    }
}

export default Theme(Catalog)