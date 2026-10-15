const chaveOrdem = titulo => titulo.replace(/^(o|a|os|as)\s+/i, '');

const geral = [...pinturas, ...esculturas, ...fotografias, ...bustos].sort((a, b) =>
    chaveOrdem(a.titulo).localeCompare(chaveOrdem(b.titulo), 'pt-BR', { sensitivity: 'base' })
);