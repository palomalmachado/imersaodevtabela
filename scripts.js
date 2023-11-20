var jogadores = [];

function atualizarTabela(classificar = false) {
  var tabela = document.getElementById("tabelaJogadores").getElementsByTagName('tbody')[0];
  tabela.innerHTML = "";

  if (classificar) {
    // Ordenar jogadores por pontos (maior para menor)
    jogadores.sort((a, b) => b.pontos - a.pontos);
  }

  for (var i = 0; i < jogadores.length; i++) {
    var jogador = jogadores[i];

    var novaLinha = tabela.insertRow(-1);
    var colunaImagem = novaLinha.insertCell(0);
    var colunaNome = novaLinha.insertCell(1);
    var colunaVitorias = novaLinha.insertCell(2);
    var colunaEmpates = novaLinha.insertCell(3);
    var colunaDerrotas = novaLinha.insertCell(4);
    var colunaPontos = novaLinha.insertCell(5);
    var colunaAcaoVitoria = novaLinha.insertCell(6);
    var colunaAcaoEmpate = novaLinha.insertCell(7);
    var colunaAcaoDerrota = novaLinha.insertCell(8);
    var colunaAcaoLimpar = novaLinha.insertCell(9);
    var colunaAcaoExcluir = novaLinha.insertCell(10);

    colunaImagem.innerHTML = `<img src="${jogador.imagem}" alt="${jogador.nome}" width="50">`;
    colunaNome.innerHTML = jogador.nome;
    colunaVitorias.innerHTML = jogador.vitorias;
    colunaEmpates.innerHTML = jogador.empates;
    colunaDerrotas.innerHTML = jogador.derrotas;
    colunaPontos.innerHTML = jogador.pontos;

    colunaAcaoVitoria.innerHTML = `<button onclick="adicionarVitoria('${jogador.nome}')">Vitória</button>`;
    colunaAcaoEmpate.innerHTML = `<button onclick="adicionarEmpate('${jogador.nome}')">Empate</button>`;
    colunaAcaoDerrota.innerHTML = `<button onclick="adicionarDerrota('${jogador.nome}')">Derrota</button>`;
    colunaAcaoLimpar.innerHTML = `<button onclick="limparPontuacao('${jogador.nome}')">Limpar Pontuação</button>`;
    colunaAcaoExcluir.innerHTML = `<button onclick="excluirJogador('${jogador.nome}')">Excluir</button>`;
  }
}

function classificarJogadores() {
  atualizarTabela(true);
}


function inserirJogador() {
  var nome = document.getElementById("nome").value;
  var imagemInput = document.getElementById("imagem");
  
  if (nome.trim() !== "") {
    var jogador = {
      nome: nome,
      imagem: imagemInput.files.length > 0 ? URL.createObjectURL(imagemInput.files[0]) : "",
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      pontos: 0
    };

    jogadores.push(jogador);
    document.getElementById("nome").value = "";
    imagemInput.value = "";

    atualizarTabela();
  } else {
    //alert("Digite um nome antes de inserir um jogador.");
  }
}

function adicionarVitoria(nomeJogador) {
  var jogador = encontrarJogador(nomeJogador);

  if (jogador) {
    jogador.vitorias++;
    jogador.pontos += 3;

    atualizarTabela();
  } else {
    alert("Jogador não encontrado.");
  }
}

function adicionarEmpate(nomeJogador) {
  var jogador = encontrarJogador(nomeJogador);

  if (jogador) {
    jogador.empates++;
    jogador.pontos += 2;

    atualizarTabela();
  } else {
    alert("Jogador não encontrado.");
  }
}

function adicionarDerrota(nomeJogador) {
  var jogador = encontrarJogador(nomeJogador);

  if (jogador) {
    jogador.derrotas++;

    atualizarTabela();
  } else {
    alert("Jogador não encontrado.");
  }
}

function limparPontuacao(nomeJogador) {
  var jogador = encontrarJogador(nomeJogador);

  if (jogador) {
    jogador.vitorias = 0;
    jogador.empates = 0;
    jogador.derrotas = 0;
    jogador.pontos = 0;

    atualizarTabela();
  } else {
    alert("Jogador não encontrado.");
  }
}

function excluirJogador(nomeJogador) {
  var jogador = encontrarJogador(nomeJogador);

  if (jogador) {
    var index = jogadores.indexOf(jogador);
    jogadores.splice(index, 1);

    atualizarTabela();
  } else {
    alert("Jogador não encontrado.");
  }
}

function resetarTabela() {
  jogadores = [];
  atualizarTabela();
}

function encontrarJogador(nomeJogador) {
  return jogadores.find(j => j.nome === nomeJogador);
}

// Exemplo de uso
inserirJogador(); // Insere um jogador de exemplo
