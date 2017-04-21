/*
RPG Incremental | Oos 2017
Learning JavaScript

To DO:
Images
Comment code
Name game
Prestige
Old Relic currency, cooldowns
>V arrows on tabs to indicate if open
dps display

BALANCE:
Too much gold, tie it to monster kill hp?
hp kinda pointless
enemies need to do more damage
LEECH not working???
gold/upgrade thing out of whack, less gold than upgrade cost earned (1.5 x 2.2)
*/

var master = { //global variable array
//Currency
gold: 150,
oldRelic: 0,

//General
monsterHP: 300,
monsterHPstart: 300, //monster hp at the start of a zone
monsterDPS: 1,
currentZone: 1,
highestZone: 1,

//Heroes
meleeHP: 100,
meleeHPCurrent: 100,
meleeAttack1: 1,
meleeAttack3: 7,
meleeLevel: 1,

healerHP: 30,
healerHPCurrent: 30,
healerAttack2: 1, //heal
healerLevel: 1,

wizardHP: 50,
wizardHPCurrent: 50,
wizardAttack1: 3,
wizardAttack2: 30,
wizardLevel: 1,

supportHP: 30,
supportHPCurrent: 30,
supportLevel: 1,

bowHP: 50,
bowHPCurrent: 50,
bowAttack1: 2,
bowAttack2: 25,
bowLevel: 1,
///end heroes///

//Hero Global Passives
gHealth2: 1.01, //healer 1% health buff
warCry2: 1.01, //support 1% dmg buff
gGold1: 1.01, //support 1% gold buff
//Relics
warCry: 1.01, //1% dmg buff relic
gHealth1: 1.01, //healer health relic
gEnergy: 0, //wizard base damage to attacks relic
gGold2: 1.01, //support 1% gold relic
gLifeSteal: 0.01, //Life Steal Relic
//Temp Relics Being Rolled
rRelic: 0,
rWC: 0,
rHealth: 0,
rEnergy: 0,
rGold: 0,
rLifeSteal: 0,

//Active Skills///
gEnrage: 1, //1 off, 3 on
gSoothe: 1, //1 off, 3 on
sBarricade: 0, //off
//Cooldowns/Timers
coolBarricade: 120,
coolResurrect: 120,
coolEnrage: 180,
coolSoothe: 180,
coolConverge: 60,
timerBarricade: 0,
timerEnrage: 0,
timerSoothe: 0,

//Death Bool (0 true, 1 false)
meleeAlive: 0,
healerAlive: 0,
wizardAlive: 0,
supportAlive: 0,
bowAlive: 0,

//Hero Upgrades
//Melee
meleeLevelCount: 0,
meleeHPCount: 0,
meleeUp1Count: 0,
meleeUp2Count: 0,
meleeUp3Count: 0,
MeleeA1: 1, //total melee attack 1 dmg
MeleeA3: 7, //total melee attack 2 dmg
next_meleeLevelCost: 100,
next_meleeHPCost: 30,
next_meleeUp1Cost: 10,
next_meleeUp3Cost: 70,
meleeLevelCost: 100,
meleeHPCost: 30,
meleeUp1Cost: 10,
meleeUp3Cost: 70,
//Healer
healerLevelCount: 0,
healerHPCount: 0,
healerUp2Count: 0,
healerUp3Count: 0,
HealerA1: 1, //total heal
next_healerLevelCost: 100,
next_healerHPCost: 30,
next_healerUp2Cost: 30,
next_healerUp3Cost: 120,
healerLevelCost: 100,
healerHPCost: 30,
healerUp2Cost: 30,
healerUp3Cost: 120,
//Wizard
wizardLevelCount: 0,
wizardHPCount: 0,
wizardUp1Count: 0,
wizardUp2Count: 0,
wizardUp3Count: 0,
WizardA1: 3, //total attack 1 dmg
WizardA2: 30, //total attack 2 dmg
next_wizardLevelCost: 100,
next_wizardHPCost: 30,
next_wizardUp1Cost:30,
next_wizardUp2Cost: 300,
wizardLevelCost: 100,
wizardHPCost: 30,
wizardUp1Cost: 30,
wizardUp2Cost: 300,
//Support
supportLevelCount: 0,
supportHPCount: 0,
supportUp1Count: 0,
supportUp2Count: 0,
supportUp3Count: 0,
next_supportLevelCost: 100,
next_supportHPCost: 30,
next_supportUp1Cost: 50,
next_supportUp2Cost: 100,
supportLevelCost: 100,
supportHPCost: 30,
supportUp1Cost: 50,
supportUp2Cost: 100,
//Bow
bowLevelCount: 0,
bowHPCount: 0,
bowUp1Count: 0,
bowUp2Count: 0,
bowUp3Count: 0,
BowA1: 2, //total attack 1 dmg
BowA2: 25, //total attack 2 dmg
next_bowLevelCost: 100,
next_bowHPCost: 30,
next_bowUp1Cost: 20,
next_bowUp2Cost: 250,
bowLevelCost: 100,
bowHPCost: 30,
bowUp1Cost: 20,
bowUp2Cost: 250,

//Stat Tracking
totalKills: 0,
totalDeaths: 0,
totalWipes: 0,
timePlayed: 1,
foundRelic: 0,

}


var dom = { //updating DOM Objects to reduce lag
gold: document.getElementById("gold"),
UpdateInfo: document.getElementById("UpdateInfo"),
monsterHP: document.getElementById("monsterHP"),
currentZone: document.getElementById("currentZone"),
monsterDPS: document.getElementById("monsterDPS"),

meleeLevel: document.getElementById("meleeLevel"),
healerLevel: document.getElementById("healerLevel"),
wizardLevel: document.getElementById("wizardLevel"),
supportLevel: document.getElementById("supportLevel"),
bowLevel: document.getElementById("bowLevel"),

meleeDead: document.getElementById("meleeDead"),
healerDead: document.getElementById("healerDead"),
wizardDead: document.getElementById("wizardDead"),
supportDead: document.getElementById("supportDead"),
bowDead: document.getElementById("bowDead"),

meleeHP: document.getElementById("meleeHP"),
healerHP: document.getElementById("healerHP"),
wizardHP: document.getElementById("wizardHP"),
supportHP: document.getElementById("supportHP"),
bowHP: document.getElementById("bowHP"),

meleeUp1DPS: document.getElementById("meleeUp1DPS"),
meleeUp3DPS: document.getElementById("meleeUp3DPS"),
wizardUp1DPS: document.getElementById("wizardUp1DPS"),
wizardUp2DPS: document.getElementById("wizardUp2DPS"),
bowUp1DPS: document.getElementById("bowUp1DPS"),
bowUp2DPS: document.getElementById("bowUp2DPS"),

meleeLevelBuy: document.getElementById("meleeLevelBuy"),
meleeHPBuy: document.getElementById("meleeHPBuy"),
meleeUp1Buy: document.getElementById("meleeUp1Buy"),
meleeUp1C: document.getElementById("meleeUp1C"),
meleeUp3Buy: document.getElementById("meleeUp3Buy"),
meleeUp3C: document.getElementById("meleeUp3C"),

healerLevelBuy: document.getElementById("healerLevelBuy"),
healerHPBuy: document.getElementById("healerHPBuy"),
healerUp2Buy: document.getElementById("healerUp2Buy"),
healerUp2DPS: document.getElementById("healerUp2DPS"),
healerUp2C: document.getElementById("healerUp2C"),
healerUp3Buy: document.getElementById("healerUp3Buy"),
healerUp3DPS: document.getElementById("healerUp3DPS"),
healerUp3C: document.getElementById("healerUp3C"),

wizardLevelBuy: document.getElementById("wizardLevelBuy"),
wizardHPBuy: document.getElementById("wizardHPBuy"),
wizardUp1Buy: document.getElementById("wizardUp1Buy"),
wizardUp1C: document.getElementById("wizardUp1C"),
wizardUp2Buy: document.getElementById("wizardUp2Buy"),
wizardUp2C: document.getElementById("wizardUp2C"),

supportLevelBuy: document.getElementById("supportLevelBuy"),
supportHPBuy: document.getElementById("supportHPBuy"),
supportUp1Buy: document.getElementById("supportUp1Buy"),
supportUp1DPS: document.getElementById("supportUp1DPS"),
supportUp1C: document.getElementById("supportUp1C"),
supportUp2Buy: document.getElementById("supportUp2Buy"),
supportUp2DPS: document.getElementById("supportUp2DPS"),
supportUp2C: document.getElementById("supportUp2C"),

bowLevelBuy: document.getElementById("bowLevelBuy"),
bowHPBuy: document.getElementById("bowHPBuy"),
bowUp1Buy: document.getElementById("bowUp1Buy"),
bowUp1C: document.getElementById("bowUp1C"),
bowUp2Buy: document.getElementById("bowUp2Buy"),
bowUp2C: document.getElementById("bowUp2C"),

sBarricadeTimer: document.getElementById("sBarricadeTimer"),
sResurrectTimer: document.getElementById("sResurrectTimer"),
sEnrageTimer: document.getElementById("sEnrageTimer"),
sSootheTimer: document.getElementById("sSootheTimer"),
sConvergeTimer: document.getElementById("sConvergeTimer"),

timePlayed: document.getElementById("timePlayed"),
totalDeaths: document.getElementById("totalDeaths"),
totalWipes: document.getElementById("totalWipes"),
foundRelic: document.getElementById("foundRelic"),

oldRelics: document.getElementById("oldRelics"),
rWarCry: document.getElementById("rWarCry"),
rHealth: document.getElementById("rHealth"),
rGold: document.getElementById("rGold"),
rEnergy: document.getElementById("rEnergy"),
rLifeSteal: document.getElementById("rLifeSteal"),
}







//save
window.setInterval(function save_gameAuto() {
 localStorage['rpginc_save'] = btoa(JSON.stringify(master));
 dom.UpdateInfo.innerHTML = ('Game Saved');  
}, 30000);
function save_gameManual() {
 localStorage['rpginc_save'] = btoa(JSON.stringify(master));
 dom.UpdateInfo.innerHTML = ('Game Saved');
}
//load
function load_game() {
    if (!localStorage['rpginc_save']) return;
    var save_data_master = JSON.parse(atob(localStorage['rpginc_save']));
    master = save_data_master;
//update all info on screen on load below
dom.UpdateInfo.innerHTML = ('Loading...');  
updateDPS();
updateHP();
load_game_info();
dom.UpdateInfo.innerHTML = ('Game Loaded');  
}

function load_game_info() {
dom.gold.innerHTML = NumFix(master.gold);  
dom.monsterHP.innerHTML = NumFix(master.monsterHP) + "/ " + NumFix(master.monsterHPstart);
dom.currentZone.innerHTML = NumFix(master.currentZone);
dom.monsterDPS.innerHTML = NumFix(master.monsterDPS);

dom.meleeLevel.innerHTML = (('Shade | Level: ') + NumFix(master.meleeLevel));
dom.healerLevel.innerHTML = (('Shaman | Level: ') + NumFix(master.healerLevel));
dom.wizardLevel.innerHTML = (('Feu | Level: ') + NumFix(master.wizardLevel));
dom.supportLevel.innerHTML = (('Clout | Level: ') + NumFix(master.supportLevel));
dom.bowLevel.innerHTML = (('Flux | Level: ') + NumFix(master.bowLevel));

dom.meleeLevel.innerHTML = (('Shade | Level: ') + NumFix(master.meleeLevel));
dom.meleeLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_meleeLevelCost));
dom.meleeHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_meleeHPCost));
dom.meleeUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_meleeUp1Cost));
dom.meleeUp1C.innerHTML = NumFix(1+master.meleeUp1Count);
dom.meleeUp3Buy.innerHTML = (('Cost: ') + NumFix(master.next_meleeUp3Cost));
dom.meleeUp3C.innerHTML = NumFix(1+master.meleeUp3Count);

dom.healerLevel.innerHTML = (('Shaman | Level: ') + NumFix(master.healerLevel));
dom.healerLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_healerLevelCost));
dom.healerHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_healerHPCost));
dom.healerUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_healerUp2Cost));
dom.healerUp2DPS.innerHTML = (NumFix(master.HealerA1) + (' health every 1 sec')); 
dom.healerUp2C.innerHTML = NumFix(1+master.healerUp2Count);
dom.healerUp3Buy.innerHTML = (('Cost: ') + NumFix(master.next_healerUp3Cost));
dom.healerUp3DPS.innerHTML = NumFix(1+master.healerUp3Count) + ('&#37; health buff');
dom.healerUp3C.innerHTML = NumFix(1+master.healerUp3Count);

dom.wizardLevel.innerHTML = (('Feu | Level: ') + NumFix(master.wizardLevel));
dom.wizardLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_wizardLevelCost));
dom.wizardHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_wizardHPCost));
dom.wizardUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_wizardUp1Cost));
dom.wizardUp1C.innerHTML = NumFix(1+master.wizardUp1Count);
dom.wizardUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_wizardUp2Cost));
dom.wizardUp2C.innerHTML = NumFix(1+master.wizardUp2Count);

dom.supportLevel.innerHTML = (('Clout | Level: ') + NumFix(master.supportLevel));
dom.supportLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_supportLevelCost));
dom.supportHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_supportHPCost));
dom.supportUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_supportUp1Cost));
dom.supportUp1DPS.innerHTML = (NumFix(1+master.supportUp1Count) + ('&#37; damage buff'));
dom.supportUp1C.innerHTML = NumFix(1+master.supportUp1Count);
dom.supportUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_supportUp2Cost));
dom.supportUp2DPS.innerHTML = (NumFix(1+master.supportUp2Count) + ('&#37; gold buff'));
dom.supportUp2C.innerHTML = NumFix(1+master.supportUp2Count);

dom.bowLevel.innerHTML = (('Flux | Level: ') + NumFix(master.bowLevel));
dom.bowLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_bowLevelCost));
dom.bowHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_bowHPCost));
dom.bowUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_bowUp1Cost));
dom.bowUp1C.innerHTML = NumFix(1+master.bowUp1Count);
dom.bowUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_bowUp2Cost));
dom.bowUp2C.innerHTML = NumFix(1+master.bowUp2Count);

dom.sBarricadeTimer.innerHTML = master.coolBarricade;
dom.sResurrectTimer.innerHTML = master.coolResurrect;
dom.sEnrageTimer.innerHTML = master.coolEnrage;
dom.sSootheTimer.innerHTML = master.coolSoothe;
dom.sConvergeTimer.innerHTML = master.coolConverge;

dom.oldRelics.innerHTML = NumFix(master.oldRelic);
dom.rWarCry.innerHTML = NumFix(master.warCry) + (' &#37; Damage');
dom.rHealth.innerHTML = NumFix(master.gHealth1) + (' &#37; Health');
dom.rEnergy.innerHTML = NumFix(master.gEnergy) + (' base damage');
dom.rGold.innerHTML = NumFix(master.gGold2) + (' &#37; gold');
dom.rLifeSteal.innerHTML = NumFix(master.gLifeSteal) + (' &#37; Life Steal');
dom.totalDeaths.innerHTML = NumFix(master.totalDeaths); 
dom.totalWipes.innerHTML = NumFix(master.totalWipes); 
dom.foundRelic.innerHTML = NumFix(master.foundRelic);
}

function delete_game() {
    localStorage.clear();
    window.location.reload();
}













//Update total gold on stage completion
function updateGold() {
    master.gold += Math.floor(300 * ((Math.pow(1.75,master.currentZone))*master.gGold1)*master.gGold2);
    dom.gold.innerHTML = NumFix(master.gold);  
}
function haxGold() {
    master.gold += Math.floor(master.gold + (100 * Math.pow(2.2,10)));
    dom.gold.innerHTML = NumFix(master.gold);  
    dom.UpdateInfo.innerHTML = ('Unethical');
    master.coolBarricade = 1;
    master.coolResurrect = 1;
    master.coolEnrage = 1;
    master.coolConverge = 1;
    master.coolSoothe = 1;
}

//+1 zone calculations
function updateCurrentZoneHP() {
    master.monsterHP = Math.floor(300 * Math.pow(1.35,master.currentZone));
    master.monsterDPS = Math.floor(master.currentZone*1.75);
    master.monsterHPstart = master.monsterHP;
    dom.monsterHP.innerHTML = NumFix(master.monsterHP) + "/ " + NumFix(master.monsterHPstart);
    dom.currentZone.innerHTML = NumFix(master.currentZone);
    dom.monsterDPS.innerHTML = NumFix(master.monsterDPS);
}

//TEAM WIPE
window.setInterval(function teamWipe() {
    if ((master.meleeAlive+master.healerAlive+master.wizardAlive+master.supportAlive+master.bowAlive) == 5) {
        dom.UpdateInfo.innerHTML = ('Team wiped out! You have been set back 5 zones');
        master.currentZone -= 5;
        if (master.currentZone < 1) {
            master.currentZone = 1;
        }
        totalWipes();
        updateCurrentZoneHP();
        heroResurrect();
    }
}, 1000);







///CHARACTER UPGRADES///
///MELEE UPGRADES///
function buyMeleeLevel() {
master.meleeLevelCost = Math.floor(100 * Math.pow(2.2,master.meleeLevelCount));//works out the cost
if(master.gold >= master.meleeLevelCost){//checks that the player can afford
master.meleeLevel += 1;//increases the Level
master.meleeLevelCount += 1;
master.gold -= master.meleeLevelCost;//removes the gold  
calcDEEPSmelee();//updates dps displays     
master.next_meleeLevelCost = Math.floor(100 * Math.pow(2.2,master.meleeLevelCount));//works out the cost of the next
dom.meleeLevel.innerHTML = (('Shade | Level: ') + NumFix(master.meleeLevel));
dom.meleeLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_meleeLevelCost));
dom.gold.innerHTML = NumFix(master.gold);  
calcHPMelee();
dom.UpdateInfo.innerHTML = ('+1 Shade Level (+Base Damage, +3 HP)');        
};
}
function buyMeleeHP() {
master.meleeHPCost = Math.floor(30 * Math.pow(3.3,master.meleeHPCount));//works out the cost
if(master.gold >= master.meleeHPCost){//checks that the player can afford
master.meleeHP += 10;//increases the HP
master.meleeHPCount +=1;
master.gold -= master.meleeHPCost;//removes the gold      
master.next_meleeHPCost = Math.floor(30 * Math.pow(3.3,master.meleeHPCount));//works out the cost of the next
dom.meleeHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_meleeHPCost));
calcHPMelee();
dom.gold.innerHTML = NumFix(master.gold);
dom.UpdateInfo.innerHTML = ('+10 Shade HP');              
};
}
function buyMeleeUp1() {
master.meleeUp1Cost = Math.floor(10 * Math.pow(2.2,master.meleeUp1Count));//works out the cost
if(master.gold >= master.meleeUp1Cost){//checks that the player can afford
master.meleeUp1Count += 1;//increases the Level
master.meleeAttack1 += 1;
master.gold -= master.meleeUp1Cost;//removes the gold   
calcDEEPSmelee();//updates dps displays    
master.next_meleeUp1Cost = Math.floor(10 * Math.pow(2.2,master.meleeUp1Count));//works out the cost of the next
dom.meleeUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_meleeUp1Cost));
dom.meleeUp1C.innerHTML = NumFix(1+master.meleeUp1Count);
dom.gold.innerHTML = NumFix(master.gold);
dom.UpdateInfo.innerHTML = ('+ Stab Base Damage');              
};
}
function buyMeleeUp3() {
master.meleeUp3Cost = Math.floor(70 * Math.pow(2.2,master.meleeUp3Count));//works out the cost
if(master.gold >= master.meleeUp3Cost){//checks that the player can afford
master.meleeUp3Count += 1;//increases the Level
master.meleeAttack3 += 7;
master.gold -= master.meleeUp3Cost;//removes the gold 
calcDEEPSmelee();//updates dps displays 
master.next_meleeUp3Cost = Math.floor(70 * Math.pow(2.2,master.meleeUp3Count));//works out the cost of the next
dom.meleeUp3Buy.innerHTML = (('Cost: ') + NumFix(master.next_meleeUp3Cost));
dom.meleeUp3C.innerHTML = NumFix(1+master.meleeUp3Count);
dom.gold.innerHTML = NumFix(master.gold);  
dom.UpdateInfo.innerHTML = ('+ Slit Base Damage');            
};
}

///HEALER UPGRADES///
function buyHealerLevel() {
master.healerLevelCost = Math.floor(100 * Math.pow(2.2,master.healerLevelCount));//works out the cost
if(master.gold >= master.healerLevelCost){//checks that the player can afford
master.healerLevel += 1;//increases the Level
master.healerLevelCount += 1;
master.gold -= master.healerLevelCost;//removes the gold  
calcDEEPShealer();//updates dps displays     
master.next_healerLevelCost = Math.floor(100 * Math.pow(2.2,master.healerLevelCount));//works out the cost of the next
dom.healerLevel.innerHTML = (('Shaman | Level: ') + NumFix(master.healerLevel));
dom.healerLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_healerLevelCost));
dom.gold.innerHTML = NumFix(master.gold);  
calcHPHealer();  
dom.UpdateInfo.innerHTML = ('+1 Shaman Level (+Base Heal, +3 HP)');           
};
}
function buyHealerHP() {
master.healerHPCost = Math.floor(30 * Math.pow(3.3,master.healerHPCount));//works out the cost
if(master.gold >= master.healerHPCost){//checks that the player can afford
master.healerHP += 10;//increases the HP
master.healerHPCount +=1;
master.gold -= master.healerHPCost;//removes the gold      
master.next_healerHPCost = Math.floor(30 * Math.pow(3.3,master.healerHPCount));//works out the cost of the next
calcHPHealer();
dom.healerHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_healerHPCost));
dom.gold.innerHTML = NumFix(master.gold);
dom.UpdateInfo.innerHTML = ('+10 Shaman HP');                 
};
}
function buyHealerUp2() { //heal
master.healerUp2Cost = Math.floor(30 * Math.pow(2.2,master.healerUp2Count));//works out the cost
if(master.gold >= master.healerUp2Cost){//checks that the player can afford
master.healerUp2Count += 1;//increases the Level
master.healerAttack2 += 1;
master.gold -= master.healerUp2Cost;//removes the gold  
calcDEEPShealer();    
master.next_healerUp2Cost = Math.floor(30 * Math.pow(2.2,master.healerUp2Count));//works out the cost of the next
dom.healerUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_healerUp2Cost));
dom.healerUp2C.innerHTML = NumFix(1+master.healerUp2Count);
dom.gold.innerHTML = NumFix(master.gold);
dom.UpdateInfo.innerHTML = ('+ Base Heal');              
};
}
function buyHealerUp3() { //vigor
master.healerUp3Cost = Math.floor(120 * Math.pow(2.2,master.healerUp3Count));//works out the cost
if(master.gold >= master.healerUp3Cost){//checks that the player can afford
master.healerUp3Count += 1;//increases the Level
master.gHealth2 += 0.01;
master.gold -= master.healerUp3Cost;//removes the gold 
calcHPMelee();
calcHPwizard();
calcHPHealer();
calcHPsupport();
calcHPbow();
master.next_healerUp3Cost = Math.floor(120 * Math.pow(2.2,master.healerUp3Count));//works out the cost of the next
dom.healerUp3Buy.innerHTML = (('Cost: ') + NumFix(master.next_healerUp3Cost));
dom.healerUp3DPS.innerHTML = NumFix(1+master.healerUp3Count) + ('&#37; health buff');
dom.healerUp3C.innerHTML = NumFix(1+master.healerUp3Count);
dom.gold.innerHTML = NumFix(master.gold); 
dom.UpdateInfo.innerHTML = ('+1&#37; Health Buff');             
};
}

///WIZARD UPGRADES///
function buyWizardLevel() {
master.wizardLevelCost = Math.floor(100 * Math.pow(2.2,master.wizardLevelCount));//works out the cost
if(master.gold >= master.wizardLevelCost){//checks that the player can afford
master.wizardLevel += 1;//increases the Level
master.wizardLevelCount += 1;
master.gold -= master.wizardLevelCost;//removes the gold  
calcDEEPSwizard();//updates dps displays     
master.next_wizardLevelCost = Math.floor(100 * Math.pow(2.2,master.wizardLevelCount));//works out the cost of the next
dom.wizardLevel.innerHTML = (('Feu | Level: ') + NumFix(master.wizardLevel));
dom.wizardLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_wizardLevelCost));
dom.gold.innerHTML = NumFix(master.gold);  
calcHPwizard();
dom.UpdateInfo.innerHTML = ('+1 Feu Level (+Base Heal, +3 HP)'); 
};
}
function buyWizardHP() {
master.wizardHPCost = Math.floor(30 * Math.pow(3.3,master.wizardHPCount));//works out the cost
if(master.gold >= master.wizardHPCost){//checks that the player can afford
master.wizardHP += 10;//increases the HP
master.wizardHPCount +=1;
master.gold -= master.wizardHPCost;//removes the gold      
master.next_wizardHPCost = Math.floor(30 * Math.pow(3.3,master.wizardHPCount));//works out the cost of the next
calcHPwizard();
dom.wizardHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_wizardHPCost));
dom.gold.innerHTML = NumFix(master.gold);   
dom.UpdateInfo.innerHTML = ('+10 Feu HP');            
};
}
function buyWizardUp1() {
master.wizardUp1Cost = Math.floor(30 * Math.pow(2.2,master.wizardUp1Count));//works out the cost
if(master.gold >= master.wizardUp1Cost){//checks that the player can afford
master.wizardUp1Count += 1;//increases the Level
master.wizardAttack1 += 3;
master.gold -= master.wizardUp1Cost;//removes the gold   
calcDEEPSwizard();//updates dps displays    
master.next_wizardUp1Cost = Math.floor(30 * Math.pow(2.2,master.wizardUp1Count));//works out the cost of the next
dom.wizardUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_wizardUp1Cost));
dom.wizardUp1C.innerHTML = NumFix(1+master.wizardUp1Count);
dom.gold.innerHTML = NumFix(master.gold);  
dom.UpdateInfo.innerHTML = ('+ Base Flare Damage');          
};
}
function buyWizardUp2() {
master.wizardUp2Cost = Math.floor(300 * Math.pow(2.2,master.wizardUp2Count));//works out the cost
if(master.gold >= master.wizardUp2Cost){//checks that the player can afford
master.wizardUp2Count += 1;//increases the Level
master.wizardAttack2 += 30;
master.gold -= master.wizardUp2Cost;//removes the gold   
calcDEEPSwizard();//updates dps displays    
master.next_wizardUp2Cost = Math.floor(300 * Math.pow(2.2,master.wizardUp2Count));//works out the cost of the next
dom.wizardUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_wizardUp2Cost));
dom.wizardUp2C.innerHTML = NumFix(1+master.wizardUp2Count);
dom.gold.innerHTML = NumFix(master.gold);  
dom.UpdateInfo.innerHTML = ('+ Base Meteor Damage');           
};
}
///SUPPORT UPGRADES///
function buySupportLevel() {
master.supportLevelCost = Math.floor(100 * Math.pow(2.2,master.supportLevelCount));//works out the cost
if(master.gold >= master.supportLevelCost){//checks that the player can afford
master.supportLevel += 1;//increases the Level
master.supportLevelCount += 1;
master.gold -= master.supportLevelCost;//removes the gold
master.next_supportLevelCost = Math.floor(100 * Math.pow(2.2,master.supportLevelCount));//works out the cost of the next
dom.supportLevel.innerHTML = (('Clout | Level: ') + NumFix(master.supportLevel));
dom.supportLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_supportLevelCost));
dom.gold.innerHTML = NumFix(master.gold);  
calcHPsupport();
dom.UpdateInfo.innerHTML = ('+1 Clout Level (+Base Heal, +3 HP)'); 
};
}
function buySupportHP() {
master.supportHPCost = Math.floor(30 * Math.pow(3.3,master.supportHPCount));//works out the cost
if(master.gold >= master.supportHPCost){//checks that the player can afford
master.supportHP += 10;//increases the HP
master.supportHPCount +=1;
master.gold -= master.supportHPCost;//removes the gold      
master.next_supportHPCost = Math.floor(30 * Math.pow(3.3,master.supportHPCount));//works out the cost of the next
calcHPsupport();
dom.supportHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_supportHPCost));
dom.gold.innerHTML = NumFix(master.gold);  
dom.UpdateInfo.innerHTML = ('+10 Clout HP');              
};
}
function buySupportUp1() {
master.supportUp1Cost = Math.floor(50 * Math.pow(2.2,master.supportUp1Count));//works out the cost
if(master.gold >= master.supportUp1Cost){//checks that the player can afford
master.supportUp1Count += 1;//increases the Level
master.warCry2 += 0.01;
master.gold -= master.supportUp1Cost;//removes the gold      
master.next_supportUp1Cost = Math.floor(50 * Math.pow(2.2,master.supportUp1Count));//works out the cost of the next
dom.supportUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_supportUp1Cost));
dom.supportUp1DPS.innerHTML = (NumFix(1+master.supportUp1Count) + ('&#37; damage buff'));
dom.supportUp1C.innerHTML = NumFix(1+master.supportUp1Count);
dom.gold.innerHTML = NumFix(master.gold); 
dom.UpdateInfo.innerHTML = ('+1&#37; Damage Buff');            
};
}
function buySupportUp2() {
master.supportUp2Cost = Math.floor(100 * Math.pow(2.2,master.supportUp2Count));//works out the cost
if(master.gold >= master.supportUp2Cost){//checks that the player can afford
master.supportUp2Count += 1;//increases the Level
master.gGold1 += 0.01;
master.gold -= master.supportUp2Cost;//removes the gold      
master.next_supportUp2Cost = Math.floor(100 * Math.pow(2.2,master.supportUp2Count));//works out the cost of the next
dom.supportUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_supportUp2Cost));
dom.supportUp2DPS.innerHTML = (NumFix(1+master.supportUp2Count) + ('&#37; gold buff'));
dom.supportUp2C.innerHTML = NumFix(1+master.supportUp2Count);
dom.gold.innerHTML = NumFix(master.gold);
dom.UpdateInfo.innerHTML = ('+1&#37; Gold Buff');            
};
}
///BOW UPGRADES///
function buyBowLevel() {
master.bowLevelCost = Math.floor(100 * Math.pow(2.2,master.bowLevelCount));//works out the cost
if(master.gold >= master.bowLevelCost){//checks that the player can afford
master.bowLevel += 1;//increases the Level
master.bowLevelCount += 1;
master.gold -= master.bowLevelCost;//removes the gold
master.next_bowLevelCost = Math.floor(100 * Math.pow(2.2,master.bowLevelCount));//works out the cost of the next
dom.bowLevel.innerHTML = (('Flux | Level: ') + NumFix(master.bowLevel));
dom.bowLevelBuy.innerHTML = (('Cost: ') + NumFix(master.next_bowLevelCost));
dom.gold.innerHTML = NumFix(master.gold);  
calcHPbow();   
calcDEEPSbow();//updates dps displays          
};
dom.UpdateInfo.innerHTML = ('+1 Flux Level (+Base Heal, +3 HP)'); 
}
function buyBowHP() {
master.bowHPCost = Math.floor(50 * Math.pow(3.3,master.bowHPCount));//works out the cost
if(master.gold >= master.bowHPCost){//checks that the player can afford
master.bowHP += 10;//increases the HP
master.bowHPCount +=1;
master.gold -= master.bowHPCost;//removes the gold      
master.next_bowHPCost = Math.floor(50 * Math.pow(3.3,master.bowHPCount));//works out the cost of the next
calcHPbow();
dom.bowHPBuy.innerHTML = (('Cost: ') + NumFix(master.next_bowHPCost));
dom.gold.innerHTML = NumFix(master.gold); 
dom.UpdateInfo.innerHTML = ('+10 Flux HP');               
};
}
function buyBowUp1() {
master.bowUp1Cost = Math.floor(20 * Math.pow(2.2,master.bowUp1Count));//works out the cost
if(master.gold >= master.bowUp1Cost){//checks that the player can afford
master.bowUp1Count += 1;//increases the Level
master.bowAttack1 += 2;
master.gold -= master.bowUp1Cost;//removes the gold   
calcDEEPSbow();//updates dps displays    
master.next_bowUp1Cost = Math.floor(20 * Math.pow(2.2,master.bowUp1Count));//works out the cost of the next
dom.bowUp1Buy.innerHTML = (('Cost: ') + NumFix(master.next_bowUp1Cost));
dom.bowUp1C.innerHTML = NumFix(1+master.bowUp1Count);
dom.gold.innerHTML = NumFix(master.gold);  
dom.UpdateInfo.innerHTML = ('+ Base Bombard Damage');           
};
}
function buyBowUp2() {
master.bowUp2Cost = Math.floor(250 * Math.pow(2.2,master.bowUp2Count));//works out the cost
if(master.gold >= master.bowUp2Cost){//checks that the player can afford
master.bowUp2Count += 1;//increases the Level
master.bowAttack2 += 25;
master.gold -= master.bowUp2Cost;//removes the gold   
calcDEEPSbow();//updates dps displays    
master.next_bowUp2Cost = Math.floor(250 * Math.pow(2.2,master.bowUp2Count));//works out the cost of the next
dom.bowUp2Buy.innerHTML = (('Cost: ') + NumFix(master.next_bowUp2Cost));
dom.bowUp2C.innerHTML = NumFix(1+master.bowUp2Count);
dom.gold.innerHTML = NumFix(master.gold);  
dom.UpdateInfo.innerHTML = ('+ Base Pierce Damage');           
};
}







///MELEE HERO DPS ROTATION CALCULATIONS///
function calcHPMelee() {
    master.meleeHP = Math.floor(100+(((3*master.meleeLevel)+(master.meleeHPCount*10))*(master.gHealth1)*(master.gHealth2)));
    updateHP();
}
function calcDEEPSmelee() {//updates dps displays
    master.MeleeA1 = Math.floor((((master.gEnergy+(master.meleeAttack1*master.meleeLevel))*master.warCry)*master.warCry2)*master.gEnrage);
    master.MeleeA3 = Math.floor((((master.gEnergy+(master.meleeAttack3*master.meleeLevel))*master.warCry)*master.warCry2)*master.gEnrage);
//master.MeleeA1 = Math.floor(master.meleeAttack3*master.meleeLevel*master.warCry*master.warCry2);
//master.MeleeA3 = Math.floor(master.meleeAttack3*master.meleeLevel*master.warCry*master.warCry2);
updateDPS();
}

window.setInterval(function updateMeleeA1() {
    if (master.meleeAlive == 0) {
        master.monsterHP -= master.MeleeA1;
    }}, 1000);
window.setInterval(function updateMeleeA3() {
    if (master.meleeAlive == 0) {
        master.monsterHP -= master.MeleeA3;
    }}, 5000);
///HEALER DPS ROTATION CALCULATIONS///
function calcHPHealer() {
    master.healerHP = Math.floor(30+(((3*master.healerLevel)+(master.healerHPCount*10))*(master.gHealth1)*(master.gHealth2)));
    updateHP();
}
function calcDEEPShealer() {//updates dps displays
    master.HealerA1 = Math.floor(((master.healerAttack2)+master.healerLevel)*master.gSoothe);
    dom.healerUp2DPS.innerHTML = (NumFix(master.HealerA1) + (' health every 1 sec')); 
}
///WIZARD DPS ROTATION CALCULATIONS///
function calcHPwizard() {
    master.wizardHP = Math.floor(50+(((3*master.wizardLevel)+(master.wizardHPCount*10))*(master.gHealth1)*(master.gHealth2)));
    updateHP();
}
function calcDEEPSwizard() {//updates dps displays
    master.WizardA1 = Math.floor((((master.gEnergy+(master.wizardAttack1*master.wizardLevel))*master.warCry)*master.warCry2)*master.gEnrage);
    master.WizardA2 = Math.floor((((master.gEnergy+(master.wizardAttack2*master.wizardLevel))*master.warCry)*master.warCry2)*master.gEnrage);
//master.WizardA1 = Math.floor(master.wizardAttack1*master.wizardLevel*master.warCry*master.warCry2);
//master.WizardA2 = Math.floor(master.wizardAttack2*master.wizardLevel*master.warCry*master.warCry2);
updateDPS();
}
window.setInterval(function updateWizardA1() {
    if (master.wizardAlive == 0) {
        master.monsterHP -= master.WizardA1;
    }}, 2000);
window.setInterval(function updateWizardA2() {
    if (master.wizardAlive == 0) {
        master.monsterHP -= master.WizardA2;
    }}, 15000);
///SUPPORT DPS ROTATION CALCULATIONS///
function calcHPsupport() {
    master.supportHP = Math.floor(30+(((3*master.supportLevel)+(master.supportHPCount*10))*(master.gHealth1)*(master.gHealth2)));
    updateHP();
}
///BOW DPS ROTATION CALCULATIONS///
function calcHPbow() {
    master.bowHP = Math.floor(50+(((3*master.bowLevel)+(master.bowHPCount*10))*(master.gHealth1)*(master.gHealth2)));
    updateHP();
}
function calcDEEPSbow() {//updates dps displays
    master.BowA1 = Math.floor((((master.gEnergy+(master.bowAttack1*master.bowLevel))*master.warCry)*master.warCry2)*master.gEnrage);
    master.BowA2 = Math.floor((((master.gEnergy+(master.bowAttack2*master.bowLevel))*master.warCry)*master.warCry2)*master.gEnrage);
//master.BowA1 = Math.floor(master.bowAttack1*master.bowLevel*master.warCry*master.warCry2);
//master.BowA2 = Math.floor(master.bowAttack2*master.bowLevel*master.warCry*master.warCry2);
updateDPS();
}
window.setInterval(function updateBowA1() {
    if (master.bowAlive == 0) {
        master.monsterHP -= master.BowA1;
//master.bowHP += Math.floor(master.BowA1*master.gLifeSteal);
}}, 1000);
window.setInterval(function updateBowA2() {
    if (master.bowAlive == 0) {
        master.monsterHP -= master.BowA2;
//master.bowHP += Math.floor(master.BowA2*master.gLifeSteal);
}}, 10000);





//Easy display updaters
function updateDPS() {
    dom.meleeUp1DPS.innerHTML = (NumFix(master.MeleeA1) + (' damage every 1 sec'));
    dom.meleeUp3DPS.innerHTML = (NumFix(master.MeleeA3) + (' damage every 5 sec'));  
    dom.wizardUp1DPS.innerHTML = (NumFix(master.WizardA1) + (' damage every 2 sec'));
    dom.wizardUp2DPS.innerHTML = (NumFix(master.WizardA2) + (' damage every 15 sec'));  
    dom.bowUp1DPS.innerHTML = (NumFix(master.BowA1) + (' damage every 1 sec'));
    dom.bowUp2DPS.innerHTML = (NumFix(master.BowA2) + (' damage every 10 sec'));  
}
function updateHP() {
    dom.meleeHP.innerHTML = NumFix(master.meleeHPCurrent) + "/ " + NumFix(master.meleeHP);
    dom.healerHP.innerHTML = NumFix(master.healerHPCurrent) + "/ " + NumFix(master.healerHP);
    dom.wizardHP.innerHTML = NumFix(master.wizardHPCurrent) + "/ " + NumFix(master.wizardHP);
    dom.supportHP.innerHTML = NumFix(master.supportHPCurrent) + "/ " + NumFix(master.supportHP);
    dom.bowHP.innerHTML = NumFix(master.bowHPCurrent) + "/ " + NumFix(master.bowHP);
}





///ACTIVE SKILLS///
//Barricade
function useBarricade() {
    if (master.coolBarricade == 0) {
        master.sBarricade = 1; //set to true
        master.timerBarricade = 30;
        master.coolBarricade = 120;
        dom.UpdateInfo.innerHTML = ('Barricade activated');
    }
    else {
      dom.UpdateInfo.innerHTML = ('Barricade is not ready yet');
  }
}
window.setInterval(function timerBarricade() {
    if (master.timerBarricade >= 1) {
        master.timerBarricade--;
        dom.sBarricadeTimer.innerHTML = ('Active: ') + master.timerBarricade;
    }
    else {
    master.sBarricade = 0; //set to false
}
}, 1000);
window.setInterval(function cooldownBarricade() {
    if (master.timerBarricade == 0) {
        if (master.coolBarricade >= 1) {
            --master.coolBarricade;
            dom.sBarricadeTimer.innerHTML = master.coolBarricade;
        }
        else {
            dom.sBarricadeTimer.innerHTML = ('Ready!');
        }
    }
}, 1000);

//Resurrect
function useResurrect() {
    if (master.coolResurrect == 0) {
        if ((master.meleeAlive+master.healerAlive+master.wizardAlive+master.supportAlive+master.bowAlive) >=1) {
            master.coolResurrect = 120;
            dom.UpdateInfo.innerHTML = (master.meleeAlive+master.healerAlive+master.wizardAlive+master.supportAlive+master.bowAlive) + (' Hero(s) Resurrected');
            heroResurrect();
        }
        else {
            dom.UpdateInfo.innerHTML = ('All heroes are alive');
        }
    }
    else {
      dom.UpdateInfo.innerHTML = ('Resurrect is not ready yet');
  }
}
window.setInterval(function cooldownResurrect() {
    if (master.coolResurrect >= 1) {
        --master.coolResurrect;
        dom.sResurrectTimer.innerHTML = master.coolResurrect;
    }
    else {
        dom.sResurrectTimer.innerHTML = ('Ready!');
    }
}, 1000);
function heroResurrect() {
 if (master.meleeAlive == 1) {
    master.meleeAlive = 0;
    master.meleeHPCurrent = master.meleeHP;
    updateHP();
    dom.meleeDead.innerHTML = ('');
} 
if (master.healerAlive == 1) {
    master.healerAlive = 0;
    master.healerHPCurrent = master.healerHP;
    updateHP();
    dom.healerDead.innerHTML = ('');
} 
if (master.wizardAlive == 1) {
    master.wizardAlive = 0;
    master.wizardHPCurrent = master.wizardHP;
    updateHP();
    dom.wizardDead.innerHTML = ('');
} 
if (master.supportAlive == 1) {
    master.supportAlive = 0;
    master.supportHPCurrent = master.supportHP;
    updateHP();
    dom.supportDead.innerHTML = ('');
} 
if (master.bowAlive == 1) {
    master.bowAlive = 0;
    master.bowHPCurrent = master.bowHP;
    updateHP();
    dom.bowDead.innerHTML = ('');
} 
}

//Enrage
function useEnrage() {
    if (master.coolEnrage == 0) {
        master.gEnrage = 3; //set to true
        calcDEEPSbow();
        calcDEEPSwizard();
        calcDEEPSmelee();
        master.timerEnrage = 30;
        master.coolEnrage = 180;
        dom.UpdateInfo.innerHTML = ('Enrage activated');
    }
    else {
      dom.UpdateInfo.innerHTML = ('Enrage is not ready yet');
  }
}
window.setInterval(function timerEnrage() {
    if (master.timerEnrage >= 1) {
        master.timerEnrage--;
        dom.sEnrageTimer.innerHTML = ('Active: ') + master.timerEnrage;
    }
    else {
    master.gEnrage = 1; //set to false
    calcDEEPSbow();
    calcDEEPSwizard();
    calcDEEPSmelee();
}
}, 1000);
window.setInterval(function cooldownEnrage() {
    if (master.timerEnrage == 0) {
        if (master.coolEnrage >= 1) {
            --master.coolEnrage;
            dom.sEnrageTimer.innerHTML = master.coolEnrage;
        }
        else {
            dom.sEnrageTimer.innerHTML = ('Ready!');
        }
    }
}, 1000);

//Soothe
function useSoothe() {
    if (master.coolSoothe == 0) {
        master.gSoothe = 3; //set to true
        calcDEEPShealer();
        master.timerSoothe = 30;
        master.coolSoothe = 180;
        dom.UpdateInfo.innerHTML = ('Soothe activated');
    }
    else {
      dom.UpdateInfo.innerHTML = ('Soothe is not ready yet');
  }
}
window.setInterval(function timerSoothe() {
    if (master.timerSoothe >= 1) {
        master.timerSoothe--;
        dom.sSootheTimer.innerHTML = ('Active: ') + master.timerSoothe;
    }
    else {
    master.gSoothe = 1; //set to false
    calcDEEPShealer();
}
}, 1000);
window.setInterval(function cooldownSoothe() {
    if (master.timerSoothe == 0) {
        if (master.coolSoothe >= 1) {
            --master.coolSoothe;
            dom.sSootheTimer.innerHTML = master.coolSoothe;
        }
        else {
            dom.sSootheTimer.innerHTML = ('Ready!');
        }
    }
}, 1000);

//Converge
function useConverge() {
    if (master.coolConverge == 0) {
        master.monsterHP -= (master.BowA2+master.BowA1+master.MeleeA1+master.MeleeA3+master.WizardA1+master.WizardA2);
        master.coolConverge = 60;
        dom.UpdateInfo.innerHTML = ('Converge unleashes ') + NumFix(master.BowA2+master.BowA1+master.MeleeA1+master.MeleeA3+master.WizardA1+master.WizardA2) + (' damage!');
    }
    else {
      dom.UpdateInfo.innerHTML = ('Converge is not ready yet');
  }
}
window.setInterval(function cooldownConverge() {
    if (master.coolConverge >= 1) {
        --master.coolConverge;
        dom.sConvergeTimer.innerHTML = master.coolConverge;
    }
    else {
        dom.sConvergeTimer.innerHTML = ('Ready!');
    }
}, 1000);






///TICK ENEMY HP CALCULATION///
window.setInterval(function updateMonsterHP() {
    if (master.monsterHP <= 0) {
        master.currentZone++;
        updateCurrentZoneHP();
        updateGold();
        addRelic();
    }

    $(".progress-bar").each(function(){
    $(this).attr('aria-valuenow'); // every progress-bar's actual value gets in variable
    $(this).width(Math.floor((master.monsterHP/master.monsterHPstart)*100) + '%'); //sets progress bar width to monster hp%
  });

    dom.monsterHP.innerHTML = NumFix(master.monsterHP) + "/ " + NumFix(master.monsterHPstart);
}, 1000);
///TICK ENEMY HP CALCULATION///






//Hero Deaths
//Melee
window.setInterval(function deathMelee() {
    if (master.meleeHPCurrent <= 0) {
master.meleeAlive = 1; //dead
master.meleeHPCurrent = 0;
updateHP();
dom.meleeDead.innerHTML = ('(DEAD) ');
}
else {
   master.meleeAlive = 0; //alive
   dom.meleeDead.innerHTML = ('');
}
}, 1000);
//Healer
window.setInterval(function deathHealer() {
    if (master.healerHPCurrent <= 0) {
master.healerAlive = 1; //dead
master.healerHPCurrent = 0;
master.HealerA1 = 0;
updateHP();
dom.healerDead.innerHTML = ('(DEAD) ');
}
else {
   master.healerAlive = 0; //alive 
   calcDEEPShealer();
   dom.healerDead.innerHTML = ('');
}
}, 1000);
//Wizard
window.setInterval(function deathWizard() {
    if (master.wizardHPCurrent <= 0) {
master.wizardAlive = 1; //dead
master.wizardHPCurrent = 0;
updateHP();
dom.wizardDead.innerHTML = ('(DEAD) ');
}
else {
   master.wizardAlive = 0; //alive 
   dom.wizardDead.innerHTML = ('');
}
}, 1000);
//Support
window.setInterval(function deathSupport() {
    if (master.supportHPCurrent <= 0) {
master.supportAlive = 1; //dead
master.supportHPCurrent = 0;
updateHP();
dom.supportDead.innerHTML = ('(DEAD) ');
}
else {
   master.supportAlive = 0; //alive 
   dom.supportDead.innerHTML = ('');
}
}, 1000);
//Bow
window.setInterval(function deathBow() {
    if (master.bowHPCurrent <= 0) {
master.bowAlive = 1; //dead
master.bowHPCurrent = 0;
updateHP();
dom.bowDead.innerHTML = ('(DEAD) ');
}
else {
   master.bowAlive = 0; //alive 
   dom.bowDead.innerHTML = ('');
}
}, 1000);





///ENEMY TO HERO DAMAGE///
///MELEE///
window.setInterval(function updateMeleeHP() {
    if (master.meleeAlive == 0) {
        if (master.sBarricade == 0) {
            master.meleeHPCurrent -= (master.monsterDPS-(master.HealerA1*master.gSoothe));
            if (master.meleeHPCurrent > master.meleeHP){
                master.meleeHPCurrent = master.meleeHP
            }
            dom.meleeHP.innerHTML = NumFix(master.meleeHPCurrent) + "/ " + NumFix(master.meleeHP);
        }}}, 1000);
///HEALER///
window.setInterval(function updateHealerHP() {
    if (master.healerAlive == 0) {
        if (master.sBarricade == 0) {
            master.healerHPCurrent -= (master.monsterDPS-(master.HealerA1*master.gSoothe));
            if (master.healerHPCurrent > master.healerHP){
                master.healerHPCurrent = master.healerHP
            }
            dom.healerHP.innerHTML = NumFix(master.healerHPCurrent) + "/ " + NumFix(master.healerHP);
        }}}, 1000);
///WIZARD///
window.setInterval(function updateWizardHP() {
    if (master.wizardAlive == 0) {
        if (master.sBarricade == 0) {
            master.wizardHPCurrent -= (master.monsterDPS-(master.HealerA1*master.gSoothe));
            if (master.wizardHPCurrent > master.wizardHP){
                master.wizardHPCurrent = master.wizardHP
            }
            dom.wizardHP.innerHTML = NumFix(master.wizardHPCurrent) + "/ " + NumFix(master.wizardHP);
        }}}, 1000);
///SUPPORT///
window.setInterval(function updateSupportHP() {
    if (master.supportAlive == 0) {
        if (master.sBarricade == 0) {
            master.supportHPCurrent -= (master.monsterDPS-(master.HealerA1*master.gSoothe));
            if (master.supportHPCurrent > master.supportHP){
                master.supportHPCurrent = master.supportHP
            }
            dom.supportHP.innerHTML = NumFix(master.supportHPCurrent) + "/ " + NumFix(master.supportHP);
        }}}, 1000);
///BOW///
window.setInterval(function updateBowHP() {
    if (master.bowAlive == 0) {
        if (master.sBarricade == 0) {
            master.bowHPCurrent -= (master.monsterDPS-(master.HealerA1*master.gSoothe));
            if (master.bowHPCurrent > master.bowHP){
                master.bowHPCurrent = master.bowHP
            }
            dom.bowHP.innerHTML = NumFix(master.bowHPCurrent) + "/ " + NumFix(master.bowHP);
        }}}, 1000);






///RELIC STUFF///
function addRelic() {
    if (master.currentZone > master.highestZone) {
        master.highestZone = master.currentZone;
        master.oldRelic++;
        foundRelic(); //stat tracking
        dom.oldRelics.innerHTML = NumFix(master.oldRelic);
rollRelic();
}
}

function rollRelic() {
    master.rRelic = Math.floor((Math.random() * 5) + 1);
    if (master.rRelic == 1) { //rolled warcry
        master.rWC = ((0.05*master.highestZone)*((Math.random() * 10) + 5)).toFixed(2);
        if (master.rWC > master.warCry) {
            master.warCry = master.rWC;
            dom.rWarCry.innerHTML = NumFix(master.warCry) + (' &#37; Damage');
            dom.UpdateInfo.innerHTML = NumFix(master.warCry) + (' &#37; damage relic found'); 
        }
    }
    if (master.rRelic == 2) { //rolled health
        master.rHealth = Math.floor((0.05*master.highestZone)*((Math.random() * 10) + 5)).toFixed(2);
        if (master.rHealth > master.gHealth1) {
            master.gHealth1 = master.rHealth;
            dom.rHealth.innerHTML = NumFix(master.gHealth1) + (' &#37; Health');
            dom.UpdateInfo.innerHTML = NumFix(master.gHealth1) + (' &#37; health relic found'); 
calcHPMelee();
calcHPwizard();
calcHPHealer();
calcHPsupport();
calcHPbow();
        }
    }
    if (master.rRelic == 3) { //rolled base dmg
        master.rEnergy = Math.floor(1+(0.01*master.highestZone)*((Math.random() * 10) + 5));
    //master.rEnergy = (1+(0.01*master.highestZone)*((Math.random() * 10) + 5)).toFixed(2);
    if (master.rEnergy > master.gEnergy) {
        master.gEnergy = master.rEnergy;
        dom.rEnergy.innerHTML = NumFix(master.gEnergy) + (' base damage');
        dom.UpdateInfo.innerHTML = NumFix(master.gEnergy) + (' base damage relic found'); 
    }
}
    if (master.rRelic == 4) { //rolled gold
        master.rGold = ((0.05*master.highestZone)*((Math.random() * 10) + 5)).toFixed(2);
        if (master.rGold > master.gGold2) {
            master.gGold2 = master.rGold;
            dom.rGold.innerHTML = NumFix(master.gGold2) + (' &#37; gold');
            dom.UpdateInfo.innerHTML = NumFix(master.gGold2) + (' &#37; gold relic found'); 
        }
    }
    if (master.rRelic == 5) { //rolled life steal
        master.rLifeSteal = ((0.01*master.highestZone)*((Math.random() * 10) + 5)).toFixed(2);
        if (master.rLifeSteal > master.gLifeSteal) {
            master.gLifeSteal = master.rLifeSteal;
            dom.rLifeSteal.innerHTML = NumFix(master.gLifeSteal) + (' &#37; Life Steal');
            dom.UpdateInfo.innerHTML = NumFix(master.gLifeSteal) + (' &#37; life steal relic found'); 
        }
    }

}//end rRelic




///STATS///
//Update Playtime
window.setInterval(function timePlayed() {
    master.timePlayed += 1;
    dom.timePlayed.innerHTML = numeral(master.timePlayed).format('00:00:00'); 
}, 1000);
function totalDeaths() {
    master.totalDeaths += 1;
    dom.totalDeaths.innerHTML = NumFix(master.totalDeaths); 
}
function totalWipes() {
    master.totalWipes += 1;
    dom.totalWipes.innerHTML = NumFix(master.totalWipes); 
}
function foundRelic() {
    master.foundRelic += 1;
    dom.foundRelic.innerHTML = NumFix(master.foundRelic); 
}