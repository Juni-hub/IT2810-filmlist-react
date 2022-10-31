# Prosjekt 3

## Beskrivelse av applikasjonen

Applikasjonen henter data fra en databasen og viser et utvalg filmer utgitt fra 1900 til i dag. Hver film vises på nettsiden som et kort og er beskrevet med tittel, utgivelsesår, rollebesetning og sjanger. Det er mulig å finne en ønsket film ved å filtrere på en enkelt eller en kombinasjon av disse verdiene. Videre er det mulig å sortere dataene i stigende eller synkende rekkefølge etter utgivelsesår. Det er også mulig for brukeren å legge til sine egne filmer i databasen. Hver film kan trykkes på for å vise mer informasjon.

### Krav til innhold
- Applikasjonen tillater å søke etter en film basert på tittel.
- Applikasjonen viser 15 filmer av gangen for å kunne håndere den store datamengden. Brukeren får opp flere filmer ved å bla videre nederst på siden.
- Applikasjonen gir mer detaljer om en gitt film ved å trykke på et filmkort.
- Applikasjonen tillater filtrering basert på sjanger og utgivelsesdato.
- Applikasjonen tillater sortering basert på stigende eller synkende utgivelsesdato.
- Applikasjonen gir brukeren mulighet til å legge til egne filmer.

## Kjøre prosjektet
For å kjøre applikasjonen må prosjektet først klones fra gitlab. 

Følgende kommandoer i terminalen for å starte serveren.
```
$ cd backend/web
$ npm install
$ npm run dev
```
Følgende kommandoer i terminalen for å starte React applikasjonen.
```
$ cd frontend/web
$ npm install
$ npm start
```
Etter å ha kjørt kommandoene vil applikasjonen kjøre på http://localhost:3000/.

## Backend
### Backend fil struktur
```
backend/web
├───models
│   │   Post.model.js
├───resolvers.js
├───typeDefs.js
└───index.ts
```

- `models` inneholder database schemaet, PostSchema, brukt til å definere feltene til et filmobjekt.
- `resolvers.js` inneholder funksjoner for graphql queries og mutations.
- `typeDefs.js` inneholder graphql typer for å definere hvilke types, queries og mutations som skal være med i applikasjonen.
- `index.js` starter serveren og kobler til databasen.

### Beskrivelse av bruk av teknologier
#### MongoDB

Gruppen har valgt å bruke en MongoDB database for å lagre data. MongoDB er en dokumentbasert database, noe som vil si at den lagrer data i et JSON-lignende format. For å kommunisere med databasen brukes biblioteket [mongoose](https://mongoosejs.com/docs/).

Gruppen definerer et Schema kalt PostSchema for å definere hvilke felter som skal være med i et Post (film) objekt. Bruk av slike Schema hjelper med å strukturere data og gjør det enklere å jobbe med. Feltene som benyttes er _id, title, year, cast og genres. _id og title er påkrevde felter. 

#### Express JS, GraphQL, Apollo Server

Gruppen bruker en Express-integrasjon av Apollo Server som sin GraphQL server. [GraphQL](https://graphql.org/) er et query språk som benyttes for å samhandle med databasen gjennom mongoose. Serveren sin hensikt er å eksponere endpointene som klienten kan kommunisere med.

Filen TypeDefs definerer de nødvendige typene, spørringene og mutasjonene som er nødvendige i GraphQL schemaet. Her definerer gruppen en type kalt Post, som definerer felter som skal være i hvert filmobjekt. Videre definerer vi en type kalt Query for å definere en funksjon for å hente ut ønsket data, samt en type kalt Mutation for å definere en funksjon for å lage ett nytt objekt.

Selve funksjonene for å hente eller endre dataen i databasen er skrevet i filen resolvers. Her er det laget en Query kalt getFilteredPosts, som brukes til å hente ut filtrert/ufiltreret data fra databasen. Denne funksjonen returnerer data avhengig av hvilke filter som tilføres. Det er mulig å filtrere på tittel, sjanger, rollebesetning og år, eventuelt en blanding av alle nevnte filter. Det er også mulig å sortere dataen basert på stigende eller synkende utgivelsesår.

Videre har gruppen skrevet en Mutation kalt createPost som legger til nye filobjekter i databasen. Filmobjektet må ha en tittel, men det er valgfritt om det har et årstall, rollebesetning eller sjanger.

## Frontend
### Frontend fil struktur
```
cypress
src
├───components
│   │   AddFilm.tsx
│   │   FilmItem.tsx
│   │   Films.tsx
├───helpers
├───queries
│   │   filmQueries.ts
├───redux
├───utils
│   │   Interfaces.ts
└───App.tsx
```

- `components` inneholder komponentene som brukes i applikasjonen.
- `helpers` inneholder hjelpefunksjoner.
- `queries` inneholder funksjoner for graphql queries og mutations.
- `redux` inneholder funktionalitet for å lagre og håndere data fra en Redux Store.
- `utils` inneholder interfaces brukt i applikasjonen.
- `App.stx` er root komponenten til applikasjonen.

### Beskrivelse av bruk av teknologier
#### React m/ Typescript

Applikasjonen bruker React for å lage UI komponentene som brukeren ser på nettsiden. React er implementert med Typescript, som er et programmeringsspråk bygget på JavaScript ved at det er lagt til statiske type definisjoner.

#### Apollo Client

Apollo Client brukes i React applikasjonen for å koble til GraphQL APIet. I komponenten Films kjører vi spørringer og mutasjoner med Apollo Client for å hente og endre data fra serveren.

#### Redux
Redux er et Javascript-bibliotek brukt for Local State Management i applikasjonen. Redux er brukt til å lagre filtrene brukeren har lagt inn.
#### Design komponenter (Antd, Bootstrap)

Gruppen har brukt React UI bibliotekene Ant Design og Bootstrap for å designe nettsiden. Ant Design er et bibliotek som tilbyr pene og enkle React-komponenter. Vi har hovedsakelig brukt komponentene Card, Modal og Button, samt komponenter for de ulike inputfeltene.

Bootstrap brukes hovedsakelig til å style komponentene med inline css i className. Det brukes blant annet for å lettere definere padding og margin for hver komponent. 

### Testing
Prosjektet er testet ved bruk av Cypress for ende-til-endetesting og Jest for komponenttesting. 
#### End-2-end testing
For å teste med Cypress må man først starte serveren og applikasjonen (se punkt lenger oppe). Deretter skriver man følgende kommandoer i terminalen for å starte Cypress-testen.
```
$ cd frontend/web
$ npx cypress run
```
#### Jest

## Diskusjon

### Universell utforming

Universell utforming handler om at applikasjoner skal lages på en måte som gjør de tilgjengelige for alle, uavhengig av faktorer som alder, funksjonsevne eller utdanningsnivå. 

Web Content Accessibility Guidelines (WCAG) er en standard for å sikre universell utforming på nettsider. Retningslinjene er bygget opp av fire prinsipper. Under listes prinsippene og tiltakene gruppen har gjort for å sikre at de følges.  

1. Mulig å oppfatte: Innhold presenteres for brukerene på måter de kan oppfatte.
- Alt innhold og deres funksjonalitet er beskrevet og presentert for brukeren
- Layouten til nettsiden er tilpasset alle skjermer uten at informasjon eller struktur går tapt
- Farge og fargekontraster er brukt på en måte som gjør innholdet synlig og tilgjengelig for alle brukere.

2. Mulig å betjene: Innholdet skal være mulig å betjene uavhengig av hvordan brukeren navigerer.
- Alt innhold er tilgjengelig uavhengig av utstyr som brukeren har (tastatur, mus, etc.)

3. Forståelig: Innholdet på er forståelig
- Gjennomtenkt bruk av font, tekststørrelse og farger
- Lettlest og forståelig språkbruk
- Forklarende tekster til innhold

4. Robust: Innhold fungerer uavhengig av hjelpemidler du bruker 
- Innholdet er kompatibel med og testet på ulike nettlesere (Safari, Chroome, Firefox). Det brukes ikke komponenter som ikke støttes av alle nettlesere.

### Bærekraftig utvikling

Nettsiden benytter pagination og laster kun inn deler av innholdet (15 elementer) til en hver tid. Brukeren kan selv velge om de ønsker å laste inn mer innhold når de har sett alle elementene. Dette gir generelt sett lavere datatrafikk ettersom brukeren mest sannsylig ikke trenger gå igjennom alle objektene.

Videre benyttes Redux som en cache for å effektivisere data som hentes og unngå unødvendige kall til serveren.

Komponentene på nettsiden er minimale, men hensiktsmessige for å formidle innholdet til brukeren. Gruppen bruker verken bilder, videoer eller GIFs da disse krever mye datatrafikk og energibruk på klient. 

Videre er nettsiden laget med dark mode. Dette er på grunn av at mørkere farger krever mindre energi og er av resultat mer miljøvennlig enn bruken av lysere farger.