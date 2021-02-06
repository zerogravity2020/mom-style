import React, { Component } from 'react'
import { ScrollView, Text, View, Dimensions } from 'react-native'
import { observer } from "mobx-react"
import HTML from 'react-native-render-html'
import { Modal, SlideAnimation, ModalContent } from 'react-native-modals'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AirbnbRating } from 'react-native-ratings'
import { showMessage } from "react-native-flash-message"
import Ripple from 'react-native-material-ripple'
import Icon from 'react-native-vector-icons/FontAwesome'
import CardModule from '../store/card'
import CartModule from '../store/cart'
import Loader from '../components/Loader'
import Mixin from '../components/Mixin'
import Separator from '../components/Separator'
import Input from '../components/Input'
import Button from '../components/Button'
import ProductCardPreview from '../components/card/preview'
import ProductCardAttributes from '../components/card/attributes'
import Product from '../components/product/index'
import constants from '../constants'
import styles from '../styles/styles'
import Theme from '../theme'
import * as navigator from '../navigator'

let timer
const modal = {
    width: (Dimensions.get('window').width - 30)
}

@observer
class Card extends Component {
    componentDidMount() {
        this.load(this.props.route.params.productId, this.props.route.params.categoryId)
        timer = setTimeout(() => {
            showMessage({
                onPress: () => CardModule.changeVisibleForm(true),
                // autoHide: false,
                type: "info",
                duration: 8000,
                position: "bottom",
                icon: "info",
                message: "Потрібна допомога з вибором розміру?",
                description: "Натисніть на сповіщення та заповніть форму для зв'язку з менеджером"
            })
        }, 20000)
    }

    componentWillUnmount() {
        clearTimeout(timer)
    }

    load(productId, categoryId) {
        CardModule.load(productId, categoryId)
    }

    render() {
        const {card, loading, getCrossSell, getCategoryProducts, isFormVisible, formData, formLoading} = CardModule;
        const {theme} = this.props

        if (loading) {
            return <Loader />
        } else {
            return (
                <>
                    <SafeAreaView style={styles.main}>
                        <ScrollView showsVerticalScrollIndicator={false}
                                    style={theme === 'dark' ? styles.pageDark : styles.page}>
                            {card.featured &&
                                <View style={styles.cardHit}>
                                    <Text style={styles.cardHitText}>ХІТ</Text>
                                </View>
                            }
                            {(card.on_sale) &&
                                <View style={styles.cardSale}>
                                    <Text style={styles.cardSaleText}>SALE</Text>
                                </View>
                            }
                            <ProductCardPreview data={card.images} />
                            <View style={styles.card}>
                                <Text style={[styles.cardCaption, theme === 'dark' ? styles.textColorDark : styles.textColor]}>{card.name}</Text>
                                <Ripple onPress={() => {showMessage({type: "success", icon: "success", message: "Успіх", description: "Товар додано в список улюблених"}); CartModule.setItem(`favorite-${card.id}`, card)}}
                                        style={[styles.cardFavorite]}
                                        rippleColor={constants.palette.main}
                                        rippleCentered={true}>
                                    <Icon name="heart" size={14} color={constants.palette.white} />
                                </Ripple>
                                <View style={styles.cardTop}>
                                    <View>
                                        {card.attributes.length > 0 &&
                                            <ProductCardAttributes data={card.attributes}
                                                                      getAttribute={attribute => CardModule.setAttribute(attribute)} />
                                        }
                                    </View>
                                    <View style={styles.cardTopRow}>
                                        <AirbnbRating
                                            count={5}
                                            size={15}
                                            defaultRating={card.average_rating}
                                            showRating={false}
                                            isDisabled={true}
                                        />
                                    </View>
                                </View>
                                <Separator />
                                <View style={styles.cardBottom}>
                                    {(card.stock_quantity > 0 && card.stock_quantity < 3) ?
                                        <Text style={[styles.cardStatus, {color: constants.palette.red}]}>Закінчується</Text>
                                        :
                                        <Text style={[styles.cardStatus, card.stock_status == 'instock' && {color: constants.palette.green}, card.stock_status == 'outofstock' && {color: constants.palette.gray}]}>{Mixin.getStockStatus(card.stock_status)}</Text>
                                    }
                                    <HTML html={card.price_html.replace('</del>', '</del><br>')}
                                          tagsStyles={{del: styles.cardOldPrice}}
                                          baseFontStyle={theme === 'dark' ? styles.cardPriceDark : styles.cardPrice} />
                                    <HTML html={card.description}
                                          tagsStyles={{p: styles.p, li: styles.li, ul: styles.ul}}
                                          baseFontStyle={theme === 'dark' ? styles.textBaseDark : styles.textBase} />
                                </View>
                            </View>
                            {getCrossSell.length > 0 &&
                                <>
                                    <View style={styles.section}>
                                        <Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Схожі товари</Text>
                                    </View>
                                    <ScrollView showsHorizontalScrollIndicator={false}
                                                horizontal={true}>
                                        <View style={styles.slider}>
                                            {getCrossSell.map(item => 
                                                <Product
                                                    item={item}
                                                    key={`cross-sell-product-${item.id}`}
                                                    onPress={() => {CartModule.setItem(`revise-${item.id}`, item); this.load(item.id, item.categories[0].id)}}
                                                    additionalView={true}
                                                />
                                            )}
                                        </View>
                                    </ScrollView>
                                </>
                            }
                            {getCategoryProducts.length > 0 &&
                                <>
                                    <View style={styles.section}>
                                        <Text style={[styles.title, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Товари категорії</Text>
                                    </View>
                                    <ScrollView showsHorizontalScrollIndicator={false}
                                                horizontal={true}>
                                        <View style={styles.slider}>
                                            {getCategoryProducts.map(item => 
                                                <Product 
                                                    item={item}
                                                    key={`category-product-${item.id}`}
                                                    onPress={() => {CartModule.setItem(`revise-${item.id}`, item); this.load(item.id, item.categories[0].id)}}
                                                    additionalView={true}
                                                />
                                            )}
                                        </View>
                                    </ScrollView>
                                </>
                            }
                        </ScrollView>
                        {card.stock_status !== 'outofstock' &&
                            <View style={[theme === 'dark' ? styles.bottomPageDark : styles.bottomPage]}>
                                <Button caption="Додати в корзину"
                                        disabled={card.selected_attribute == null}
                                        onPress={() => {showMessage({type: "success", icon: "success", message: "Успіх", description: "Товар додано в корзину"}); CartModule.setItem(`cart-${card.id}`, card)}} />
                            </View>
                        }
                    </SafeAreaView>
                    <Modal visible={isFormVisible}
                           onTouchOutside={() => CardModule.changeVisibleForm(false)}
                           modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                           swipeDirection={['down']}
                           onSwipeOut={() => CardModule.changeVisibleForm(false)}
                           modalStyle={[modal, theme === 'dark' ? styles.modalDark : styles.modalLight]}>
                        <ModalContent>
                            <Ripple rippleColor={constants.palette.main}
                                    rippleCentered={true}
                                    onPress={() => CardModule.changeVisibleForm(false)}
                                    style={[styles.headerBtn, styles.modalBtnRight]}>
                                <Icon name="remove" color={constants.palette.gray} size={22} />
                            </Ripple>
                            <Text style={[styles.modalTitle, theme === 'dark' ? styles.textColorDark : styles.textColor]}>Допомога з вибором розміру</Text>
                            <Input placeholder="Імя *"
                                   value={formData.first_name}
                                   onChangeText={value => CardModule.changeInput(value, 'first_name')} />
                            <Input placeholder="Email *"
                                   value={formData.email}
                                   keyboardType="email-address"
                                   onChangeText={value => CardModule.changeInput(value, 'email')} />
                            <Input placeholder="Телефон *"
                                   value={formData.phone}
                                   textContentType="telephoneNumber"
                                   keyboardType="phone-pad"
                                   onChangeText={value => CardModule.changeInput(value, 'phone')}
                                   type="phone" />
                            <View style={styles.modalFilterRow}>
                                <View style={styles.modalFilterCol}>
                                    <Input placeholder="Розмір грудей *"
                                           value={formData.tits}
                                           onChangeText={value => CardModule.changeInput(value, 'tits')} />
                                </View>
                                <View style={styles.modalFilterCol}>
                                    <Input placeholder="Розмір бедер *"
                                           value={formData.thigh}
                                           onChangeText={value => CardModule.changeInput(value, 'thigh')} />  
                                </View>
                            </View>
                            <View style={styles.modalFilterRow}>
                                <View style={styles.modalFilterCol}>
                                    <Input placeholder="Зріст *"
                                           value={formData.height}
                                           onChangeText={value => CardModule.changeInput(value, 'height')} />
                                </View>
                                <View style={styles.modalFilterCol}>
                                    <Input placeholder="Термін вагітності *"
                                           value={formData.term_pregnancy}
                                           onChangeText={value => CardModule.changeInput(value, 'term_pregnancy')} />
                                </View>
                            </View>
                            <Button caption="Відправити"
                                    disabled={formLoading}
                                    loading={formLoading}
                                    customStyle={{marginTop: 10}}
                                    onPress={() => {CardModule.createHelpForm()}} />
                        </ModalContent>
                    </Modal>
                </>
            )
        }
    }
}

export default Theme(Card)