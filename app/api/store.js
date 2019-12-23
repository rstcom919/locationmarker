import WService from '@helpers/WebService'
var wservice = new WService()
import NetworkHelper from '@helpers/NetworkHelper'

export const getCostcoLocations = () => {
    return new Promise((resolve, reject) => {
        wservice.getCostcoLocations()
            .then((response) => {
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.availableStores)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}


export const getDeliveryAgreements = () => {
    return new Promise((resolve, reject) => {
        wservice.getDeliveryAgreements()
            .then((response) => {
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.deliveryAgreements)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}

export const getDeliveryInitData = () => {
    return new Promise((resolve, reject) => {
        wservice.getDeliveryInitData()
            .then((response) => {
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.data)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}