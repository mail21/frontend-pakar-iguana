// import { jsPDF } from 'jspdf';

// export function makePDF(myImage) {
//   // var name = $('#username').html();
//   var name = 'ismail';
//   var doc = new jsPDF('l', 'mm', 'a4');
//   doc.setFont('helvetica');
//   // doc.setFontType('bolditalic');
//   doc.setFontSize(40);
//   doc.addImage(myImage, 'PNG', 0, 0, 297, 210, '', 'FAST');
//   doc.setTextColor(99, 174, 190); // RGB
//   // doc.text(name, 297 / 2, 210 / 2 - 5, 'center');
//   //              x   y
//   doc.text(name, 150, 100, 'center');
//   doc.save(name + '.pdf');
// }

// export function toDataURL(src, callback, outputFormat) {
//   var img = new Image();
//   img.crossOrigin = 'Anonymous';
//   img.onload = function () {
//     var canvas = document.createElement('CANVAS');
//     var ctx = canvas.getContext('2d');
//     var dataURL;
//     canvas.height = this.naturalHeight;
//     canvas.width = this.naturalWidth;
//     ctx.drawImage(this, 0, 0);
//     dataURL = canvas.toDataURL(outputFormat);
//     callback(dataURL);
//   };
//   //   img.src = src;
//   //     if (img.complete || img.complete === undefined) {
//   //       img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
//   //       img.src = src;
//   //     }
// }

// export const imageHandler = (e) => {
//   const reader = new FileReader();
//   reader.onload = () => {
//     if (reader.readyState === 2) {
//       // setgambar(reader.result);
//       // toDataURL(reader.result, makePDF);
//       // setgambar([...gambar, reader.result]);
//     }
//   };
//   reader.readAsDataURL(e.target.files[0]);
// };

// import { jsPDF } from 'jspdf';

// // toDataURL('https://i.ibb.co/g6MCFdK/sertif-pelatihan-data.png', makePDF);
// import JsBarcode from 'jsbarcode';

// function textToBase64Barcode(text) {
//   var canvas = document.createElement('canvas');
//   // JsBarcode(canvas, text, { format: 'CODE39', background: 'red' });
//   JsBarcode(canvas, text, { format: 'CODE39', background: 'transparent', width: '1' });
//   return canvas.toDataURL('image/png');
// }

// export function makePDF(myImage, konfig, koordinat) {
//   // console.log(x, y);

//   // var name = $('#username').html();
//   var name = 'John Smith';
//   var doc = new jsPDF('l', 'mm', 'a4');
//   doc.addImage(myImage, 'PNG', 0, 0, 297, 210, '', 'FAST');
//   // console.log('width', doc.canvas.width);
//   // console.log('height', doc.canvas.height);
//   // console.log('parent_width', ' 842');
//   // console.log('parent_height', ' 596');
//   let width = doc.internal.pageSize.getWidth();
//   let height = doc.internal.pageSize.getHeight();
//   // console.log('width', width);
//   // console.log('height', height);

//   // var doc = new jsPDF('l', 'px', 'a4');
//   console.log(doc.getFontList());
//   // doc.setFont('helvetica');

//   // doc.setFont('serif', 'bolditalic');
//   doc.setFont(konfig.tipeFont, konfig.fontVariant);
//   doc.setTextColor(konfig.warnaFont); // RGB
//   doc.setFontSize(konfig.fontUkuran);

//   let barCode = textToBase64Barcode('171011402364');

//   doc.addImage(barCode, 'PNG', koordinat.barcode.x, koordinat.barcode.y, 40, 15, '', 'MEDIUM'); // 60
//   // doc.addImage(barCode, 'PNG', xBarCode, yBarCode, 40, 11, '', 'MEDIUM'); // ukurannya sama 65

//   // doc.text(name, 297 / 2, 210 / 2 - 5, 'center'); // taro di center textnya
//   //              x   y
//   // doc.text(name, 150, 100, 'center');
//   // doc.addImage(image, 'PNG', 300, 80, 50, 50); //base64 image, format, x-coordinate, y-coordinate, width, height

//   doc.text(name, koordinat.nama.x, koordinat.nama.y, 'center');
//   doc.save(name + '.pdf');
// }

// export function toDataURL(src, callback, konfig, koordinat, outputFormat) {
//   var img = new Image();
//   img.crossOrigin = 'Anonymous';
//   img.onload = function () {
//     var canvas = document.createElement('CANVAS');
//     var ctx = canvas.getContext('2d');
//     var dataURL;
//     canvas.height = this.naturalHeight;
//     canvas.width = this.naturalWidth;
//     ctx.drawImage(this, 0, 0);
//     dataURL = canvas.toDataURL(outputFormat);
//     callback(dataURL, konfig, koordinat);
//   };
//   img.src = src;
//   if (img.complete || img.complete === undefined) {
//     img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
//     img.src = src;
//   }
// }
