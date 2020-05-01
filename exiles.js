//---Main
var totalLevel = 0;
var dropRate = 0;
var playTime = 0;
var snackBarTimer = 0;

//---Define Class
class Exile {
	constructor(name,level,exp,expToLevel,dropRate,gear,links,rerollLevel) {
		this.name = name;
		this.level = Number(level);
		this.exp = Number(exp);
		this.expToLevel = Number(expToLevel);
		this.dropRate = Number(dropRate); //efficiency
		this.gear = Number(gear);
		this.links = Number(links);
		this.rerollLevel = Number(rerollLevel);
	}

	lvlExile() {
	if (this.level > 0 && this.level <= 99) {
		this.exp += Math.floor((Math.random() * (25 - 15) + 15)+(this.dropRate*3)+(this.level/5));
		while (this.exp > this.expToLevel) {
			this.expToLevel = Math.floor((this.expToLevel*1.10)); //updates level requirement
			this.level++;
			if (this.rerollLevel <= 100) {
			this.dropRate += 0.1;
			} else {
				this.dropRate += 0.05; //makes rerolls less efficient
			}
		}
	}
	}

	updateExileClass() {
	if (this.level > 0 && this.level <= 99) {
		this.lvlExile();
		document.getElementsByClassName(this.name+'Level')[0].innerHTML = this.level;
		document.getElementsByClassName(this.name+'EXP')[0].innerHTML = numeral(this.exp).format('0,0')+"/"+numeral(this.expToLevel).format('0,0');
		document.getElementsByClassName(this.name+'Efficiency')[0].innerHTML = "x"+numeral(this.dropRate).format('0,0.0');
	}
	if (this.level == 100) {
		document.getElementsByClassName(this.name+'EXP')[0].innerHTML = "Max";
		$('.'+this.name+'RerollButton').removeClass('hidden');		
	}
	};

	lvlGear() {
		if (this.gear == 0) { //Magic flasks
		if (Transmutation.total >= 5 && Augmentation.total >= 5) {
			Transmutation.total -= 5;
			Augmentation.total -= 5;
			this.dropRate += 0.1;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Upgrade '+this.name+' gear to Magic rarity</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.1 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">10 Transmutation<br>10 Augmentation</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Transmutation","Augmentation");

		} else { SnackBar("Requirements not met.");
		} 
	} else if (this.gear == 1) { //Magic items
		if (Transmutation.total >= 10 && Augmentation.total >= 10) {
			Transmutation.total -= 10;
			Augmentation.total -= 10;
			this.dropRate += 0.1;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Roll '+this.name+' flasks</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.2 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">50 Augmentation<br>50 Alteration</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Transmutation").removeClass("hover");
			this.hoverGear("Alteration","Augmentation");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 2) { //roll magic flasks
		if (Alteration.total >= 50 && Augmentation.total >= 50) {
			Alteration.total -= 50;
			Augmentation.total -= 50;
			this.dropRate += 0.2;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Roll '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.2 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">100 Augmentation<br>100 Alteration</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Alteration","Augmentation");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 3) { //roll magic gear
		if (Alteration.total >= 100 && Augmentation.total >= 100) {
			Alteration.total -= 100;
			Augmentation.total -= 100;
			this.dropRate += 0.2;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">20% quality '+this.name+' weapon</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.2 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">20 Blacksmith</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Alteration").removeClass("hover");
			$(".Augmentation").removeClass("hover");
			this.hoverGear("Blacksmith");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 4) { //20% weapon
		if (Blacksmith.total >= 20) {
			Blacksmith.total -= 20;
			this.dropRate += 0.2;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">20% quality '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.2 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">200 Armourer</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Blacksmith").removeClass("hover");
			this.hoverGear("Armourer");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 5) { //20% gear
		if (Armourer.total >= 200) {
			Armourer.total -= 200;
			this.dropRate += 0.2;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Upgrade '+this.name+' gear to Rare rarity</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.3 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">10 Regal</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Armourer").removeClass("hover");
			this.hoverGear("Regal");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 6) { //regal gear to rare
		if (Regal.total >= 10) {
			Regal.total -= 10;
			this.dropRate += 0.3;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy upgrades for '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.4 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">30 Chaos</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Regal").removeClass("hover");
			this.hoverGear("Chaos");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 7) { //upgrade gear
		if (Chaos.total >= 30) {
			Chaos.total -= 30;
			this.dropRate += 0.4;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy jewels for '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.4 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">50 Chaos</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Chaos");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 8) { //upgrade jewels
		if (Chaos.total >= 50) {
			Chaos.total -= 50;
			this.dropRate += 0.4;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Blessed implicits for '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.4 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">30 Blessed</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Chaos").removeClass("hover");
			this.hoverGear("Blessed");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 9) { //bless
		if (Blessed.total >= 30) {
			Blessed.total -= 30;
			this.dropRate += 0.4;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy upgrades for '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">100 Chaos</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Blessed").removeClass("hover");
			this.hoverGear("Chaos");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 10) { //upgrade gear
		if (Chaos.total >= 100) {
			Chaos.total -= 100;
			this.dropRate += 0.5;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Enchant '+this.name+' gloves</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">150 Chance<br>15 Regret</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Chaos").removeClass("hover");
			this.hoverGear("Regret","Chance");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 11) { //glove enchant
		if (Regret.total >= 15 && Chance.total >= 150) {
			Regret.total -= 15;
			Chance.total -= 150;
			this.dropRate += 0.5;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Enchant '+this.name+' boots</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">400 Chance<br>40 Regret</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Regret","Chance");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 12) { //boot enchant
		if (Regret.total >= 40 && Chance.total >= 400) {
			Regret.total -= 40;
			Chance.total -= 400;
			this.dropRate += 0.5;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">20% quality '+this.name+' flasks</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">50 Glassblower</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Regret").removeClass("hover");
			$(".Chance").removeClass("hover");
			this.hoverGear("Glassblower");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 13) { //20% flasks
		if (Glassblower.total >= 50) {
			Glassblower.total -= 50;
			this.dropRate += 0.5;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Anoint '+this.name+' amulet</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.6 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">50 Chaos<br>1 Exalted</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Glassblower").removeClass("hover");
			this.hoverGear("Exalted","Chaos");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 14) { //anoint
		if (Exalted.total >= 1 && Chaos.total >= 50) {
			Exalted.total -= 1;
			Chaos.total -= 50;
			this.dropRate += 0.6;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy upgrades for '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.6 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">250 Chaos</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Exalted").removeClass("hover");
			this.hoverGear("Chaos");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 15) { //gear upgrades
		if (Chaos.total >= 250) {
			Chaos.total -= 250;
			this.dropRate += 0.6;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy unique flasks for '+this.name+'</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.7 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">200 Chaos<br>2 Exalted</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Exalted","Chaos");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 16) { //unique flasks
		if (Exalted.total >= 2 && Chaos.total >= 200) {
			Exalted.total -= 2;
			Chaos.total -= 200;
			this.dropRate += 0.7;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Divine '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.7 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">10 Divine</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Exalted").removeClass("hover");
			$(".Chaos").removeClass("hover");
			this.hoverGear("Divine");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 17) { //divine
		if (Divine.total >= 10) {
			Divine.total -= 10;
			this.dropRate += 0.7;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy upgrades for '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.8 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">3 Exalted</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Divine").removeClass("hover");
			this.hoverGear("Exalted");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 18) { //gear upgrades
		if (Exalted.total >= 3) {
			Exalted.total -= 3;
			this.dropRate += 0.8;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Enchant '+this.name+' helmet</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+0.9 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">2500 Chance<br>250 Regret</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Exalted").removeClass("hover");
			this.hoverGear("Regret","Chance");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 19) { //helm enchant
		if (Regret.total >= 250 && Chance.total >= 2500) {
			Regret.total -= 250;
			Chance.total -= 2500;
			this.dropRate += 0.9;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Exalt '+this.name+' gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+1.0 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">10 Exalted</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Chance").removeClass("hover");
			$(".Regret").removeClass("hover");
			this.hoverGear("Exalted");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 20) { //ex gear
		if (Exalted.total >= 10) {
			Exalted.total -= 10;
			this.dropRate += 1;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Craft explode chest for '+this.name+'</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+1.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">5 Exalted<br>1 Awakener</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Exalted","Awakener");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 21) { //explode chest
		if (Exalted.total >= 5 && Awakener.total >= 1) {
			Exalted.total -= 5;
			Awakener.total -= 1;
			this.dropRate += 1.5;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy Watchers Eye for '+this.name+'</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+1.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">50 Exalted</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			$(".Awakener").removeClass("hover");
			this.hoverGear("Exalted");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 22) { //watchers eye
		if (Exalted.total >= 50) {
			Exalted.total -= 50;
			this.dropRate += 1.5;
			this.gear++;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy Headhunter for '+this.name+'</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+2.0 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">150 Exalted</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Exalted");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear == 23) { //headhunter
		if (Exalted.total >= 150) {
			Exalted.total -= 150;
			this.dropRate += 2;
			this.gear += 7; //so that the loop for mirrors works
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Mirror gear for '+this.name+'</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+2.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">30 Exalted<br>1 Mirror</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
			this.hoverGear("Exalted","Mirror");
		} else { SnackBar("Requirements not met.");
		}
	} else if (this.gear >= 24) { //mirror loop
		if (Exalted.total >= this.gear && Mirror.total >= 1) {
			Exalted.total -= this.gear;
			Mirror.total -= 1;
			this.dropRate += 2.5;
			this.gear += 10;
			$('#'+this.name+'GearUpgrade').html(
			'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Mirror gear for '+this.name+'</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+2.5 ('+this.name+')</td>'+
            '<td class="mdl-data-table__cell--non-numeric">'+this.gear+' Exalted<br>1 Mirror</td>'
			);
			SnackBar(this.name+" Gear upgraded!");
		} else { SnackBar("Requirements not met.");
		}
	}

	};

	lvlLinks() {
		if (this.links == 0) { //4L
			if (Fusing.total >= 10 && Jeweller.total >= 10) {
				Fusing.total -= 10;
				Jeweller.total -= 10;
				this.dropRate += 0.5;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Colour '+this.name+' links</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+0.5 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">100 Chromatic</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				$(".Fusing").removeClass("hover");
				$(".Jeweller").removeClass("hover");
				this.hoverLinks("Chromatic");
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "4L";
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 1) { //chromatics
			if (Chromatic.total >= 100) {
				Chromatic.total -= 100;
				this.dropRate += 0.5;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Upgrade '+this.name+' links to 5L</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+0.6 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">150 Jeweller<br>150 Fusing</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				$(".Chromatic").removeClass("hover");
				this.hoverLinks("Jeweller","Fusing");
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 2) { //5L
			if (Fusing.total >= 150 && Jeweller.total >= 150) {
				Fusing.total -= 150;
				Jeweller.total -= 150;
				this.dropRate += 0.6;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Upgrade '+this.name+' links to 6L</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+1.0 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">1500 Jeweller<br>1500 Fusing</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				this.hoverLinks("Jeweller","Fusing");
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "5L";
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 3) { //6L
			if (Fusing.total >= 1500 && Jeweller.total >= 1500) {
				Fusing.total -= 1500;
				Jeweller.total -= 1500;
				this.dropRate += 1;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Corrupt '+this.name+' gear to +1 gems</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+1.5 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">50 Vaal</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				$(".Fusing").removeClass("hover");
				$(".Jeweller").removeClass("hover");
				this.hoverLinks("Vaal");
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "6L";
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 4) { //+1 gems
			if (Vaal.total >= 50) {
				Vaal.total -= 50;
				this.dropRate += 1.5;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">20% quality '+this.name+' gems</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+1.5 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">120 GCP</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				$(".Vaal").removeClass("hover");
				this.hoverLinks("GCP");
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "6L (+1 Gems)";
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 5) { //20% gems
			if (GCP.total >= 120) {
				GCP.total -= 120;
				this.dropRate += 1.5;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Corrupt '+this.name+' gems to +1</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+1.5 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">100 Vaal</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				$(".GCP").removeClass("hover");
				this.hoverLinks("Vaal");
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "6L (+1/20% Gems)";
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 6) { //+2 gems
			if (Vaal.total >= 100) {
				Vaal.total -= 100;
				this.dropRate += 1.5;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Double corrupt '+this.name+' gems to +1/23%</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+2.0 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">150 Vaal</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				this.hoverLinks("Vaal");
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "6L (+2/20% Gems)";
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 7) { //+2/23% gems
			if (Vaal.total >= 150) {
				Vaal.total -= 150;
				this.dropRate += 2;
				this.links++;
				$('#'+this.name+'LinksUpgrade').html(
				'<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Double corrupt '+this.name+' gear to +4 gems</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+2.5 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">200 Vaal</td>'
				);
				SnackBar(this.name+" Links upgraded!");
				this.hoverLinks("Vaal");
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "6L (+2/23% Gems)";
			} else { SnackBar("Requirements not met.");
			}
		} else if (this.links == 8) { //+5/23% gems
			if (Vaal.total >= 200) {
				Vaal.total -= 200;
				this.dropRate += 2.5;
				this.links++;
				SnackBar(this.name+" Links upgrades completed!");
				$(".Vaal").removeClass("hover");
				$('#'+this.name+'LinksUpgrade').remove();
				document.getElementsByClassName(this.name+'Links')[0].innerHTML = "6L (+5/23% Gems)";
			} else { SnackBar("Requirements not met.");
			}
		}
	};

	recruitExile() {
		this.level += 1;
		this.dropRate += 0.1;
		$('.'+this.name+'Buy').remove();
		$('.'+this.name+'Hide').remove();
		$("#UpgradeGearTable").append(
			'<tr id="'+this.name+'GearUpgrade">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'GearButton" onclick="buyGear('+this.name+');">'+this.name+' Gear'+'</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Upgrade '+this.name+' flasks to Magic rarity</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+0.1 ('+this.name+')</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">5 Transmutation<br>5 Augmentation</td>'+
            '</tr>'
		);
		$("#UpgradeLinksTable").append(
			'<tr id="'+this.name+'LinksUpgrade">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored '+this.name+'LinksButton" onclick="buyLinks('+this.name+');">'+this.name+' Links</button></td>'+
                '<td class="mdl-data-table__cell--non-numeric">Upgrade '+this.name+' links to 4L</td>'+
                '<td class="mdl-data-table__cell--non-numeric">+0.5 ('+this.name+')</td>'+
                '<td class="mdl-data-table__cell--non-numeric">10 Jeweller<br>10 Fusing</td>'+
            '</tr>'
		);
		document.getElementsByClassName(this.name+'Efficiency')[0].innerHTML = "x"+this.dropRate.toFixed(1);
		document.getElementsByClassName(this.name+'Level')[0].innerHTML = this.level;
		this.hoverGear("Transmutation","Augmentation");
		this.hoverLinks("Jeweller","Fusing");
	};

	rerollExile() {
		this.level = 1;
		this.rerollLevel += 100;
		this.exp = 0;
		this.expToLevel = 525;
		$('.'+this.name+'RerollButton').addClass('hidden');
		$('.'+this.name+'Reroll').removeClass('hidden');
		document.getElementsByClassName(this.name+'Reroll')[0].innerHTML = '(+'+this.rerollLevel+')';	
	};

	hoverGear(a,b) {
		$('#'+this.name+'GearUpgrade').off('mouseenter mouseleave');
		$('#'+this.name+'GearUpgrade').hover(
			function () {
			$("."+a).addClass('hover');
			$("."+b).addClass('hover');
			}, function () {
			$("."+a).removeClass('hover');
			$("."+b).removeClass('hover');
			}
			);
	};

	hoverLinks(c,d) {
		$('#'+this.name+'LinksUpgrade').off('mouseenter mouseleave');
		$('#'+this.name+'LinksUpgrade').hover(
			function () {
			$("."+c).addClass('hover');
			$("."+d).addClass('hover');
			}, function () {
			$("."+c).removeClass('hover');
			$("."+d).removeClass('hover');
			}
			);
	};
}

//---Define Exiles
var exileData = [
Ascendant = new Exile('Ascendant','0','0','525','0','0','0','0'),
Slayer = new Exile('Slayer','0','0','525','0','0','0','0'),
Gladiator = new Exile('Gladiator','0','0','525','0','0','0','0'),
Champion = new Exile('Champion','0','0','525','0','0','0','0'),
Assassin = new Exile('Assassin','0','0','525','0','0','0','0'),
Saboteur = new Exile('Saboteur','0','0','525','0','0','0','0'),
Trickster = new Exile('Trickster','0','0','525','0','0','0','0'),
Juggernaut = new Exile('Juggernaut','0','0','525','0','0','0','0'),
Berserker = new Exile('Berserker','0','0','525','0','0','0','0'),
Chieftain = new Exile('Chieftain','0','0','525','0','0','0','0'),
Necromancer = new Exile('Necromancer','0','0','525','0','0','0','0'),
Elementalist = new Exile('Elementalist','0','0','525','0','0','0','0'),
Occultist = new Exile('Occultist','0','0','525','0','0','0','0'),
Deadeye = new Exile('Deadeye','0','0','525','0','0','0','0'),
Raider = new Exile('Raider','0','0','525','0','0','0','0'),
Pathfinder = new Exile('Pathfinder','0','0','525','0','0','0','0'),
Inquisitor = new Exile('Inquisitor','0','0','525','0','0','0','0'),
Hierophant = new Exile('Hierophant','0','0','525','0','0','0','0'),
Guardian = new Exile('Guardian','0','0','525','0','0','0','0'),
Melvin = new Exile('Melvin','0','0','525','0','0','0','0'),
];
Singularity = new Exile('Singularity','0','0','525','0','0','0','0'); //flipper
Artificer = new Exile('Artificer','0','0','525','0','0','0','0'); //crafter

setInterval (function gameTick() {
	let tempLevel = 0;
	for (let i = 0; i < exileData.length; i++) {
		if (exileData[i].level >= 1) {
        	exileData[i].updateExileClass();
    	}
    tempLevel += exileData[i].level;
    tempLevel += exileData[i].rerollLevel;
    }

	totalLevel = tempLevel;
	document.getElementsByClassName('TotalLevel')[0].innerHTML = "Levels: "+numeral(totalLevel).format('0,0');
	dropRate = upgradeDropRate+Ascendant.dropRate+Slayer.dropRate+Gladiator.dropRate+Champion.dropRate+Assassin.dropRate+Saboteur.dropRate+Trickster.dropRate+Juggernaut.dropRate+Berserker.dropRate+Chieftain.dropRate+Necromancer.dropRate+Occultist.dropRate+Elementalist.dropRate+Deadeye.dropRate+Raider.dropRate+Pathfinder.dropRate+Inquisitor.dropRate+Hierophant.dropRate+Guardian.dropRate+Melvin.dropRate;
	document.getElementsByClassName('TotalDR')[0].innerHTML = "Efficiency: x"+numeral(dropRate).format('0,0.0');

	snackBarTimer -= 100;
	playTime+=0.1;
    document.getElementById("timePlayed").innerHTML = numeral(playTime).format('00:00:00');
}, 100);

//---Unlocking Exiles
//---Ascendant
function recruitAscendant() {
	if (totalLevel >= 0) {
		Ascendant.recruitExile();
	}
}
//---Slayer
function recruitSlayer() {
	if (totalLevel >= 35) {
		Slayer.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Assassin
function recruitAssassin() {
	if (totalLevel >= 65) {
		Assassin.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Juggernaut
function recruitJuggernaut() {
	if (totalLevel >= 110) {
		Juggernaut.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Necromancer
function recruitNecromancer() {
	if (totalLevel >= 170) {
		Necromancer.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Deadeye
function recruitDeadeye() {

	if (totalLevel >= 245) {
		Deadeye.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Inquisitor
function recruitInquisitor() {
	if (totalLevel >= 335) {
		Inquisitor.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Gladiator
function recruitGladiator() {
	if (totalLevel >= 450) {
		Gladiator.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Saboteur
function recruitSaboteur() {
	if (totalLevel >= 580) {
		Saboteur.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Berserker
function recruitBerserker() {
	if (totalLevel >= 725) {
		Berserker.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Elementalist
function recruitElementalist() {
	if (totalLevel >= 885) {
		Elementalist.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Raider
function recruitRaider() {
	if (totalLevel >= 1060) {
		Raider.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Hierophant
function recruitHierophant() {
	if (totalLevel >= 1250) {
		Hierophant.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Champion
function recruitChampion() {
	if (totalLevel >= 1455) {
		Champion.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Trickster
function recruitTrickster() {
	if (totalLevel >= 1675) {
		Trickster.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Chieftain
function recruitChieftain() {
	if (totalLevel >= 1910) {
		Chieftain.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Occultist
function recruitOccultist() {
	if (totalLevel >= 2160) {
		Occultist.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Pathfinder
function recruitPathfinder() {
	if (totalLevel >= 2425) {
		Pathfinder.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---Guardian
function recruitGuardian() {
	if (totalLevel >= 2715) {
		Guardian.recruitExile();
	} else { SnackBar("Requirements not met.");
	}
}
//---The Singulatiry
function recruitSingularity() {
	if (totalLevel >= 250 && currencyStashTab == 1) {
		Singularity.level++;
		$(".SingularityHide").remove();
		$(".SingularityBuy").remove();
		$('.flip').removeClass('hidden');
	} else { SnackBar("Requirements not met.");
	}
}

//---Delvin' Melvin
function recruitMelvin() {
	if (totalLevel >= 500 && delveStashTab == 1) {
		Melvin.recruitExile();
		$(".MelvinHide").remove();
		$(".MelvinBuy").remove();
		$("#delveLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}

//---The Artificer
function recruitArtificer() {
	if (totalLevel >= 1000 && quadStashTab == 1) {
		Artificer.level++;
		$(".ArtificerHide").remove();
		$(".ArtificerBuy").remove();
		$(".craft").show();
	} else { SnackBar("Requirements not met.");
	}
}

//---Upgrading Exiles
function buyGear(name) {
	name.lvlGear();
}
function buyLinks(name) {
	name.lvlLinks();
}
function buyReroll(name) {
	name.rerollExile();
}
