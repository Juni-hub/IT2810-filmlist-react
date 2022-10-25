# Prosjekt 3

Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).

## Backend

### MongoDB

Gruppen har valgt å bruke en MongoDB database for å lagre data. 

### Express JS, GraphQL, Apollo Server

For å samhandle med databasen benyttes query språket GraphQL i APIet.

Filen TypeDefs definerer de nødvendige typene, spørringene og mutasjonene som er nødvendige i GraphQL schemaet. 

Her definerer gruppen en type kalt Post, som definerer felter som skal være i hvert filmobjekt. Videre definerer vi en type kalt Query for å definere en funksjon for å hente ut ønsket data, samt en type kalt Mutation for å definere en funksjon for å lage ett nytt objekt.

Selve funksjonene for å hente eller endre dataen i databasen er skrevet i filen resolvers. 

Her er det laget en Query kalt getFilteredPosts, som brukes til å hente ut filtrert/ufiltreret data fra databasen. Denne funksjonen returnerer data avhengig av hvilke filter som tilføres. Det er mulig å filtrere på tittel, sjanger, rollebesetning og år, eventuelt en blanding av alle nevnte filter. Det er også mulig å sortere dataen basert på stigende eller synkende utgivelsesår.

Videre har gruppen skrevet en Mutation kalt createPost som legger til nye filobjekter i databasen. Filmobjektet må ha en tittel, men det er valgfritt om det har et årstall, rollebesetning eller sjanger.

## Frontend

### React m/ Typescript

### Apollo Client

### Redux

### Design komponenter (Antd, Bootstrap)