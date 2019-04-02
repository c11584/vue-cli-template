import qs from 'qs'
import axios from 'axios'
import _ from 'lodash'
import Config from '@/config'

class Response {

    constructor(res) {
        this.rawData = res
        this.code = res.data.code
        this.message = res.data.message
        this.data = res.data.data
    }

    resolve() {
        if (this.isSuccess()) {
            this.saveTokenFromCookie()
            return Promise.resolve(this.data)
        }
        if (this.needLogin()) {
            if (!window.hasRedirect) {
                window.hasRedirect = true
            }
            return
        }
        return Promise.reject(this.message)
    }

    isSuccess() {
        return this.code === 0
    }

    needLogin() {
        return this.code === 1
    }

    saveTokenFromCookie() {
        let cookie = this.getCookieFromHeader()
        console.debug('Cookie', cookie)
    }

    getCookieFromHeader() {
        console.debug(this.rawData.headers)
        return this.rawData.headers['set-cookie'] || ''
    }
}

class ApiManager {

    constructor(apiPrefix) {
        let config = {
            baseURL: apiPrefix || Config.apiPrefix || '',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                // 'X-Requested-With': 'XMLHttpRequest'
            },
            proxyTable: {
                '/': {
                    changeOrigin: true
                }
            }
        }
        this.$http = axios.create(config)
        this.$http.interceptors.request.use(config => {
            if (!config.params) {
                config.params = {}
            }
            if (!(config.data instanceof FormData)) {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
                config.data = config.data ? qs.stringify(config.data) : ''
            }
            config.params.version = '1.0'
            return config
        })
        this.$http.interceptors.response.use((res) => {
            if (res.status >= 200 && res.status < 300) {
                let response = new Response(res)
                return response.resolve()
            }
            // 由后端API抛出的错误
            return Promise.reject(res)
        }, (error) => {
            console.debug('由网络或服务器抛出的错误')
            // 由网络或服务器抛出的错误
            return Promise.reject(error.message)
        })
    }

    get(uri, params) {
        return this.$http.get(uri, {
            params
        })
    }

    post(uri, data) {
        return this.$http.post(uri, data)
    }

    patch(uri, data) {
        return this.$http.patch(uri, data)
    }

    put(uri, data) {
        return this.$http.put(uri, data)
    }

    delete(uri, params) {
        return this.$http.delete(uri, {
            params
        })
    }

}

let {apiPrefix} = qs.parse(location.search, {
    ignoreQueryPrefix: true
})
apiPrefix = apiPrefix || ''

if (apiPrefix && !_.endsWith(apiPrefix, '/')) {
    apiPrefix += '/'
    // Config.apiPrefix = apiPrefix
}
// Config.apiPrefix = apiPrefix

const apiManager = new ApiManager(apiPrefix)

export default apiManager

export {
    ApiManager
}
