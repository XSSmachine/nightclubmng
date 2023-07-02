# nightclubmng
RWA - Nightclub manager

# Upute za pokretanje backend djela

1. Napravite novi projekt sa pipenv virtualnim okruženjem i 3.11 python verzijom.
2. dodajte sve file-ove iz BACKEND direktorija u vaš novi projekt
3. idete na tools i sync python requirements
4. otvorite terminal i pišite venv\Scripts\Activate.ps1
5. nakon toga idete uvicorn main:app --reload
6. i to bi trebalo pokrenuti aplikaciju na portu 8000
7. /docs vam pomoću swaggera omogućuje testiranje endpointa

# Upute za pokretanje frontend djela

1. preuzmite frontend direktorij sa githuba
2. te otvorite u editoru po vašem odabiru
3. prilagodite editor da automatski instalira sve potrebne dependency-e
4. u terminalu pišete npm install
5. nakon toga npm start

# P.S. Želio sam u potpunosti povezati frontend sa backendom, no trenutno samo radi registracija dok login sprema token, ali imao sam poteškoće kod korištenja context hook-a u react-u pa bih mi tu trebala Vaša pomoć.
