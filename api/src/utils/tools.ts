import * as fs from 'fs'



const tools = {
    saveImage: (path, decodedImage) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, decodedImage, (err) => { // Write the image data to disk
                if (err) {
                    console.error('Error saving image to disk', err);
                    return reject('Error saving image to disk')
                } else {
                    return resolve('Image saved!')
                }
            })
        })
    },
    calcProductPrice: (price, usersAmount, period) => {
        return price + (usersAmount * 20) + (period * 8.5)
    }
}

export default tools;