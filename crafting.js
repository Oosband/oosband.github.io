//---vars
var craftFlask = -1;
var flaskLoadingProgress = 0;
var craftGem = -1;
var gemLoadingProgress = 0;
var craftEnchant = -1;
var enchantLoadingProgress = 0;
var craftPerfect = -1;
var perfectLoadingProgress = 0;
var craftChaos = -1;
var chaosLoadingProgress = 0;
var craftCold = -1;
var coldLoadingProgress = 0;
var craftLight = -1;
var lightLoadingProgress = 0;
var craftFire = -1;
var fireLoadingProgress = 0;
var craftWand = -1;
var wandLoadingProgress = 0;

//mirror
var mirrorSword = -1;
var mirrorSwordLoadingProgress = 0;
var mirrorSwordFee = 20;
var mirrorShield = -1;
var mirrorShieldLoadingProgress = 0;
var mirrorShieldFee = 20;
var mirrorChest = -1;
var mirrorChestLoadingProgress = 0;
var mirrorChestFee = 20;

//---loops
setInterval (function craftingTick() {
	flaskCraft();
	gemCraft();
	enchantCraft();
	perfectCraft();
	chaosCraft();
	coldCraft();
	fireCraft();
	lightCraft();
	wandCraft();

	for (let i = 0; i < fossilData.length; i++) {
        document.getElementsByClassName(fossilData[i].name+'Total')[0].innerHTML = numeral(fossilData[i].total).format('0,0',Math.floor);
    }
}, 30000); //craft every 30 sec

setInterval (function mirrorTick() {
	mirrorSwordTick();
	mirrorShieldTick();
	mirrorChestTick();
}, 60000); //mirror every 60 sec



//---crafting
function buyFlaskCraft() {
	if (Chaos.total >= 400) {
		Chaos.total -= 400;
		craftFlask++;
		$(".craftFlaskCost").hide();
		$("#flaskLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function flaskCraft() {
	if (craftFlask >= 0) {
	if (Transmutation.total >= 1 && Alteration.total >= 20 && Augmentation.total >= 10) {
		Transmutation.total -= 1;
		Alteration.total -= 20;
		Augmentation.total -= 10;
		flaskLoadingProgress += 1;
	}
	}
}

function buyGemCraft() {
	if (Chaos.total >= 1600) {
		Chaos.total -= 1600;
		craftGem++;
		$(".craftGemCost").hide();
		$("#gemLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function gemCraft() {
	if (craftGem >= 0) {
	if (GCP.total >= 20 && Vaal.total >= 1) {
		Vaal.total -= 1;
		GCP.total -= 20;
		gemLoadingProgress += 1;
	}
	}
}

function buyEnchantCraft() {
	if (Chaos.total >= 1000) {
		Chaos.total -= 1000;
		craftEnchant++;
		$(".craftEnchantCost").hide();
		$("#enchantLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function enchantCraft() {
	if (craftEnchant >= 0) {
	if (Enchanted.total >= 1 && Primitive.total >= 1) {
		Primitive.total -= 1;
		Enchanted.total -= 1;
		enchantLoadingProgress += 1;
	}
	}
}

function buyPerfectCraft() {
	if (Chaos.total >= 2000) {
		Chaos.total -= 2000;
		craftPerfect++;
		$(".craftPerfectCost").hide();
		$("#perfectLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function perfectCraft() {
	if (craftPerfect >= 0) {
	if (Perfect.total >= 1 && Primitive.total >= 1) {
		Primitive.total -= 1;
		Perfect.total -= 1;
		perfectLoadingProgress += 1;
	}
	}
}

function buyChaosCraft() {
	if (Chaos.total >= 4000) {
		Chaos.total -= 4000;
		craftChaos++;
		$(".craftChaosCost").hide();
		$("#chaosLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function chaosCraft() {
	if (craftChaos >= 0) {
	if (Aberrant.total >= 1 && Primitive.total >= 1) {
		Primitive.total -= 1;
		Aberrant.total -= 1;
		chaosLoadingProgress += 1;
	}
	}
}

function buyColdCraft() {
	if (Chaos.total >= 4000) {
		Chaos.total -= 4000;
		craftCold++;
		$(".craftColdCost").hide();
		$("#coldLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function coldCraft() {
	if (craftCold >= 0) {
	if (Frigid.total >= 1 && Primitive.total >= 1) {
		Primitive.total -= 1;
		Frigid.total -= 1;
		coldLoadingProgress += 1;
	}
	}
}

function buyFireCraft() {
	if (Chaos.total >= 4000) {
		Chaos.total -= 4000;
		craftFire++;
		$(".craftFireCost").hide();
		$("#fireLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function fireCraft() {
	if (craftFire >= 0) {
	if (Scorched.total >= 1 && Primitive.total >= 1) {
		Primitive.total -= 1;
		Scorched.total -= 1;
		fireLoadingProgress += 1;
	}
	}
}

function buyLightCraft() {
	if (Chaos.total >= 4000) {
		Chaos.total -= 4000;
		craftLight++;
		$(".craftLightCost").hide();
		$("#lightLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function lightCraft() {
	if (craftLight >= 0) {
	if (Metallic.total >= 1 && Primitive.total >= 1) {
		Primitive.total -= 1;
		Metallic.total -= 1;
		lightLoadingProgress += 1;
	}
	}
}

function buyWandCraft() {
	if (Chaos.total >= 10000) {
		Chaos.total -= 10000;
		craftWand++;
		$(".craftWandCost").hide();
		$("#wandLoader").removeClass("hidden");
	} else { SnackBar("Requirements not met.");
	}
}
function wandCraft() {
	if (craftWand >= 0) {
	if (Aetheric.total >= 1 && Prismatic.total >= 1 && Faceted.total >= 1 && Primitive.total >= 1) {
		Primitive.total -= 1;
		Prismatic.total -= 1;
		Aetheric.total -= 1;
		Faceted.total -= 1;
		wandLoadingProgress += 1;
	}
	}
}

//mirroring
function buyMirrorSword() {
	if (Prime.total >= 50 && Jagged.total >= 50 && Serrated.total >= 50 && Shuddering.total >= 50 && Corroded.total >= 50 && Eternal.total >= 25 && Exalted.total >= 500) {
		Exalted.total -= 500;
		Eternal.total -= 25;
		Corroded.total -= 50;
		Shuddering.total -= 50;
		Serrated.total -= 50;
		Jagged.total -= 50;
		Prime.total -= 50;
		mirrorSword++;
		$(".mirrorSwordCost").hide();
		$("#mirrorSwordLoader").removeClass("hidden");
		$(".mirrorSwordStats").removeClass("hidden");
		SnackBar("600pDPS Sword Crafted!");
	} else { SnackBar("Requirements not met.");
	}
}

function mirrorSwordTick() {
	if (mirrorSword >= 0) {
		mirrorSwordLoadingProgress += 1;
	}
}

function buyMirrorShield() {
	if (Awakener.total >= 1 && Hunter.total >= 1 && Crusader.total >= 1 && Potent.total >= 50 && Dense.total >= 50 && Lucent.total >= 50 && Eternal.total >= 30 && Exalted.total >= 600) {
		Exalted.total -= 600;
		Eternal.total -= 30;
		Lucent.total -= 50;
		Dense.total -= 50;
		Potent.total -= 50;
		Crusader.total -= 1;
		Hunter.total -= 1;
		Awakener.total -= 1;
		mirrorShield++;
		$(".mirrorShieldCost").hide();
		$("#mirrorShieldLoader").removeClass("hidden");
		$(".mirrorShieldStats").removeClass("hidden");
		SnackBar("ES Shield Crafted!");
	} else { SnackBar("Requirements not met.");
	}
}

function mirrorShieldTick() {
	if (mirrorShield >= 0) {
		mirrorShieldLoadingProgress += 1;
	}
}

function buyMirrorChest() {
	if (Awakener.total >= 1 && Hunter.total >= 1 && Crusader.total >= 1 && Prime.total >= 50 && Jagged.total >= 50 && Bound.total >= 50 && Pristine.total >= 50 && Serrated.total >= 50 && Eternal.total >= 35 && Exalted.total >= 700) {
		Exalted.total -= 700;
		Eternal.total -= 35;
		Serrated.total -= 50;
		Pristine.total -= 50;
		Bound.total -= 50;
		Jagged.total -= 50;
		Prime.total -= 50;
		Crusader.total -= 1;
		Hunter.total -= 1;
		Awakener.total -= 1;
		mirrorChest++;
		$(".mirrorChestCost").hide();
		$("#mirrorChestLoader").removeClass("hidden");
		$(".mirrorChestStats").removeClass("hidden");
		SnackBar("Explode Chest Crafted!");
	} else { SnackBar("Requirements not met.");
	}
}

function mirrorChestTick() {
	if (mirrorChest >= 0) {
		mirrorChestLoadingProgress += 1;
	}
}

//loading bars
//crafts
setInterval (function flaskLoadingBarAnimate() {
	if (flaskLoadingProgress >= 1) {
		flaskLoadingProgress += 1;
		let e = document.querySelector('#flaskLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(flaskLoadingProgress);
  		if (flaskLoadingProgress >= 99) {
		flaskLoadingProgress = 0;
		e.MaterialProgress.setProgress(flaskLoadingProgress);
		Chaos.total += 10;
		craftFlask++;
		document.getElementsByClassName('craftFlaskTotal')[0].innerHTML = numeral(craftFlask).format('0,0');
  		}
	}
}, 300);

setInterval (function gemLoadingBarAnimate() {
	if (gemLoadingProgress >= 1) {
		gemLoadingProgress += 1;
		let e = document.querySelector('#gemLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(gemLoadingProgress);
  		if (gemLoadingProgress >= 99) {
		gemLoadingProgress = 0;
		e.MaterialProgress.setProgress(gemLoadingProgress);
		Chaos.total += 40;
		craftGem++;
		document.getElementsByClassName('craftGemTotal')[0].innerHTML = numeral(craftGem).format('0,0');
  		}
	}
}, 300);

setInterval (function enchantLoadingBarAnimate() {
	if (enchantLoadingProgress >= 1) {
		enchantLoadingProgress += 1;
		let e = document.querySelector('#enchantLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(enchantLoadingProgress);
  		if (enchantLoadingProgress >= 99) {
		enchantLoadingProgress = 0;
		e.MaterialProgress.setProgress(enchantLoadingProgress);
		Chaos.total += 25;
		craftEnchant++;
		document.getElementsByClassName('craftEnchantTotal')[0].innerHTML = numeral(craftEnchant).format('0,0');
  		}
	}
}, 300);

setInterval (function perfectLoadingBarAnimate() {
	if (perfectLoadingProgress >= 1) {
		perfectLoadingProgress += 1;
		let e = document.querySelector('#perfectLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(perfectLoadingProgress);
  		if (perfectLoadingProgress >= 99) {
		perfectLoadingProgress = 0;
		e.MaterialProgress.setProgress(perfectLoadingProgress);
		Chaos.total += 50;
		craftPerfect++;
		document.getElementsByClassName('craftPerfectTotal')[0].innerHTML = numeral(craftPerfect).format('0,0');
  		}
	}
}, 300);

setInterval (function chaosLoadingBarAnimate() {
	if (chaosLoadingProgress >= 1) {
		chaosLoadingProgress += 1;
		let e = document.querySelector('#chaosLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(chaosLoadingProgress);
  		if (chaosLoadingProgress >= 99) {
		chaosLoadingProgress = 0;
		e.MaterialProgress.setProgress(chaosLoadingProgress);
		Chaos.total += 100;
		craftChaos++;
		document.getElementsByClassName('craftChaosTotal')[0].innerHTML = numeral(craftChaos).format('0,0');
  		}
	}
}, 300);

setInterval (function coldLoadingBarAnimate() {
	if (coldLoadingProgress >= 1) {
		coldLoadingProgress += 1;
		let e = document.querySelector('#coldLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(coldLoadingProgress);
  		if (coldLoadingProgress >= 99) {
		coldLoadingProgress = 0;
		e.MaterialProgress.setProgress(coldLoadingProgress);
		Chaos.total += 100;
		craftCold++;
		document.getElementsByClassName('craftColdTotal')[0].innerHTML = numeral(craftCold).format('0,0');
  		}
	}
}, 300);

setInterval (function fireLoadingBarAnimate() {
	if (fireLoadingProgress >= 1) {
		fireLoadingProgress += 1;
		let e = document.querySelector('#fireLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(fireLoadingProgress);
  		if (fireLoadingProgress >= 99) {
		fireLoadingProgress = 0;
		e.MaterialProgress.setProgress(fireLoadingProgress);
		Chaos.total += 100;
		craftFire++;
		document.getElementsByClassName('craftFireTotal')[0].innerHTML = numeral(craftFire).format('0,0');
  		}
	}
}, 300);

setInterval (function lightLoadingBarAnimate() {
	if (lightLoadingProgress >= 1) {
		lightLoadingProgress += 1;
		let e = document.querySelector('#lightLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(lightLoadingProgress);
  		if (lightLoadingProgress >= 99) {
		lightLoadingProgress = 0;
		e.MaterialProgress.setProgress(lightLoadingProgress);
		Chaos.total += 100;
		craftLight++;
		document.getElementsByClassName('craftLightTotal')[0].innerHTML = numeral(craftLight).format('0,0');
  		}
	}
}, 300);

setInterval (function wandLoadingBarAnimate() {
	if (wandLoadingProgress >= 1) {
		wandLoadingProgress += 1;
		let e = document.querySelector('#wandLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(wandLoadingProgress);
  		if (wandLoadingProgress >= 99) {
		wandLoadingProgress = 0;
		e.MaterialProgress.setProgress(wandLoadingProgress);
		Chaos.total += 250;
		craftWand++;
		document.getElementsByClassName('craftWandTotal')[0].innerHTML = numeral(craftWand).format('0,0');
  		}
	}
}, 300);

//mirrors
setInterval (function mirrorSwordLoadingBarAnimate() {
	if (mirrorSwordLoadingProgress >= 1) {
		mirrorSwordLoadingProgress += 1;
		let e = document.querySelector('#mirrorSwordLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(mirrorSwordLoadingProgress);
  		if (mirrorSwordLoadingProgress >= 99) {
		mirrorSwordLoadingProgress = 0;
		e.MaterialProgress.setProgress(mirrorSwordLoadingProgress);
		Exalted.total += mirrorSwordFee;
		mirrorSwordFee += 5;
		mirrorSword++;
		document.getElementsByClassName('mirrorSwordTotal')[0].innerHTML = numeral(mirrorSword).format('0,0');
		document.getElementsByClassName('mirrorSwordFee')[0].innerHTML = numeral(mirrorSwordFee).format('0,0');
  		}
	}
}, 600);

setInterval (function mirrorShieldLoadingBarAnimate() {
	if (mirrorShieldLoadingProgress >= 1) {
		mirrorShieldLoadingProgress += 1;
		let e = document.querySelector('#mirrorShieldLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(mirrorShieldLoadingProgress);
  		if (mirrorShieldLoadingProgress >= 99) {
		mirrorShieldLoadingProgress = 0;
		e.MaterialProgress.setProgress(mirrorShieldLoadingProgress);
		Exalted.total += mirrorShieldFee;
		mirrorShieldFee += 5;
		mirrorShield++;
		document.getElementsByClassName('mirrorShieldTotal')[0].innerHTML = numeral(mirrorShield).format('0,0');
		document.getElementsByClassName('mirrorShieldFee')[0].innerHTML = numeral(mirrorShieldFee).format('0,0');
  		}
	}
}, 600);

setInterval (function mirrorChestLoadingBarAnimate() {
	if (mirrorChestLoadingProgress >= 1) {
		mirrorChestLoadingProgress += 1;
		let e = document.querySelector('#mirrorChestLoader');
	    componentHandler.upgradeElement(e);
	    e.MaterialProgress.setProgress(mirrorChestLoadingProgress);
  		if (mirrorChestLoadingProgress >= 99) {
		mirrorChestLoadingProgress = 0;
		e.MaterialProgress.setProgress(mirrorChestLoadingProgress);
		Exalted.total += mirrorChestFee;
		mirrorChestFee += 5;
		mirrorChest++;
		document.getElementsByClassName('mirrorChestTotal')[0].innerHTML = numeral(mirrorChest).format('0,0');
		document.getElementsByClassName('mirrorChestFee')[0].innerHTML = numeral(mirrorChestFee).format('0,0');
  		}
	}
}, 600);