
import WService from '@helpers/WebService'
var wservice = new WService()
import NetworkHelper from '@helpers/NetworkHelper'


export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        wservice.getAllProducts()
            .then((response) => {
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.products)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}

export const findOrders = (orderId) => {
    return new Promise((resolve, reject) => {
        wservice.findOrders(orderId)
            .then((response) => {               
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.findOrders)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}



export const createOrder = (profileId, newOrder) => {
    return new Promise((resolve, reject) => {
        wservice.createOrder(profileId, newOrder)
            .then((response) => {
                
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.orderId)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}

export const updateOrder = (orderId, profileId, newOrder) => {
    return new Promise((resolve, reject) => {
        wservice.updateOrder(orderId, profileId, newOrder)
            .then((response) => {                     
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.orderId)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}


export const getGoogleLocation = (zipCode) => {
    return new Promise((resolve, reject) => {
        wservice.getGoogleLocation(zipCode)
            .then((response) => {                     
                if (response.statusCode === 200 && response.body.status === 'OK') {
                    resolve(response.body)
                } else {
                    reject(new Error(response.body))
                }
            })
            .catch(reject)
    })
}

