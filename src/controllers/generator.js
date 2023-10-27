import Population from './population'

class generator {
    constructor() {
        this.target = "Hello_World"
        this.popmax = 1000
        this.mutationRate = 0.01
    }

    setTarget(targetString) {
        this.target = targetString
    }
    setPopmax(pm) {
        this.popmax = pm
    }
    setMutationRate(mutationRate) {
        this.mutationRate = mutationRate
    }

    generate() {
        var population = new Population(this.target, this.mutationRate, this.popmax);
        var gen = 0;
        while(population.isFinished == 0) {
            population.calcFitness();
            population.naturalSelection();
            population.generate();
            gen++;
            if(population.isFinished) {
                population.calcFitness();
                var bestGen = population.getBest();
                console.log("best : " , bestGen)
                break;
            }
        }
    }
}

export default generator;