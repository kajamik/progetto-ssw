# Progetto: Sviluppo di Servizi Web
## Autore: Pietro Paolo Carpentras
### ultima release: 9/06/2021
[Personal Web Site](https://www.paolocarpentras.it)

Chiave di prova: f7fd028e

L'applicazione composto di due componenti, App e Post, un service, Post, e un'interfaccia Post.

app.component.ts è il file che viene avviato per primo e al suo interno contiene:

- posts: è un array di oggetti, al suo interno contiene i post che poi vengono visualizzati all'interno dell'applicazione
- key: è una variabile dove al suo interno viene registrate la chiave inserita dall'utente o generata casualmente.
- inviaChiave(key: string = null) è una funzione, se key è null la chiave viene generata casualmente, altrimenti vengono visualizzati già da subito i post associati alla chiave passata in input.

Inizialmente, quando la variabile 'key' non è ancora stata inizializzata, all'utente verrà chiesto di inserire la chiave, se conosciuta, oppure di generarla casualmente con l'apposito bottone. Questa sua inizializzazione permetterà all'utente di accedere al secondo componente.

post.component.ts è il file che viene avviato quando la key è stata inizializzata, è composto di:

- decorazioni @Input() che servono per recuperare i valori dal componente padre (app.component.ts), valori passati attraverso la View.
- creazione_post e post_visualizzato che sono due variabili che mi consentono di effettuare delle operazioni sul lato della View, ma che non non sono necessarie al funzionamento dell'applicazione.
- visualizzaPost(): funzione non necessaria al funzionamento dell'applicazione.
- creaPost(titolo: string, contenuto: string, importante: string): funzione che crea un nuovo oggetto e lo inserisce all'interno dell'array posts, chiamando il servizio post.service.ts effettua un'operazione sul Model.
- eliminaPost(id: number): funzione che elimina l'oggetto contenuto all'interno di posts in id posizione e, chiamando il servizio post.service.ts effettua un'operazione sul Model.

post.service.ts è il file servizio che mi consente di richiamare il Model attraverso l'utilizzo di API REST.

getData(key: string, callback: any): richiamo la API usando il metodo GET; la funzione prende due parametri, una stringa 'key' e valore any 'callback'.
sendData(key: string, msg: {}): richiamo la API usando il metododo POST; la funzione prende in input due parametri, una stringa 'key' e un oggetto 'msg', che successivamente verrà convertito in stringa con JSON.stringify().

P.S: Una volta chiesta una nuova chiave, viene visualizzata nell’interfaccia utente.
