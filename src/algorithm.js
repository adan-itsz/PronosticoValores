export  function sumaRestaAlgoritmo(data,salto){
  var res=diferenciaIndividual(data,salto);
  var inicialD1=data[0];
  var inicialD2=data[1];
  var inicialD3=data[2];
  var inicialD4=data[3];
  var inicialD5=data[4];
  var totalIniciales={d1:inicialD1[0],d2:inicialD2[0],d3:inicialD3[0],d4:inicialD4[0],d5:inicialD5[0]};
  var esferas={frecuencias:res,inicial:totalIniciales}; //enviar a recorrer
  return recorrerDatos(esferas);
}




export function diferenciaIndividual(array,salto){
  var data=[];
  for(var i=0;i<10;i++){

      data=data.concat({diferencia:i,d1:busquedaDiferencias(array[0],salto,i),
        d2:busquedaDiferencias(array[1],salto,i),d3:busquedaDiferencias(array[2],salto,i),
        d4:busquedaDiferencias(array[3],salto,i),d5:busquedaDiferencias(array[4],salto,i) });

  }
  return data;
}

export function busquedaDiferencias(array,salto,dif){
 for(var i=salto;i<array.length;i++){
   if(operacion(parseInt(array[i]),dif)==parseInt(array[i-salto])){
     return i;
   }
 }
}





export function recorrerDatos(array){
  var array2=array.frecuencias;
  var d1=[];
  var d2=[];
  var d3=[];
  var d4=[];
  var d5=[];

  array2.forEach(it=>{
    //d1
    if(parseInt(it.d1)>=30 && parseInt(it.d1)<45){
      var prediccion=operacion(array.inicial.d1,it.diferencia);
      d1=d1.concat({digito:prediccion,color:'2'});
    }
    else if(parseInt(it.d1)>=45 && parseInt(it.d1)<60){
      var prediccion=operacion(array.inicial.d1,it.diferencia);
      d1=d1.concat({digito:prediccion,color:'3'});
    }
    else if(parseInt(it.d1)>=60){
      var prediccion=operacion(array.inicial.d1,it.diferencia);
      d1=d1.concat({digito:prediccion,color:'4'});
    }

    //d2
    if(parseInt(it.d2)>=30 && parseInt(it.d2)<45){
      var prediccion=operacion(array.inicial.d2,it.diferencia);
      d2=d2.concat({digito:prediccion,color:'2'});
    }
    else if(parseInt(it.d2)>=45 && parseInt(it.d2)<55){
      var prediccion=operacion(array.inicial.d2,it.diferencia);
      d2=d2.concat({digito:prediccion,color:'3'});
    }
    else if(parseInt(it.d2)>=55){
      var prediccion=operacion(array.inicial.d2,it.diferencia);
      d2=d2.concat({digito:prediccion,color:'4'});
    }

    //d3
    if(parseInt(it.d3)>=30 && parseInt(it.d3)<45){
      var prediccion=operacion(array.inicial.d3,it.diferencia);
      d3=d3.concat({digito:prediccion,color:'2'});
    }
    else if(parseInt(it.d3)>=45 && parseInt(it.d3)<55){
      var prediccion=operacion(array.inicial.d3,it.diferencia);
      d3=d3.concat({digito:prediccion,color:'3'});
    }
    else if(parseInt(it.d3)>=55){
      var prediccion=operacion(array.inicial.d3,it.diferencia);
      d3=d3.concat({digito:prediccion,color:'4'});
    }

    //d4
    if(parseInt(it.d4)>=30 && parseInt(it.d4)<45){
      var prediccion=operacion(array.inicial.d4,it.diferencia);
      d4=d4.concat({digito:prediccion,color:'2'});
    }
    else if(parseInt(it.d4)>=45 && parseInt(it.d4)<55){
      var prediccion=operacion(array.inicial.d4,it.diferencia);
      d4=d4.concat({digito:prediccion,color:'3'});
    }
    else if(parseInt(it.d4)>=55){
      var prediccion=operacion(array.inicial.d4,it.diferencia);
      d4=d4.concat({digito:prediccion,color:'4'});
    }

    //d5
    if(parseInt(it.d5)>=30 && parseInt(it.d5)<45){
      var prediccion=operacion(array.inicial.d5,it.diferencia);
      d5=d5.concat({digito:prediccion,color:'2'});
    }
    else if(parseInt(it.d5)>=45 && parseInt(it.d5)<55){
      var prediccion=operacion(array.inicial.d5,it.diferencia);
      d5=d5.concat({digito:prediccion,color:'3'});
    }
    else if(parseInt(it.d5)>=55){
      var prediccion=operacion(array.inicial.d5,it.diferencia);
      d5=d5.concat({digito:prediccion,color:'4'});
    }
  })


  return {d1:d1,d2:d2,d3:d3,d4:d4,d5:d5}//regresa todos los arrays

}

export function operacion(n1,n2){ //inicial, diferencia
  var num1=parseInt(n1);
  var num2=parseInt(n2);
    var resultado=num1+num2;
    if(resultado>9){
      return resultado-10;
    }
    else if(resultado<0){
      return 10+resultado;
    }
    else {
      return resultado;
    }
}


export function asociacion(d1,d2,d3,d4,d5){
  var resultados=[];
  var dUno=iterarDatos(d1);
  var dDos=iterarDatos(d2);
  var dTres=iterarDatos(d3);
  var dCuatro=iterarDatos(d4);
  var dCinco=iterarDatos(d5);
  return {d1:dUno,d2:dDos,d3:dTres,d4:dCuatro,d5:dCinco};

}

export function iterarDatos(array){
  var cero=0;
  var uno=0;
  var dos=0;
  var tres=0;
  var cuatro=0;
  var cinco=0;
  var seis=0;
  var siete=0;
  var ocho=0;
  var nueve=0;
  array.forEach(it=>{
    switch (it.digito) {
      case 0:

        if(it.color=='2'){
        cero++;
        }
        else if(it.color=='3'){
          cero=cero+2;
        }
        else if(it.color=='4'){
          cero=cero+3;
        }
        break;
      case 1:
            if(it.color=='2'){
            uno++;
          }
            else if(it.color=='3'){
              uno=uno+2;
            }
            else if(it.color=='4'){
              uno=uno+3;
            }
        break;
      case 2:
            if(it.color=='2'){
            dos++;
          }
            else if(it.color=='3'){
              dos=dos+2;
            }
            else if(it.color=='4'){
              dos=dos+3;
            }
        break;
      case 3:
              if(it.color=='2'){
              tres++;
            }
              else if(it.color=='3'){
                tres=tres+2;
              }
              else if(it.color=='4'){
                tres=tres+3;
              }
        break;
      case 4:
            if(it.color=='2'){
            cuatro++;
          }
            else if(it.color=='3'){
              cuatro=cuatro+2;
            }
            else if(it.color=='4'){
              cuatro=cuatro+3;
            }
        break;
      case 5:
          if(it.color=='2'){
          cinco++;
        }
          else if(it.color=='3'){
            cinco=cinco+2;
          }
          else if(it.color=='4'){
            cinco=cinco+3;
          }
        break;
      case 6:
          if(it.color=='2'){
          seis++;
        }
          else if(it.color=='3'){
            seis=seis+2;
          }
          else if(it.color=='4'){
            seis=seis+3;
          }
        break;
      case 7:
            if(it.color=='2'){
            siete++;
          }
            else if(it.color=='3'){
              siete=siete+2;
            }
            else if(it.color=='4'){
              siete=siete+3;
            }
        break;
      case 8:
            if(it.color=='2'){
            ocho++;
          }
            else if(it.color=='3'){
              ocho=ocho+2;
            }
            else if(it.color=='4'){
              ocho=ocho+3;
            }
        break;
      case 9:
            if(it.color=='2'){
            nueve++;
          }
            else if(it.color=='3'){
              nueve=nueve+2;
            }
            else if(it.color=='4'){
              nueve=nueve+3;
            }
        break;

      default:

    }
  })
  return {0:cero,1:uno,2:dos,3:tres,4:cuatro,5:cinco,6:seis,7:siete,8:ocho,9:nueve};
}

export function esferasFrecuencia(array){
  var arreglo=array.primero;
  var digito1= separarEsferas(arreglo[0]);
  var digito2= separarEsferas(arreglo[1]);
  var digito3= separarEsferas(arreglo[2]);
  var digito4= separarEsferas(arreglo[3]);
  var digito5= separarEsferas(arreglo[4]);
  return {d1:digito1,d2:digito2,d3:digito3,d4:digito4,d5:digito5};
}
export function separarEsferas(datosdigitoEsfera){
  var datos=[];
  for(var i=0;i<datosdigitoEsfera.length;i++){
    var dato=datosdigitoEsfera[i];
    datos=datos.concat({digito:dato[0],color:dato[2]});
  }
  return datos
}
