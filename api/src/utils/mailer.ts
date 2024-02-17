import * as nodemailer from 'nodemailer'
import * as inlineBase64 from 'nodemailer-plugin-inline-base64'
import { config } from "../config"

const mailer = {
    send: (params) => new Promise((resolve, reject) => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
        var options = {
            from: {
                name: params.name || config.mailer.sender,
                address: params.address || config.mailer.address
            },
            to: params.to,
            subject: params.subject,
            html: params.body
        }

        const mailConfig = {
            host: params.host || config.mailer.host,
            port: params.port || config.mailer.port,
            secure: typeof (params.ssl) != undefined ? params.ssl : (process.env.MAILSSL == '1'),
            auth: {
                user: params.user || config.mailer.address,
                pass: params.password || config.mailer.password
            }
        }
        var transporter = nodemailer.createTransport(mailConfig)
        transporter.use('compile', inlineBase64({ cidPrefix: 'img_' }));
        transporter.sendMail(options, function (err, info) {
            transporter.close()
            if (err) {
                console.log(err)
                return reject(err)
            }
            return resolve(info)
        })
    })
}

export default mailer;