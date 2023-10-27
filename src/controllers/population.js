import dna from "./dna";

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Population {
    constructor(target, mutationRate, popmax) {
        this.target = target;
        this.mutationRate = mutationRate;
        this.num = popmax;
        this.generations = 0;
        this.isFinished = 0;
        this.population = [];

        for(var i = 0; i < popmax; i++) {
            this.population[i] = new dna(this.target.length);
        }
    }

    calcFitness() {
        for(var i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(this.target);
        }
    }

    naturalSelection() {
        this.matingPool = [];
        var sumFitness = 0;
        for(var i = 0; i < this.population.length; i++) {
            sumFitness += this.population[i].fitness;
            if(this.population[i].fitness === 1) this.isFinished = 1;
        }

        for(var i = 0; i < this.population.length; i++) {
            var fitness = this.population[i].fitness/sumFitness;
            var n = Math.floor(fitness * 10000);
            for(var j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    }

    generate() {
        var newp = this.population;
        for(var i = 0; i < this.population.length; i++) {
            var a = randomIntFromInterval(0, this.matingPool.length - 1);
            var b = randomIntFromInterval(0, this.matingPool.length - 1);
            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];
            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newp[i] = child;
        }
        this.population = newp;
        this.generations++;
    }

    getBest() {
        var bestFit = 0;
        for(var i = 0; i < this.population.length; i++) {
            if(this.population[i].fitness > this.population[bestFit].fitness) bestFit = i;
        }
        return this.population[bestFit];
    }
};

export default Population;