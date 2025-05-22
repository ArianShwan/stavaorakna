# Stava o Räkna

# 🎓 Lärspel för Barn - Stavning & Räkning

Ett interaktivt pedagogiskt spel designat för att hjälpa barn lära sig stava och räkna på ett roligt och engagerande sätt.

![Spel Demo](docs/demo-image.png) <!-- Lägg till en skärmdump av ditt spel här -->

## 🌟 Funktioner

### 📝 Stavningsspel
- **Interaktiv stavning** med bilder som visuella ledtrådar
- **Slumpmässig ordning** för varierad spelupplevelse
- **Automatiska ledtrådar** efter 10 sekunder för att hjälpa barn
- **Progressindikator** som visar framsteg genom orden
- **Responsiv avatar** som reagerar på rätt/fel svar
- **Tangentbordsstöd** för både skärmtangentbord och fysiskt tangentbord

### 🔢 Räknespel
- **Visuell matematik** med emoji-objekt för enklare förståelse
- **Addition och subtraktion** anpassat för barn
- **Tre svarsalternativ** per fråga
- **Interaktiva animationer** som visar matematiska operationer
- **Poängräkning** och resultatvisning

### 🎨 Design & Användarupplevelse
- **Responsiv design** som fungerar på datorer, surfplattor och mobiler
- **Barnvänligt gränssnitt** med stora knappar och tydliga färger
- **Animerade avatarer** som ger feedback och uppmuntran
- **Intuitivt navigeringssystem** mellan olika spellägen

## 🚀 Komma igång

### Förutsättningar
- Node.js (version 16 eller senare)
- npm eller yarn

### Installation

1. **Klona repositoriet**
   ```bash
   git clone https://github.com/ArianShwan/stavaorakna.git
   cd stavaorakna
   ```

2. **Installera beroenden**
   ```bash
   npm install
   ```

3. **Starta utvecklingsservern**
   ```bash
   npm start
   ```

4. **Öppna webbläsaren**
   ```
   http://localhost:3000
   ```

## 🏗️ Projektstruktur

```
projekt/
├── public/                 # Statiska filer
│   ├── css/
│   │   └── style.css      # Huvudstylmall
│   ├── images/            # Spelbilder
│   │   ├── cat.png
│   │   ├── dog.png
│   │   └── ...
│   └── js/
│       ├── game.js        # Stavningsspel logik
│       ├── math.js        # Räknespel logik
│       └── start.js       # Startsida funktionalitet
├── views/                 # EJS-mallar
│   ├── index.ejs         # Startsida
│   ├── stava.ejs         # Stavningsspel
│   └── rakna.ejs         # Räknespel
├── tests/
│   └── game.test.js      # Jest-tester
├── app.js                # Express-server
├── package.json
└── README.md
```

## 🧪 Testning

### Köra tester
```bash
# Kör alla tester
npm test

# Kör tester i watch-läge
npm run test:watch

# Kör kodkvalitetsanalys
npm run lint
```

### Testomfattning
- Slumpmässig ordning av ord
- Stavningsvalidering
- Grundläggande matematikoperationer
- Användarinteraktionslogik

## 🚀 Deployment

### Automatisk CI/CD med GitLab
Projektet använder GitLab CI/CD för automatiserad testning och deployment:

1. **Install stage**: Installerar alla beroenden
2. **Test stage**: Kör kodkvalitetsanalys och automatiserade tester
3. **Build stage**: Skapar produktionsredo versioner av filerna
4. **Deploy stage**: Deployer till staging/produktion (manuell för produktion)

### Manuell deployment
```bash
# Bygg projektet
npm run build

# Starta i produktionsläge
NODE_ENV=production npm start
```

## 🔧 Konfiguration

### Miljövariabler
```bash
PORT=3000                 # Serverport (standard: 3000)
NODE_ENV=development      # Utvecklings/produktionsläge
```

### Anpassa spelet
- **Lägg till nya ord**: Uppdatera `words`-arrayen i `public/js/game.js`
- **Ändra svårighetsgrad**: Modifiera `maxNumber` i `public/js/math.js`
- **Nya bilder**: Lägg till PNG-filer i `public/images/`

## 📱 Webbläsarstöd

- ✅ Chrome (senaste 2 versioner)
- ✅ Firefox (senaste 2 versioner)
- ✅ Safari (senaste 2 versioner)
- ✅ Edge (senaste 2 versioner)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 8+)

## 🎯 Pedagogiska mål

### Stavningsspel
- Utveckla bokstavsigenkänning
- Förbättra stavningsförmåga
- Öka ordförrådet
- Träna finmotorik genom tangentbordsanvändning

### Räknespel
- Grundläggande addition och subtraktion
- Visuell talförståelse
- Problemlösningsförmåga
- Numerisk igenkänning

## 🤝 Bidrag

Vi välkomnar bidrag till projektet! Så här kan du hjälpa till:

1. **Forka** repositoriet
2. **Skapa** en feature-branch (`git checkout -b feature/AmazingFeature`)
3. **Committa** dina ändringar (`git commit -m 'Add some AmazingFeature'`)
4. **Pusha** till branchen (`git push origin feature/AmazingFeature`)
5. **Öppna** en Pull Request

### Utvecklingsriktlinjer
- Följ befintlig kodstil (använd ESLint)
- Skriv tester för nya funktioner
- Uppdatera dokumentationen vid behov
- Testa på olika enheter innan du skickar in

## 📝 Licens

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE) filen för detaljer.

## 👨‍💻 Författare

- **Arian Shwan** - [ArianShwan](https://https://github.com/ArianShwan)

## 🙏 Erkännanden

- Inspirerat av moderna pedagogiska metoder för barn
- Emoji-ikoner från [OpenMoji](https://openmoji.org/)
- Responsiv design inspirerad av material design-principer

## 📞 Support

Har du frågor eller problem? Skapa gärna ett [issue](https://github.com/ArianShwan/stavaorakna/issues) eller kontakta oss på [as228xs@student.lnu.se](mailto:as228xs@student.lnu.se).

## 🔮 Framtida funktioner

- [ ] Flerspråksstöd (engelska, tyska, etc.)
- [ ] Ljudeffekter och bakgrundsmusik
- [ ] Svårighetsgrader (lätt, medium, svår)
- [ ] Framstegsrapporter för föräldrar/lärare
- [ ] Fler matematikoperationer (multiplikation, division)
- [ ] Användarprofilsystem
- [ ] Offline-läge med Service Workers
- [ ] Tillgänglighetsförbättringar (ARIA-etiketter, tangentbordsnavigering)

---

⭐ **Gillar du projektet? Ge det en stjärna på GitHub!** ⭐