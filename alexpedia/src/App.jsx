import { useState, useEffect } from 'react'

const MENU = [
  { id: 'top', label: 'Góra' },
  { id: 'karta', label: 'Karta' },
  { id: 'wyglad', label: 'Wygląd' },
  { id: 'backstory', label: 'Backstory' },
  { id: 'poczatek-konca', label: 'Początek Końca' },
  { id: 'koniec', label: 'Koniec' },
  { id: 'galeria1', label: 'Zdjęcia' },
  { id: 'galeria2', label: 'Filmy' },
  { id: 'kontakt', label: 'Kontakt' },
]
const INTRO = ['Intro.mp4']
const PHOTOS = [
  'zdj1.png', 'zdj2.jpg', 'zdj3.jpg', 'zdj4.jpg',
  'zdj5.jpg', 'zdj6.jpg', 'zdj7.jpg', 'zdj8.jpg',
]

// rozjebana.mp4, vid2.mp4 ... vid15.mp4
const VIDEOS = [
  'rozjebana.mp4',
  ...Array.from({ length: 14 }, (_, i) => `vid${i + 2}.mp4`),
]

// ---------- RPG CHARACTER SHEET ----------
const PROFILE = [
  ['Imię', 'Alex Daszkiewicz'],
  ['Klasa', 'Wartownik Magazynowy'],
  ['Rasa', 'Grubas Pospolity (horyzontalny)'],
  ['Poziom', '20 (mentalnie 12)'],
  ['Charakter', 'Gruby zjeb'],
  ['Gildia', 'ESO Gooners'],
]

const BARS = [
  { label: 'IQ', val: '12 / 120', pct: 12, cls: 'hp', note: '' },
  
]

const STATS = [
  { name: 'KUTAS', v: 2},
  { name: 'ZRĘCZNOŚĆ', v: 0, note: 'xd' },
  { name: 'McDonalds', v: 100, note: 'McFat' },
  { name: 'Decybele', v: 400, },
  
]

const GEAR = [
  'Sztuczna Cipa',
  'Chuj w dupie',
  
]

const SKILLS = [
  'xddddd'
]

const WEAKNESS = [
  'osiągnięcia'
]

function App() {
  const [active, setActive] = useState('top')
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [zoom, setZoom] = useState(null)
  const [visits, setVisits] = useState(null)


  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0)
      setShowTop(y > 400)

      let current = 'top'
      for (const { id } of MENU) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 180) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // visitor counter (stored in this browser only)
  useEffect(() => {
    try {
      const key = 'alexpedia-visits'
      let n = Number(localStorage.getItem(key)) || 1336
      if (!sessionStorage.getItem('alexpedia-counted')) {
        n += 1
        localStorage.setItem(key, String(n))
        sessionStorage.setItem('alexpedia-counted', '1')
      }
      setVisits(n)
    } catch {
      setVisits(1337)
    }
  }, [])

  // lightbox: close with Esc, lock page scroll while open
  useEffect(() => {
    if (!zoom) return
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(null)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [zoom])

  // click any image in the page to enlarge it
  const onPageClick = (e) => {
    if (e.target.tagName === 'IMG') setZoom(e.target.src)
  }

  // only one video plays at a time
  const pauseOthers = (e) => {
    document.querySelectorAll('video').forEach((v) => {
      if (v !== e.target) v.pause()
    })
  }

  return (
    <>
      <div id="top" />

      <header className="topbar">
        <h1>Alexpedia</h1>
        <h3>
          <i>
            <span className="blink">❤️</span> All your Alex Daszkiewicz fantasies <span className="blink">❤️</span>
            <br></br>

          </i>
          <br></br>
        </h3>
        <div className="progress" style={{ width: `${progress}%` }} />
      </header>

      <nav className="sidemenu">
        <div className="sidemenu-title">Menu</div>
        <ul>
          {MENU.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container page" onClick={onPageClick} onPlayCapture={pauseOthers}>
        <h1>Alex Daszkiewicz</h1>
        
        <video src={`/videos/${INTRO[0]}`} className="vidInsert3" controls preload="metadata" playsInline />

        {/* ---------- RPG CHARACTER SHEET ---------- */}
        <section className="rpg" id="karta">
          <div className="rpg-title">⚔ Alex.exe — Karta Postaci</div>

          <div className="rpg-body">
            <dl className="rpg-profile">
              {PROFILE.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="rpg-bars">
              {BARS.map((b) => (
                <div className="rpg-row" key={b.label} title={b.note}>
                  <div className="rpg-rowhead">
                    <span>{b.label}</span>
                    <span>{b.val}</span>
                  </div>
                  <div className="rpg-bar">
                    <i className={b.cls} style={{ '--v': `${b.pct}%` }} />
                  </div>
                  <small>{b.note}</small>
                </div>
              ))}
            </div>

            <h4 className="rpg-h">— Atrybuty —</h4>
            <div className="rpg-stats">
              {STATS.map((s) => (
                <div className="rpg-stat" key={s.name} title={s.note}>
                  <div className="rpg-rowhead">
                    <span>{s.name}</span>
                    <span>{s.v}</span>
                  </div>
                  <div className="rpg-bar">
                    <i className="stat" style={{ '--v': `${(s.v / 20) * 100}%` }} />
                  </div>
                  <small>{s.note}</small>
                </div>
              ))}
            </div>

            <div className="rpg-lists">
              <div>
                <h4 className="rpg-h">Ekwipunek</h4>
                <ul>{GEAR.map((g) => <li key={g}>{g}</li>)}</ul>
              </div>
              <div>
                <h4 className="rpg-h">Umiejętności</h4>
                <ul>{SKILLS.map((g) => <li key={g}>{g}</li>)}</ul>
              </div>
              <div>
                <h4 className="rpg-h">Słabości</h4>
                <ul>{WEAKNESS.map((g) => <li key={g}>{g}</li>)}</ul>
              </div>
            </div>

            <p className="rpg-achv">
              🏆 <b>Osiągnięcie odblokowane:</b> „Burak Domowy”. Największe osiągnięcie życia (1/1).
            </p>
          </div>
        </section>

        <div className="container2">
          <h1 id="wyglad">Wygląd</h1>
          <img src="/images/w1.jpg" className="imgInsert2" alt="" />
          <p>
            <b>Alex Daszkiewicz</b> to sporych (horyzontalnie) rozmiarów męszczyzna(?) w wieku 20 lat, mentalnie mając lat 12. Ma on szacowaną ilość trzech podbródków, solidnie owłosiony bebech, i takie mętne ogłupiałe oczy i śliniący sie głupi ryj, zdolny do wydawania dźwięków o zaskakujących decybelach.
          </p>
          <img src="/images/w2.jpg" className="imgInsert2" alt="" />
          <p>
            Przyglądając się bliżej, można stwierdzić że osobnik ten głównie składa się z gówna, chodź jego odór uniemożliwia przeprowadzenie dokładniejszych badań. Ma on tłuste przedzielone włosy, głupi tłusty ryj, z zaniedbanym dziewiczym zarostem.
            Z uczu sączy mu się dziwny śluz, a średnice i obwód brzucha można by porównać do hula hop, w którym kiedys utknął. Nosi on okulary, jednak jest to tylko do stworzenia pozoru posiadania większej ilości IQ niż zębów.
          </p>

          <h1 id="backstory">Backstory</h1>
          <img src="/images/crib.jpg" className="imgInsert2" alt="" />
          <p>
            <b>Alex Daszkiewicz</b> urodził sie przez przypadek prawdopodobnie w walentynki w 2006 roku.
            Nie dużo wiadomo o jego wczesnym dzieciństwie, poza tym że dokuczali mu w szkole za buty czy coś i że poznał wtedy swoją przyszłą właścicielkę, którą nazwiemy ZS.
            Jednak w 2021 roku zaczął uczyć się w klasie programistycznej w PSR, starając się o tytuł technika, co zjebał nie zdając pierwszego egzaminu zawodowego, i uznając że tytuł jest do dupy, i dając start swojej pętli słomianego zapału.
          </p>
          <p>
            W drugiej klasie nawiązał lepszy kontakt z niejakim KS, który stał sie jego największym przyjacielem, który akurat zdał egzamin zawodowy.
            W trzeciej klasie natomiast, poznał też innych przyjaciół KS, niniejszym: KP, KK i AJ.
            Alex, KS i KK założyli śmieszkowy zespół rapowy, pod pseudonimem Hoggers. Jeden z tekstówm autorstwa Alexa to "Burak Domowy":
          </p>

          <div className="container3 lyrics">
            <p>
              <i>"Wstaję jak co dzień. rano strzała zdążyła przebić mi kolano. Bywałem kiedyś jak typ podróżnikiem, ale ostatecznie zostałem wartownikiem. W domu siedzę z wyjebanym dickiem. nic do robienia, tylko onanizacja przez screenę. Mówili o ganisie i do roboty. ja wolę w Headdivers pozabijać se roboty. Codziennie oglądam na compie śmieszne koty. kolejna puszka piwa umieszczana do mega bloty Na internecie. wygaduję ludziom. głupoty śmierdzą mi stopy. Dawno się nie myłem. żadna kobieta nie dotknęła by mnie nawet kijem. Odżywiam się pomyjem. nie wspomnę o jebiącym gównym ryjem Śmierdzi, tak że każdy od pokoju cofa się tyłem. Chyba złe nawyki se w głowę wkręciłem ja. Siusia gówno jaja cese, wielka sraka, Wszyscy, łapy do góry. czas wytarł mosi. ptaka. Od masopacji zaczęła puchnąć mi armata. Sperma o poduchę już dawno jest wytarta. e Siusia gudno jaja cice, wielka sraka, Wszyscy, łapy do góry. czas wytarmosić ptaka. Od masturbacji zaczęła puchnąć mi armata. Sperma o poduchę już dawno jest wytarta. Korpus gnije od środka. pod fałdami znajdziesz grzyba zarodka. Kolejna zwrotka: każda kobieta przede mną chowa kotka. Mój butas od braku higieny pachnie jak szprotka. Wkładam wstyd do worka. Kiedyś publicznie ze stresu przed kasjerką zrobiłem klocka. Więcej z domu nie wyjdę, bo wszędzie czeka mnie obciach Na oczach. bez ćwiczeń chudnę w łokciach, Za to prawą ręką mam niezły rozma. ciemnościach mojego pokoju po cichu szlocham mówią mi, że ja to chami prosta. kiedy zamawiam pizzę telefonicie, to się czasem obsram. w szkole każdy robi ze mnie osła. Moja matka zawsze była dla mnie wyniosła. raz mnie tak pobiła, że mi się ręka nie zrosła. moje włosy są tak tuste, jakbyś dotykał wodorosta. moja linia kręgosłupa nie jest prosta. Ojciec zawsze w domu siał po strach. wyszedł po mleko. reszta rozeszła się po łokcia. Siusia gówno jaja cice wielka sraka. wszyscy łapy do góry. czas wytarmosić ptaka od masturbacji zaczęła puchnąć mi armata sperma o poduchę. już dawno jest wytarta. Siusia gówno jaja cice wielka sraka. wszyscy łapy do góry. czas wytarmosić ptaka od masturbacji. zaczęła puchnąć mi armata sperma o poduchę. już dawno jest wytarta. Moral, informatyczka, jest nam znany. "</i>
            </p>
          </div>

          <p>
            <b>Alex Daszkiewicz</b> nie wiedział jeszcze, że ten horendalny tekst to będzie największe osiągnięcie jego życia.<br />
            Alex często próbował brac udział w projektach KS, któremu potem wyjawił że był jego idolem. KS robił różne projekty poza Hoggers, takie jak głównie gry na Roblox. KS założył całe amatorskie studio "Stratton Oakmont Studios", które stworzyło kilka projektów takich jak Mortal Arena, Hardcore Life Sim, Serenity RPG które odniosło dośc spory sukces,
            tak jak i fangame Fnafa, i wiele innych mniejszych projektów na i poza Robloxem. Alex "brał udział" w każdym z nich, ale jedyne co de fakto zrobił, to kawałek mapy do Hardcore Life Sim, i kawałek mostu obecnego w jednym segmencie Serenity RPG.
            Alex zaczynał nad czyms pracę, mega się tym jarał, po czym mu się to nudziło, mówił KS że nikt ma tego nie ruszać, i że on to dokończy, po czym nie ruszał tego miesiącami, bo wolał grac w gry, po czym był zły na KS, za dokończenie tego samemu.
          </p>

          <h2 id="poczatek-konca">Początek Końca</h2>
          <img src="/images/gaming.jpg" className="imgInsert2" alt="" />
          <p>
            Alex zaczął urajać sobie w głowie, że każdy myśli że jest od niego lepszy. Miał problem do KS i KP za bycie lepszymi w wielu dziedzinach, pomimo tego że miał wszystkie narzędzia i szansę na to aby samemu sie tymi rzeczami zająć.
            Alex bardzo chciał miec jakieś hobby albo cokolwiek poza siedzeniem na piździe, jednak nie chciał w to wkładać absolutnie żadnej pracy, zawsze odkłądając to na kiedy indziej, bo ekonomia jego postaci w grze sama się nie zbuduje.
            Granie z nim w gry zaczęło być nie do zniesienia. Każda śmierć w CSie albo Helldivers 2 kończyła się NIESAMOWITYM DARCIEM JEGO PASKUDNEGO RYJA. Najczęstsze teksty to:
          </p>
          <ul>
            <li>NIE DA SIĘ W TO KURWA GRAĆ</li>
            <li>NO TA GRA ROZJEBANA JEST KURWA</li>
            <li>NIE NO JA SIE ZAPIERDOLE ZARAZ</li>
            <li>NAPRAWCIE TĄ GRĘ KURWA</li>
            <li>NIE NO OCZYWIŚCIE JA JEDYNY COS TU ROBIĘ KURWA</li>
          </ul>
          <p>
            Warto zauważyć że zazwyczaj jego śmierć w grze wynikała z tego że myślał iż jest lepszy niż faktycznie był.
            Zazwyczaj sesja grania z Alexem sprowadzała sie do kilku faz:
          </p>
          <ul>
            <li>Mówienie że dobra nie bierzemy tej gry na poważnie</li>
            <li>branie gry bardzo na poważnie</li>
            <li>Wydzieranie pizdy (patrz teksty powyżej)</li>
            <li>matka wchodzi do pokoju i każe mu wyłączyć</li>
            <li>Wyzywanie i krzyczenie na matkę</li>
            <li>Udawanie że jednak go nie obchodzi ta gierka, i niszczenie nam gierki, zabijając nas i psucie każdemu grę / Rage Quit</li>
          </ul>
          <p>
            Na początku dało się to ignorować, lecz po lutym 2026, to stało się o wiele gorsze. Alex życzył śmierci jekimś dzieciom w KURWA ROBLOX ANIME BADMINGTON.
            Alex wydzierał się o wiele bardziej, o wiele częściej, i o wiele głośniej. Cała paczka zaczęła patrzeć na niego nieco mniej życzliwie.
          </p>
          <p>
            Był to rok maturalny, jednak Alex mając niby korki z matmy, po pięciu latach matematyki rozszerzonej, nie wiedział co to funkcja liniowa, ani miejsce zerowe, nie umiał działać na potęgach ani pierwiastkach.
            Zbijał bąki i grał w gry.
            W końcu umówił się z KS, żeby dołączyc do jego korków, pokrywając 50% kosztów. Alex odbierał próby pomocy KS za atak na jego godność, i wmawiał sobie że gdy KS dawał mu wzór matematyczny który ten gruby cwel przegapiał już 5 raz, to próba umniejszenia mu.
            Ostatnie korki, pierwsze 30 minut grał w Rainbow six siege, po czym zrobił pół zadania, nie mówił nic, mimo prób Korepetytora do tego by Alex coś zrobił. Na koniec ALex wyszedł bez słowa, i na pytanie KS o jego połowę za czas korepetytora, Alex kazał mu spierdalać.
            KS zadzwonił do jego dziewczyny, ZS i powiedział że Alex debil nie zda matury i ma mu oddać Hajs, na co Alex wysłał cały esej przez discorda, jaki to KS nie jest okropny, jenak jakoś niby sie pogodzili, gdzie KS przeprosił go, mimo tego że w sumie to sie z nim nie zgadzał.
            Alex do dziś nie oddał mu pieniędzy bo jest skąpym cwelem. Nasz bohater zdecydował o samodzielnej nauki do matury, czyli wbijania DWUDZIESTU GODZIN DZIENNIE W ELDER SCROLLS ONLINE, i zapracował na 13% z matematyki podstawowej.
          </p>
          <img src="/images/13.jpg" className="imgInsert2" alt="" />
          <p>
            Kontakt grupki z Alexem znacznie się pogorszył, jako że głupi brudny cwel nie potrafił zamknąć pizdy przy grach, mówiąc że tylko tej grupce to przeszkadza i mogą go po prostu wyciszyć.
          </p>
          <video src="/videos/rozjebana.mp4" className="vidInsert" controls preload="metadata" playsInline />
          <p>
            Alex UWIELBIAŁ często mówić o tym jak to nie jest pizdą, i jakim wielkim męszczyzną nie jest, ale okazuję się że jest małą dziewczynką w ciele grubego przegrywa.
            Po tym jak mówił, że jeśli ktoś w kłótni po prostu odejdzie, to jest pizdą, to bez słowa randomowo wyszedł z każdej grupki, servera i nikomu nie odpisywał. Gdy w końcu wrócił, to wywalił grupce wszystkie brudy, jak bardzo go nie dotknęło to jak KS dawał mu wzory na korkach, i jak bardzo go nie zraniło to, że KS POMYŚLAŁ, że Alex nie odda mu pieniędzy za korki ( dalej ich nie oddał),
            I że chciał oddać te pieniądze, ale po tym gdy po powiedzeniu KS że ma spierdalać, KS powiedział "Oddaj mi pieniądze", że stwierdził że ich nie odda. Za to że KS pomyślał że Alex ich nie odda. No to chyba miał kurwa rację.<br />
            Większy problem jednak miał do tego, że KS i KP idą na studia i rozmawiają o rekrutacji. Według Alexa mówili o tym specjalnie żeby on poczuł się gorzej ze swoim wynikiemz  matematyki i tym że nie może iść na studia. No bo oczywiśćie wszystko o czym mówili to pierwsze copp to mysleli o Aleksie.
            Z kolei na komentarze o jego darcu pizdy w grach, opowiedział im tragiczne backstory o tym jak dokuczcali mu w szkole za buty, i że próbował udawać że jest jak reszta dzieciaków z fajnymi butami, i że już nigdy nie będzie udawał że jest kimś kim nie jest. Na pytanie o to czy darcie pizdy na monitor jest dla niego ważniejsza niż przyjaźń, nie potrafił odpowiedzieć.
          </p>

          <h2 id="koniec">Koniec</h2>
          <p>
            Po długiej rozmowie, wszyscy uznali że okej, wyrzucili wszystkie brudy, każdy przysiągł że wszystko wybacz, jednak dalszy kontakt był dość niezręczny, jako że KS i KP nie mieli ochoty na jego darcie pizdy w grach. 2 Ważne obietnice które wtedy padły, to że KS i KP będa mniej gadac przy nim o studiach
            a Alex nie będzie się darł w grach. On dotrzymał obietnicy trochę na około, po prostu z nimi nie grająć. KS i KP ostrzegli go natomiast, że kiedy już na studiach BĘDĄ, to nie będa udawać że ich tam NIE MA. Alex sie zgodził.
            Po tym grupka spotkała się 2 razy. Pierwszy raz, to urodziny AJ na działce. Alex i ZJ przyjechali spóźnieni jakieś 6 godzin, po czym padło dosłownie JEDNO ZDANIE o studiach, Alex spędził następne 3 godziny siedząc samemu na krześle by pokazać każdemu jak bardzo mu źle.
            Drugie spotkanie było w nowym mieszkaniu ZS, gdzie najebał sie jak szmata, darł pizdę, był dziwny i psuł zabawę przez telefon. W końcu nadszedł dzień inauguracji na studia każdego w grupie oprócz ALexa, który zaczął pracować jako stróż na magazynie. Gdy grupka rozmawiała o pierwszych dniach na studiach, Alex (pomimo tego że przed maturą bardzo chciał iść na ten sam kierunek co KS i KP), zaczął nazywać każdego Śmietanką inteligencji, LARPem, Elitą itd.
            Wywiązała sie duża kłótnia gdzie Alex rzucił takie bangery jak:
          </p>
          <ul>
            <li>Mam lepszy pokój niż ty</li>
            <li>Gdybym chciał to bym poszedł na Polibudę</li>
            <li>Mam lepszą dziewczynę niż ty</li>
            <li>Stare rany (wzory matematyczne) zostały</li>
          </ul>
          <p>A na koniec się zesrał i każdy go zablokował. Koniec.</p>
        </div>

        <div className="container3">
          <h1 id="galeria1">ZDJĘCIA</h1>
          <div className="gallery">
            {PHOTOS.map((p) => (
              <img key={p} src={`/images/photos/${p}`} alt="" loading="lazy" decoding="async" />
            ))}
          </div>
        </div>

        <div className="container3">
          <h1 id="galeria2">FILMY</h1>
          <div className="gallery">
            {VIDEOS.map((v) => (
              <video
                key={v}
                src={`/videos/${v}`}
                className="vidInsert2"
                controls
                preload="metadata"
                playsInline
              />
            ))}
          </div>
        </div>

        <div className="container" id="kontakt">
          <h1>KONTAKT</h1>
          <h3>Spierdalaj</h3>

          <div className="counter">
            Odwiedziny:{' '}
            <span className="counter-digits">
              {visits === null ? '------' : String(visits).padStart(6, '0')}
            </span>
          </div>

         

          <div className="marquee">
            <span>★ wypierdalaj</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`to-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ▲ Góra
      </button>

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setZoom(null)}>
          <button type="button" className="lightbox-close" onClick={() => setZoom(null)}>
            ✕ Zamknij
          </button>
          <img src={zoom} alt="" />
        </div>
      )}
    </>
  )
}

export default App