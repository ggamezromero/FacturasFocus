// este archivo contendra todas las funciones referidas a la base de datos en IndexedDb

function cargaBD() {
// variable which will hold the database connection
var indexedDB= window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB  
if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
  return;
};
// open the database
    // 1st parameter : Database name. We are using the name 'facturacionDB'
    // 2nd parameter is the version of the database.

var dataBase = indexedDB.open('facturacionDB', 23);
dataBase.onsuccess = function (e) {
    var objDB = dataBase.result; 
    console.log("abriBDatos");
// calcula la cuota restante de espacion en el navegador para datos
    navigator.storage.estimate().then(function (estimate) {
        // console.log(estimate.usage, estimate.quota);
        // console.log((estimate.usage / estimate.quota * 100));
        // var retorno = { Promise < boolean >};
        // isStoragePersisted();
 // verifica si la data grabada queda persistente : Resultado False, por eso se borran los datos IndexedDB//        
//   async function isStoragePersisted() {
//  var retorno =  navigator.storage && navigator.storage.persisted ?
//           navigator.storage.persisted() :
//           undefined;
//       console.log("API de Persistencia de datos no esta presente ",retorno.persist);
     
// }
 // Otra forma
if (navigator.storage && navigator.storage.persist) {
  const isPersisted =   navigator.storage.persisted();
  console.log(`Persisted storage granted: ${isPersisted}`);
}
     

if (navigator.storage && navigator.storage.persist) {
  const isPersisted =   navigator.storage.persist();
  console.log(`Persisted storage granted firefox: ${isPersisted}`);
        }
        
// Verifica si la data puede quedar persistente
async function persist() {
  return  navigator.storage && navigator.storage.persist ?
    navigator.storage.persist() :
        undefined;
    console.log("p2" );
}


        





        
});

    
    }
dataBase.onerror = function (e) {
    console.log('onerror',e);
    };
    // this will fire when the version of the database changes
    // We can only create Object stores in a versionchange transaction.
dataBase.onupgradeneeded = function (e) {
    console.log('onupgradeneeded');
    objDB = dataBase.result;
    
         
    // if (objDB.objectStoreNames.contains("empresa")) {
    //         objDB.deleteObjectStore("empresa");
    //     }
    // if (objDB.objectStoreNames.contains("productoServicio")) {
    //         objDB.deleteObjectStore("productoServicio");
    //     }
    // if (objDB.objectStoreNames.contains("titulos")) {
    //         objDB.deleteObjectStore("titulos");
    //     }
    // if (objDB.objectStoreNames.contains("historicoFacs")) {
    //         objDB.deleteObjectStore("historicoFacs");
    //     }
    // if (objDB.objectStoreNames.contains("historicoRecs")) {
    //         objDB.deleteObjectStore("historicoRecs");
    //     }
    // if (objDB.objectStoreNames.contains("historicoQuotes")) {
    //         objDB.deleteObjectStore("historicoQuotes");
    //     }
    // if (objDB.objectStoreNames.contains("historicoDocs")) {
    //         objDB.deleteObjectStore("historicoDocs");
    //     }
    
        // create a store named " clientes, productoServicio, titulos , historicoDocs
        // 1st parameter is the store name
        // 2nd parameter is the key field that we can specify here. Here we have opted for autoIncrement but it could be your
        // own provided value also.
    var objStore_empresa = objDB.createObjectStore('empresa', { keyPath: 'id', autoIncrement: true });
    objStore_empresa.createIndex('ind_nif', 'id_nifiscal', { unique: true });
    
    var objStore_clientes = objDB.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
        objStore_clientes.createIndex('ind_idf', 'id_fiscal', { unique: true });
   
    var obj_Store_productoServicio = objDB.createObjectStore('productoServicio', { keyPath: 'id', autoIncrement: true });
            obj_Store_productoServicio.createIndex('ind_codigops', 'codigo_ps', { unique: true });
   
    var objStore_titulos = objDB.createObjectStore('titulos', { keyPath: 'id', autoIncrement: true });
    objStore_titulos.createIndex('ind_idioma',  'titulo_idioma', { unique: false });
   
    var objStore_histFacs = objDB.createObjectStore('historicoFacs', { keyPath: 'id', autoIncrement: true });
        objStore_histFacs.createIndex('ind_factura', 'factura', { unique: true });
             
    var  objStore_histRecs         = objDB.createObjectStore('historicoRecs', { keyPath: 'id', autoIncrement: true });
            objStore_histRecs.createIndex('ind_recibo', 'recibo', { unique: true });
          
    var  objStore_histQuotes           = objDB.createObjectStore('historicoQuotes', { keyPath: 'id', autoIncrement: true });
            objStore_histQuotes.createIndex('ind_quotes', 'quotes', { unique: true });
            console.log("Objects Stores has been created" );
    };
};

function grabaTitulos() {
 var dataBase = indexedDB.open('facturacionDB', 23);
    dataBase.onsuccess = function (e) {
    objDB = dataBase.result;
var transaction = objDB.transaction(['titulos'], 'readwrite');
var object = transaction.objectStore('titulos');
 
     
        //Create the Object to be saved i.e. our App details
        var a_etiqueta = {}
        // datos de cabecera de la factura  
        a_etiqueta.tipo_doc = document.getElementById('tipo_doc').value;
        a_etiqueta.titulo_idioma = document.getElementById('titulo_idioma').value;
        a_etiqueta.titulo_doc = document.getElementById('titulo_doc').value;
        a_etiqueta.titulo_fecha = document.getElementById('titulo_fecha').value;
        a_etiqueta.titulo_numDoc = document.getElementById('titulo_numDoc').value;
        a_etiqueta.titulo_nombreCliente = document.getElementById('titulo_nombreCliente').value;
        a_etiqueta.titulo_documentoOrigen = document.getElementById('titulo_documentoOrigen').value;
        a_etiqueta.titulo_terminosCondiciones = document.getElementById('titulo_terminosCondiciones').value;
        a_etiqueta.titulo_item = document.getElementById('titulo_item').value;
        a_etiqueta.titulo_cantidad = document.getElementById('titulo_cantidad').value;
        a_etiqueta.titulo_cu = document.getElementById('titulo_cu').value;
        a_etiqueta.titulo_descripcion = document.getElementById('titulo_descripcion').value;
        a_etiqueta.titulo_subtotal = document.getElementById('titulo_subtotal').value;
        a_etiqueta.titulo_impuesto = document.getElementById('titulo_impuesto').value;
        a_etiqueta.titulo_otraRetencion = document.getElementById('titulo_otraRetencion').value;
        a_etiqueta.titulo_meses = document.getElementById('meses'.value);
        // add the details to the store
        var store = transaction.objectStore('titulos');
        var request = store.add(a_etiqueta);
        request.onsuccess = function (e) {
            alert("Registro de etiquetas en idioma   " + a_etiqueta.titulo_idioma + "  ha sido grabado");
        };
        request.onerror = function (e) {
            console.log("Error in saving the App data. Reason : " + e.a_etiqueta);
        }
    };
};

 
function grabaCliente() {
    var dataBase = indexedDB.open('facturacionDB', 23);
        dataBase.onsuccess = function (e) {
        objDB = dataBase.result;
    var transaction = objDB.transaction(['clientes'], 'readwrite');
    var object = transaction.objectStore('clientes');
 
     
        //Create the Object to be saved i.e. our App details
        var a_cliente = {}
        a_cliente.id_fiscal = document.getElementById('id_fiscal').value.replace(/\s/g, "");
        a_cliente.nombre_cliente = document.getElementById('nombre_cliente').value;
        a_cliente.dir_fiscal = document.getElementById('dir_fiscal').value;
        a_cliente.dir_envio = document.getElementById('dir_envio').value;
        a_cliente.dir_facturacion = document.getElementById('dir_facturacion').value;
        a_cliente.telefono = document.getElementById('telefono').value;
        a_cliente.tipo_empresa = document.getElementById('tipo_empresa').value;
        a_cliente.idioma_fac = document.getElementById('idioma_fac').value;
        a_cliente.estado = document.getElementById('estado').value;
        a_cliente.porcentaje_impuesto = document.getElementById('porcentaje_impuesto').value;
        a_cliente.porcentaje_otraRetencion = document.getElementById('porcentaje_otraRetencion').value;
        a_cliente.terminosCondiciones = document.getElementById('terminosCondiciones').value;
        a_cliente.nombredel_logo = document.getElementById('nombredel_logo').value;
        a_cliente.coordenada_Bancaria1 = document.getElementById('coordenada_Bancaria1').value;
        a_cliente.coordenada_Bancaria2 = document.getElementById('coordenada_Bancaria2').value;
        a_cliente.coordenada_Bancaria3 = document.getElementById('coordenada_Bancaria3').value;
        a_cliente.coordenada_Bancaria4 = document.getElementById('coordenada_Bancaria4').value;
  
        // add the details to the store
        var store = transaction.objectStore('clientes');
        var request = store.add(a_cliente);
        request.onsuccess = function (e) {
            alert('Empresa creada satisfactoriamente:     ' + a_cliente.nombre_cliente);
        };
        request.onerror = function (e) {
            alert("Error ID Fiscal ya existe en BD:    " + a_cliente.id_fiscal);
        }
    };
};
function grabaEmpresa() {
    var dataBase = indexedDB.open('facturacionDB', 23);
    dataBase.onsuccess = function (e) {
        objDB = dataBase.result;
        var transaction = objDB.transaction(['empresa'], 'readwrite');
        var object = transaction.objectStore('empresa');
        //Create the Object to be saved i.e. our App details
        var a_empresa = {}
        a_empresa.id_nifiscal = document.getElementById('id_fiscal').value.replace(/\s/g, "");
        a_empresa.nombre_cliente = document.getElementById('nombre_cliente').value;
        a_empresa.dir_fiscal = document.getElementById('dir_fiscal').value;
        a_empresa.dir_envio = document.getElementById('dir_envio').value;
        a_empresa.dir_facturacion = document.getElementById('dir_facturacion').value;
        a_empresa.telefono = document.getElementById('telefono').value;
        a_empresa.tipo_empresa = document.getElementById('tipo_empresa').value;
        a_empresa.idioma_fac = document.getElementById('idioma_fac').value;
        a_empresa.estado = document.getElementById('estado').value;
        a_empresa.porcentaje_impuesto = document.getElementById('porcentaje_impuesto').value;
        a_empresa.porcentaje_otraRetencion = document.getElementById('porcentaje_otraRetencion').value;
        a_empresa.terminosCondiciones = document.getElementById('terminosCondiciones').value;
        a_empresa.nombredel_logo = document.getElementById('nombredel_logo').value;
        a_empresa.coordenada_Bancaria1 = document.getElementById('coordenada_Bancaria1').value;
        a_empresa.coordenada_Bancaria2 = document.getElementById('coordenada_Bancaria2').value;
        a_empresa.coordenada_Bancaria3 = document.getElementById('coordenada_Bancaria3').value;
        a_empresa.coordenada_Bancaria4 = document.getElementById('coordenada_Bancaria4').value;
  
        // add the details to the store
        var store = transaction.objectStore('empresa');
        var request = store.add(a_empresa);
        request.onsuccess = function (e) {
            alert('Empresa creada satisfactoriamente:     ' + a_empresa.nombre_cliente);
        };
        request.onerror = function (e) {
            alert("Error ID Fiscal ya existe en BD:    " + a_empresa.id_fiscal);
        }
    };
};

function grabahistoricoFactura() {
    // create the transaction with 1st parameter is the list of stores and the second specifies
    // a flag for the readwrite option
    var dataBase = indexedDB.open('facturacionDB', 23);
    dataBase.onsuccess = function (e) {
        var objDB = dataBase.result;
        var transaction = objDB.transaction(['historicoFacs'], 'readwrite');
        //Create the Object to be saved i.e. our App details
        var a_factura = {}
        // datos de cabecera de la factura  
     
        a_factura.facturador = document.getElementById('nameFacturador').textContent;
        a_factura.einFacturador = document.getElementById('einFacturador').textContent;
        a_factura.docType = document.getElementById('docType').textContent;
        a_factura.tituloa = document.getElementById('tituloa').textContent;
        a_factura.titulob = document.getElementById('titulob').textContent;
        a_factura.titulo2 = document.getElementById('titulo2').textContent;
        a_factura.factura = document.getElementById('titulo3').textContent;
        a_factura.adr1 = document.getElementById('adr1').textContent;
        a_factura.adr2 = document.getElementById('adr2').textContent;
        a_factura.adr3 = document.getElementById('adr3').textContent;
        a_factura.custNameTit = document.getElementById('custNameTit').textContent;
        a_factura.cliente = document.getElementById('custName').textContent;
        a_factura.custId = document.getElementById('custId').textContent;
        a_factura.custAdd = document.getElementById('custAdd').textContent;
        a_factura.custShip = document.getElementById('custShip').textContent;
        // a_factura.condicion1 = document.getElementById('condicion1').textContent;
        // a_factura.condicion2 = document.getElementById('condicion2').textContent;
        a_factura.docref = document.getElementById('docref').textContent;
        a_factura.terminos = document.getElementById('terminos').textContent;
        // Detalle de la factura por tener solo un item se graba en el mismo Object Store
        a_factura.itemlabel = document.getElementById('itemlabel').textContent;
        a_factura.item = document.getElementById('item').textContent;
        a_factura.qtylabel = document.getElementById('qtylabel').textContent;
        a_factura.qty = document.getElementById('qty').textContent;
        a_factura.descriptionlabel = document.getElementById('descriptionlabel').textContent;
        a_factura.description = document.getElementById('description').textContent;
        a_factura.uclabel = document.getElementById('uclabel').textContent;
        a_factura.costo = document.getElementById('costo').textContent;
        a_factura.sbtlabel = document.getElementById('sbtlabel').textContent;
        a_factura.subtotal = document.getElementById('subtotal').textContent;
        a_factura.descrTit = document.getElementById('descrTit').textContent;
        a_factura.totalTit = document.getElementById('totalTit').textContent;
        a_factura.total = document.getElementById('total').textContent;
        // add the details to the store
        var store = transaction.objectStore('historicoFacs');
     
        var request = store.add(a_factura);
        request.onsuccess = function (e) {
            alert("Factura grabada con exito");
             
        };
        request.onerror = function (e) {
            // alert("Error Factura ya existe : " + a_factura.factura);
            let isExecuted = confirm("Factura ya existe desea susituirla? Enter:Si Tecla ESC =No");
         
            if (isExecuted) {
                alert("esta seguro?");
            }
        };
    };
};


function grabaProductosServicios() {

    var dataBase = indexedDB.open('facturacionDB', 23);
    dataBase.onsuccess = function (e) {
        var objDB = dataBase.result;
        var transaction = objDB.transaction(['productoServicio'], 'readwrite');
        //Create the Object to be saved i.e. our App details
        var a_ps = {}
        // datos de cabecera de la factura  
        a_ps.codigo_ps = document.getElementById('codigo_ps').value;
        a_ps.tipo_ps = document.getElementById('tipo_ps').value;
        a_ps.nombre_ps = document.getElementById('nombre_ps').value;
        a_ps.descrPs_Esp = document.getElementById('descrPs_Esp').value;
        a_ps.descrPs_Eng = document.getElementById('descrPs_Eng').value;
        a_ps.edicion_ps = document.getElementById('edicion_ps').value;
        a_ps.version_ps = document.getElementById('version_ps').value;
        // add the details to the store
        var store = transaction.objectStore('productoServicio');
        var request = store.add(a_ps);
        request.onsuccess = function (e) {
            console.log("Your App data has been saved");
        };
        request.onerror = function (e) {
            console.log("Error in saving the App data. Reason : " + e.a_ps);
        }
    }
};


function poblarConsultaHistorico() {
    var dataBase = indexedDB.open('facturacionDB', 23);
    dataBase.onsuccess = function (e) {
    var objDB = dataBase.result;
        
         
    var transaction = objDB.transaction(['historicoFacs'], 'readonly');
    var object = transaction.objectStore('historicoFacs');
    var elementsHistorico = [];
        object.openCursor().onsuccess = function (e) {
            
            var result = e.target.result;
            
            if (result == null) {
                 
                return;
            }
            elementsHistorico.push(result.value);
            result.continue();
        };
        transaction.oncomplete = function () {
             
            var tr = '';
           
            for (var i = 0; i < elementsHistorico.length; i++) {
                tr += '<tr>';
                tr += '<td>' + elementsHistorico[i].facturador + '</td>';
                tr += '<td>' + elementsHistorico[i].factura + '</td>';
                tr += '<td>' + elementsHistorico[i].titulo2 + '</td>';
                tr += '<td>' + elementsHistorico[i].cliente + '</td>';
                tr += '<td>' + elementsHistorico[i].description + '</td>';
                tr += '<td>' + elementsHistorico[i].docref + '</td>';
                tr += '<td>' + elementsHistorico[i].terminos + '</td>';
                tr += '<td>' + elementsHistorico[i].costo + '</td>';
                tr += '<td>' + elementsHistorico[i].qty + '</td>';
                tr += '<td>' + elementsHistorico[i].subtotal + '</td>';
                tr += '<td>' + '+' + '</td>';
                tr += '</tr>';
            };
            elementsHistorico = [];
            var tabla = document.getElementById("tbody-documento");
            tabla.innerHTML = tr;
        };
    };
};

function llenaClientes() {
 //Llena empresas
var dataBase = indexedDB.open('facturacionDB', 23);
    dataBase.onsuccess = function (e) {
       
var objDB = dataBase.result;
   
var transaction = objDB.transaction(['empresa'], 'readonly');
var object = transaction.objectStore('empresa');
var elementsEmpresa = [];
    object.openCursor().onsuccess = function (e) {
        var result = e.target.result;
          
        if (result == null) {
            return;
        }
        elementsEmpresa.push(result.value);
        result.continue();
        };
        transaction.oncomplete = function () {
            console.log("empresas",elementsEmpresa);   
var sec_facturador = document.getElementById("facturador");
        var fac = '';
        fac += '<option value='  + "fac" + '>Seleccione Facturador </option>'; 
       
        for (var i = 0; i < elementsEmpresa.length; i++) {
        // se utiliza el metodo replace para eliminar espacios en blanco (\s) en todo el campo (/g)   
            if (elementsEmpresa[i].tipo_empresa !== '3') {
                fac += '<option value=' + elementsEmpresa[i].id_nifiscal.replace(/\s/g, "") +  '>' + elementsEmpresa[i].nombre_cliente + '</option>';
            };
        };
    sec_facturador.innerHTML = fac;
        }; 
  
// Seccion clientes    
var transaction = objDB.transaction(['clientes'], 'readonly');
var object = transaction.objectStore('clientes');
var elementsClientes = [];
    object.openCursor().onsuccess = function (e) {
var result = e.target.result;
    if (result == null) {
        return;
    }
    elementsClientes.push(result.value);
    result.continue();
    
    transaction.oncomplete = function () {
var sec_cliente = document.getElementById("cliente");
var cli = '';
    cli += '<option value='  + "cli" + '>Seleccione Cliente </option>'; 
       
    for (var i = 0; i < elementsClientes.length; i++) {
        // se utiliza el metodo replace para eliminar espacios en blanco (\s) en todo el campo (/g)   
            // if (elementsClientes[i].tipo_empresa !== '22') {
    cli += '<option value=' + elementsClientes[i].id_fiscal.replace(/\s/g, "") +  '>' + elementsClientes[i].nombre_cliente + '</option>';
            // };
    };
    sec_cliente.innerHTML = cli;
        }; 
        };
    };
};
   

function FacturaOut() {
// 1era parte identificacion de etiquetas
var monthNames = [" Jan ", " Feb ", " Mar ", " Apr ", " May ", " Jun ",
        " Jul ", " Aug ", " Sep ", " Oct ", " Nov ", " Dic "];
    
    var searchParams = new URLSearchParams(window.location.search);
    
    var resultsList = document.getElementById('results');
    var logoFacturador = document.getElementById('logoFacturador');
    var einFacturador = document.getElementById('einFacturador');
    var nameFacturador = document.getElementById('nameFacturador');
    var adr1 = document.getElementById('adr1');
    var adr2 = document.getElementById('adr2');
    var adr3 = document.getElementById('adr3');
    
    var titulo2 = document.getElementById('titulo2');
    var titulo3 = document.getElementById('titulo3');
    
    var customer = document.getElementById('custName');
    var custId = document.getElementById('custId');
    var custAdd = document.getElementById('custAdd');
    var custShip = document.getElementById('custShip');
    var item = document.getElementById('item');
    
     
    var subtotal = document.getElementById('subtotal');
    
    
    
    var uclabel = document.getElementById('uclabel');
    
    var total = document.getElementById('total');
    var condicion1 = document.getElementById('condicion1');
    var docref = document.getElementById('docref');
    var condicion2 = document.getElementById('condicion2');
    var terminos = document.getElementById('terminos');
    var descrTit = document.getElementById('descrTit');
    var descrTitc = document.getElementsByClassName('descrTitc');
    var descr1 = "";
    var descr2 = "";
    var formattedDate = " ";
    var newFecha = "";
    const Array_servicio = sessionStorage.getItem('descr').split("/", 2);
    descr1 = Array_servicio[0];
    descr2 = Array_servicio[1];
 
    var condicion2 = document.getElementById('condicion2');
    var cantidad = 0;
    var monto = 0;
    var cambio = 0;
    var flagCalc = 0;
    var flagFecha = 0;
    var sbtotal = 0;
    var f1 = document.getElementById('f1');
    var f2 = document.getElementById('f2');
    var f3 = document.getElementById('f3');
    var f4 = document.getElementById('f4');
    var imprimir = document.getElementById('imprimir');
    var grabar = document.getElementById('grabar');
    var idioma_fac = "";  
//   2da parte conexion a BDatos y extraccion de datos de los stores clientes / titulos\
    
// Seccion del facturador
var dataBase = indexedDB.open('facturacionDB', 23);
    dataBase.onsuccess = function (e) {
        var objDB = dataBase.result;
        var transactionEmpresa = objDB.transaction(['empresa'], 'readonly');
        var objectEmpresa = transactionEmpresa.objectStore('empresa');
 
        var indiceFac = objectEmpresa.index("ind_nif");
        var requestEmpresa = indiceFac.get(sessionStorage.getItem('facturador'));
        requestEmpresa.onsuccess = function () {
            var resultadoEmp = requestEmpresa.result
            var logoRuta = resultadoEmp.nombredel_logo;
            logoFacturador.innerHTML = logoRuta;
            nameFacturador.innerText = resultadoEmp.nombre_cliente;
            einFacturador.innerText = resultadoEmp.id_nifiscal;
            const direccion = resultadoEmp.dir_facturacion.split(".", 3);
            adr1.innerText = direccion[0];
            adr2.innerText = direccion[1];
            adr3.innerText = direccion[2];
            titulo3.innerText = sessionStorage.getItem('numfac');
   // Seccion del cliente
            var transactionCliente = objDB.transaction(['clientes'], 'readonly');
            var objectCliente = transactionCliente.objectStore('clientes');
            var indiceCliente = objectCliente.index("ind_idf");
            var requestCliente = indiceCliente.get(sessionStorage.getItem('cliente'));
            requestCliente.onsuccess = function () {
            var resultadoCli = requestCliente.result
                idioma_fac = resultadoCli.idioma_fac;
                custName.innerText = resultadoCli.nombre_cliente;
                custId.innerText = resultadoCli.id_fiscal;
                console.log(custName.innerText, resultadoCli.id_fiscal)
                if (custName.innerText == resultadoCli.id_fiscal) {
                    custId.innerText = "";
                };
                 
                custAdd.innerText = resultadoCli.dir_fiscal;
                custShip.innerText = resultadoCli.dir_envio;
                docref.innerText = sessionStorage.getItem('referencia');
                terminos.innerText = sessionStorage.getItem('terminos');
                newFecha = sessionStorage.getItem('fecha');
                if (newFecha.search("-")) {
                    let formattedDate = newFecha.replace(/-/g, "/");
                    date_string = formattedDate.toString()
                } else {
                    date_string = newFecha
                };
                date_array = date_string.split("/", 3); // split the array
                var_year = date_array[0]; //year seqment
                var_month = date_array[1]; //month segment
                var_day = date_array[2]; // day segment
                
       
                // seccion titulos segun idioma del cliente
         
        var transactionEtiqueta = objDB.transaction(['titulos'], 'readonly');
        var objectEtiqueta = transactionEtiqueta.objectStore('titulos');
        var indiceEtiqueta = objectEtiqueta.index("ind_idioma");
        var requestEtiqueta = indiceEtiqueta.get(idioma_fac);
            requestEtiqueta.onerror = function (event) {
            console.log("fallo");
            };
            requestEtiqueta.onsuccess = function () {
        var resultadoEtq = requestEtiqueta.result;
             
                        document.getElementById('docType').innerText = resultadoEtq.titulo_doc;
                        document.getElementById('tituloa').innerText = resultadoEtq.titulo_fecha;
                        document.getElementById('titulob').innerText = resultadoEtq.titulo_numDoc;
                        document.getElementById('custNameTit').innerText = resultadoEtq.titulo_nombreCliente;
                        document.getElementById('itemlabel').innerText = resultadoEtq.titulo_item;
                        document.getElementById('qtylabel').innerText = resultadoEtq.titulo_cantidad;
                        document.getElementById('descriptionlabel').innerText = resultadoEtq.titulo_descripcion;
                        document.getElementById('uclabel').innerText = resultadoEtq.titulo_cu;
                        document.getElementById('sbtlabel').innerText = resultadoEtq.titulo_subtotal;
                        // totalTit.innerText =      resultado.titulo_
                        // seguir aqui
                if (resultadoEtq.titulo_idioma == 'ESP') {
                    titulo2.innerText = var_day + "/" + var_month + "/" + var_year;
                } else {
                    titulo2.innerText = var_month + "/" + var_day + "/" + var_year;// IDioma Ingles
                };
                    // Detalle por items    
                    item.innerText = "1";
                    document.getElementById('qty').innerText = sessionStorage.getItem('qty');
                    document.getElementById('description').innerText = descr1;
                    document.getElementById('costo').innerText = sessionStorage.getItem('costo');
                    sbtotal = sessionStorage.getItem('qty') * sessionStorage.getItem('costo');
                    subtotal.innerText = sbtotal;
                    descrTit.innerText = descr2;
                    total.innerText = sbtotal;
       
                    imprimir.addEventListener('click', changeVisibility);
                    grabar.addEventListener('click', grabahistoricoFactura);
                };
           
            };
        };
    };
};

function changeVisibility() {
        document.getElementById("imprimir").style.visibility = "hidden";
        document.getElementById("back").style.visibility = "hidden";
        document.getElementById("grabar").style.visibility = "hidden";
        window.print();
        document.getElementById("imprimir").style.visibility = "visible";
        document.getElementById("back").style.visibility = "visible";
        document.getElementById("grabar").style.visibility = "visible";
       
};
// Esta funcion fue sustituida por grabahistoricoFactura
function grabadatosFactura() {
    // create the transaction with 1st parameter is the list of stores and the second specifies
    // a flag for the readwrite option
     
    var dataBase = indexedDB.open('facturacionDB', 23);
        dataBase.onsuccess = function (e) {
    var objDB = dataBase.result;
    var transactionHistFacs = objDB.transaction(['historicoFacs'], 'readwrite');
    var objectHistFacs = transactionHistFacs.objectStore('historicoFacs');
        //Create the Object to be saved i.e. our App details
    var documentHistFac = {}
        // datos de cabecera de la factura 
        documentHistFac.nif = document.getElementById('nameFacturador');
        documentHistFac.facturador = sessionStorage.getItem('facturador');
        documentHistFac.cliente = sessionStorage.getItem('cliente');
        documentHistFac.factura = sessionStorage.getItem('numfac');
        documentHistFac.fecha = sessionStorage.getItem('fecha');
        documentHistFac.referencia = sessionStorage.getItem('referencia');
        documentHistFac.terminos = sessionStorage.getItem('terminos');
        // Detalle de la factura por tener solo un item se graba en el mismo Object Store
        documentHistFac.item = item.textContent;
        documentHistFac.qty = qty.textContent;
        documentHistFac.descripcion = description.textContent;
        documentHistFac.costo = costo.textContent;
        documentHistFac.subtotal = subtotal.textContent;
        documentHistFac.descrTit = descrTit.textContent;
   
        // add the details to the store
    var store = transactionHistFacs.objectStore('historicoFacs');
            console.log(documentHistFac);
    var requestHist = store.add(documentHistFac);
        requestHist.onsuccess = function (e) {
            console.log("Your App data has been saved");
        };
        requestHist.onerror = function (e) {
            console.log("Factura ya existe en el historico : " + documentHistFac.factura);
        }
    };
};
