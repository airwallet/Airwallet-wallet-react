import qrcode from 'yaqrcode';

export const getQrCode = (value, size=500) => {
    return qrcode(value, {
        size
    });
}