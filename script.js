async function carregarProdutos() {
  const status = document.getElementById("status");
  const container = document.getElementById("produtos");

  const inicio = performance.now();
  const resposta = await fetch("http://localhost:3000/products");
  const data = await resposta.json();
  const fim = performance.now();

  const tempo = (fim - inicio).toFixed(2);

  status.textContent = `Fonte: ${data.source} | Tempo de resposta: ${tempo}ms`;

  container.innerHTML = "";
  data.data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>Preço: R$ ${p.preco.toFixed(2)}</p>
      </div>
    `;
  });
}

carregarProdutos();
