import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { observer, Observer } from "mobx-react"
import moment from 'moment/min/moment-with-locales'
import Icon from 'react-native-vector-icons/MaterialIcons'
import HTML from 'react-native-render-html'
import Ripple from 'react-native-material-ripple'
import Empty from '../components/Empty'
import Store from '../store/index'
import UserModule from '../store/user'
import Loader from '../components/Loader'
import Mixin from '../components/Mixin'
import styles from '../styles/styles'
import constants from '../constants'
import Theme from '../theme'

@observer
class CustomerOrders extends Component {
    componentDidMount() {
        moment.locale('uk')
        UserModule.loadCustomerOrders(Store.user)
    }

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            expanded: false
        }
    }

    showMore = (id, value) => {
        this.setState({id: id, expanded: value})
    }

    _renderItem = ({item, index}) => {
        const {id, expanded} = this.state
        const {getCurrency} = Store
        const {theme} = this.props

        return (
            <Observer>{() => 
                <Ripple style={[styles.order, index == 0 && styles.first, theme === 'dark' && styles.orderDark]}
                        onPress={() => this.showMore(item.id, !expanded)}
                        rippleColor={constants.palette.main}>
                    <View style={styles.orderRow}>
                        <Text style={[styles.orderText, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Замовлення: <Text style={styles.orderTextBold}>#{item.id}</Text></Text>
                        <Text style={[styles.orderDate, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{moment(item.date_created).format('L')}</Text>
                    </View>
                    <View style={styles.orderRow}>
                        <HTML html={`Сумма: <b>${item.total} ${getCurrency}</b`} 
                              baseFontStyle={theme === 'dark' ? styles.textBaseDark : styles.textBase}/>
                        <Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>{Mixin.getOrderStatus(item.status)}</Text>
                    </View>
                    <View style={styles.orderMore}>
                        <Text style={styles.orderMoreText}>Детальніше</Text>
                        <Icon name="expand-more" size={20} color={constants.palette.gray} style={(expanded && id === item.id) && {transform: [{ rotate: '180deg'}]}} />
                    </View>
                    {(expanded && id === item.id) &&
                        <View>
                            {item.line_items.map(product =>
                                <View style={[styles.orderBlock, theme === 'dark' && styles.orderBlockDark]} key={`product-${product.id}`}>
                                    <Text style={[styles.orderText, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{product.name}</Text>
                                    <HTML html={`<p>Кількість: <b>${product.quantity} шт.</b><br>Ціна: <b>${product.total} ${getCurrency}</b></p>`}
                                          baseFontStyle={theme === 'dark' ? styles.textColorDark : styles.textColor} />
                                </View>
                            )}
                            <View style={styles.orderContainer}>
                                <Text style={[styles.orderText, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Спосіб оплати</Text>
                                <View style={[styles.orderBlock, theme === 'dark' && styles.orderBlockDark]}>
                                    <Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>{item.payment_method_title}</Text>
                                </View>
                            </View>
                            <View style={styles.orderContainer}>
                                <Text style={[styles.orderText, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Доставка за адресою</Text>
                                <View style={[styles.orderBlock, theme === 'dark' && styles.orderBlockDark]}>
                                    {item.shipping.address_1.length > 0 && <Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>Адреса: {item.shipping.address_1}</Text>}
                                    {item.shipping.city.length> 0 && <Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>Міcто: {item.shipping.city}</Text>}
                                    {item.shipping.state.length > 0 && <Text style={theme === 'dark' ? styles.textColorDark : styles.textColor}>Область: {item.shipping.state}</Text>}
                                </View>
                            </View>
                        </View>
                    }
                </Ripple>
            }</Observer>
        )
        
    }

    _renderEmpty = () => {
        return <Empty icon="list" caption="Замовлень ще немає" />
    }

    render() {
        const {ordersList, loadingPageCustomerOrders, refreshing} = UserModule
        const {theme} = this.props

        if (loadingPageCustomerOrders) return <Loader />
        else return (
            <View style={theme === 'dark' ? styles.pageDark : styles.page}>
                <FlatList data={ordersList}
                          keyExtractor={(item, index) => `order-${item.id}`}
                          renderItem={this._renderItem}
                          ListEmptyComponent={this._renderEmpty}
                          initialNumToRender={10}
                          onRefresh={() => UserModule.refreshCustomerOrders(Store.user)}
                          refreshing={refreshing}
                          removeClippedSubviews={false}
                          showsVerticalScrollIndicator={false} />
            </View>
        )
    }
}

export default Theme(CustomerOrders)