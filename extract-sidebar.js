(() => {
  const h = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.trim() === 'Proje Detayı');
  if (!h) return JSON.stringify({ error: 'no Proje Detayı heading' });
  let card = h.closest('div');
  let depth = 0;
  while (card && depth < 6) {
    const text = card.textContent || '';
    if (text.includes('Konum') && text.includes('Adres')) break;
    card = card.parentElement;
    depth++;
  }
  if (!card) return JSON.stringify({ error: 'no card found' });
  const result = {};
  const labels = ['Konum', 'Adres', 'Alan', 'Yıl', 'Kategori', 'Durum', 'Müşteri', 'Süre', 'İlerleme'];
  const all = card.querySelectorAll('*');
  labels.forEach(label => {
    for (const el of all) {
      if (el.children.length === 0 && el.textContent.trim() === label) {
        let sib = el.nextElementSibling;
        while (sib) {
          const t = sib.textContent.trim();
          if (t && t !== label) {
            result[label] = t;
            break;
          }
          sib = sib.nextElementSibling;
        }
        break;
      }
    }
  });
  // Also check for progress bar percentage
  const progMatch = card.textContent.match(/%(\d+)/);
  if (progMatch) result['İlerlemePercent'] = '%' + progMatch[1];
  return JSON.stringify(result, null, 2);
})()
