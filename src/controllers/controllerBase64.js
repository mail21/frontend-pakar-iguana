import { Base64 } from 'js-base64';

export const convertToBase64 = (image) => Base64.encode(image);

export const convertToimageFromBase64 = (value_base64) => Base64.decode(value_base64);
