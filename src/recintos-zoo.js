class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnívoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnívoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnívoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnívoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnívoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnívoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }
        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const recintosViaveis = this.recintos
            .filter(recinto => this.isBiomaCompatível(recinto, animal))
            .filter(recinto => this.temEspacoSuficiente(recinto, animal, quantidade))
            .filter(recinto => this.validaCompatibilidadeAnimais(recinto, animal, quantidade))
            .map(recinto => `Recinto ${recinto.numero} (espaço livre: ${this.calculaEspacoRestante(recinto, animal, quantidade)} total: ${recinto.tamanhoTotal})`)
            .sort((a, b) => {
                const espacov = parseInt(a.match(/espaço livre: (\d+)/)[1], 10);
                const espacoB = parseInt(b.match(/espaço livre: (\d+)/)[1], 10);
                return espacoB - espacov; // Prioriza recintos com mais espaço livre
            });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

    isBiomaCompatível(recinto, animal) {
        const biomasRecinto = recinto.bioma.split(' e ');
        return this.animais[animal].biomas.some(bioma => biomasRecinto.includes(bioma));
    }

    temEspacoSuficiente(recinto, animal, quantidade) {
        const tamanhoNecessario = this.animais[animal].tamanho * quantidade;
        const tamanhoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
        return tamanhoNecessario <= (recinto.tamanhoTotal - tamanhoOcupado);
    }

    validaCompatibilidadeAnimais(recinto, especie, quantidade) {
        const animal = this.animais[especie];
        const animaisNoRecinto = recinto.animais.map(a => a.especie);

        if (animal.carnívoro) {
            if (animaisNoRecinto.some(a => this.animais[a].carnívoro && a !== especie)) {
                return false; // Carnívoros não podem coexistir com outras espécies carnívoras
            }
        } else if (animal.especie === 'MACACO') {
            // Não precisa verificar se há mais de um macaco, pois isso depende da lógica dos recintos.
        } else if (animal.especie === 'HIPOPOTAMO') {
            if (!recinto.bioma.includes('savana e rio')) {
                return false; // Hipopótamos só toleram outros animais em recintos com savana e rio
            }
        }

        return true;
    }

    calculaEspacoRestante(recinto, animal, quantidade) {
        const tamanhoNecessario = this.animais[animal].tamanho * quantidade;
        const tamanhoOcupado = recinto.animais.reduce((acc, a) => acc + this.animais[a.especie].tamanho * a.quantidade, 0);
        return recinto.tamanhoTotal - (tamanhoOcupado + tamanhoNecessario);
    }
}

export { RecintosZoo };
