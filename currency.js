//---Define Class
class Currency {
	constructor(name,rate,total,sellRate,sellPercent,buyRate,buyPercent) {
	    this.name = name;
	    this.rate = rate;
	    this.total = Number(total);
        this.sellRate = Number(sellRate);
        this.sellPercent = Number(sellPercent);
        this.buyRate = Number(buyRate);
        this.buyPercent = Number(buyPercent);
	}

	rollCurrencyRNG() { //determines the roll for a drop
	    let min = 0.0000001;
	    let max = 1;
	    let c = (Math.random() * (max - min) + min).toFixed(7);
	    return c;
	  };

	rollCurrency(exileName) { //rolls each currency to drop it
        let c = this.rollCurrencyRNG();
        if (this.name != "Sulphite") {
    	    if (c <= this.rate*(exileName.dropRate+upgradeDropRate)) {
    	        this.total += 1+(this.rate*(exileName.dropRate+upgradeDropRate)); //adds multiple if dropRate high enough
                if (this.name == 'Mirror') {
                    SnackBar("Mirror of Kalandra dropped!");
                }
    	    }
        } else if (this.name == "Sulphite") {
            if (c <= this.rate*(exileName.dropRate+upgradeDropRate)) {
            this.total += Math.floor((Math.random()*(sulphiteDropRate - (sulphiteDropRate/2)) + (sulphiteDropRate/2)));
            }
        }
	};

    sellSetCurrency (value) {
        if (this.buyPercent > 0) {
            this.buyPercent = 0;
            $('#'+this.name+'BuySlider').trigger('click');
        }
        this.sellPercent = value;
    };

    buySetCurrency (value) {
        if (this.sellPercent > 0) {
            this.sellPercent = 0;
            $('#'+this.name+'SellSlider').trigger('click');
        }
        this.buyPercent = value;
    }; 

    sellCurrency() {
        if (Singularity.level >= 1 && this.sellPercent == 1) {
            if (this.name == "Annulment" && this.total >= 1) { //Annulment
                this.total -= 1;
                Chaos.total += 4;
            } else if (this.name == "Divine" && this.total >= 1) { //Divine
                this.total -= 1;
                Chaos.total += 10;
            } else if (this.name == "Exalted" && this.total >= 1) { //Exalt
                this.total -= 1;
                Chaos.total += 125;
            } else if (this.name == "Awakener" && this.total >= 1) { //Awakener
                this.total -= 1;
                Exalted.total += 10;
            } else if (this.name == "Crusader" && this.total >= 1) { //Crusader
                this.total -= 1;
                Exalted.total += 10;
            } else if (this.name == "Hunter" && this.total >= 1) { //Hunter
                this.total -= 1;
                Exalted.total += 10;
            } else if (this.name == "Redeemer" && this.total >= 1) { //Redeemer
                this.total -= 1;
                Exalted.total += 10;
            } else if (this.name == "Warlord" && this.total >= 1) { //Warlord
                this.total -= 1;
                Exalted.total += 10;
            } else if (this.name == "Eternal" && this.total >= 1) { //Eternal
                this.total -= 1;
                Exalted.total += 25;
            } else if (this.name == "Mirror" && this.total >= 1) { //Mirror
                this.total -= 1;
                Exalted.total += 200;
            } else if (this.total >= this.sellRate) { //all others
                this.total -= this.sellRate;
                Chaos.total += 1;
            }
        }
    };

    buyCurrency() {
        if (Singularity.level >= 1 & this.buyPercent == 1) {
                if (this.name == "Annulment") { //Annulment
                    if (Chaos.total >= 3) {
                    this.total += 1;
                    Chaos.total -= 3;
                    }
                } else if (this.name == "Divine") { //Divine
                    if  (Chaos.total >= 10) {
                    this.total += 1;
                    Chaos.total -= 10;
                    }
                } else if (this.name == "Exalted") { //Exalt
                    if (Chaos.total >= 150) {
                        this.total += 1;
                        Chaos.total -= 150;
                    }
                } else if (this.name == "Awakener") { //Awakener
                    if (Exalted.total >= 20) {
                        this.total += 1;
                        Exalted.total -= 20;
                    }
                } else if (this.name == "Crusader") { //Crusader
                    if (Exalted.total >= 20) {
                    this.total += 1;
                    Exalted.total -= 20;
                    }
                } else if (this.name == "Hunter") { //Hunter
                    if (Exalted.total >= 20) {
                        this.total += 1;
                        Exalted.total -= 20;
                    }
                } else if (this.name == "Redeemer") { //Redeemer
                    if (Exalted.total >= 20) {
                        this.total += 1;
                        Exalted.total -= 20;
                    }
                } else if (this.name == "Warlord") { //Warlord
                    if (Exalted.total >= 20) {
                        this.total += 1;
                        Exalted.total -= 20;
                    }
                } else if (this.name == "Eternal") { //Eternal
                    if (Exalted.total >= 50) {
                        this.total += 1;
                        Exalted.total -= 50;
                    }
                } else if (this.name == "Mirror") { //Mirror
                    if (Exalted.total >= 250) {
                        this.total += 1;
                        Exalted.total -= 250;
                    }
                } else if (Chaos.total >= 1) { //all others
                        this.total += this.buyRate;
                        Chaos.total -= 1;
                }
            }
    };

	// cheat() {
	// this.total +=20;
	// };
}



//---Define Currency
var currencyData = [
Transmutation = new Currency('Transmutation','0.0020831','0','16','0','15','0'),
Armourer = new Currency('Armourer','0.0020827','0','15','0','14','0'),
Blacksmith = new Currency('Blacksmith','0.0011095','0','10','0','9','0'),
Augmentation = new Currency('Augmentation','0.0010328','0','5','0','4','0'),
Alteration = new Currency('Alteration','0.0005508','0','5','0','4','0'),
Chance = new Currency('Chance','0.0005508','0','9','0','8','0'),
Jeweller = new Currency('Jeweller','0.0005508','0','22','0','21','0'),
Chromatic = new Currency('Chromatic','0.0005508','0','9','0','8','0'),
Fusing = new Currency('Fusing','0.0003443','0','6','0','5','0'),
Alchemy = new Currency('Alchemy','0.0002754','0','8','0','7','0'),
Chisel = new Currency('Chisel','0.0002754','0','5','0','4','0'),
Chaos = new Currency('Chaos','0.0001652','0','1','0','1','0'),
Scouring = new Currency('Scouring','0.0001377','0','3','0','2','0'),
Vaal = new Currency('Vaal','0.0000689','0','2','0','2','0'),
Regret = new Currency('Regret','0.0000689','0','4','0','3','0'),
Glassblower = new Currency('Glassblower','0.0000682','0','8','0','7','0'),
GCP = new Currency('GCP','0.0000275','0','2','0','1','0'),
Blessed = new Currency('Blessed','0.0000275','0','15','0','14','0'),
Regal = new Currency('Regal','0.0000207','0','5','0','4','0'),
Exalted = new Currency('Exalted','0.0000055','0','125','0','150','0'),
Divine = new Currency('Divine','0.0000034','0','10','0','10','0'),
Eternal = new Currency('Eternal','0.0000003','0','25','0','50','0'),
Mirror = new Currency('Mirror','0.0000001','0','200','0','250','0'),
StackedDeck = new Currency('StackedDeck','0.0002000','0','2','0','1','0'),
SilverCoin = new Currency('SilverCoin','0.0002000','0','11','0','10','0'),
Annulment = new Currency('Annulment','0.0000075','0','4','0','5','0'),
SimpleSextant = new Currency('SimpleSextant','0.0001650','0','2','0','1','0'),
PrimeSextant = new Currency('PrimeSextant','0.0000650','0','3','0','2','0'),
AwakenedSextant = new Currency('AwakenedSextant','0.0000350','0','4','0','3','0'),
Awakener = new Currency('Awakener','0.0000002','0','10','0','20','0'),
Crusader = new Currency('Crusader','0.0000002','0','10','0','20','0'),
Hunter = new Currency('Hunter','0.0000002','0','10','0','20','0'),
Redeemer = new Currency('Redeemer','0.0000002','0','10','0','20','0'),
Warlord = new Currency('Warlord','0.0000002','0','10','0','20','0'),
Sulphite = new Currency('Sulphite','0.0000750','0','0','0','0','0'),
];

//---Main
function rollCurrencyTick(exileName) {
    for (let i = 0; i < currencyData.length; i++) {
        currencyData[i].rollCurrency(exileName);
    }
};

function sellCurrencyTick() {
    for (let i = 0; i < currencyData.length; i++) {
        currencyData[i].sellCurrency();
    }
};

function buyCurrencyTick() {
    for (let i = 0; i < currencyData.length; i++) {
        currencyData[i].buyCurrency();
    }
};

function updateCurrencyClass() {
    for (let i = 0; i < currencyData.length; i++) {
        document.getElementsByClassName(currencyData[i].name)[0].innerHTML = numeral(currencyData[i].total).format('0,0',Math.floor);
    }
}

setInterval (function gameTick() {
    for (let i = 0; i < exileData.length; i++) {
        if (exileData[i].dropRate > 0) {
            rollCurrencyTick(exileData[i]);
        }
    }
    sellCurrencyTick();
    buyCurrencyTick();

    updateCurrencyClass();
}, 100);

// function free () {
//     for (let i = 0; i < currencyData.length; i++) {
//             currencyData[i].cheat();
//         }
// };

//---Sliders
function slideSell(value,currency) {
    if (document.getElementById(currency.name+"SellSlider").checked == true) {
        currency.sellSetCurrency(1);
    } else {
        currency.sellSetCurrency(0);
    }
}
function slideBuy(value,currency) {
        if (document.getElementById(currency.name+"BuySlider").checked == true) {
        currency.buySetCurrency(1);
    } else {
        currency.buySetCurrency(0);
    }
}