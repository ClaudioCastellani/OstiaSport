var carrello = new Array();    /* carrello con gli acquisti. Vettore di oggetti contenenti codice, prezzo, quantita
                                           di ciascun prodotto */

var selezione;

function inizializza() {
/* se esiste un carrello aggiorna la variabile con il contenuto di localStorage */
  
   if (localStorage.carrello) {
        carrello = eval(localStorage.carrello);
   }
  
}

function serializza() {
/* trasforma il carrello in una stringa e lo memorizza mediante cookies (localStorage)
   nel disco del client */
   var cart = "[";
   var comma = "";
   for(i=0;i<carrello.length;i++) {
       cart = cart + comma; 
       cart = cart + " {codice : " + carrello[i].codice;
       cart = cart + ", taglia: '" + carrello[i].taglia + "'";
       cart = cart + ", descr: '" + carrello[i].descr + "'"; 
       cart = cart + ", prezzo : " + carrello[i].prezzo;
       cart = cart + ", qnt : " + carrello[i].qnt + "}";
       comma = ',';
   } 
   cart = cart + "]";
   delete localStorage.carrello;
   localStorage.carrello = cart; 
}

function cerca(cod) {
/* restituisce la posizione di un prodotto gia presente in carrello
   Se non esiste: 'N' */
   for (var i=0;i<carrello.length;i++) {
        if (carrello[i].codice == cod) {
            return(i);
        }
   }
   return("N");
}

function size(){
    const tagliaSelect = document.getElementById('tagliaSelect');
    tagliaSelect.addEventListener('change', function(){
        const selectedTaglia = this.value;
        console.log(selectedTaglia);
        return selectedTaglia;
        
        // tuaFunzione(selectedTaglia);
    });
}

function aggiungi(descrizione, prezzo) {
/* aggiunge un prodotto al carrello */
size();
   var ogg = {};
   var n = carrello.length;
   var x = cerca(cod);
   if (x == 'N') {     
       ogg.codice  = cambioCodice();
       ogg.taglia  = selezionaTaglia();
       ogg.descr   = descrizione;
       ogg.prezzo  = prezzo;
       ogg.qnt     = 1;
       carrello[n] = ogg;
   } else { 
       carrello[x].qnt++;
   }
   serializza();
   alert("prodotto aggiunto al carrello"); 
}
        
         
/* -------------------------- Funzioni per la pagina Carrello -----------------------------*/

      function totali () {
      /* calcola e visualizza i totali */
           
           var obj, tot=0, tp=0;
           for (i=0;i< carrello.length; i++) {
                var id = "t"+i;
                obj = document.getElementById(id);
                tp = carrello[i].prezzo * carrello[i].qnt;
                obj.innerHTML = tp;
                tot = tot + tp;
           }
           document.getElementById('totale').innerHTML = tot+"€";
          
      }

      function cambia(cella) {
      /* una delle quantita e' cambiata aggiorna le variabili */
          var label = "q"+cella; 
          var v   = document.getElementById(label).value;
          carrello[cella].qnt = v;
          serializza(); 
          totali();
      }

      function tabella() {
             document.write("<TABLE border=1><TH>Codice<TH>Taglia<TH>Descrizione<TH>prezzo<TH>Quantita<TH>Totale\n ");
             for(var i=0; i<carrello.length; i++) {
                 document.write("<TR><TD class=center>"+carrello[i].codice);
                 document.write("<TD> " + carrello[i].taglia);
                 document.write("<TD> " + carrello[i].descr);
                 document.write("<TD class=right>"+carrello[i].prezzo+"€");
                 document.write("<TD><input onChange=cambia(" + i + ") class=center id=q" + i + " type=text size=5 value= " + carrello[i].qnt + ">");
                 document.write("<TD class=right id=t"+i+">"+"&nbsp;\n"); 
             }
             document.write("<TR><TD colspan=6 align=right>Importo Ordine <TD class=right id=totale>€&nbsp\n");
             document.write("</TABLE>\n");            
      }

      function svuota() {
            delete localStorage.carrello;
            document.getElementById('elenco').innerHTML =
                                 "<TABLE border=1><TH>Codice<TH>prezzo<TH>Quantita<TH>Totale</TABLE>";            
      }



      function selezionaTaglia(){
       
            var selectElement = document.getElementById("tagliaSelect");
            selezione = selectElement.options[selectElement.selectedIndex].text;
            console.log(selezione);
            return selezione;
            // Puoi utilizzare la variabile 'selezione' come desideri
        }

        function cambioCodice(){
            switch(selezione){
                case 'XS':
                    cod = 1;
                    console.log(cod);
                    break;
                case 'S':
                    cod = 2;
                    break;
            }
            return cod;

        }