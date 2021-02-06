class Mixin {
    getSalePrice(newPrice, oldPrice) {
        return ((1 - ( newPrice / oldPrice )) * 100).toFixed()
    }

    getStockStatus(item) {
        if (item == 'outofstock') {
            return 'Немає в наявності'
        } else if (item == 'instock') {
            return 'В наявності'
        } else if (item == 'onbackorder') {
            return 'Під замовлення'
        }
    }

    getOrderStatus(item) {
        let status
        switch(item) {
            case 'processing':
                status = 'в обробці'
                break
            case 'on-hold':
                status = 'на утриманні'
                break
            case 'completed':
                status = 'завершений'
                break
            case 'cancelled':
                status = 'відмінений'
                break
            case 'refunded':
                status = 'повернений'
                break
            case 'failed':
                status = 'невдалий'
                break
            case 'trash':
                status = 'видалений'
                break
            default:
                status = 'в очікуванні'
                break
        }

        return status
    }
}

export default new Mixin