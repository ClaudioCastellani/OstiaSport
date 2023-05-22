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
        if (carrello[i].codice == cambiaCodice(cod)) {
            return(i);
        }
   }
   return("N");
}

function size() {
    const tagliaSelect = document.getElementsByClassName('tagliaSelect');
    for (let i = 0; i < tagliaSelect.length; i++) {
        tagliaSelect[i].addEventListener('change', function () {
            const selectedTaglia = this.value;
            console.log(selectedTaglia);
            return selectedTaglia;

            // tuaFunzione(selectedTaglia);
        });
    }
}

function cambiaCodice(cod) {
    var ciao = selezionaTaglia();
    switch (ciao) {
        case 'XS':
            cod = cod + "10000";
            break;
        case 'S':
            cod = cod + "01000";
            break;
        case 'M':
            cod = cod + "00100";
            break;
        case 'L':
            cod = cod + "00010";
            break;
        case 'XL':
            cod = cod + "00001";
            break;
    }
    return cod;
}


function aggiungi(cod, descrizione, prezzo) {
/* aggiunge un prodotto al carrello */

size();

   var ogg = {};
   var n = carrello.length;
   var x = cerca(cod);
   if (x == 'N') {     
       ogg.codice  = cambiaCodice(cod);
       ogg.taglia  = selezionaTaglia();
       ogg.descr   = descrizione;
       ogg.prezzo  = prezzo;
       ogg.qnt     = 1;
       carrello[n] = ogg;
       
   } else { 
       carrello[x].qnt++;
       
   }
   updateCartCount();
   serializza();
   
   //alert("prodotto aggiunto al carrello"); 
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

      var selezione;
var num;

      function selezionaTaglia() {
        var selectElements = document.getElementsByClassName("tagliaSelect");
        //  selezione=selectElements[1].options[selectElements[1].selectedIndex].text;
        
        for (let i = 0; i < selectElements.length; i++) {
            if(selectElements[i].options[selectElements[i].selectedIndex].text !== "Scegli una taglia:"){
                num = i;
                selezione = selectElements[num].options[selectElements[num].selectedIndex].text;
                
                break;
            }
        //   selectElements[i].addEventListener('change', function() {
        //     var selezionato = selectElements[i].options[selectElements[i].selectedIndex].text;
        //     selezione = selezionato;
        //     console.log(selezione);
        //     return selezione;
        //     // Puoi utilizzare la variabile 'selezione' come desideri
        //   });
          
        }
        resetSelect(num);
        //resetSelect(num);
        return selezione;
        // Rimuovi il codice seguente dal ciclo for


      }


      function resetSelect(num) {
        var selects = document.getElementsByClassName('tagliaSelect');
        selects[num].selectedIndex = 0;
    }


      

        



// Assume che tu abbia un array di oggetti nel carrello chiamato "cartItems"
var quantita=0;
var sommaQuantita=0;
// Funzione per aggiornare il conteggio del carrello
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    for(let i=0; i<carrello.length; i++){
        quantita = parseInt(carrello[i].qnt);
        sommaQuantita += quantita;
        
    }
    console.log(carrello.length);
    cartCountElement.innerText = sommaQuantita;
    quantita=0;
    sommaQuantita=0;
}

// Esegui la funzione per impostare il conteggio iniziale all'avvio
updateCartCount();
