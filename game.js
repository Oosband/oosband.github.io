function gameStart() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();
	$("#CrusaderUpgrade").hide();
	$("#HunterUpgrade").hide();
	$("#RedeemerUpgrade").hide();
	$("#WarlordUpgrade").hide();
	$(".craft").hide();

	$("#loader").hide();
	
}

function welcome() {

	$("#welcomePre").hide();
	$("#main").removeClass("hidden");
	$("#guild").removeClass("hidden");
	$("#crafting").removeClass("hidden");
	$("#delving").removeClass("hidden");
	$("#info").removeClass("hidden");
	showGuild();
}

//----------------------------------Menu
function showMain() {

	$("#main").show();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();
	$("#divBuyCurrency").hide();
	$("#divSellCurrency").hide();
	$("#divTheorycrafting").show();
	$("#divSingularity").hide();
	$("#divFlipping").hide();
	$("#MainCurrency").removeClass("mdl-cell--4-col");
	$("#MainCurrency").removeClass("mdl-cell--4-col-tablet");
	$("#MainCurrency").addClass("mdl-cell--3-col");
	$("#MainCurrency").addClass("mdl-cell--3-col-tablet");
}

function showGuild() {

	$("#main").hide();
	$("#guild").show();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();
	
}

function showFlipping() {

	$("#main").show();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").hide();
	$("#divBuyCurrency").show();
	$("#divSellCurrency").show();
	$("#divTheorycrafting").hide();
	$("#divSingularity").show();
	$("#divFlipping").show();
	$("#MainCurrency").removeClass("mdl-cell--3-col");
	$("#MainCurrency").removeClass("mdl-cell--3-col-tablet");
	$("#MainCurrency").addClass("mdl-cell--4-col");
	$("#MainCurrency").addClass("mdl-cell--4-col-tablet");
	
}

function showCrafting() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").show();
	$("#delving").hide();
	$("#info").hide();
	
}

function showDelving() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").show();
	$("#info").hide();
	
}

function showInfo() {

	$("#main").hide();
	$("#guild").hide();
	$("#crafting").hide();
	$("#delving").hide();
	$("#info").show();
	
}

//---Show upgrades
function showAllUpgrades() {
	$("#UpgradeTable").show();
	$("#UpgradeGearTable").show();
	$("#UpgradeLinksTable").show();
}
function showGeneralUpgrades() {
	$("#UpgradeTable").show();
	$("#UpgradeGearTable").hide();
	$("#UpgradeLinksTable").hide();
}
function showGearUpgrades() {
	$("#UpgradeTable").hide();
	$("#UpgradeGearTable").show();
	$("#UpgradeLinksTable").hide();
}
function showLinksUpgrades() {
	$("#UpgradeTable").hide();
	$("#UpgradeGearTable").hide();
	$("#UpgradeLinksTable").show();
}

//---Misc.

//---Snackbar
function SnackBar(input) {
	if (snackBarTimer <= 0) {
		'use strict';
		var snackbarContainer = document.querySelector('#snackBar');
		var data = {message: input, timeout: 1500};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
		snackBarTimer = 1500;
	}
}

//---Hover Menu Contrast Fix
function hoverMenu() {
    $('.menuHover').hover(
        function () {
        $(".material-icons").addClass('mdl-color-text--blue-grey-600');
        }, function () {
        $(".material-icons").removeClass('mdl-color-text--blue-grey-600');
        }
    );
}

//----------------------------------Start Functions
gameStart();
hoverMenu();

//---File Handling
// window.setInterval(function saveGame() {
//    localStorage['goeSaveCurrency'] = btoa(JSON.stringify(Currency));
//    localStorage['goeSaveExile'] = btoa(JSON.stringify(Exile));
// }, 30000);
// function saveGameManual() {
//    localStorage['goeSaveCurrency'] = btoa(JSON.stringify(Currency));
//    localStorage['goeSaveExile'] = btoa(JSON.stringify(Exile));
// }

// function load_game() {
//     if (!localStorage['goeSave']) return;
//     var goeSaveCurrency = JSON.parse(atob(localStorage['goeSaveCurrency']));
//     var goeSaveExiles = JSON.parse(atob(localStorage['goeSaveExiles']));
//     Currency = goeSaveCurrency;
//     Exiles = goeSaveExiles;
// //update all info on screen
 
// }

// function delete_game() {
//     localStorage.clear();
//     window.location.reload();
// }
