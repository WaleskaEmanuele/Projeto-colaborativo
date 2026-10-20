const filmes = [
    {
        id: 1,
        titulo: "Obsessão",
        genero: "Terror",
        ano: 2025,
        imagem: "https://m.media-amazon.com/images/S/pv-target-images/63888f0c71ca2cdea1e6ec72623ea724c16d23d74545113e25a330db5b181fa5.jpg",
        sinopse: "A história segue um jovem romântico que decide quebrar o misterioso One Wish Willow para conquistar a pessoa por quem é apaixonado. O desejo até se realiza, mas ele logo descobre que mexer com forças desconhecidas pode trazer consequências sombrias e perigosas.",
        trailer: "https://youtu.be/OYueQyeNgOk?si=2JBHEpNZsVdiZ75p"
    },
    {
        id: 2,
        titulo: "Homem-Aranha: Através do Aranhaverso",
        genero: "Animação",
        ano: 2023,
        imagem: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        sinopse: "Miles Morales encontra outros heróis e enfrenta novos desafios entre diferentes universos.",
        trailer: "https://youtu.be/ME0QiRVsmVI?si=blK4g5stWSGcmfaU"
    },
    {
        id: 3,
        titulo: "Diário de uma Paixão",
        genero: "Romance/Drama",
        ano: 2004,
        imagem: "https://m.media-amazon.com/images/S/pv-target-images/e46417559054417d408881056c768e625399ef697188fe9a9a540e2dcb94e5ad.jpg",
        sinopse: "Na década de 1940, na Carolina do Sul, o operário Noah Calhoun e a rica Allie se apaixonam desesperadamente, mas os pais da jovem não aprovam o namoro. Noah é enviado para lutar na Segunda Guerra Mundial, e parece ser o fim do romance. Enquanto isso, Allie se envolve com outro homem. No entanto, a paixão deles ainda não acabou quando Noah retorna para a pequena cidade anos mais tarde, próximo ao casamento de Allie.",
        trailer: "https://youtu.be/DyfWPxB1pZM?si=irSerPEobOBI3We8"
    },
    {
        id: 4,
        titulo: "O Castelo Animado",
        genero: "Animação",
        ano: 2004,
        imagem: "https://media.themoviedb.org/t/p/w500/1hTfaEWktMJPxCk5nZNtK7F86C9.jpg",
        sinopse: "Uma bruxa lança uma terrível maldição sobre a jovem Sophie transformando-a em uma velha. Desesperada, ela embarca em uma odisseia em busca do mago Howl, um misterioso feiticeiro que pode ajudá-la a reverter o feitiço.",
        trailer: "https://youtu.be/Guxx_KTm_6M?si=aTY1Nx8k_2715Fsv"
    },
{
        id: 5,
        titulo: "10 Coisas que Eu Odeio em Você",
        genero: "Romance",
        ano: 1999,
        imagem: "https://m.media-amazon.com/images/S/pv-target-images/e70e995339d0aa70e3332922116d544d7ec4848bcfa43ea3db2dfb4c65c2179d.jpg",
        sinopse: "Bianca Stratford é bonita e popular, mas não pode namorar antes que sua irmã mais velha encontre um namorado primeiro. O problema é que nenhum garoto consegue chegar perto da irmã, Kat Stratford. Para resolver a situação, um rapaz interessado em Bianca suborna um amigo com passado misterioso para sair com Kat e, quem sabe, tentar conquistá-la.",
        trailer: "https://youtu.be/tD76OqlJRwQ?si=r2XFcR4hHSTslRps"
},

    {
        id: 6,
        titulo: "Vingadores: Ultimato",
        genero: "Ação",
        ano: 2019,
        imagem: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
        sinopse: "Os heróis sobreviventes tentam encontrar uma maneira de reverter uma grande tragédia.",
        trailer: "https://youtu.be/spJoZReeIeQ?si=HqXeIcuacSpXtPLQ"
    }
];

const areaFilmes = document.getElementById("filmes");
const areaFavoritos = document.getElementById("lista-favoritos");
const campoBusca = document.getElementById("busca");
const campoGenero = document.getElementById("genero");
const mensagem = document.getElementById("mensagem");

const modal = document.getElementById("modal");
const tituloModal = document.getElementById("titulo-modal");
const sinopseModal = document.getElementById("sinopse-modal");
const trailer = document.getElementById("trailer");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function criarCard(filme, area) {
    const card = document.createElement("article");
    card.className = "filme";

    const imagem = document.createElement("img");
    imagem.src = filme.imagem;
    imagem.alt = "Pôster do filme " + filme.titulo;
    imagem.loading = "lazy";
    imagem.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/300x450/222222/ffffff?text=Sem+imagem";
    };

    const titulo = document.createElement("h3");
    titulo.textContent = filme.titulo;

    const info = document.createElement("p");
    info.textContent = filme.genero + " • " + filme.ano;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoDetalhes = document.createElement("button");
    botaoDetalhes.textContent = "Detalhes";
    botaoDetalhes.addEventListener("click", function () {
        abrirDetalhes(filme);
    });

    const botaoFavorito = document.createElement("button");
    botaoFavorito.textContent = favoritos.includes(filme.id)
        ? "★ Favorito"
        : "☆ Favoritar";

    botaoFavorito.addEventListener("click", function () {
        mudarFavorito(filme.id);
    });

    acoes.append(botaoDetalhes, botaoFavorito);
    card.append(imagem, titulo, info, acoes);
    area.appendChild(card);
}

function mostrarFilmes() {
    areaFilmes.innerHTML = "";

    const texto = campoBusca.value.toLowerCase().trim();
    const generoEscolhido = campoGenero.value;

    const resultado = filmes.filter(function (filme) {
        const combinaNome = filme.titulo.toLowerCase().includes(texto);
        const combinaGenero = generoEscolhido === "Todos" ||
            filme.genero === generoEscolhido;

        return combinaNome && combinaGenero;
    });

    resultado.forEach(function (filme) {
        criarCard(filme, areaFilmes);
    });

    mensagem.textContent = resultado.length === 0
        ? "Nenhum filme encontrado."
        : "";
}

function mostrarFavoritos() {
    areaFavoritos.innerHTML = "";

    const lista = filmes.filter(function (filme) {
        return favoritos.includes(filme.id);
    });

    if (lista.length === 0) {
        const texto = document.createElement("p");
        texto.textContent = "Você ainda não adicionou favoritos.";
        areaFavoritos.appendChild(texto);
        return;
    }

    lista.forEach(function (filme) {
        criarCard(filme, areaFavoritos);
    });
}

function mudarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(function (item) {
            return item !== id;
        });
    } else {
        favoritos.push(id);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarFilmes();
    mostrarFavoritos();
}

function abrirDetalhes(filme) {
    tituloModal.textContent = filme.titulo + " (" + filme.ano + ")";
    sinopseModal.textContent = filme.sinopse;

    let codigo = filme.trailer;

    if (codigo.includes("youtube.com/watch?v=")) {
        codigo = codigo.split("v=")[1].split("&")[0];
    } else if (codigo.includes("youtu.be/")) {
        codigo = codigo.split("youtu.be/")[1].split("?")[0];
    } else if (codigo.includes("youtube.com/embed/")) {
        codigo = codigo.split("embed/")[1].split("?")[0];
    }

    trailer.src = "https://www.youtube-nocookie.com/embed/" + codigo;

    modal.classList.add("ativo");
}
    

function fecharModal() {
    modal.classList.remove("ativo");
    trailer.src = "";
}

campoBusca.addEventListener("input", mostrarFilmes);
campoGenero.addEventListener("change", mostrarFilmes);

document.getElementById("fechar").addEventListener("click", fecharModal);

modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
        fecharModal();
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        fecharModal();
    }
});

mostrarFilmes();
mostrarFavoritos();