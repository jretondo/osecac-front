import axios from 'axios'
import UrlNodeServer from '../../../api/NodeServer'
import FileSaver from 'file-saver'

export const DescargarPDF = async (desde, hasta) => {

    let error = false
    if (desde === "") {
        error = true
    } else {
        if (!hasta === "") {
            error = true
        }
    }

    if (error) {
        return {
            status: 500,
            result: ""
        }
    } else {
        return new Promise((resolve, reject) => {
            axios.get(UrlNodeServer.extractosDir.sub.download + `?desde=${desde}&hasta=${hasta}`, {
                responseType: 'arraybuffer',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                    Accept: 'application/pdf',
                }
            })
                .then(res => {
                    FileSaver.saveAs(
                        new Blob([res.data], { type: 'application/pdf' })
                    );
                    resolve({
                        status: 200,
                        result: ""
                    })
                })
                .catch(() => {
                    reject({
                        status: 500,
                        result: ""
                    })
                })
        })
    }
}