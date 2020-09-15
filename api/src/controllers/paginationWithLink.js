module.exports = {
  pagination(link) {
    // Requisição pode vir com campo link contendo string com elementos de "link"
    if (link) {
      try {
        const links = link.split(',');
        const lastLink = links.find(element => element.includes('rel="last"'));

        if (lastLink) {
          const lastPage = lastLink.split('>;')[0].split('?page=')[1];
          return parseInt(lastPage)

        } else {
          // Caso a requisição seja feita na última pagina, não há link de referência da última página, apenas a anterior
          const prevLink = links.find(element => element.includes('rel="prev"'));
          const lastPage = prevLink.split('>;')[0].split('?page=')[1];
          return parseInt(lastPage) + 1;
        }

      } catch {
        console.log('[*] Falha ao tentar acessar total de páginas...');
      }
    }

    return null    
  }
}