
import WService from '@helpers/WebService'
var wservice = new WService()


export const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
        wservice.signIn(email, password)
            .then((response) => {
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.profile)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}
export const signUp = (profile) => {
    return new Promise((resolve, reject) => {
        wservice.signUp(profile)
            .then((response) => {
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.profile)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}

export const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
        wservice.forgotPassword(email)
            .then((response) => {
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.message)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}


export const getPendingOrders = (profileId) => {
    return new Promise((resolve, reject) => {
        wservice.getPendingOrders(profileId)
            .then((response) => {               
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.pendingOrders)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}
export const updateOrderState = (profileId, orderId, newState) => {
    return new Promise((resolve, reject) => {
        wservice.updateOrderState(profileId, orderId, newState)
            .then((response) => {               
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.updatedOrders)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}

export const getPreviousOrders = (profileId) => {
    return new Promise((resolve, reject) => {
        wservice.getPreviousOrders(profileId)
            .then((response) => {               
                if (response.statusCode === 200 && response.body.status === 'true') {
                    resolve(response.body.previousOrders)
                } else {
                    reject(new Error(response.body.message))
                }
            })
            .catch(reject)
    })
}
