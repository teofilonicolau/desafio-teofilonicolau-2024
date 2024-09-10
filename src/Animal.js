class Animal {
  constructor(especie, quantidade) {
    const nomes = [
      "LEAO",
      "LEOPARDO",
      "CROCODILO",
      "MACACO",
      "GAZELA",
      "HIPOPOTAMO",
    ];
    this.especie = especie;
    this.quantidade = quantidade;

    if (!nomes.includes(especie)) {
      throw new Error("Animal inválido");
    }

    if (quantidade <= 0 || isNaN(quantidade)) {
      throw new Error("Quantidade inválida");
    }

    switch (this.especie) {
      case "LEAO":
        this.tamanho = 3;
        this.bioma = "savana";
        this.carnivoro = true;
        break;
      case "LEOPARDO":
        this.tamanho = 2;
        this.bioma = "savana";
        this.carnivoro = true;
        break;
      case "CROCODILO":
        this.tamanho = 3;
        this.bioma = "rio";
        this.carnivoro = true;
        break;
      case "MACACO":
        this.tamanho = 1;
        this.bioma = ["savana", "floresta"];
        this.carnivoro = false;
        break;
      case "GAZELA":
        this.tamanho = 2;
        this.bioma = "savana";
        this.carnivoro = false;
        break;
      case "HIPOPOTAMO":
        this.tamanho = 4;
        this.bioma = ["savana", "rio"];
        this.carnivoro = false;
        break;
      default:
        throw new Error("Espécie de animal não reconhecida");
    }
  }
}

export { Animal };
