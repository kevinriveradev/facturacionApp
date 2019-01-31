var express = require('express');
var router = express.Router();
var pdf = require('pdfkit');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/pdf', function(req, res, next) {
    const doc = new pdf();
    //Recogida de datos.
    let datos = req.body;
    
    //Generacion del pdf...

    //Cabezera Principal
    doc.fontSize(55).fillColor('red').text('Factura', 60, 100);

    //Datos tabla cliente.

    doc.moveTo(60, 180)
        .lineTo(60, 280)
        .lineTo(280, 280)
        .lineTo(280, 180)
        .lineTo(60, 180).stroke();

    doc.moveTo(60, 196)
        .lineTo(280, 196).stroke();
    doc.fontSize(10).fillColor('red').text('Cliente: ', 64, 185);
    doc.fontSize(10).fillColor('black').text(datos.cliente, 100, 185); //Entrada CLIENTE
    doc.moveTo(60, 214)
        .lineTo(280, 214).stroke();
    doc.fontSize(10).fillColor('red').text('NIF: ', 64, 203);
    doc.fontSize(10).fillColor('black').text(datos.nif, 85, 203); //entrada NIF
    doc.moveTo(60, 230)
        .lineTo(280, 230).stroke();
    doc.fontSize(10).fillColor('red').text('Domicilio: ', 64, 219);
    doc.fontSize(10).fillColor('black').text(datos.domicilio, 110, 219); // Entrada domicilio
    doc.moveTo(60, 246)
        .lineTo(280, 246).stroke();
    doc.fontSize(10).fillColor('red').text('C.P. /Municipio/Provincia: ', 64, 235);
    doc.fontSize(10).fillColor('black').text(datos.cp, 175, 235); //Entrada CP
    doc.moveTo(60, 262)
        .lineTo(280, 262).stroke();
    doc.fontSize(10).fillColor('red').text('Telf: /Fax: ', 64, 251);
    doc.fontSize(10).fillColor('black').stroke().text(datos.telefono, 110, 251); //Entrada telefono
    doc.fontSize(10).fillColor('red').text('Correo electronico: ', 64, 269);
    doc.fontSize(10).fillColor('black').text(datos.email, 150, 269);

    //Datos tabla facturante

    doc.moveTo(330, 70).lineTo(550, 70).lineTo(550, 180).lineTo(330, 180).lineTo(330, 70).stroke();
    //Numero de factura...
    doc.font('Helvetica-Bold').fillColor('black').text('FACTURA', 400, 55);
    doc.font('Helvetica');
    doc.fontSize(10).fillColor('red').text(datos.numero, 510, 55); //Numero de factura
    doc.moveTo(390, 70).lineTo(390, 50).lineTo(550, 50).lineTo(550, 70).stroke();
    doc.moveTo(500, 50).lineTo(500, 70).stroke();
    doc.moveTo(330, 85)
        .lineTo(550, 85).stroke();
    doc.text('Fecha: ', 335, 75);
    doc.fontSize(10).fillColor('black').text(datos.fecha, 380, 75); //Fecha de facturacion
    doc.moveTo(330, 110)
        .lineTo(550, 110).stroke();
    doc.fillColor('red').text('Nombre:', 335, 90);
    doc.fillColor('black').text('JORGE HERNAN RIVERA LOPEZ', 375, 90);
    doc.fillColor('red').text('Domicilio: ', 335, 115);
    doc.fillColor('black').text('Plaza musico espi 10 - 26' , 385 , 115);
    doc.moveTo(330, 135)
        .lineTo(550, 135).stroke();
    doc.fillColor('red').text('Provincia:', 335, 140);
    doc.fillColor('black').text('Valencia', 385, 140);
    doc.moveTo(330, 160)
        .lineTo(550, 160).stroke();
    doc.fillColor('red').text('C.I.F o N.I.F:', 335, 165);
    doc.fillColor('black').text('53881109K', 395, 165);
    doc.fillColor('red');

    //Generacion de la cabezera//

    //Textos--//
    doc.text('Cantidad', 70, 305);
    doc.text('Concepto', 140, 305);
    doc.text('Precio', 405, 305);
    doc.text('Total', 480, 305);
    //-------//
    doc.moveTo(60, 300).lineTo(550, 300).lineTo(550, 320).stroke();
    doc.moveTo(60, 300).lineTo(60, 320).stroke();
    //Linear verticales.
    doc.moveTo(60, 300).lineTo(60, 670).stroke();
    doc.moveTo(550, 300).lineTo(550, 670).stroke();
    //Lineas interiores
    doc.moveTo(135, 300).lineTo(135, 670).stroke();
    doc.moveTo(400, 300).lineTo(400, 720).stroke();
    doc.moveTo(475, 300).lineTo(475, 720).stroke();

    //**********CONTENIDO DE LA FACTURA**************//

    let puntoInicialX = 60;
    let puntoInicialY = 320;

    let puntoFinalX = 550;
    let puntoFinalY = 320;

    //Generacion de filas aleatorias.
    let items = [];
    items.push(datos.item1);
    items.push(datos.item2);
    items.push(datos.item3);
    items.push(datos.item4);
    items.push(datos.item5);
    items.push(datos.item6);
    
    for (var i = 0; i < 15; i++) {
        doc.moveTo(puntoInicialX, puntoInicialY).lineTo(puntoFinalX, puntoFinalY).stroke();
        if (i < items.length) {
            doc.fillColor('black').text(items[i], 140, puntoFinalY + 2, { width: 250, align: 'justify' });
        }
        puntoInicialY += 25;
        puntoFinalY += 25;
    }

    //FOOTER de la factura.
    doc.moveTo(60, 670).lineTo(60, 720).lineTo(550, 720).lineTo(550, 670).stroke();
    //Numero de cuenta...
    doc.fillColor('black').fontSize(8).text('FORMA DE PAGO: TRANSFERENCIA Num CTA. : ES5120386282273001144336  BANKIA', 110, 690, { width: 250, align: 'justify' });
    //SUMA,IVA,SUMATOTAL
    doc.fillColor('red').fontSize(8).text('SUMA', 415, 675);
    doc.fillColor('red').fontSize(8).text(`IVA ${datos.IVA} %`, 415, 690);
    doc.fillColor('red').fontSize(8).text('SUMA TOTAL', 415, 710);

    //Datos del cobro.

    //Calculo de facturacion.
    var sum = parseInt(datos.SUMA);
    var iva = parseInt(datos.IVA);
    var ivasuma = (sum * iva) / 100;
    var sumatotal = sum + ivasuma;
   
    
    doc.fillColor('black').fontSize(8).text(sum.toFixed(2).toLocaleString() + '\x80', 480, 675);
    doc.fillColor('black').fontSize(8).text(ivasuma.toFixed(2).toLocaleString() + '\x80', 480, 690);
    doc.fillColor('black').fontSize(8).text(sumatotal.toFixed(2).toLocaleString() + '\x80', 480, 710);
   
    //doc.fillColor('red').fontSize(10).text('SUMATOTAL', 415, 675);
    //-----------///
    doc.moveTo(400, 685).lineTo(550, 685).stroke();
    doc.moveTo(400, 702).lineTo(550, 702).stroke();

    doc.pipe(res);
    doc.end();
});

module.exports = router;
