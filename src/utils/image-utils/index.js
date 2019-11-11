//**dataURL to blob**
export const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const binData = atob(arr[1])
    var arrayBuffer = new ArrayBuffer(binData.length)
    var uint8ArrayBuffer = new Uint8Array(arrayBuffer)

    for(let i = 0; i < binData.length; i++){
        uint8ArrayBuffer[i] = binData.charCodeAt(i);
    }
    return new Blob([arrayBuffer], {type:mime});
}

//**blob to dataURL**
//function blobToDataURL(blob, callback) {
//    var a = new FileReader();
//    a.onload = function(e) {callback(e.target.result);}
//    a.readAsDataURL(blob);
//}