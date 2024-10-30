class Heroi {
    constructor(nome= "Randon", xp= 0, ataque=3, vida=100) {
        this.nome = nome // sera imutavel
        this.xp = xp
        this.nivel = null
        this.ataque = ataque
        this.vida_padrao = vida // para o inicio de cada batalha
        this.vida = vida
        this.qtd_vitorias = 0
        this.qtd_derrotas = 0
        this.ataquesEspecificos = {}; // objeto para armazenar ataques específicos
    }
// gets
    exibirInfo(){
        this.nivel = this.verificaNivel()
        let rank = this.verificaRank()
                
        console.log("---------------------")
        console.log("| Heroi: " + this.nome)
        console.log("| XP: " + this.xp)
        console.log("| Nivel: " + this.nivel)
        console.log("| Saldo: " + (this.qtd_vitorias-this.qtd_derrotas))
        console.log("| Rank: " + rank)
        console.log("| Vida: " + this.vida)
        console.log("| Ataque: " + this.ataque)
        console.log("---------------------")
    }
    getNome(){
        return this.nome
    }
    
    getXp(){
        return this.xp
    }
    
    getAtacar(tipo_heroi) {
        return this.ataque;
    }
    
    getVida(){
        return this.vida
    }
    // sets
    incrementaXp(xp){
        this.xp += xp
    }
    decrementaXp(xp){
        if (this.xp >= 0){
            this.xp -= xp
        }
    }
    
    setVida(vida){
        this.vida = vida
    }

    decrementaVida(vida=1){
        this.vida -= vida
    }
    
    setVitoria(valor){
        this.qtd_vitorias = valor
    }

    setDerrota(valor){
        this.qtd_derrotas = valor
    }

    incrementaVitoria(){
        this.qtd_vitorias += 1
    }

    incrementaDerrota(){
        this.qtd_derrotas += 1
    }

    verificaNivel(){ 

        if (this.xp <= 1000){
            return "Ferro"
        } else if (this.xp > 1000 && this.xp <= 2000) {
            return "Bronze"
        } else if (this.xp > 2000 && this.xp <= 5000) {
            return "Prata"
        } else if (this.xp > 5000 && this.xp <= 7000) {
            return "Ouro"
        } else if (this.xp > 7000 && this.xp <= 8000) {
            return "Platina"
        } else if (this.xp > 8000 && this.xp <= 9000) {
            return "Ascendente"
        } else if (this.xp > 9000 && this.xp <= 10000) {
            return "Imortal"
        } else if (this.xp > 10000) {
            return "Radiante"
        }
    }
    verificaRank(){
        let saldo = this.qtd_vitorias - this.qtd_derrotas 
        if (saldo <= 10){ return "Ferro"}
        else if (saldo > 10 && saldo <= 20){ return "Bronze"}
        else if (saldo > 20 && saldo <= 50){ return "Prata"}
        else if (saldo > 50 && saldo <= 80){ return "Ouro"}
        else if (saldo > 80 && saldo <= 90){ return "Diamante"}
        else if (saldo > 90 && saldo <= 100){ return "Lendario"}
        else if (saldo > 100){ return "Imortal"}
        
    }
}

class Mago extends Heroi{
    constructor(nome="Mago",guerreiro = 5, monge = 3, ninja = 7){
        super(nome)
        this.tipo = nome.toLowerCase()
        this.tipo_ataque = "magia"
        this.ataquesEspecificos = {
            guerreiro: guerreiro,
            monge: monge,
            ninja: ninja,
            mago: this.ataque // caso ataque outro mago
        };

    }

}

class Guerreiro extends Heroi{
    constructor(nome="Guerreiro",mago = 3, monge = 5, ninja = 7){
        super(nome)
        this.tipo = nome.toLowerCase()
        this.tipo_ataque = "espada"
        this.ataquesEspecificos = {
            mago: mago,
            monge: monge,
            ninja: ninja,
            guerreiro: this.ataque // caso ataque outro guerreiro
        };
    }

}


class Monge extends Heroi{
    constructor(nome="Monge",guerreiro = 5, mago = 3, ninja = 7){
        super(nome)
        this.tipo = nome.toLowerCase()
        this.tipo_ataque = "artes marciais"
        this.ataquesEspecificos = {
            guerreiro: guerreiro,
            mago: mago,
            ninja: ninja,
            monge: this.ataque // caso ataque outro monge
        };
    }
}

class Ninja extends Heroi{
    constructor(nome="Ninja", guerreiro = 3, monge = 7, mago = 5){
        super(nome)
        this.tipo = nome.toLowerCase()
        this.tipo_ataque = "shuriken"
        this.ataquesEspecificos = {
            guerreiro: guerreiro,
            monge: monge,
            mago: mago,
            ninja: this.ataque // caso ataque outro ninja
        };
    }

}


class Battle{
    constructor(rodadas, herois=[]){
        this.herois = herois // lista de herois
        this.constante = 100
        this.rodadas = rodadas*this.constante
        // Ganho XP
        this.xp_ataque = 2
        this.xp_esquiva = 1
        this.xp_vitoria = 4
        this.xp_derrota = 2
        // herois
        this.heroi1 = null
        this.heroi2 = null
    }
    

    iniciarBatalha(){
        // inicio da batalha
        console.log("Inicio da batalha")

        for(let i = 0; i < this.rodadas/this.constante; i++){
            console.log(`Rodada ${i+1}`)
            this.todosContraTodos()
        }
        this.exibirFimBatalha()
    }
    

    

    // todos os batalhadores vão batalhar pelo menos 2 vezes com o mesmo heroi (revanche)
    todosContraTodos(){
        for(let h1 = 0; h1<this.herois.length; h1++){
            this.heroi1 = this.herois[h1] 
                for(let h2 = 0; h2<this.herois.length; h2++){
                    if (h2 != h1){   // não pode lutar contra si propio
                        this.heroi2 = this.herois[h2]
                        console.log(`O ${this.heroi1.nome} atacou ${this.heroi2.nome} usando ${this.heroi1.tipo_ataque}`)
                        this.heroi1.setVida(this.heroi1.vida_padrao)
                        this.heroi2.setVida(this.heroi2.vida_padrao)
                        this.lutar() 
                    }
            }    
        }
    }

    lutar(){  // porradaria
        let chance_ataque_1_2 = 0
        let esquivou = false


        for (let cont = 0; cont < this.rodadas; cont++){
            chance_ataque_1_2 = Math.random()
            if (chance_ataque_1_2 > 0.5){
                esquivou = this.verificaEsquivou()
                
                if(esquivou === true){ // h2 esquivou
                    this.heroi2.incrementaXp(this.xp_esquiva)
                }else{
                    this.heroi2.decrementaVida(this.heroi1.getAtacar(this.heroi1.tipo))  
                    this.heroi1.incrementaXp(this.xp_ataque)
                }
            }else{
                esquivou = this.verificaEsquivou()
                if(esquivou === true){ // h1 esquivou
                    this.heroi1.incrementaXp(this.xp_esquiva)
                }else{
                    this.heroi1.decrementaVida(this.heroi2.getAtacar(this.heroi2.tipo)) 
                    this.heroi2.incrementaXp(this.xp_ataque)
                }
            }
            if(this.verificaMorteGanhador()){
                break
            }
        }
    }

    verificaEsquivou(){       // CHANCE DE ESQUIVA  
        let chance_esquiva = Math.random()
        if(chance_esquiva >= 0.3){ // esquivou
            return true
        }else{
            return false
        }
    }

    verificaMorteGanhador(){ //falta
        if(this.heroi1.getVida() <= 0){
            this.heroi1.incrementaDerrota()
            this.heroi1.decrementaXp(this.xp_derrota)
            
            this.heroi2.incrementaVitoria()
            this.heroi2.incrementaXp(this.xp_vitoria)
            return true
        }else if (this.heroi2.getVida() <= 0){
            this.heroi2.incrementaDerrota()
            this.heroi2.decrementaXp(this.xp_derrota)
            
            this.heroi1.incrementaVitoria()
            this.heroi1.incrementaXp(this.xp_vitoria)
            return true
        }else{
            return false
        }
    }

    verificarGanhador(){
        if(this.heroi1.getVida() > this.heroi2.getXp()){
            return 1
        }else{
            return 2
        }
    }
    
    exibirFimBatalha(){
        console.log("Apresentando os Herois\n")
        for(let i = 0; i < this.herois.length ; i++){
            this.herois[i].exibirInfo()
        }
    }
}



mago = new Mago()
guerreiro = new Guerreiro()
monge = new Monge()
ninja = new Ninja()

herois = [guerreiro,mago, monge, ninja]

batalha = new Battle(5, herois)
batalha.iniciarBatalha()