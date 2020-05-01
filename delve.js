var sulphiteDepth = 1;
var sulphiteCost = 110;

var delveLoadingProgress = 0;

class Fossil {
	constructor(name,rate,total) {
	    this.name = name;
	    this.rate = rate;
	    this.total = Number(total);
	}

	rollFossilRNG() { //determines the roll for a drop
	    let min = 0.0000001;
	    let max = 1;
	    let f = (Math.random() * (max - min) + min).toFixed(7);
	    return f;
	  };

	rollFossil() { //rolls each fossil to drop it
        let f = this.rollFossilRNG();
    	    if (f <= this.rate*(Melvin.dropRate+upgradeDropRate)) {
    	        this.total += 1+(this.rate*(Melvin.dropRate+upgradeDropRate)); //adds multiple if dropRate high enough
    	        document.getElementsByClassName(this.name+'Total')[0].innerHTML = numeral(this.total).format('0,0',Math.floor);
    	    }
	};
}

var fossilData = [
Primitive = new Fossil('Primitive','0.0125000','0'),
Potent = new Fossil('Potent','0.0025000','0'),
Powerful = new Fossil('Powerful','0.0010000','0'),
Prime = new Fossil('Prime','0.0004500','0'),
Aberrant = new Fossil('Aberrant','0.0025000','0'),
Frigid = new Fossil('Frigid','0.0025000','0'),
Metallic = new Fossil('Metallic','0.0025000','0'),
Scorched = new Fossil('Scorched','0.0025000','0'),
Pristine = new Fossil('Pristine','0.0015000','0'),
Aetheric = new Fossil('Aetheric','0.0005000','0'),
Bound = new Fossil('Bound','0.0005000','0'),
Corroded = new Fossil('Corroded','0.0005000','0'),
Dense = new Fossil('Dense','0.0005000','0'),
Enchanted = new Fossil('Enchanted','0.0005000','0'),
Jagged = new Fossil('Jagged','0.0005000','0'),
Lucent = new Fossil('Lucent','0.0005000','0'),
Perfect = new Fossil('Perfect','0.0005000','0'),
Prismatic = new Fossil('Prismatic','0.0005000','0'),
Serrated = new Fossil('Serrated','0.0005000','0'),
Shuddering = new Fossil('Shuddering','0.0003500','0'),
Faceted = new Fossil('Faceted','0.0003500','0'),
];

setInterval (function delveTick() {
	if (Melvin.level >= 1) {
		delve();
	}
}, 2500); //every 2.5 seconds

function delve() {
	if (Sulphite.total >= sulphiteCost) {
		Sulphite.total -= sulphiteCost;
		sulphiteCost = Math.floor((50+sulphiteDepth)*2.2);
		sulphiteDepth++;
		Melvin.dropRate += 0.1;
		delveLoadingProgress = 1;
		document.getElementsByClassName('Sulphite')[0].innerHTML = numeral(Sulphite.total).format('0,0');
		document.getElementsByClassName('SulphiteDepth')[0].innerHTML = numeral(sulphiteDepth).format('0,0');
		document.getElementsByClassName('SulphiteCost')[0].innerHTML = numeral(sulphiteCost).format('0,0');
		rollFossilTick();
	}
}

function rollFossilTick() {
    for (let i = 0; i < fossilData.length; i++) {
        fossilData[i].rollFossil();
    }
};

setInterval (function delveLoadingBarAnimate() {
	if (delveLoadingProgress >= 1) {
		delveLoadingProgress += 5;
		let e = document.querySelector('#delveLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(delveLoadingProgress);
  		if (delveLoadingProgress >= 100) {
		delveLoadingProgress = 0;
		e.MaterialProgress.setProgress(delveLoadingProgress);
  		}
	}
}, 100); //every 0.1 seconds
