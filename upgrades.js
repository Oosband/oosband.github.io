var upgradeDropRate = 0;
var sulphiteDropRate = 350;
var currencyStashTab = 0;
var delveStashTab = 0;
var quadStashTab = 0;
var divStashTab = 0;
var nikoScarab = 0;
var iiqCost = 10;
var incubatorCost = 20;
var mappingCurrencyLevel = 0;

setInterval (function updateTick() { //checks if upgrade conditions are met.
	currencyTab();
	delveTab();
	quadTab();
	iiqUpgrade();
	incubatorUpgrade();
	consumeMapCurrencyUpgrade();
	divTab();

	if (Crusader.total >= 1) {
		$("#CrusaderUpgrade").show();
		hoverUpgrades("CrusaderUpgrade","Crusader");
	}
	if (Hunter.total >= 1) {
		$("#HunterUpgrade").show();
		hoverUpgrades("HunterUpgrade","Hunter");
	}
	if (Redeemer.total >= 1) {
		$("#RedeemerUpgrade").show();
		hoverUpgrades("RedeemerUpgrade","Redeemer");
	}
	if (Warlord.total >= 1) {
		$("#WarlordUpgrade").show();
		hoverUpgrades("WarlordUpgrade","Warlord");
	}

	rollMapCurrency();
}, 500);

function noOp() {}; //noOperation function to clear upgrades when completed.

function hoverUpgrades(name,a,b) {
		$('#'+name).hover(
			function () {
			$("."+a).addClass('hover');
			$("."+b).addClass('hover');
			}, function () {
			$("."+a).removeClass('hover');
			$("."+b).removeClass('hover');
			}
			);
	}

//---Upgrades
function currencyTab() {
	if (totalLevel >= 250) {
	$("#UpgradeTable").append(
			'<tr id="currencyTab">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored currencyTabButton" onclick="buyCurrencyTab();">Currency Stash Tab</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Purchase the Currency Stash Tab</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">5 Stacked Deck</td>'+
            '</tr>'
		);
	hoverUpgrades("currencyTab","StackedDeck");
	currencyTab = noOp;
	}
}

function buyCurrencyTab() {
	if (StackedDeck.total >= 5) {
		StackedDeck.total -= 5;
		currencyStashTab = 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		$(".StackedDeck").removeClass("hover");
		$('#currencyTab').remove();
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
	} else { SnackBar("Requirements not met.");
	}
}

function delveTab() {
	if (totalLevel >= 500) {
	$("#UpgradeTable").append(
			'<tr id="delveTab">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored delveTabButton" onclick="buyDelveTab();">Delve Stash Tab</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Purchase the Delve Stash Tab</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">50 Stacked Deck<br>10 Orb of Annulment</td>'+
            '</tr>'
		);
	hoverUpgrades("delveTab","StackedDeck","Annulment");
	delveTab = noOp;
	}
}

function buyDelveTab() {
	if (Annulment.total >= 10 && StackedDeck.total >= 50) {
		StackedDeck.total -= 50;
		Annulment.total -= 10;
		delveStashTab = 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		$(".StackedDeck").removeClass("hover");
		$(".Annulment").removeClass("hover");
		$('#delveTab').remove();
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		delveScarab();
	} else { SnackBar("Requirements not met.");
	}
}

function quadTab() {
	if (totalLevel >= 1000) {
	$("#UpgradeTable").append(
			'<tr id="quadTab">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored quadTabButton" onclick="buyQuadTab();">Quad Stash Tab</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Purchase the Quad Stash Tab</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">1 Eternal Orb</td>'+
            '</tr>'
		);
	hoverUpgrades("quadTab","Eternal");
	quadTab = noOp;
	}
}

function buyQuadTab() {
	if (Annulment.total >= 20 && StackedDeck.total >= 100) {
		StackedDeck.total -= 100;
		Annulment.total -= 20;
		quadStashTab = 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		$(".Eternal").removeClass("hover");
		$('#quadTab').remove();
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
	} else { SnackBar("Requirements not met.");
	}
}

function delveScarab() {
	if (delveStashTab == 1) {
	$("#UpgradeTable").append(
		'<tr id="delveScarab">'+
            '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nikoScarab" onclick="buyNikoScarab();">Rusted Sulphite Scarab</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Use Sulphite Scarab to increase Sulphite quantity</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
            '<td class="mdl-data-table__cell--non-numeric delveScarabCost">1 Exalted</td>'+
        '</tr>'
	);
	hoverUpgrades("delveScarab","Exalted");
	delveScarab = noOp;
	}
}

function buyNikoScarab() {
	if (nikoScarab == 0) {
		if (Exalted.total >= 1) {
			Exalted.total -= 1;
			nikoScarab++;
			sulphiteDropRate += 100;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('delveScarabCost')[0].innerHTML = "5 Exalted";
			document.getElementsByClassName('nikoScarab')[0].innerHTML = "Polished Sulphite Scarab";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (nikoScarab == 1) {
		if (Exalted.total >= 5) {
			Exalted.total -= 5;
			nikoScarab++;
			sulphiteDropRate += 100;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('delveScarabCost')[0].innerHTML = "10 Exalted";
			document.getElementsByClassName('nikoScarab')[0].innerHTML = "Gilded Sulphite Scarab";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (nikoScarab == 2) {
		if (Exalted.total >= 10) {
			Exalted.total -= 10;
			nikoScarab++;
			sulphiteDropRate += 100;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			$(".Exalted").removeClass("hover");
			$('#delveScarab').remove();
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	}
}

function divTab() {
	if (totalLevel >= 750) {
	$("#UpgradeTable").append(
			'<tr id="divTab">'+
                '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored divTabButton" onclick="buyDivTab();">Divination Stash Tab</button></td>'+
	            '<td class="mdl-data-table__cell--non-numeric">Consume (1) Stacked Deck<br>(per tick)</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
	            '<td class="mdl-data-table__cell--non-numeric">50 Orb of Annulment<br>1 Exalted</td>'+
            '</tr>'
		);
	hoverUpgrades("divTab","Exalted","Annulment");
	divTab = noOp;
	}
}

function buyDivTab() {
	if (Annulment.total >= 50 && Exalted.total >= 1) {
		Annulment.total -= 50;
		Exalted.total -= 1;
		divStashTab = 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		$(".Exalted").removeClass("hover");
		$(".Annulment").removeClass("hover");
		$('#divTab').remove();
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
	} else { SnackBar("Requirements not met.");
	}
}

function iiqUpgrade() {
	if (Ascendant.level >= 50) {
	$("#UpgradeTable").append(
		'<tr id="iiqUpgrade">'+
            '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored iiqUpgradeButton" onclick="buyiiqUpgrade();">IIQ Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy Increased Item Quantity gear for exiles</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
            '<td class="mdl-data-table__cell--non-numeric iiqUpgradeCostDisply">'+numeral(iiqCost).format('0,0')+' Chaos</td>'+
        '</tr>'
	);
	hoverUpgrades("iiqUpgrade","Chaos");
	iiqUpgrade = noOp;
	}
}

function buyiiqUpgrade() {
	if (Chaos.total >= iiqCost) {
		Chaos.total -= iiqCost;
		iiqCost = Math.floor(iiqCost*1.5);
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		document.getElementsByClassName('iiqUpgradeCostDisply')[0].innerHTML = numeral(iiqCost).format('0,0')+' Chaos';
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
	} else { SnackBar("Requirements not met.");
	}
}

function incubatorUpgrade() {
	if (Ascendant.level >= 75) {
	$("#UpgradeTable").append(
		'<tr id="incubatorUpgrade">'+
            '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored incubatorUpgradeButton" onclick="buyIncubatorUpgrade();">Equip Incubators</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Equip Incubators to exile gear</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+1.5</td>'+
            '<td class="mdl-data-table__cell--non-numeric incubatorUpgradeCostDisply">'+numeral(incubatorCost).format('0,0')+' Chaos</td>'+
        '</tr>'
	);
	hoverUpgrades("incubatorUpgrade","Chaos");
	incubatorUpgrade = noOp;
	}
}

function buyIncubatorUpgrade() {
	if (Chaos.total >= incubatorCost) {
		Chaos.total -= incubatorCost;
		incubatorCost = Math.floor(incubatorCost*1.3);
		upgradeDropRate += 1.5;
		SnackBar("Upgrade purchased!");
		document.getElementsByClassName('incubatorUpgradeCostDisply')[0].innerHTML = numeral(incubatorCost).format('0,0')+' Chaos';
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
	} else { SnackBar("Requirements not met.");
	}
}

function iiqUpgrade() {
	if (Ascendant.level >= 70) {
	$("#UpgradeTable").append(
		'<tr id="iiqUpgrade">'+
            '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored iiqUpgradeButton" onclick="buyiiqUpgrade();">IIQ Gear</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric">Buy Increased Item Quantity gear for exiles</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
            '<td class="mdl-data-table__cell--non-numeric iiqUpgradeCostDisply">'+numeral(iiqCost).format('0,0')+' Chaos</td>'+
        '</tr>'
	);
	hoverUpgrades("iiqUpgrade","Chaos");
	iiqUpgrade = noOp;
	}
}

function buyiiqUpgrade() {
	if (Chaos.total >= iiqCost) {
		Chaos.total -= iiqCost;
		iiqCost = Math.floor(iiqCost*1.5);
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		document.getElementsByClassName('iiqUpgradeCostDisply')[0].innerHTML = numeral(iiqCost).format('0,0')+' Chaos';
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
	} else { SnackBar("Requirements not met.");
	}
}

function mapCurrency() {
	for (let i = 0; i < currencyData.length; i++) {
		let c = currencyData[i].rollCurrencyRNG();
	    if (c <= currencyData[i].rate*(500+upgradeDropRate)) {
	        currencyData[i].total += 1+(currencyData[i].rate*(500+upgradeDropRate)); //adds multiple if dropRate high enough
            if (currencyData[i].name == 'Mirror') {
                SnackBar("Mirror of Kalandra dropped!");
            }
	    }
	}
}

function rollMapCurrency() {
	if (divStashTab >= 1) { //Stacked Decks
		if (StackedDeck.total >= 1) {
			StackedDeck.total -= 1;
			mapCurrency();
		}
	}
	if (mappingCurrencyLevel >= 1) { //alch/scours
		if (Alchemy.total >= 2 && Scouring.total >= 1) {
			Alchemy.total -= 2;
			Scouring.total -= 1;
			mapCurrency();
		}
	}
	if (mappingCurrencyLevel >= 2) { //chisel
		if (Chisel.total >= 4) {
			Chisel.total -= 4;
			mapCurrency();
		}
	}
	if (mappingCurrencyLevel >= 3) { //simple sextant
		if (SimpleSextant.total >= 1) {
			SimpleSextant.total -= 1;
			mapCurrency();
		}
	}
	if (mappingCurrencyLevel >= 4) { //prime sextant
		if (PrimeSextant.total >= 1) {
			PrimeSextant.total -= 1;
			mapCurrency();
		}
	}
	if (mappingCurrencyLevel >= 5) { //awakened sextant
		if (AwakenedSextant.total >= 1) {
			AwakenedSextant.total -= 1;
			mapCurrency();
		}
	}
	if (mappingCurrencyLevel >= 6) { //vaal
		if (Vaal.total >= 1) {
			Vaal.total -= 1;
			mapCurrency();
		}
	}
	if (mappingCurrencyLevel >= 7) { //silver coin
		if (SilverCoin.total >= 6) {
			SilverCoin.total -= 6;
			mapCurrency();
		}
	}
}

function consumeMapCurrencyUpgrade() {
	if (Ascendant.level >= 68) {
	$("#UpgradeTable").append(
		'<tr id="consumeMapCurrency">'+
            '<td class="mdl-data-table__cell--non-numeric"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored consumeMapCurrencyButton" onclick="buyMapCurrency();">Alch/Scour Maps</button></td>'+
            '<td class="mdl-data-table__cell--non-numeric consumeMapCurrenydiv">Consume (2) Alchemy, (1) Scour to increase drop rate from maps<br>(per tick)</td>'+
            '<td class="mdl-data-table__cell--non-numeric">+2.5</td>'+
            '<td class="mdl-data-table__cell--non-numeric mapCurrencyCost">1 Exalted</td>'+
        '</tr>'
	);
	hoverUpgrades("consumeMapCurrency","Exalted");
	consumeMapCurrencyUpgrade = noOp;
	}
}

function buyMapCurrency() {
	if (mappingCurrencyLevel == 0) {
		if (Exalted.total >= 1) {
			Exalted.total -= 1;
			mappingCurrencyLevel++;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('mapCurrencyCost')[0].innerHTML = "1 Exalted";
			document.getElementsByClassName('consumeMapCurrencyButton')[0].innerHTML = "Chisel Maps";
			document.getElementsByClassName('consumeMapCurrenydiv')[0].innerHTML = "Consume (4) Cartographer's Chisel to increase drop rate from maps<br>(per tick)";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (mappingCurrencyLevel == 1) {
		if (Exalted.total >= 1) {
			Exalted.total -= 1;
			mappingCurrencyLevel++;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('mapCurrencyCost')[0].innerHTML = "2 Exalted";
			document.getElementsByClassName('consumeMapCurrencyButton')[0].innerHTML = "Simple Sextant Maps";
			document.getElementsByClassName('consumeMapCurrenydiv')[0].innerHTML = "Consume (1) Simple Sextant to increase drop rate from maps<br>(per tick)";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (mappingCurrencyLevel == 2) {
		if (Exalted.total >= 2) {
			Exalted.total -= 2;
			mappingCurrencyLevel++;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('mapCurrencyCost')[0].innerHTML = "2 Exalted";
			document.getElementsByClassName('consumeMapCurrencyButton')[0].innerHTML = "Prime Sextant Maps";
			document.getElementsByClassName('consumeMapCurrenydiv')[0].innerHTML = "Consume (1) Prime Sextant to increase drop rate from maps<br>(per tick)";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (mappingCurrencyLevel == 3) {
		if (Exalted.total >= 2) {
			Exalted.total -= 2;
			mappingCurrencyLevel++;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('mapCurrencyCost')[0].innerHTML = "2 Exalted";
			document.getElementsByClassName('consumeMapCurrencyButton')[0].innerHTML = "Awakened Sextant Maps";
			document.getElementsByClassName('consumeMapCurrenydiv')[0].innerHTML = "Consume (1) Awakened Sextant to increase drop rate from maps<br>(per tick)";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (mappingCurrencyLevel == 4) {
		if (Exalted.total >= 2) {
			Exalted.total -= 2;
			mappingCurrencyLevel++;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('mapCurrencyCost')[0].innerHTML = "2 Exalted";
			document.getElementsByClassName('consumeMapCurrencyButton')[0].innerHTML = "Vaal Maps";
			document.getElementsByClassName('consumeMapCurrenydiv')[0].innerHTML = "Consume (1) Vaal Orb to increase drop rate from maps<br>(per tick)";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (mappingCurrencyLevel == 5) {
		if (Exalted.total >= 2) {
			Exalted.total -= 2;
			mappingCurrencyLevel++;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('mapCurrencyCost')[0].innerHTML = "3 Exalted";
			document.getElementsByClassName('consumeMapCurrencyButton')[0].innerHTML = "Use Prophecies";
			document.getElementsByClassName('consumeMapCurrenydiv')[0].innerHTML = "Consume (6) Silver Coins to increase drop rate from maps<br>(per tick)";
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		} else { SnackBar("Requirements not met.");
		} 
	} else if (mappingCurrencyLevel == 6) {
		if (Exalted.total >= 3) {
			Exalted.total -= 3;
			mappingCurrencyLevel++;
			upgradeDropRate += 2.5;
			SnackBar("Upgrade purchased!");
			document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
			$(".Exalted").removeClass("hover");
			$('#consumeMapCurrency').remove();
		} else { SnackBar("Requirements not met.");
		} 
	}
}

function buyCrusader() {
	if (Crusader.total >= 1) {
		Crusader.total -= 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		if (Crusader.total < 1) {
			$("#CrusaderUpgrade").hide();
			$(".Crusader").removeClass("hover");
		}
	}
}

function buyHunter() {
	if (Hunter.total >= 1) {
		Hunter.total -= 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		if (Hunter.total < 1) {
				$("#HunterUpgrade").hide();
				$(".Hunter").removeClass("hover");
		}
	}
}

function buyRedeemer() {
	if (Redeemer.total >= 1) {
		Redeemer.total -= 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		if (Redeemer.total < 1) {
				$("#RedeemerUpgrade").hide();
				$(".Redeemer").removeClass("hover");
		}
	}
}

function buyWarlord() {
	if (Warlord.total >= 1) {
		Warlord.total -= 1;
		upgradeDropRate += 2.5;
		SnackBar("Upgrade purchased!");
		document.getElementsByClassName('UpgradeDropRate')[0].innerHTML = upgradeDropRate.toFixed(1);
		if (Warlord.total < 1) {
				$("#WarlordUpgrade").hide();
				$(".Warlord").removeClass("hover");
		}
	}
}
