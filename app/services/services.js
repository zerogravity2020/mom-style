import api from './api'
import axios from 'axios'
import { observer } from "mobx-react"

axios.defaults.baseURL = 'http://www.mom-style.com.ua/wp-json'

class Service {
	// API
	Products(params) {
		return api.get(`/products?${params}`)
	}

	Product(id) {
		return api.get(`/products/${id}`)
	}

	ProductVariations(id) {
		return api.get(`/products/${id}/variations`)
	}

	ProductAttributes() {
		return api.get(`/products/attributes`)
	}

	ProductAttributesTerms(id) {
		return api.get(`/products/attributes/${id}/terms`)
	}

	ProductReviews(id, page = 1) {
		return api.get(`/products/reviews?product=${id}&orderby=date&per_page=50&page=${page}`)
	}

	Categories(per_page = 50) {
		return api.get(`/products/categories?per_page=${per_page}&order=desc`)
	}

	CurrentCurrency() {
		return api.get("/data/currencies/current")
	}

	Country(country = 'ua') {
		return api.get(`/data/countries/${country}`)
	}

	Shipping() {
		return api.get(`/shipping_methods`)
	}

	Billing() {
		return api.get("/payment_gateways")
	}

	CreateCustomer(data) {
		return api.post("/customers", data)
	}

	UpdateCustomer(id, data) {
		return api.post(`/customers/${id}`, data)
	}

	CreateReview(data) {
		return api.post("/products/reviews", data)
	}

	CreateOrder(data) {
		return api.post("/orders", data)
	}

	CustomerOrders(id) {
		return api.get(`/orders?customer=${id}&per_page=50`)
	}

	Customer(id) {
		return api.get(`/customers/${id}`)
	}

	// Other
	Pages(params) {
		return axios.get(`/wp/v2/pages/?${params}`)
	}

	Posts() {
		return axios.get(`/wp/v2/posts/?per_page=50`)
	}

	Post(id) {
		return axios.get(`/wp/v2/posts/${id}`)
	}

	SetToken(data) {
		return axios.post(`/jwt-auth/v1/token`, data)
	}

	TokenValidate(token = null) {
		return axios.post(`/jwt-auth/v1/token/validate`, token, {headers: {'Authorization': token !== null ? `Bearer ${token}` : null}})
	}

	PushToken(data, token) {
		return axios.post('/app/register-user-token', data, {headers: {'Authorization': token !== null ? `Bearer ${token}` : null}})
	}

	ResetPassword(data) {
		return axios.post('/bdpwr/v1/reset-password', data)
	}

	SetPassword(data) {
		return axios.post('/bdpwr/v1/set-password', data)
	}

	ValidateCode(data) {
		return axios.post('/bdpwr/v1/validate-code', data)
	}

	HelpForm(data) {
		return axios.post('/contact-form-7/v1/contact-forms/186/feedback', data)
	}
}

export default new Service