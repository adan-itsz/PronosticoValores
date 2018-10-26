export function esferasTotales(conteoTotal,arrayFrecuencia,arrayNumeroInm){
  var conteo=conteoTotal;
  var frecuencias=[];
  frecuencias[0]=arrayFrecuencia.d1;
  frecuencias[1]=arrayFrecuencia.d2;
  frecuencias[2]=arrayFrecuencia.d3;
  frecuencias[3]=arrayFrecuencia.d4;
  frecuencias[4]=arrayFrecuencia.d5;

  var numInmediato=[];
  numInmediato[0]=arrayNumeroInm.d1;
  numInmediato[1]=arrayNumeroInm.d2;
  numInmediato[2]=arrayNumeroInm.d3;
  numInmediato[3]=arrayNumeroInm.d4;
  numInmediato[4]=arrayNumeroInm.d5;
// con frecuencias aumenta 1
  for(var i=0;i<frecuencias.length;i++){ //recorre  d1 ... d5
    for(var it of frecuencias[i]){ //recorre cada elemento en su digito correspondiente
      if(it.digito=='0'){ // si es cero buscara cual dx es y aumentara en array conteo [digito_considente]  +1
        switch(i){
          case 0:
            conteo.d1[0]++;
            break;
          case 1:
            conteo.d2[0]++;
            break;
          case 2:
            conteo.d3[0]++;
            break;
          case 3:
            conteo.d4[0]++;
            break;
          case 4:
            conteo.d5[0]++;
            break;
        }
      }
      else if(it.digito=='1'){
        switch(i){
          case 0:
            conteo.d1[1]++;
            break;
          case 1:
            conteo.d2[1]++;
            break;
          case 2:
            conteo.d3[1]++;
            break;
          case 3:
            conteo.d4[1]++;
            break;
          case 4:
            conteo.d4[1]++;
            break;
          case 5:
            conteo.d5[1]++;
            break;
        }
      }
      else if(it.digito=='2'){
        switch(i){
          case 0:
            conteo.d1[2]++;
            break;
          case 1:
            conteo.d2[2]++;
            break;
          case 2:
            conteo.d3[2]++;
            break;
          case 3:
            conteo.d4[2]++;
            break;
          case 4:
            conteo.d4[2]++;
            break;
          case 5:
            conteo.d5[2]++;
            break;
        }
      }
      else if(it.digito=='3'){
        switch(i){
          case 0:
            conteo.d1[3]++;
            break;
          case 1:
            conteo.d2[3]++;
            break;
          case 2:
            conteo.d3[3]++;
            break;
          case 3:
            conteo.d4[3]++;
            break;
          case 4:
            conteo.d4[3]++;
            break;
          case 5:
            conteo.d5[3]++;
            break;
        }
      }
      else if(it.digito=='4'){
        switch(i){
          case 0:
            conteo.d1[4]++;
            break;
          case 1:
            conteo.d2[4]++;
            break;
          case 2:
            conteo.d3[4]++;
            break;
          case 3:
            conteo.d4[4]++;
            break;
          case 4:
            conteo.d4[4]++;
            break;
          case 5:
            conteo.d5[4]++;
            break;
        }
      }
      else if(it.digito=='5'){
        switch(i){
          case 0:
            conteo.d1[5]++;
            break;
          case 1:
            conteo.d2[5]++;
            break;
          case 2:
            conteo.d3[5]++;
            break;
          case 3:
            conteo.d4[5]++;
            break;
          case 4:
            conteo.d4[5]++;
            break;
          case 5:
            conteo.d5[5]++;
            break;
        }
      }
      else if(it.digito=='6'){
        switch(i){
          case 0:
            conteo.d1[6]++;
            break;
          case 1:
            conteo.d2[6]++;
            break;
          case 2:
            conteo.d3[6]++;
            break;
          case 3:
            conteo.d4[6]++;
            break;
          case 4:
            conteo.d4[6]++;
            break;
          case 5:
            conteo.d5[6]++;
            break;
        }
      }
      else if(it.digito=='7'){
        switch(i){
          case 0:
            conteo.d1[7]++;
            break;
          case 1:
            conteo.d2[7]++;
            break;
          case 2:
            conteo.d3[7]++;
            break;
          case 3:
            conteo.d4[7]++;
            break;
          case 4:
            conteo.d4[7]++;
            break;
          case 5:
            conteo.d5[7]++;
            break;
        }
      }
      else if(it.digito=='8'){
        switch(i){
          case 0:
            conteo.d1[8]++;
            break;
          case 1:
            conteo.d2[8]++;
            break;
          case 2:
            conteo.d3[8]++;
            break;
          case 3:
            conteo.d4[8]++;
            break;
          case 4:
            conteo.d4[8]++;
            break;
          case 5:
            conteo.d5[8]++;
            break;
        }
      }
      else if(it.digito=='9'){
        switch(i){
          case 0:
            conteo.d1[9]++;
            break;
          case 1:
            conteo.d2[9]++;
            break;
          case 2:
            conteo.d3[9]++;
            break;
          case 3:
            conteo.d4[9]++;
            break;
          case 4:
            conteo.d4[9]++;
            break;
          case 5:
            conteo.d5[9]++;
            break;
        }
      }
    }
  }


  for(var i=0;i<numInmediato.length;i++){ //recorre  d1 ... d5
    for(var it of numInmediato[i]){ //recorre cada elemento en su digito correspondiente
      if(it.digito=='0'){ // si es cero buscara cual dx es y aumentara en array conteo [digito_considente]  +1
        switch(i){
          case 0:
            conteo.d1[0]++;
            break;
          case 1:
            conteo.d2[0]++;
            break;
          case 2:
            conteo.d3[0]++;
            break;
          case 3:
            conteo.d4[0]++;
            break;
          case 4:
            conteo.d5[0]++;
            break;
        }
      }
      else if(it.digito=='1'){
        switch(i){
          case 0:
            conteo.d1[1]++;
            break;
          case 1:
            conteo.d2[1]++;
            break;
          case 2:
            conteo.d3[1]++;
            break;
          case 3:
            conteo.d4[1]++;
            break;
          case 4:
            conteo.d4[1]++;
            break;
          case 5:
            conteo.d5[1]++;
            break;
        }
      }
      else if(it.digito=='2'){
        switch(i){
          case 0:
            conteo.d1[2]++;
            break;
          case 1:
            conteo.d2[2]++;
            break;
          case 2:
            conteo.d3[2]++;
            break;
          case 3:
            conteo.d4[2]++;
            break;
          case 4:
            conteo.d4[2]++;
            break;
          case 5:
            conteo.d5[2]++;
            break;
        }
      }
      else if(it.digito=='3'){
        switch(i){
          case 0:
            conteo.d1[3]++;
            break;
          case 1:
            conteo.d2[3]++;
            break;
          case 2:
            conteo.d3[3]++;
            break;
          case 3:
            conteo.d4[3]++;
            break;
          case 4:
            conteo.d4[3]++;
            break;
          case 5:
            conteo.d5[3]++;
            break;
        }
      }
      else if(it.digito=='4'){
        switch(i){
          case 0:
            conteo.d1[4]++;
            break;
          case 1:
            conteo.d2[4]++;
            break;
          case 2:
            conteo.d3[4]++;
            break;
          case 3:
            conteo.d4[4]++;
            break;
          case 4:
            conteo.d4[4]++;
            break;
          case 5:
            conteo.d5[4]++;
            break;
        }
      }
      else if(it.digito=='5'){
        switch(i){
          case 0:
            conteo.d1[5]++;
            break;
          case 1:
            conteo.d2[5]++;
            break;
          case 2:
            conteo.d3[5]++;
            break;
          case 3:
            conteo.d4[5]++;
            break;
          case 4:
            conteo.d4[5]++;
            break;
          case 5:
            conteo.d5[5]++;
            break;
        }
      }
      else if(it.digito=='6'){
        switch(i){
          case 0:
            conteo.d1[6]++;
            break;
          case 1:
            conteo.d2[6]++;
            break;
          case 2:
            conteo.d3[6]++;
            break;
          case 3:
            conteo.d4[6]++;
            break;
          case 4:
            conteo.d4[6]++;
            break;
          case 5:
            conteo.d5[6]++;
            break;
        }
      }
      else if(it.digito=='7'){
        switch(i){
          case 0:
            conteo.d1[7]++;
            break;
          case 1:
            conteo.d2[7]++;
            break;
          case 2:
            conteo.d3[7]++;
            break;
          case 3:
            conteo.d4[7]++;
            break;
          case 4:
            conteo.d4[7]++;
            break;
          case 5:
            conteo.d5[7]++;
            break;
        }
      }
      else if(it.digito=='8'){
        switch(i){
          case 0:
            conteo.d1[8]++;
            break;
          case 1:
            conteo.d2[8]++;
            break;
          case 2:
            conteo.d3[8]++;
            break;
          case 3:
            conteo.d4[8]++;
            break;
          case 4:
            conteo.d4[8]++;
            break;
          case 5:
            conteo.d5[8]++;
            break;
        }
      }
      else if(it.digito=='9'){
        switch(i){
          case 0:
            conteo.d1[9]++;
            break;
          case 1:
            conteo.d2[9]++;
            break;
          case 2:
            conteo.d3[9]++;
            break;
          case 3:
            conteo.d4[9]++;
            break;
          case 4:
            conteo.d4[9]++;
            break;
          case 5:
            conteo.d5[9]++;
            break;
        }
      }
    }
  }
  return conteo;

}
