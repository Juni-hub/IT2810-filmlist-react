# Prosjekt 3

Applikasjonen henter data fra en databasen og viser et utvalg filmer utgitt fra 1900 til i dag. Hver film er beskrevet med tittel, utgivelsesår, rollebesetning og sjanger. Det er mulig å finne en ønsket film ved å filtrere på en enkelt eller en kombinasjon av disse verdiene. Videre er det mulig å sortere dataene i stigende eller synkende rekkefølge etter utgivelsesår. Det er også mulig for brukeren å legge til sine egne filmer i databasen. Hver film kan trykkes på for å vise mer informasjon.

## Kjøre prosjektet
For å kjøre applikasjonen må prosjektet først klones fra gitlab. 

Følgende kommandoer i terminalen for å starte serveren.
```
$ cd backend/web
$ npm install
$ npm run dev
```
Følgende kommandoer i terminalen for å starte react applikasjonen.
```
$ cd frontend/web
$ npm install
$ npm start
```
Etter å ha kjørt kommandoene vil applikasjonen kjøre på http://localhost:3000/.

## Backend

### Structure
- **/backend/web**: Inneholder resolvers og typeDefs for å definere hvordan data skal håndteres fra databasen. </br>
    - **/models**: Inneholder mongoose Schemaet Post.Model.js som definerer hvile felter som et filmobjekt består av i databasen. </br>

### MongoDB

Gruppen har valgt å bruke en MongoDB database for å lagre data. Gruppen definerer et Schema kalt PostSchema for å definere hvilke felter som skal være med i et Post (film) objekt. Feltene som benyttes er _id, title, year, cast og genres. _id og title er påkrevde felter. 

### Express JS, GraphQL, Apollo Server

Gruppen bruker en Express-integrasjon av Apollo Server som sin GraphQL server. GraphQL er query språket som benyttes for å samhandle med databasen. 

Filen TypeDefs definerer de nødvendige typene, spørringene og mutasjonene som er nødvendige i GraphQL schemaet. Her definerer gruppen en type kalt Post, som definerer felter som skal være i hvert filmobjekt. Videre definerer vi en type kalt Query for å definere en funksjon for å hente ut ønsket data, samt en type kalt Mutation for å definere en funksjon for å lage ett nytt objekt.

Selve funksjonene for å hente eller endre dataen i databasen er skrevet i filen resolvers. Her er det laget en Query kalt getFilteredPosts, som brukes til å hente ut filtrert/ufiltreret data fra databasen. Denne funksjonen returnerer data avhengig av hvilke filter som tilføres. Det er mulig å filtrere på tittel, sjanger, rollebesetning og år, eventuelt en blanding av alle nevnte filter. Det er også mulig å sortere dataen basert på stigende eller synkende utgivelsesår.

Videre har gruppen skrevet en Mutation kalt createPost som legger til nye filobjekter i databasen. Filmobjektet må ha en tittel, men det er valgfritt om det har et årstall, rollebesetning eller sjanger.

## Frontend

### Structure
- **/frontend/web**: 
    - **/src**: 
        - **/components**: Inneholder alle komponentene som brukes i applikasjonen
        - **/helpers**: Inneholder hjelpefunksjoner som brukes i applikasjonen
        - **/queries**: Inneholder alle queries som brukes for å hente data fra serveren.
        - **/redux**: Inneholder filene actions og store som spesifiserer redux og funksjonene som kan brukes til å samhandle med redux.
        - **/utils**: Inneholder Interfaces brukt i frontend

### React m/ Typescript

Applikasjonen bruker React for å lage UI komponentene som brukeren ser på nettsiden. React er implementert med Typescript, som er et programmeringsspråk bygget på JavaScript ved at det er lagt til statiske type definisjoner.

### Apollo Client

Apollo Client brukes i React applikasjonen for å koble til GraphQL APIet. I komponenten Films kjører vi spørringer og mutasjoner med Apollo Client for å hente og endre data fra serveren.

### Redux

### Design komponenter (Antd, Bootstrap)

Gruppen har brukt React UI bibliotekene Ant Design og Bootstrap. Ant Design er et bibliotek som tilbyr pene og enkle React-komponenter. Bootstrap brukes hovedsakelig til å style komponentene. Blant annet ved å definere padding og margin. 

## Testing

### End-2-end testing

### Jest

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