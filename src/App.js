import { useState } from 'react';
import './App.css';
import Population from './controllers/population';

function App() {

  const [target, setTarget] = useState("Hello_World");
  const [popmax, setPopmax] = useState();
  const [mutationRate, setMutationRate] = useState();
  const [best, setBest] = useState("Hello_World");
  const [curPop, setCurPop] = useState([]);
  const [generations, setGenerations] = useState(0);

  const generateString = () => {
    var population = new Population(target, mutationRate, popmax);
    var gen = 0;
    while(population.isFinished == 0) {
        population.calcFitness();
        var bestGen = population.getBest();
        console.log(gen, bestGen)
        var curBest = "";
        for(var i = 0; i < bestGen.genes.length; i++) {
          curBest += bestGen.genes[i];
        }
        setBest(curBest);

        population.population.sort(function(a, b){
          return b.fitness - a.fitness;
        });

        var popList = [];
        for(var i = 0; i < Math.min(20, population.population.length); i++) {
          popList.push(population.population[i].genes);
        }
        setCurPop(popList);

        population.naturalSelection();
        population.generate();
        gen++;

        if(population.isFinished) {
            population.calcFitness();
            var bestGen = population.getBest();
            console.log("best : " , bestGen)
            break;
        }
        setGenerations(gen);
    }
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-evenly'>
        <div className='text-center'>
          <div className='text-end p-5'>
              <div> 
                <label className='p-3'> Target String </label> 
                <input  type="text" onChange={(e) => {setTarget(e.target.value)}}/>
              </div>
              <div>
                <label className='p-3'> Max Population </label> 
                <input type="number" onChange={(e) => {setPopmax(parseInt(e.target.value))}} />
              </div>
              <div>
                <label className='p-3'> Mutation rate </label> 
                <input className='w-50' type="number" onChange={(e) => {setMutationRate(parseFloat(e.target.value))}} min="0" max="1" />
              </div>
          </div>
          <button className='btn btn-primary' onClick={generateString}> Generate </button>
        </div>
        <div className='p-5'>
          <div> <h1>{best}</h1> </div>
          <div> Total Generations :  {generations} </div>
          Current Population : 
          <div> 
            {
              curPop.map((e)=>{
                return <p className='m-0'>{e}</p>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;