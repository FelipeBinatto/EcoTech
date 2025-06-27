const btnBuscar = document.getElementById('btn-buscar');
const lista = document.getElementById('lista-pontos');

btnBuscar.addEventListener('click', () => {
  lista.innerHTML = `
    <li>
      Obtendo localização...
      <img src="assets/icon/loading.webp" alt="Carregando..." class="img-loading" style="width:32px; height:32px; display:block; margin:10px auto 0;">
    </li>
  `;

  if (!navigator.geolocation) {
    lista.innerHTML = '<li>Seu navegador não suporta Geolocalização.</li>';
    return;
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    lista.innerHTML = `
      <li>
        Buscando pontos de descarte mais próximos...
        <img src="assets/icon/loading.webp" alt="Carregando..." class="img-loading" style="width:32px; height:32px; display:block; margin:10px auto 0;">
      </li>
    `;

    // ... resto do seu código permanece igual ...

    const queryEWaste = `
      [out:json][timeout:60];
      area["ISO3166-1"="BR"]->.br;
      (
        node["recycling"="e-waste"](area.br);
        way["recycling"="e-waste"](area.br);
        relation["recycling"="e-waste"](area.br);
      );
      out center tags;
    `;

    const queryGeral = `
      [out:json][timeout:60];
      area["ISO3166-1"="BR"]->.br;
      (
        node["amenity"="recycling"](area.br);
        way["amenity"="recycling"](area.br);
        relation["amenity"="recycling"](area.br);
      );
      out center tags;
    `;

    const urlEWaste = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(queryEWaste);
    const urlGeral = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(queryGeral);

    const distancia = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2)**2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    try {
      const [resEWaste, resGeral] = await Promise.all([
        fetch(urlEWaste),
        fetch(urlGeral)
      ]);

      const [dadosEWaste, dadosGeral] = await Promise.all([
        resEWaste.json(),
        resGeral.json()
      ]);

      lista.innerHTML = '';

      const elementosEWaste = dadosEWaste.elements || [];
      const elementosGeral = dadosGeral.elements || [];

      const formatarPonto = (ponto, tipo) => {
        const latP = ponto.lat || ponto.center?.lat;
        const lonP = ponto.lon || ponto.center?.lon;
        const nome = ponto.tags.name || 'Ponto de reciclagem';
        const rua = ponto.tags['addr:street'] || '';
        const numero = ponto.tags['addr:housenumber'] || '';
        const endereco = rua + (numero ? ', ' + numero : '');
        const link = `https://www.openstreetmap.org/?mlat=${latP}&mlon=${lonP}#map=18/${latP}/${lonP}`;
        const dist = distancia(lat, lon, latP, lonP).toFixed(1);

        const li = document.createElement('li');
        li.classList.add('ponto');
        li.innerHTML = `
          <strong>${nome}</strong><br>
          ${endereco || 'Endereço não informado'}<br>
          Distância: ${dist} km<br>
          <a href="${link}" target="_blank">Ver no mapa</a><br>
          <small class="${tipo === 'ewaste' ? 'ewaste' : 'geral'}">
            ${tipo === 'ewaste' ? '✔ Aceita lixo eletrônico' : '⚠ Pode não aceitar lixo eletrônico'}
          </small>
        `;
        return li;
      };

      if (elementosEWaste.length > 0) {
        lista.innerHTML += '<li><strong>🔌 Pontos que aceitam lixo eletrônico</strong></li>';
        const pontosOrdenados = elementosEWaste
          .map(p => ({ ...p, dist: distancia(lat, lon, p.lat || p.center?.lat, p.lon || p.center?.lon) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        pontosOrdenados.forEach(p => lista.appendChild(formatarPonto(p, 'ewaste')));
      }

      if (elementosGeral.length > 0) {
        lista.innerHTML += '<li><strong>♻ Outros pontos de reciclagem</strong></li>';
        const pontosOrdenados = elementosGeral
          .map(p => ({ ...p, dist: distancia(lat, lon, p.lat || p.center?.lat, p.lon || p.center?.lon) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        pontosOrdenados.forEach(p => lista.appendChild(formatarPonto(p, 'geral')));
      }

      if (elementosEWaste.length === 0 && elementosGeral.length === 0) {
        lista.innerHTML = '<li>Nenhum ponto encontrado no Brasil.</li>';
      }

    } catch (error) {
      console.error(error);
      lista.innerHTML = `<li>Erro ao buscar pontos: ${error.message}</li>`;
    }

  }, (err) => {
    console.error(err);
    lista.innerHTML = '<li>Não foi possível obter sua localização.</li>';
  });
});
