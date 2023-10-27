function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function newChar() {
    var c = Math.floor(randomIntFromInterval(32, 126));
    return String.fromCharCode(c);
}

class dna {
    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        for(var i = 0; i < num; i++) {
            this.genes[i] = newChar();
        }
    }

    calcFitness(target) {
        var score = 0;
        for(var i = 0; i < this.genes.length; i++) {
            if(this.genes[i] === target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score/target.length;
    }

    crossover(partner) {
        var child = new dna(this.genes.length);
        var midpoint = Math.floor(Math.random(this.genes.length));

        for(var i = 0; i < this.genes.length; i++) {
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    mutate(mutationRate) {
        for(var i = 0; i < this.genes.length; i++) {
            if(Math.random(1) < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }

    print() {
        console.log("gene : ");
        for(var i = 0; i < this.genes.length; i++) {
            process.stdout.write(this.genes[i])
        }
    }
};

export default dna;

