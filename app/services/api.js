import axios, { AxiosResponse } from 'axios';
import OAuth from 'oauth-1.0a';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

export const config = {
	WC_BASE_URL: 'http://www.mom-style.com.ua',
	WC_API_URL: '/wp-json/wc/v3',
	WC_CONSUMER_KEY: 'ck_4e2624723482ce43c3594b6e87ef16f6e5f5b793',
	WC_CONSUMER_SECRET: 'cs_297127e654253c2c80cc6782a2f7ccec2939802a'
};

const _getOAuth = () => new OAuth({
	consumer: {
		key: config.WC_CONSUMER_KEY,
		secret: config.WC_CONSUMER_SECRET
	},
	signature_method: 'HMAC-SHA1',
	hash_function: (baseString, key) => Base64.stringify(hmacSHA1(baseString, key))
});

const get = async (path) => {
	const request = {
		url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
		method: 'GET'
	};
	const oauth = _getOAuth().authorize(request);
	return axios.get(request.url, { params: oauth });
};

const post = async (path, body) => {
	const request = {
		url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
		method: 'POST'
	};
	const oauth = _getOAuth().authorize(request);
	return axios.post(request.url, body, { params: oauth });
};

export default {
	get,
	post
};