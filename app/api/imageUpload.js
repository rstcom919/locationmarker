
import { Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { ENDPOINT } from './Endpoint'

const options = {
    title: 'Upload a clear picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
const createFormData = (photo, body) => {
    const data = new FormData();
    data.append("fileToUpload", {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};



export const handleImageUpload = (imageName) => {
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker')
                reject(new Error('User cancelled image picker'))
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
                reject(new Error(response.error))
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
                reject(new Error('User tapped custom button: ', response.customButton))
            } else {

                fetch(ENDPOINT + "ImageUpload/do_upload", {
                    method: "POST",
                    body: createFormData(response, { customeImageName: imageName || Math.floor(Date.now() / 1000) })
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response.status === 'true') {
                            resolve(response.imageUrl)
                        } else {
                            reject(new Error(response.message))
                        }                       

                    })
                    .catch(reject);
            }
        })
    })
}



export const mulitfilesUpload = (imageName) => {
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, response => {
            const { uri, fileName, fileSize } = response
            console.log('Response = ', { uri, fileName, fileSize })
            if (response.didCancel) {
                console.log('User cancelled image picker')
                reject(new Error('User cancelled image picker'))
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
                reject(new Error(response.error))
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
                reject(new Error('User tapped custom button: ', response.customButton))
            } else {
                var config = {
                    onUploadProgress: (progressEvent) => {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log("Progress:-" + percentCompleted);
                    }
                };
                const url = ENDPOINT + "ImageUpload/do_upload"
                const data = createFormData(response, { customeImageName: imageName || Math.floor(Date.now() / 1000) })
                axios.post(url, data, config)
                    .then(response => {
                        if (response.data.status === 'true') {
                            resolve(response.data.imageUrl)
                        } else {
                            reject(new Error(response.data.message))
                        }

                    })
                    .catch(reject);
            }
        })
    })
}