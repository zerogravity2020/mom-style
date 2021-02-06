import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { observer } from "mobx-react"
import Ripple from 'react-native-material-ripple'
import Storage from '../store/storage'
import Loader from '../components/Loader'
import CartModule from '../store/cart'
import CategoriesModule from '../store/categories'
import ProductModule from '../store/product'
import MainSlider from '../components/home/main'
import Product from '../components/product/index'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'
import * as navigator from '../navigator'

@observer
class Home extends Component {
    componentDidMount() {
        // CategoriesModule.loadCategories()
        // ProductModule.loadProducts()
        // ProductModule.loadFeatured()
        // ProductModule.loadSales()
    }

    render() {
        const {categoriesList, categoriesLoading} = CategoriesModule
        const {productsList, productsLoading, featuredList, featuredLoading, salesList, salesLoading} = ProductModule
        const {theme} = this.props

        const products = productsList.map(product => 
            <Product 
                item={product}
                key={`product-${product.id}`}
                onPress={() => {CartModule.setItem(`revise-${product.id}`, product); navigator.navigate('Product', {screen: 'Card', params: {productId: product.id, categoryId: product.categories[0].id}})}}
                additionalView={true}
            />
        )

        const featured = featuredList.map(product => 
            <Product 
                item={product}
                key={`product-featured-${product.id}`}
                onPress={() => {CartModule.setItem(`revise-${product.id}`, product); navigator.navigate('Product', {screen: 'Card', params: {productId: product.id, categoryId: product.categories[0].id}})}}
                additionalView={true}
            />
        )

        const sales = salesList.map(product => 
            <Product 
                item={product}
                key={`product-sales-${product.id}`}
                onPress={() => {CartModule.setItem(`revise-${product.id}`, product); navigator.navigate('Product', {screen: 'Card', params: {productId: product.id, categoryId: product.categories[0].id}})}}
                additionalView={true}
            />
        )

        if (categoriesLoading) return <Loader />
        else return (
            <ScrollView showsVerticalScrollIndicator={false}
                        style={theme === 'dark' ? styles.pageDark : styles.page}>
                <MainSlider data={categoriesList} />
                <View style={styles.section}>
                    <Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Новинки</Text>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                    <View style={styles.slider}>
                        {products}
                    </View>
                </ScrollView>
                <View style={styles.section}>
                    <Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Акційні товари</Text>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                    <View style={styles.slider}>
                        {sales}
                    </View>
                </ScrollView>
                <View style={styles.section}>
                    <Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Топ продажів</Text>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}
                            horizontal={true}>
                    <View style={styles.slider}>
                        {featured}
                    </View>
                </ScrollView>
            </ScrollView>
        )
    }
}

export default Theme(Home)