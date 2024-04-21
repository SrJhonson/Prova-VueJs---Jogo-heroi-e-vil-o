const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            logs: []
        }
    },
    computed: {
        heroiVidaClasse() {
            return {
                'vida-vermelha': this.heroi.vida <= 25,
                'vida-amarela': this.heroi.vida > 25 && this.heroi.vida <= 50,
                'vida-verde': this.heroi.vida > 50
            }
        },
        vilaoVidaClasse() {
            return {
                'vida-vermelha': this.vilao.vida <= 25,
                'vida-amarela': this.vilao.vida > 25 && this.vilao.vida <= 50,
                'vida-verde': this.vilao.vida > 50
            }
        }
    },
    methods: {
        adicionarLog(log) {
            if (this.logs.length >= 20) {
                this.logs.shift();
            }
            this.logs.push(log);
        },
        limparLogs() {
            this.logs = [];
        },
        atacar(isHeroi) {
            if (isHeroi) {
                this.vilao.vida -= 10;
                this.adicionarLog("O herói atacou!");
                // Adiciona uma chance de 1/3 do vilão revidar
                if (Math.random() < 1 / 3) {
                    this.adicionarLog("Contra aquete do vilão!");
                    this.acaoVilao();
                }
            } else {
                this.heroi.vida -= 20;
            }
            this.verificarVida();
        },
        defender(isHeroi) {
            // Adiciona uma chance de 2/3 do heroi defender o ataque do vilão
            if (Math.random() < 2 / 3) {
                this.adicionarLog("Heroi defendeu!");
            } else {
                this.adicionarLog("Defesa falhou!");
                this.acaoVilao();
            }
            this.verificarVida();
        },
        usarPocao(isHeroi) {
            // Recupera 15 de vida do herói
            this.heroi.vida += 15;
            // Limita a vida do herói a 100
            if (this.heroi.vida > 100) {
                this.heroi.vida = 100;
            }
            this.adicionarLog("Herói usou poção!");
            // Gera uma chance de 1/3 do vilão atacar e outra chance de 1/3 do vilão se curar em 10 de vida
            if (Math.random() < 1 / 3) {
                this.adicionarLog("Vilão atacou!");
                this.acaoVilao();
            } else if (Math.random() < 2 / 3) {
                this.adicionarLog("Vilão usou poção!");
                this.vilao.vida += 10;
                // Limita a vida do vilão a 100
                if (this.vilao.vida > 100) {
                    this.vilao.vida = 100;
                }
            }
            this.verificarVida();
        },
        critico(isHeroi) {
            // Ataque crítico que causa o dobro do dano do ataque normal
            if (isHeroi) {
                this.vilao.vida -= 20;
                this.adicionarLog("O herói deu um golpe crítico!");
                // Adiciona uma chance de 1/3 do vilão revidar
                if (Math.random() < 1 / 3) {
                    this.adicionarLog("O vilão deu um golpe crítico!");
                    this.heroi.vida -= 30;
                }
            }
            this.verificarVida();
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'critico'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
            this.verificarVida();
        },
        verificarVida() {
            // Se a vida de qual quer um chegar a 0 cria-se um pop-up alertando o vencedor!!
            if (this.heroi.vida <= 0) {
                alert("Vilão Ganhou!! CONQUISTAMOS A LUAAA!!!!!");
                this.recomecar();
                this.limparLogs();
            } else if (this.vilao.vida <= 0) {
                alert("Herói Ganhou!! O BEM SEMPRE IRÁ VENCER!!!!!");
                this.recomecar();
                this.limparLogs();
            }
        },
        recomecar() {
            //Após o Alert o jogo recomeça com a vida 100% de ambos
            this.heroi.vida = 100;
            this.vilao.vida = 100;
        }
    }
}).mount("#app");