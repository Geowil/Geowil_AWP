/*:
* @plugindesc Enables advanced game features on wepons such as weapon leveling, level bonuses, refining, durability system, and synthesizing
* @author Geowil
*
*
*
* @param Requirements Not Met Color
* @desc Sets the color used when a cost requirement is not met.
* @default #CF0C0C
*
* @param Param Increase Color
* @desc Sets the color used when parameters are increased, traits are added, or trait values are increased.
* @default #0FA908
*
* @param Param Decrease Color
* @desc Sets the color used when parameters are decreased, traits are removed, or trait values are decreased.
* @default #CF0C0C
*
* @param Refine System
* @desc The refine system allows a weapon to be further improved after it has reached its maximum level.
* @type boolean
* @default true
*
* @param Synthesis System
* @desc When on allows a weapons to be combined if they are the same refine and level, increasing stats drastically.
* @type boolean
* @default true
*
* @param Repair and Durability System
* @desc When enabled cause weapons to degrade every time they are used in battle and enables repair functionality.
* @type boolean
* @default true
*
* @param Enable Extended Params
* @desc When on shows all 28 params in the BS stat window else shows only 12 of the most commonly used params.
* @type boolean
* @default true
*
*
* @help
* This is a very complex plugin and therefore may have many conflicts with any
* plugin that alters the item window, game actor, action, game battlerbase,
* game party, or window base classes.  For a full list of aliased and
* overridden classes, see the end of this help text.
*
* Introduction:
*     Welcome to the Advanced Weapon Plugin!  This is my most ambitious plugin
*     today and aims to create instance based weaponry for RPG Maker MV.  It is
*     loosely based off of an RPM XP script but I cannot figure out whose.
*     Once I do, I will update the plugin information with the credit for the
*     RMXP script creator.
*
*     So, what can this plugin actually do, you might be wondering.  Well
*     continue reading for a full break down of the systems in this plugin,
*     how to use them, and what can be turned on or off and how it can be done
*     so.
*
*
* Features:
*     Weapon Levels: This plugin creates instance based weaponry.  What does
*         this even mean?  might come to your mind.  So, each weapon, when
*         loaded from the database, is turned into a Game_InstanceWeapon
*         upon either loading of a new game while the actors are being equipped
*         or when new items are being added to the game party weapons list
*         through event commands like a shop or the Change Party Weapons event.
*
*         As your character fights enemies and gains exp, some or all of that
*         exp is also transfered to their weapons.  You then spend this
*         weapon EXP at a Blacksmith to increase your weapon's level.  As this
*         is done level bonuses can be applied through a note tag on the
*         weapon.  We will cover that later.  Once the weapon reaches its set
*         maximum level other systems are used to improve it further.
*
*         Currently the only costs for any of the features is either gold
*         and/or EXP.  In the future there may be an option to enable an item
*         cost as well.
*
*
*     Refinement System: The refinement system is an optional feature that
*         allows a weapon that has reached its maximum level to be further
*         improved.  Currently there is no maximum refine level setting though
*         one may be added in the future.  As a weapon gains refinements it
*         will gain a +# by its name for each refinement.  Upon refining a
*         weapon its level is set back to 1 and all EXP is removed.  After this
*         point the weapon will no longer gain level bonuses and the only way
*         to improve the weapon's stats is through refining it which becomes
*         progressively more expensive but also progressively increases the
*         weapon's params and trait values.
*
*
*     Synthesis System: The synthesis system allows you to drastically
*         improve a weapon's power.  It works by taking any weapon of the same
*         quality (read as same weapon and refine levels) and combines them.
*         How params and traits are carried over depends on if those params or
*         traits are new to the base weapon.  If they are, they are added at a
*         rate of 30% of the value of the donor weapon. If they are not, then
*         only 15% of the value is carried over but this still can be many
*         times more than refinement depending on the refine bonus note tag
*         setting.
*
*         Once a weapon has been synthesized its level is set to the maximum
*         level of the weapon and the refine level is increased through a
*         formula.  Each time you synthesize a weapon, it will become much
*         harder to synthesize it again and much more costly.  Currently
*         any weapon can be synthesized at any time give the above constraints
*         but eventually only weapons that have been refined at least once and
*         that are at their maximum level will be allowed to be synthesized.
*
*
*     Repair and Durability System:  The repair and durability system is another
*         optional system.  This one adds a durability system into the game what
*         will damage a weapon when used in battle based on a multiplier set in
*         the note tag.  Once a weapon's durability reaches 0, currently, all
*         damage output from that weapon is reduced by 25%.  Eventually an
*         option may be added that can either change the amount of damage to
*         remove or to "break" the weapon ala-Dark Cloud.  Weapons can be
*         repaired at a Blacksmith and currently the only cost is gold though an
*         item cost may be an additional option in the future.
*
*
* Installation:
*    Remember to create a backup copy of your rpg_objects file if you have any
*    plugins that also change this file before starting!
*
*    Installation of this plugin is easy.  Just add the Geowil_AWP file to your
*    plugins folder and then add the Game_InstanceWeaponHandler and
*    Game_InstanceWeapon classes (available on the GitHub page linked to above)
*    to the bottom of your rpg_objects file.
*
*    Please be highly aware that this plugin is likely going to conflict with a
*    wide range of other plugins without any integration work as there are a
*    large number of overridden or aliased functions.
*
*
* Usage:
*    This section will cover the plugin parameters and plugin commands available
*    in this plugin, how to use them, and what they do as well as the note tag
*    structure for weapons.
*
*    Parameters:
*        Param Increase Color - Sets the color used when parameters are
*            increased, traits are added, or trait values are increased.
*
*        Param Decrease Color - Sets the color used when parameters are
*            decreased, traits are removed, or trait values are decreased.
*
*        Refine System - The refine system allows a weapon to be further
*            improved after it has reached its maximum level.  
*
*        Synthesis System - When on allows a weapons to be combined if they
*            are the same refine and level, increasing stats drastically.
*
*        Repair and Durability System - When enabled cause weapons to degrade
*            every time they are used in battle and enables repair
*            functionality.
*
*        Enable Extended Params - When on shows all 28 params in the BS stat
*            window else shows only 12 of the most commonly used params.
*
*
*    Plugin Commands:
*        BSOpen - This plugin command allows you to open a Blacksmith scene.
*            From this scene the player can access all of the features of the
*            plugin that you have enabled for your game.
*
*        AWP RefineSystem On/Off - This plugin command allows you to turn On
*            or Off the refine system.
*
*        AWP SynthesisSystem On/Off - This plugin command allows you to turn
*            On or Off the synthesis system.
*
*        AWP DurabilitySystem On/Off - This plugin command allows you to turn
*            On or Off the weapon durability and repair system.
*
*        AWP ExtendedParams On/Off - This pugin command allows you to show or
*            hide the extended list of parameters in the weapon status window
*            of the Blacksmith scene.  Note that on level up, refine, or
*            synthesis these stats show up even when this setting is turned
*            off or the Off plugin command has been called.
*
*
* Possible Conflicts:
*    Anything that aliases or overrides any of the following functions will
*    likely conflict with this plugin without any integration work:
*        DataManager.createGameObjects
*        DataManager.makeSaveContents
*        DataManager.extractSaveContents
*        DataManager.isWeapon
*        Game_BattlerBase.prototype.traits
*        Game_BattlerBase.prototype.traitsWithId
*        Game_BattlerBase.prototype.canEquipWeapon
*        Game_BattlerBase.prototype.canEquipArmor
*        Game_BattlerBase.prototype.allTraits
*        Game_Actor.prototype.initEquips
*        Game_Actor.prototype.equips
*        Game_Actor.prototype.discardEquip
*        Game_Actor.prototype.releaseUnequippableItems
*        Game_Actor.prototype.paramPlus
*        Game_Actor.prototype.calcEquipItemPerformance
*        Game_Actor.prototype.gainExp
*        Game_Actor.prototype.changeExp
*        Game_Actor.prototype.forceChangeEquip
*        Game_Actor.prototype.changeEquip
*        Game_Actor.prototype.performAttack
*        Game_Actor.prototype.tradeItemWithParty
*        Game_Actor.prototype.clearEquipments
*        Game_Actor.prototype.optimizeEquipments
*        Game_Actor.prototype.bestEquipItem
*        Game_Actor.prototype.calcEquipItemPerformance
*        Game_Action.prototype.apply
*        Scene_Load.prototype.onLoadSuccess
*        Window_Base.prototype.drawItemName
*        Window_EquipItem.prototype.includes
*        Window_EquipItem.prototype.updateHelp
*        Game_Party.prototype.hasItem
*        Game_Party.prototype.numItems
*        Game_Party.prototype.initAllItems
*        Game_Party.prototype.gainItem
*        Game_Interpreter.prototype.pluginCommand
*
*
*    Weapon Note Tag:
*        The wepaon note tag for this pugin defines quite a lot of
*        the information that the plugin uses.  While it is possible
*        that weapons will still be compatible without a note tag
*        this version of the plugin expects that all weapons will be
*        used through it and thus will have a note tag.  Below is the
*        break down of the tag and what each part is for.
*
*
*       <AWP>|</AWP> - this defines the beginning an end of the tag
*           for the AWP so that any other note tags in the weapon
*           tag box do not interfere with the AWP.  All other tag
*           attributes must be placed between these.
*
*
*       MaxLvl:# - This attribute defines the maximum level for the
*           weapon.  This can be any value but please bear in mind
*           that the exp and gold formulas use this value so if you
*           set a level above 80 be sure to account for this in
*           those attributes to prevent astronomical upgrade costs.
*
*
*       DefDur:# - This attribute sets the default max durability of the
*           weapon.  If you have the durability system enabled this
*           is required.
*
*
*       DurDmg:# - This attribute sets the amount of damage a wepaon will
*           sustain when attacking when the durability system is turned
*           on.  It is therefore required if you use that system but can
*           be left out if you don't.
*
*
*       ExpForm:175 * Math.pow(wepLevel+1, 1.25) - This formula sets
*           the base exp cost for refining and leveling weapons.
*           Please note that the 'wepLevel' variable should be
*           included if you make changes to ensure that your costs
*           remain progressive.
*
*
*       GoldForm:(((175 + (1.25 * (2 * (wepLevel+1 + 65)))) *
*           Math.pow(wepLevel+1,1.25))) - This formula sets
*           the base gold cost for refining and leveling weapons.
*           Please note that the 'wepLevel' variable should be
*           included if you make changes to ensure that your costs
*           remain progressive.
*
*       Param:#:#-n - this attribute is used to set parameter
*           level bonuses.  Ensure that you have values for every
*           level for your weapon or crashes may occur.  '#' is the
*           parameter number (you can find a list of these numbers
*           defined under Game_BattlerBase).
*
*           This is followed by a comma-delimited list of how much
*           that parameter should be increased per level where the
*           position of that value in the list is the level the
*           increase occurs on.  Example:
*
*           Param:0:10,0,10,0,25
*
*           This example shows a weapon with a max level of 5 which
*           increases the maximum hp of the actor by 10 hp on WLV 1,
*           by 10 again on WLV 3, and then by an additional 25 on
*           WLV 5.  Any actor with this weapon equipped while it is
*           at Weapon Level 5 will get an additional 45 health.
*
*
*       EParam:#:#-n - this attribute is used to set extended
*           parameter level bonuses.  Ensure that you have values
*           for every level for your weapon or crashes may occur.
*
*           '#' is the parameter number (you can find a list of
*           these numbers defined under Game_BattlerBase).
*
*           This is followed by a comma-delimited list of how much
*           that parameter should be increased per level where the
*           position of that value in the list is the level the
*           increase occurs on.  Example:
*
*           EParam:0:10,0,10,0,25
*
*           This example shows a weapon with a max level of 5 which
*           increases the hit rate of the actor by 10 hp on WLV 1,
*           by 10 again on WLV 3, and then by an additional 25 on
*           WLV 5.  Any actor with this weapon equipped while it is
*           at Weapon Level 5 will get an additional 45 hit rate.
*           
*
*       SParam:#:#-n - this attribute is used to set special
*           parameter level bonuses.  Ensure that you have values
*           for every level for your weapon or crashes may occur.
*
*           '#' is the parameter number (you can find a list of
*           these numbers defined under Game_BattlerBase).
*
*           This is followed by a comma-delimited list of how much
*           that parameter should be increased per level where the
*           position of that value in the list is the level the
*           increase occurs on.  Example:
*
*           SParam:0:10,0,10,0,25
*
*           This example shows a weapon with a max level of 5 which
*           increases the target rate of the actor by 10 hp on WLV 1,
*           by 10 again on WLV 3, and then by an additional 25 on
*           WLV 5.  Any actor with this weapon equipped while it is
*           at Weapon Level 5 will get an additional 45 target rate.
*
*
*       LvlTraitCodes:#-n - This attribute is one of three which are
*           required for adding traits to weapons at a particular
*           level.  This one defines what kind of trait you are
*           adding.  I will be compiling a complete list of the
*           trait codes for use with this plugin to help in  setting
*           up these level bonuses.
*
*           To define more than one trait at a level, separate each
*           code with a -.  Here is an example:
*
*           LvlTraitCodes:0,13,0,0,13-13
*
*           The above example uses our max level 5 weapon again.  It
*           indicated that we are adding a State type trait at WLV2 and
*           two more on WLV 5.  The next attributes will determine the
*           exact states that will be added and the values for those
*           states.
*
*       
*       LvlTraitIds:#-n - This attribute defines the trait within the
*           trait category defined in LvlTraitCode to be added at each
*           level.  Ensure that you are matching the position of these
*           values to the position of the codes from LvlTraitIds.
*
*           In many cases, these IDs will correspond to the values you
*           see in the database for that particular trait object; ie
*           the value next to a state in the State tab is the id you
*           will place here for a type 13 trait.  Consider this example:
*
*           LevelTraitIds:0,4,0,0,7-10
*
*           In the above example we are adding the Poison state at WLV 2
*           and the Rage and Sleep states at WLV 5.  The effective hit rate
*           for these state traits will be defined next.
*
*
*      LvlTraitVals:#-n - This attribute defines the rates at which any trait
*           will be applied.  Note that these should always be a decimal
*           value between -1.0 and 1.0 unless you intend a more than 100%
*           increase or decrease.  Some specific trait types may use the
*           actual values or a 0 or 1 flag.  These specific cases will be
*           outlined in the Trait Sheet I will be developing.
*
*           Consider this example:
*
*           LvlTraitVals:0,0.04,0,0,0.15-0.43
*
*           The above example now sets the rates at which our traits are
*           likely to hit enemies.  Our Poison trait has a 4% change of
*           affecting the target while the Rage trait has a 15% change and
*           the Sleep trait has a 43% chance.
*
*           If these traits already exist on the weapon, the trait value is
*           increased by the amount designated in LvlTraitVals.  If they do
*           not exist then the trait is added at the specified value.
*
*
*      DurInc:#-n - This attribute sets how much the durability of a weapon is
*           increased at each level.  If you have the durability system enabled
*           this is required.  Example:
*
*           DurInc:5,2,7,6,14
*
*
*      RefBonusRate:# - This attribute sets a value which is used throughout the
*           refine system.  It is used for increasing the value of params and
*           traits during refines, is used in determining refine costs, and
*           other areas when the refine system is enabled, which means it is
*           required if this system is enabled.
*
*
*      Below is an example tag using the examples from above so that you can
*      see the full structure:
*
*  <AWP>
*  MaxLvl:5
*  DefDur:10
*  DurDmg: 0.02
*  ExpForm:175 * Math.pow(wepLevel+1, 1.25)
*  GoldForm:(((175+(1.25*(2*(wepLevel+1+65))))*Math.pow(wepLevel+1,1.25)))
*  Param:0:10,0,10,0,25
*  Param:2:5,2,2,1,10
*  Param:7:1,2,1,0,5
*  EParam:0:10,0,10,0,25
*  EParam:6:2,6,4,1,4
*  SParam:7:10,0,0,15,20
*  LvlTraitCodes:0,13,0,13,13-13-13
*  LvlTraitIds:0,4,0,5,5-7-10
*  LvlTraitVals:0,0.04,0,0.25,0.10-0.15-0.43
*  DurInc:5,2,7,6,14
*  RefBonusRate:0.15
*  </AWP>
*
*
*
*
* Change Log:
*     1.0.1 - 
        -Fixed incorrectly docuented note tag attribute names.  Fixed
            an issue in the Blacksmith option selection window which was
            causing the help text to display incorrectly.  Also changed
            the wording of that window's help text.
        -Fixed an issue when entering battle with a character that has
            no weapon equipped which was causing the game to crash.
*     1.0.0 - Initial version released
*
*
* Credits:
*     - original RMXP script creator
*/

var Geowil = Geowil || {};

function Scene_Blacksmith() { this.initialize.apply(this,arguments); };
function Window_WeaponList() { this.initialize.apply(this,arguments); };
function Window_DonorWeaponList() { this.initialize.apply(this,arguments); };
function Window_WepStatus() { this.initialize.apply(this,arguments); };
function Window_ActionPane() { this.initialize.apply(this,arguments); };
function Window_LevelUp() { this.initialize.apply(this,arguments); };
function Window_Refine() { this.initialize.apply(this,arguments); };
function Window_Synthesize() { this.initialize.apply(this,arguments); };
function Window_Repair() { this.initialize.apply(this,arguments); };
function Window_CommandPane() { this.initialize.apply(this,arguments); };
function Window_PartyGold() { this.initialize.apply(this,arguments); };

var $instWeapons      = null; //For Geowil_AWP

(function(_) {
	"use strict";

	const params = PluginManager.parameters('Geowil_AWP');

	//Param Plugin Var
	var rInvalidColor = String(params['Requirements Not Met Color']);
	var pIncColor = String(params['Param Increase Color']);
	var pDecColor = String(params['Param Decrease Color']);
	var bIsRefineSysActive = (params['Refine System'] === "true");
	var bIsSynthSysActive = (params['Synthesis System'] === "true");
	var bIsRepairSysActive = (params['Repair and Durability System'] === "true");
	var bAreExtParmsEnabled = (params['Enable Extended Params'] === "true");




	/*
		Aliased and Overriden DataManager functions
	*/
	var Geowil_DataManager_CreateGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function(){
		Geowil_DataManager_CreateGameObjects.call(this,arguments);
		$instWeapons         = new Game_InstanceWeaponHandler();
	};

	DataManager.makeSaveContents = function() {
	    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
	    var contents = {};
	    contents.system       = $gameSystem;
	    contents.screen       = $gameScreen;
	    contents.timer        = $gameTimer;
	    contents.switches     = $gameSwitches;
	    contents.variables    = $gameVariables;
	    contents.selfSwitches = $gameSelfSwitches;
	    contents.actors       = $gameActors;
	    contents.party        = $gameParty;
	    contents.map          = $gameMap;
	    contents.player       = $gamePlayer;
	    contents.varWeaps     = $instWeapons; //For Geowil_AWP
	    return contents;
	};

	var Geowil_AWP_DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
	    Geowil_AWP_DataManager_extractSaveContents.apply(this,arguments);

	    $instWeapons       = contents.varWeaps; //For Geowil_AWP
	};

	var Geowil_AWP_DataManager_saveGame = DataManager.saveGame;
	DataManager.saveGame = function(savefileId) {
	    $instWeapons.createSaveContents();
	    return Geowil_AWP_DataManager_saveGame.apply(this,arguments);
	};

	DataManager.isWeapon = function(item) {
		if (item){
			if (item.constructor == Game_InstanceWeapon) { return item._iType == 1; }
			else if (item instanceof Object) { return item.etypeId == 1; }
			else { return false; }
    	} else { return false; }
	};


	/*
		Overridden Game_BattlerBase functions
	*/
	Game_BattlerBase.prototype.traits = function(code) {
	    return this.allTraits().filter(function(trait) {
	        if (trait){
	            return trait.code === code;
	        } else { return 0; }
	    });
	};

	Game_BattlerBase.prototype.traitsWithId = function(code, id) {
	    return this.allTraits().filter(function(trait) {
	    	if (trait){
	        	return trait.code === code && trait.dataId === id;
	        } else { return 0; }
	    });
	};

	Game_BattlerBase.prototype.canEquipWeapon = function(item) {
		if (item.constructor != Game_InstanceWeapon){
	    	return this.isEquipWtypeOk(item.wtypeId) && !this.isEquipTypeSealed(item.etypeId);
	    } else{
	    	return this.isEquipWtypeOk(item._wType) && !this.isEquipTypeSealed(item._iType);
	    }
	};

	Game_BattlerBase.prototype.canEquipArmor = function(item) {
		if (item.constructor != Game_InstanceWeapon){
	    	return this.isEquipAtypeOk(item.atypeId) && !this.isEquipTypeSealed(item.etypeId);
	    }
	};

	Game_BattlerBase.prototype.allTraits = function() {
	    return this.traitObjects().reduce(function(r, obj) {
	    	if (obj.constructor != Game_InstanceWeapon){
	        	return r.concat(obj.traits);
	        } else{
	        	return r.concat(obj._traits);
	        }
	    }, []);
	};


	/*
		Aliased or overridden Game_Actor functions
	*/
	Game_Actor.prototype.initEquips = function(equips) {
	    var slots = this.equipSlots();
	    var maxSlots = slots.length;
	    this._equips = [];
	    for (var i = 0; i < maxSlots; i++) {
	        this._equips[i] = new Game_Item();
	    }
	    for (var j = 0; j < equips.length; j++) {
	        if (j < maxSlots) {
	        	if (j == 0){
	        		var dataWeapon = $dataWeapons[equips[j]];

	        		this._equips[j] = new Game_InstanceWeapon(dataWeapon,dataWeapon.wtypeId,j,false)
	        	} else{
	            	this._equips[j].setEquip(slots[j] === 1, equips[j]);
	            }
	        }
	    }
	    this.releaseUnequippableItems(true);
	    this.refresh();
	};

	Game_Actor.prototype.equips = function() {
	    return this._equips.map(function(item) {
	    	if (item){
	    		if (item.constructor == Game_InstanceWeapon) { return item; }
	    		else{ return item.object(); }
	    	}
	    });
	};

	Game_Actor.prototype.discardEquip = function(item) {
	    var slotId = this.equips().indexOf(item);
	    if (slotId >= 0) {
	    	if (item.constructor != Game_InstanceWeapon){
	        	this._equips[slotId].setObject(null);
	        }
	    }
	};

	Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
	    for (;;) {
	        var slots = this.equipSlots();
	        var equips = this.equips();
	        var changed = false;
	        for (var i = 0; i < equips.length; i++) {
	            var item = equips[i];

	            if (item){
		            if (this._equips[i].constructor != Game_InstanceWeapon){
			            if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
			                if (!forcing) {
			                    this.tradeItemWithParty(null, item);
			                }
			                
		                	this._equips[i].setObject(null);
		                	changed = true;	            	
			            }
			        } else {
			        	if (item && (!this.canEquip(item) || item._iType !== slots[i])) {
			                if (!forcing) {
			                    this.tradeItemWithParty(null, item);
			                }
			                
			                changed = true;
			       		}
		        	}
		        }
		    }

		    if (!changed) {
	            break;
	        }
		}
	};

	Game_Actor.prototype.paramPlus = function(paramId) {
	    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
	    var equips = this.equips();
	    for (var i = 0; i < equips.length; i++) {
	        var item = equips[i];
	        
	        if (item){
		        if(item.constructor == Game_InstanceWeapon){
		        	value += item.finalParams(paramId);
		        }
		        else {
		            value += item.params[paramId];
		        }
		    } 
	    }
	    return value;
	};

	Game_Actor.prototype.calcEquipItemPerformance = function(item) {
	    if (item.constructor != Game_InstanceWeapon){
		    return item.params.reduce(function(a, b) {
		        return a + b;
		    });
		} else{
			return item._finalParams.reduce(function(a, b) {
		        return a + b;
		    });
		}
	};

	Game_Actor.prototype.gainExp = function(exp) {
	    var newExp = this.currentExp() + Math.round(exp * this.finalExpRate());
	    this.changeExp(newExp, this.shouldDisplayLevelUp(),exp);
	};

	var Geowil_GameActor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function(exp, show,gainedExp) {
		Geowil_GameActor_changeExp.apply(this,arguments);

		var instWeapon = null;
		var instWeapon = this._equips[0];

		if (instWeapon){
			instWeapon.changeExp(gainedExp);
		}
	};

	Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
	    if (item.constructor != Game_InstanceWeapon){
	    	this._equips[slotId].setObject(item);
	    } else {
	    	this._equips[slotId] = item;
	    }
	    
	    this.releaseUnequippableItems(true);
	    this.refresh();
	};

	Game_Actor.prototype.changeEquip = function(slotId, item) {
	    if (item == null || item.constructor != Game_InstanceWeapon){
		    if (this.tradeItemWithParty(item, this.equips()[slotId]) && (!item || this.equipSlots()[slotId] === item.etypeId)) {
		        if (slotId == 0) { this._equips[slotId] = null; }
		        else { this._equips[slotId].setObject(item); }
		       	this.refresh();
	        }
	    } else {
	    	if (this.tradeItemWithParty(item, this.equips()[slotId]) && (!item || this.equipSlots()[slotId] === item._iType)) {
		        this._equips[slotId] = item;
		        this.refresh();
	        }
	    }
	};

	Game_Actor.prototype.performAttack = function() {
	    var weapons = this.weapons();
	    var wtypeId = this._equips[0] ? this._equips[0]._wType : 0;
	    var attackMotion = $dataSystem.attackMotions[wtypeId];
	    if (attackMotion) {
	        if (attackMotion.type === 0) {
	            this.requestMotion('thrust');
	        } else if (attackMotion.type === 1) {
	            this.requestMotion('swing');
	        } else if (attackMotion.type === 2) {
	            this.requestMotion('missile');
	        }
	        this.startWeaponAnimation(attackMotion.weaponImageId);
	    }
	};

	Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
	    if (newItem && !$gameParty.hasItem(newItem)) {
	        return false;
	    } else {
	        $gameParty.gainItem(oldItem, 1);
	        $gameParty.loseItem(newItem, 1);
	        return true;
	    }
	};

	Game_Actor.prototype.clearEquipments = function() {
	    var maxSlots = this.equipSlots().length;
	    for (var i = 0; i < maxSlots; i++) {
	        if (this.isEquipChangeOk(i)) {
	        	var item = this._equips[i];

	        	if (item){
		        	if (i == 0){
		            	this.changeEquip(item._slotId, null);
		            } else{
		            	this.changeEquip(i, null);
		            }
	           	}
	        }
	    }
	};

	Game_Actor.prototype.optimizeEquipments = function() {
	    var maxSlots = this.equipSlots().length;
	    this.clearEquipments();
	    for (var i = 0; i < maxSlots; i++) {
	        if (this.isEquipChangeOk(i)) {
	        	var item = this._equips[i];

	        	if (i == 0){
	        		if (item){
	            		this.changeEquip(item._slotId, this.bestEquipItem(item._slotId));
	            	} else{
	            		this.changeEquip(i, this.bestEquipItem(i));
	            	}
	            } else {
	            	this.changeEquip(i, this.bestEquipItem(i));
	            }		        
	        }
	    }
	};

	Game_Actor.prototype.bestEquipItem = function(slotId) {
	    var item = this._equips[slotId];

	    if (item){
	    	if (item.constructor != Game_InstanceWeapon){
			    var etypeId = this.equipSlots()[slotId];
			    var items = $gameParty.equipItems().filter(function(item) {
			        return item.etypeId === etypeId && this.canEquip(item);
			    }, this);
			    var bestItem = null;
			    var bestPerformance = -1000;
			    for (var i = 0; i < items.length; i++) {
			        var performance = this.calcEquipItemPerformance(items[i]);
			        if (performance > bestPerformance) {
			            bestPerformance = performance;
			            bestItem = items[i];
			        }
			    }
			} else {
				var etypeId = item._eType;
			    var items = $gameParty.equipItems().filter(function(item) {
			    	if (item.constructor == Game_InstanceWeapon){
			        	return item._etypeId === etypeId && this.canEquip(item);
			        }
			    }, this);

			    var bestItem = null;
			    var bestPerformance = -1000;
			    for (var i = 0; i < items.length; i++) {
			        var performance = this.calcEquipItemPerformance(items[i]);
			        if (performance > bestPerformance) {
			            bestPerformance = performance;
			            bestItem = items[i];
			        }
			    }
			}

		    return bestItem;
		} else{
			var items = $gameParty.equipItems().filter(function(item) {
		    	if (item.constructor == Game_InstanceWeapon){
		        	return item._iType === slotId+1 && this.canEquip(item);
		        } else{
		        	return item.etypeId === slotId+1 && this.canEquip(item);
		        }
		    }, this);

		    var bestItem = null;
		    var bestPerformance = -1000;
		    for (var i = 0; i < items.length; i++) {
		        var performance = this.calcEquipItemPerformance(items[i]);
		        if (performance > bestPerformance) {
		            bestPerformance = performance;
		            bestItem = items[i];
		        }
		    }

		    return bestItem;
		}

		return null;
	};

	Game_Actor.prototype.calcEquipItemPerformance = function(item) {
	    if (item.constructor != Game_InstanceWeapon){
		    return item.params.reduce(function(a, b) {
		        return a + b;
		    });
		} else{
			return item._finalParams.reduce(function(a, b) {
		        return a + b;
		    });
		}
	};


	/*
		Overridden Game_Action functions
	*/
	Game_Action.prototype.apply = function(target) {
	    var result = target.result();
	    this.subject().clearResult();
	    result.clear();
	    result.used = this.testApply(target);
	    result.missed = (result.used && Math.random() >= this.itemHit(target));
	    result.evaded = (!result.missed && Math.random() < this.itemEva(target));
	    result.physical = this.isPhysical();
	    result.drain = this.isDrain();
	    if (result.isHit()) {
	        if (this.item().damage.type > 0) {
	            result.critical = (Math.random() < this.itemCri(target));
	            var value = this.makeDamageValue(target, result.critical);

	            if (bIsRepairSysActive){
	            	if (this.subject().constructor == Game_Actor){
	            		if (this.subject()._equips[0]){
	            			if (this.subject()._equips[0]._durability == 0){
	            				value = Math.round(value * 0.25);
	            			}
	            		}
	            	}
	            }

	            this.executeDamage(target, value);

	            if (bIsRepairSysActive){
		            if (this.subject().constructor == Game_Actor){
		            	if (this.subject()._equips[0]){
				            //Figure out if bare attacking causes issue - it does
					        var durDamage = this.subject()._equips[0]._maxDur * this.subject()._equips[0]._durDmg;
					        var dur = this.subject()._equips[0]._durability;

					        if (durDamage < 1 && durDamage > 0){
					        	durDamage = 1;
					        } else{
					        	durDamage = Math.round(durDamage);
					        }

					        if (dur - durDamage > 0){
					        	this.subject()._equips[0]._durability -= durDamage;
					        } else{
					        	this.subject()._equips[0]._durability = 0;
					        }
					    }
				    }
			    }
	        }
	        this.item().effects.forEach(function(effect) {
	            this.applyItemEffect(target, effect);
	        }, this);
	        this.applyItemUserEffect(target);
	    }
	};


	/*
		Aliased Scene_Load functions
	*/
	var Geowil_Scene_Load = Scene_Load.prototype.onLoadSuccess;
	Scene_Load.prototype.onLoadSuccess = function(){
		Geowil_Scene_Load.call(this,arguments);
		$instWeapons.processLoadContents();
	}


	/*
		Overridden Window_Base functions
	*/
	Window_Base.prototype.drawItemName = function(item, x, y, width) {
	    width = width || 312;
	    if (item) {
	        var iconBoxWidth = Window_Base._iconWidth + 4;
	        this.resetTextColor();

	        if (item.constructor == Game_InstanceWeapon){
	        	var name = item._name;
	        	
	        	if (item._refLevel > 0) { name = item._name + " +" + item._refLevel; }

	        	this.drawIcon(item._icon, x + 2, y + 2);
	        	this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth);
	       	} else{
	       		this.drawIcon(item.iconIndex, x + 2, y + 2);
	        	this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
	       	}
	    }
	};


	/*
		New and overridden Window_EquipItem functions
	*/
	Window_EquipItem.prototype.includes = function(item) {
	    if (item === null) {
	        return true;
	    }

	    if (item.constructor != Game_InstanceWeapon){
	    	if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
	        	return false;
	    	}
	    } else{
	    	if (this._slotId < 0 || item._iType !== this._actor.equipSlots()[this._slotId]){
	    		return false;
	    	}
	    }

	    return this._actor.canEquip(item);
	};

	Window_EquipItem.prototype.updateHelp = function() {
	    Window_ItemList.prototype.updateHelp.call(this);
	    if (this._actor && this._statusWindow) {
	    	this.clearNulls();
	        var actor = JsonEx.makeDeepCopy(this._actor);
	        
	        if (this.index() != -1 && this._data.length > 0){
	        	actor.forceChangeEquip(this._slotId, this.item());
	        	this._statusWindow.setTempActor(actor);
	        }
	    }
	};

	Window_EquipItem.prototype.clearNulls = function() {
		var listData = this._data;

		var lDataLng = listData.length;

		for (var i1 = 0; i1 < lDataLng; i1++){
			if (listData[i1] == null || listData[i1] == undefined){
				listData.splice(i1,1);

				i1--;
				lDataLng--;
			}
		}

		this._data = listData;
	}


	/*
		New, aliased, and overridden Game_Party functions
	*/
	Game_Party.prototype.hasItem = function(item, includeEquip) {
	    if (includeEquip === undefined) {
	        includeEquip = false;
	    }

	    if (item.constructor != Game_InstanceWeapon){
		    if (this.numItems(item) > 0) {
		        return true;
		    } else if (includeEquip && this.isAnyMemberEquipped(item)) {
		        return true;
		    } else {
		        return false;
		    }
		} else{
			return true;
		}
	};

	Game_Party.prototype.getActorById = function(aID){
		var act = null;

		for (var actor in this._actors){
			if (actor._actorId == aID){
				act = actor;
				break;
			}
		}

		return act;
	}

	Game_Party.prototype.numItems = function(item) {
	    var container = this.itemContainer(item);
	    if (item.constructor == Game_InstanceWeapon) { return container ? 1 : 0 }
	    else if (item instanceof Object) { return container ? container[item.id] || 0 : 0; }
	};

	var Geowil_AWP_GameParty_initAllItems = Game_Party.prototype.initAllItems;
	Game_Party.prototype.initAllItems = function() {
	    Geowil_AWP_GameParty_initAllItems.call(this,arguments);
	    this._weapons = [];
	};

	Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	    var container = this.itemContainer(item);

	    if (container) {
	    	if (item.constructor != Game_InstanceWeapon){
	    		if (!DataManager.isWeapon(item)){
		        	var lastNumber = this.numItems(item);
		        	var newNumber = lastNumber + amount;
		        	container[item.id] = newNumber.clamp(0, this.maxItems(item));
		        	if (container[item.id] === 0) {
		            	delete container[item.id];
		        	}
		        	if (includeEquip && newNumber < 0) {
		            	this.discardMembersEquip(item, -newNumber);
		        	}
		        } else{
		        	var newInstWeap = new Game_InstanceWeapon(item,item.wtypeId,0,false);
		        	this._weapons.push(newInstWeap);
		        }


		    } else{
	        	if (amount > 0){
    				this._weapons.push(item);
    				this.updateWeaponIDs();
	        	} else{
	        		this.removePartyWeapon(item._id);
	        	}

	        }

	        $gameMap.requestRefresh();
	    }
	};

	Game_Party.prototype.updateWeaponIDs = function(){
		for (var i1 = 0; i1 < this._weapons.length; i1++){
			this._weapons[i1]._id = i1;
		}
	}

	Game_Party.prototype.weapons = function() {
	    var list = [];
	    for (var wId in this._weapons) {
	    	var weapon = this._weapons[wId];
	    	if (weapon.constructor == Game_Item) { list.push($dataWeapons[wId]); }
	    	else if (weapon.constructor == Game_InstanceWeapon) { list.push(weapon); }        
	    }

	    return list;
	};

	Game_Party.prototype.updateWeapon = function(wep){
		var wepIndex = -1;

		for (var i1 = 0; i1 < this._weapons.length; i1++){
			if (this._weapons[i1]._id == wep._id) { wepIndex = i1; }
		}

		if (wepIndex != -1) { this._weapons[wepIndex] = wep; }
	}

	Game_Party.prototype.getWeapon = function(wId){
		var wepIndex = -1;

		for (var i1 = 0; i1 < this._weapons.length; i1++){
			if (this._weapons[i1]._id == wId) { wepIndex = i1; }
		}

		if (wepIndex != -1) { return this._weapons[wepIndex]; }
	}	

	Game_Party.prototype.removePartyWeapon = function(wId){
		var wepIndex = -1;

		for (var i1 = 0; i1 < this._weapons.length; i1++){
			if (this._weapons[i1]._id == wId) { wepIndex = i1; }
		}

		if (wepIndex != -1) { $gameParty._weapons.splice(wepIndex,1); }
	}


	/*
		Aliased, overriden, and new Game_Interpreter functions
	*/
	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args){
		Game_Interpreter_pluginCommand.call(this,command,args);
		var matches = [];

		if (command === 'BSOpen' || command === 'AWP'){
			for (var i1 = 0; i1 < args.length; i1++){
				command += " " + args[i1];
			}
		}

		if (command.match(/BSOpen/)){
			SceneManager.push(Scene_Blacksmith);
		} else if(command.match(/AWP RefineSystem (\w+)/)){
			matches = (/AWP RefineSystem (\w+)/.exec(command) || []);

			toggleRefSystem(matches[1]);
		} else if(command.match(/AWP SynthesisSystem (\w+)/)){
			matches = (/AWP SynthesisSystem (\w+)/.exec(command) || []);

			toggleSynthSystem(matches[1]);
		} else if(command.match(/AWP DurabilitySystem (\w+)/)){
			matches = (/AWP DurabilitySystem (\w+)/.exec(command) || []);

			toggleDurSystem(matches[1]);
		} else if(command.match(/AWP ExtendedParams (\w+)/)){
			matches = (/AWP ExtendedParams (\w+)/.exec(command) || []);

			toggleExtParams(matches[1]);
		} 
	};

	function toggleRefSystem(state){
		if (state == "On" || state == "on"){
			bIsRefineSysActive = true;
		} else{
			bIsRefineSysActive = false;
		}
	}

	function toggleSynthSystem(state){
		if (state == "On" || state == "on"){
			bIsSynthSysActive = true;
		} else{
			bIsSynthSysActive = false;
		}
	}

	function toggleDurSystem(state){
		if (state == "On" || state == "on"){
			bIsRepairSysActive = true;
		} else{
			bIsRepairSysActive = false;
		}
	}

	function toggleExtParams(state){
		if (state == "On" || state == "on"){
			bAreExtParmsEnabled = true;
		} else{
			bAreExtParmsEnabled = false;
		}
	}

	// Change EXP
	Game_Interpreter.prototype.command315 = function() {
	    var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
	    this.iterateActorEx(this._params[0], this._params[1], function(actor) {
	        actor.changeExp(actor.currentExp() + value, this._params[5], value);
	    }.bind(this));
	    return true;
	};


	Scene_Blacksmith.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Blacksmith.prototype.constructor = Scene_Blacksmith;

	Scene_Blacksmith.prototype.initialize = function(){
		Scene_MenuBase.prototype.initialize.call(this);		
	};

	Scene_Blacksmith.prototype.create = function(){
		Scene_MenuBase.prototype.create.call(this);

		this.createWindows();

		this._wepListWnd.show();
		this._wepListWnd.activate();
		this._helpWindow.show();

		this._wepStatWnd.show();
		this._wepStatWnd.refresh(false,false,false,false,false,false);
	}

	Scene_Blacksmith.prototype.createWindows = function(){
		this.createHelpWindow();
		this.createWeaponStatusWindow();
		this.createWeaponList();

		if (bIsSynthSysActive){
			this.createDonorWeaponList();
		}

		this.createWeaponActionWindow();
		this.createGoldWindow();
		this.createLevelUpWindow();

		if (bIsRefineSysActive){
			this.createRefineWindow();
		}
		
		if (bIsSynthSysActive){
			this.createSynthWindow();
		}

		if (bIsRepairSysActive){
			this.createRepairWindow();
		}
	}

	Scene_Blacksmith.prototype.createWeaponList = function(){
		var w = 255;
		var h = 250;
		var x = 0;
		var y = this._helpWindow.height + 10;

		this._wepListWnd = new Window_WeaponList(w,h,x,y,this._wepStatWnd);
		this._wepListWnd.setHandler('ok',this.onWepSelect.bind(this));
		this._wepListWnd.setHandler('cancel',this.onWepSelectCancel.bind(this));
		this._wepListWnd.refresh();
		this.addWindow(this._wepListWnd);
	};

	Scene_Blacksmith.prototype.createWeaponStatusWindow = function(){
		var h = 250;
		var x = 255 + 10;
		var y = this._helpWindow.height + 10;
		var w = Graphics.width - x;

		this._wepStatWnd = new Window_WepStatus(w,h,x,y);
		this.addWindow(this._wepStatWnd);
	}

	Scene_Blacksmith.prototype.createWeaponActionWindow = function(){
		var w = 145;
		var h = 215;
		var x = 0;
		var y = this._helpWindow.height + 10;

		this._wepActWnd = new Window_ActionPane(w,h,x,y);
		this._wepActWnd.setHandler('ok',this.onWepActSelect.bind(this));
		this._wepActWnd.setHandler('cancel',this.onWepActSelectCancel.bind(this));
		this._wepActWnd.setHelpWindow(this._helpWindow);
		this._wepActWnd.hide();
		this.addWindow(this._wepActWnd);
	};

	Scene_Blacksmith.prototype.createGoldWindow = function(){
		var w = this._wepActWnd.getWidth();
		var h = 78;
		var x = 0;
		var y = Graphics.height - h;

		this._gldWnd = new Window_PartyGold(w,h,x,y,$gameParty.gold());
		this._gldWnd.hide();
		this.addWindow(this._gldWnd);
	}

	Scene_Blacksmith.prototype.createLevelUpWindow = function(){
		var w = 145;
		var h = Graphics.height/2;
		var x = 0;
		var y = this._helpWindow.height + 10;

		this._lvlUpWnd = new Window_LevelUp(w,h,x,y);
		this._lvlUpWnd.setHandler('ok',this.onWepLvlUpOk.bind(this));
		this._lvlUpWnd.setHandler('cancel',this.onWepLvlUpCancel.bind(this));
		this._lvlUpWnd.hide();
		this.addWindow(this._lvlUpWnd);
	}

	Scene_Blacksmith.prototype.createDonorWeaponList = function(){
		var w = 255;
		var h = 250;
		var x = 0;
		var y = this._helpWindow.height + 10;

		this._wepDonorListWnd = new Window_DonorWeaponList(w,h,x,y,this._wepStatWnd);
		this._wepDonorListWnd.setHandler('ok',this.onDonorWepSelect.bind(this));
		this._wepDonorListWnd.setHandler('cancel',this.onDonorWepSelectCancel.bind(this));
		this._wepDonorListWnd.hide();
		this.addWindow(this._wepDonorListWnd);
	};

	Scene_Blacksmith.prototype.createRefineWindow = function(){
		var w = 145;
		var h = Graphics.height/2;
		var x = 0;
		var y = this._helpWindow.height + 10;

		this._refWnd = new Window_Refine(w,h,x,y);
		this._refWnd.setHandler('ok',this.onRefOk.bind(this));
		this._refWnd.setHandler('cancel',this.onRefCancel.bind(this));
		this._refWnd.hide();
		this.addWindow(this._refWnd); 
	}

	Scene_Blacksmith.prototype.createSynthWindow = function(){
		var w = 145;
		var h = Graphics.height/2;
		var x = 0;
		var y = this._helpWindow.height + 10;

		this._synthWnd = new Window_Synthesize(w,h,x,y);
		this._synthWnd.setHandler('ok',this.onSynthOk.bind(this));
		this._synthWnd.setHandler('cancel',this.onSynthCancel.bind(this));
		this._synthWnd.hide();
		this.addWindow(this._synthWnd);
	}

	Scene_Blacksmith.prototype.createRepairWindow = function(){
		var w = 145;
		var h = Graphics.height/2;
		var x = 0;
		var y = this._helpWindow.height + 10;

		this._repWnd = new Window_Repair(w,h,x,y);
		this._repWnd.setHandler('ok',this.onRepOk.bind(this));
		this._repWnd.setHandler('cancel',this.onRepCancel.bind(this));
		this._repWnd.hide();
		this.addWindow(this._repWnd);
	}


	Scene_Blacksmith.prototype.onWepSelect = function(){
		this._wepListWnd.hide();
		this._wepListWnd.deactivate();

		this._wepActWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
		this._wepActWnd.refresh();
		this._wepActWnd.show();
		this._wepActWnd.activate();

		this.updateWepStatWnd(false);
	}

	Scene_Blacksmith.prototype.onWepSelectCancel = function(){
		SceneManager.pop();
	}

	

	Scene_Blacksmith.prototype.updateWepStatWnd = function(bReturnToWepSel){
		if (!bReturnToWepSel){
			var h = Graphics.height - (this._helpWindow.height + 10);
			var x = this._wepActWnd.getWidth() + 10;
			var y = this._helpWindow.height + 10;
			var w = Graphics.width - x;

			this._wepStatWnd.move(x,y,w,h);
			this._wepStatWnd.createContents();
			this._wepStatWnd.refresh(true,false,false,false,false,false);
		} else{
			var h = 250;
			var x = 255 + 10;
			var y = this._helpWindow.height + 10;
			var w = Graphics.width - x;

			this._wepStatWnd.move(x,y,w,h);
			this._wepStatWnd.createContents();
			this._wepStatWnd.refresh(false,false,false,false,false,false);
		}
	}

	

	Scene_Blacksmith.prototype.onWepActSelect = function(){
		var selection = this._wepActWnd.getSelection();

		if (selection == "Level Up"){
			this._wepActWnd.hide();
			this._wepActWnd.deactivate();

			this._wepStatWnd.refresh(false,true,false,false,false,false);
			
			this._lvlUpWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
			this._lvlUpWnd.prepareWindow();
			this._lvlUpWnd.refresh();
			this._lvlUpWnd.show();
			this._lvlUpWnd.activate();
			this._gldWnd.updateGold();
			this._gldWnd.show();
			this._gldWnd.refresh();
		} else if (selection == "Refine"){
			this._wepActWnd.hide();
			this._wepActWnd.deactivate();

			this._wepStatWnd.refresh(false,false,true,false,false,false);
			this._refWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
			this._refWnd.prepareWindow();
			this._refWnd.refresh();
			this._refWnd.show();
			this._refWnd.activate();

			this._gldWnd.updateGold();
			this._gldWnd.show();
			this._gldWnd.refresh();

		} else if (selection == "Synthesize"){
			this._wepActWnd.hide();
			this._wepActWnd.deactivate();
			this._wepDonorListWnd.setBaseWeapon(this._wepListWnd.getSelectedWeapon());
			this._wepDonorListWnd.prepareWindow();
			this._wepDonorListWnd.refresh();
			this._wepDonorListWnd.show();
			this._wepDonorListWnd.activate();

			this.updateWepStatWnd(true);
			this._wepStatWnd.refresh(false,false,false,true,false,false);

		} else if (selection == "Repair"){
			this._wepActWnd.hide();
			this._wepActWnd.deactivate();

			this._repWnd.show();
			this._repWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
			this._repWnd.prepareWindow();
			this._repWnd.refresh();
			this._repWnd.activate();

			this._gldWnd.updateGold();
			this._gldWnd.show();
			this._gldWnd.refresh();

			this._wepStatWnd.refresh(false,false,false,false,false,true);
			this._wepStatWnd.show();
		}
	}

	Scene_Blacksmith.prototype.onWepActSelectCancel = function(){
		this._wepActWnd.hide();
		this._wepActWnd.deactivate();
		this._wepListWnd.show();
		this._wepListWnd.activate();
		this._wepListWnd.refresh();

		this.updateWepStatWnd(true);
		this._wepListWnd.refresh();
	}

	

	Scene_Blacksmith.prototype.onWepLvlUpOk = function(){
		this._lvlUpWnd.hide();
		this._lvlUpWnd.deactivate();

		this._wepActWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.refresh();

		this._wepStatWnd.setWeapon(this._lvlUpWnd.getWeapon());
		this._wepStatWnd.refresh(true,false,false,false,false,false);

		this._gldWnd.hide();
	}

	Scene_Blacksmith.prototype.onWepLvlUpCancel = function(){
		this._lvlUpWnd.hide();
		this._lvlUpWnd.deactivate();
		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.refresh();

		this._wepStatWnd.refresh(true,false,false,false,false,false);
		this._gldWnd.hide();
	}


	Scene_Blacksmith.prototype.onRefOk = function(){
		this._refWnd.hide();
		this._refWnd.deactivate();

		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
		this._wepActWnd.refresh();

		this._wepStatWnd.refresh(true,false,false,false,false,false);
		this._gldWnd.hide();
	}

	Scene_Blacksmith.prototype.onRefCancel = function(){
		this._refWnd.hide();
		this._refWnd.deactivate();
		this._wepActWnd.show();
		this._wepActWnd.activate();

		this._wepStatWnd.refresh(true,false,false,false,false,false);
		this._gldWnd.hide();
	}



	Scene_Blacksmith.prototype.onDonorWepSelect = function(){
		this._wepDonorListWnd.hide();
		this._wepDonorListWnd.deactivate();

		this._synthWnd.setBaseWeapon(this._wepListWnd.getSelectedWeapon());
		this._synthWnd.setDonorWeapon(this._wepDonorListWnd.getSelectedDonorWeapon());
		this._synthWnd.prepareWindow();
		this._synthWnd.refresh();
		this._synthWnd.show();
		this._synthWnd.activate();

		this._gldWnd.updateGold();
		this._gldWnd.refresh();
		this._gldWnd.show();		

		this.updateWepStatWnd(false);
		this._wepStatWnd.refresh(false,false,false,false,true,false);
	}

	Scene_Blacksmith.prototype.onDonorWepSelectCancel = function(){
		this._wepDonorListWnd.hide();
		this._wepDonorListWnd.deactivate();

		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.select();
		this._wepActWnd.refresh();

		this.updateWepStatWnd(false);
		this._wepStatWnd.refresh(true,false,false,false,false,false);		
	}

	Scene_Blacksmith.prototype.onSynthOk = function(){
		this._synthWnd.hide();
		this._synthWnd.deactivate();

		this._wepActWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.refresh();

		this._wepStatWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
		this._wepStatWnd.refresh(true,false,false,false,false,false);

		this._gldWnd.hide();
	}

	Scene_Blacksmith.prototype.onSynthCancel = function(){
		this._synthWnd.hide();
		this._synthWnd.deactivate();
		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.refresh();

		this._wepStatWnd.refresh(true,false,false,false,false,false);
		this._gldWnd.hide();
	}

	Scene_Blacksmith.prototype.onRepOk = function(){
		this._repWnd.hide();
		this._repWnd.deactivate();

		this._wepActWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.refresh();

		this._wepStatWnd.setWeapon(this._wepListWnd.getSelectedWeapon());
		this._wepStatWnd.refresh(true,false,false,false,false,false);

		this._gldWnd.hide();
	}

	Scene_Blacksmith.prototype.onRepCancel = function(){
		this._repWnd.hide();
		this._repWnd.deactivate();
		this._wepActWnd.show();
		this._wepActWnd.activate();
		this._wepActWnd.refresh();

		this._wepStatWnd.refresh(true,false,false,false,false,false);
		this._gldWnd.hide();
	}



	Window_WeaponList.prototype = Object.create(Window_Selectable.prototype);
	Window_WeaponList.prototype.constructor = Window_WeaponList;

	Window_WeaponList.prototype.initialize = function(w,h,x,y,statWnd){
		this._w = w;
		this._h = h;
		this._x = x;
		this._y = y;
		this._selectedWeapon = null;
		this._statusWindow = statWnd;
		this._wepIDList = [];

		Window_Selectable.prototype.initialize.call(this,x,y,w,h);

		this.refresh();
	}

	Window_WeaponList.prototype.getSelectedWeapon = function(){
		return this._selectedWeapon;
	}

	Window_WeaponList.prototype.setStatusWindow = function(sWnd){
		this._statusWindow = sWnd;
	}

	Window_WeaponList.prototype.getWidth = function(){
		return this._w;
	}

	Window_WeaponList.prototype.setSelectedWeapon = function(wID){
		this._selectedWeapon = wID;
	}

	Window_WeaponList.prototype.buildComList = function(){
		var cList = [];
		var wepList = [];
		
		for (var wID in $gameParty._weapons){
			var weapon = $gameParty._weapons[wID];
			wepList.push($gameParty._weapons[wID]._id);
			
			var newCItem = "";

			if (weapon._refLevel > 0) { newCItem = weapon._name + " +" + weapon._refLevel; }
			else { newCItem = weapon._name; }

			cList.push(newCItem);			
		}

		this._comList = cList;
		this._comList.push("Cancel");

		this._wepIDList = wepList;
	}

	Window_WeaponList.prototype.select = function(index){
		Window_Selectable.prototype.select.apply(this,arguments);
		this.setSelectedWeapon(this._wepIDList[this._index]);
		this._statusWindow.setWeapon(this._selectedWeapon);
		this._statusWindow.refresh(false,false,false,false,false);
	}

	Window_WeaponList.prototype.processOk = function(){
		if (this._comList[this.index()] != "Cancel"){
			Window_Selectable.prototype.processOk.call(this);
		} else{
			Window_Selectable.prototype.processCancel.call(this);
		}
	}

	Window_WeaponList.prototype.maxCols = function() { return 1; };
	Window_WeaponList.prototype.maxItems = function() { return this._comList ? this._comList.length : 1; };
	Window_WeaponList.prototype.itemHeight = function() { return 35; };	
	Window_WeaponList.prototype.numVisibleRows = function() { return 4; };
	Window_WeaponList.prototype.spacing = function() { return 8; };

	Window_WeaponList.prototype.refresh = function(){
		if (this.contents){
			this.contents.clear();

			this.buildComList();
			this.drawAllItems();
		}
	}
	
	Window_WeaponList.prototype.drawItem = function(index) {
		this.drawActionItem(index,this._itmX, this._itmY, this._itmW);
	};

	Window_WeaponList.prototype.drawActionItem = function(index, itmX, itmY, itmW){
		this.contents.fontSize = 20;
		var rect = this.itemRectForText(index);
		var x = rect.x;
		var y = this._itmW+rect.y+rect.height/2 - this.lineHeight() * 0.5;
		var w = rect.width -x - this.textPadding();

		this.drawText(this._comList[index],rect.x,rect.y,rect.width,'left');
	};

	Window_WeaponList.prototype.selectFirst = function(){
		this.select(0);
	}


	Window_DonorWeaponList.prototype = Object.create(Window_Selectable.prototype);
	Window_DonorWeaponList.prototype.constructor = Window_DonorWeaponList;

	Window_DonorWeaponList.prototype.initialize = function(w,h,x,y,statWnd){
		this._w = w;
		this._h = h;
		this._x = x;
		this._y = y;
		this._bWID = 0;
		this._dWID = 0;
		this._selectedDonorWeapon = null;
		this._statusWindow = statWnd;
		this._baseWep = null;
		this._wepIDList = [];

		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	}

	Window_DonorWeaponList.prototype.prepareWindow = function(){
		this.buildComList();
	}

	Window_DonorWeaponList.prototype.getSelectedDonorWeapon = function(){
		return this._selectedDonorWeapon;
	}

	Window_DonorWeaponList.prototype.setStatusWindow = function(sWnd){
		this._statusWindow = sWnd;
	}

	Window_DonorWeaponList.prototype.getWidth = function(){
		return this._w;
	}

	Window_DonorWeaponList.prototype.setSelectedDonorWeapon = function(wID){
		this._selectedDonorWeapon = wID;
		this._donorWep = $gameParty.getWeapon(this._selectedDonorWeapon);
	}

	Window_DonorWeaponList.prototype.setBaseWeapon = function(wID){
		this._bWID = wID;
		this._baseWep = $gameParty.getWeapon(this._bWID);
	}

	Window_DonorWeaponList.prototype.buildComList = function(){
		var cList = [];
		var wepList = [];

		for (var wID in $gameParty._weapons){
			wepList.push($gameParty._weapons[wID]._id);
		}
		
		for (var i1 = 0, i2 = 0; i1 < $gameParty._weapons.length; i1++){
			var weapon = $gameParty._weapons[i1];

			if (weapon._level == this._baseWep._level && weapon._refLevel == this._baseWep._refLevel && weapon._id != this._baseWep._id){
				var newCItem = "";

				if (weapon._refLevel > 0) { newCItem = weapon._name + " +" + weapon._refLevel; }
				else { newCItem = weapon._name; }

				cList.push(newCItem);
				i2++;
			} else{
				wepList.splice(i2,1);
			}
		}

		this._comList = cList;
		this._comList.push("Cancel");

		this._wepIDList = wepList;
	}

	Window_DonorWeaponList.prototype.select = function(index){
		if (index != -1){
			Window_Selectable.prototype.select.apply(this,arguments);
			this.setSelectedDonorWeapon(this._wepIDList[this._index]);
			this._statusWindow.setDonorWeapon(this._selectedDonorWeapon);
			this._statusWindow.refresh(false,false,false,true,false);
		}
	}

	Window_DonorWeaponList.prototype.processOk = function(){
		if (this._comList[this.index()] != "Cancel"){
			Window_Selectable.prototype.processOk.call(this);
		} else{
			Window_Selectable.prototype.processCancel.call(this);
		}
	}

	Window_DonorWeaponList.prototype.maxCols = function() { return 1; };
	Window_DonorWeaponList.prototype.maxItems = function() { return this._comList ? this._comList.length : 1; };
	Window_DonorWeaponList.prototype.itemHeight = function() { return 35; };	
	Window_DonorWeaponList.prototype.numVisibleRows = function() { return 4; };
	Window_DonorWeaponList.prototype.spacing = function() { return 8; };
	
	Window_DonorWeaponList.prototype.drawItem = function(index) {
		this.drawActionItem(index,this._itmX, this._itmY, this._itmW);
	};

	Window_DonorWeaponList.prototype.drawActionItem = function(index, itmX, itmY, itmW){
		this.contents.fontSize = 20;
		var rect = this.itemRectForText(index);
		var x = rect.x;
		var y = this._itmW+rect.y+rect.height/2 - this.lineHeight() * 0.5;
		var w = rect.width -x - this.textPadding();

		this.drawText(this._comList[index],rect.x,rect.y,rect.width,'left');
	};

	Window_DonorWeaponList.prototype.selectFirst = function(){
		this.select(0);
	}


	Window_WepStatus.prototype = Object.create(Window_Selectable.prototype);
	Window_WepStatus.prototype.constructor = Window_WepStatus;

	Window_WepStatus.prototype.initialize = function(w,h,x,y){
		Window_Selectable.prototype.initialize.call(this,x,y,w,h);

		this._wep;
		this._wID;
		this._dWID;
		this._donorWep;
		this._lineHeight = this.lineHeight();
		this._h = h;
	};

	Window_WepStatus.prototype.setWeapon = function(wep){
		this._wID = wep;
		this._wep = $gameParty.getWeapon(this._wID);
	};

	Window_WepStatus.prototype.getWeapon = function(){
		return this._wID;
	}

	Window_WepStatus.prototype.setDonorWeapon = function (dWep){
		this._dWID = dWep;
		this._donorWep = $gameParty.getWeapon(this._dWID);
	}

	Window_WepStatus.prototype.refresh = function(bIsExpandedInfo,bIsLevelUp,bIsRefine,bIsSynthInfo,bIsSynth,bIsRepair){
		if (bIsExpandedInfo) { this.expandedInfo(); }
		else if (bIsLevelUp) { this.levelupInfo(); }
		else if (bIsRefine) { this.refInfo(); }
		else if (bIsSynthInfo) { this.synthInfo(); }
		else if (bIsSynth) { this.synth(); }
		else if (bIsRepair) { this.repairInfo(); }
		else { this.basicInfo(); }
	}

	Window_WepStatus.prototype.basicInfo = function(){
		if (this._wep){
			this.contents.clear();

			var y = 5;
			var x = 5;

			var wLvl = "Lvl: " + this._wep._level;
			var wExp = "EXP: " + this._wep._exp;
			var wRef = "Refinement: " + this._wep._refLevel;
			var wDur = "Durability: " + this._wep._durability + "/" + this._wep._maxDur;

			this.drawIcon(this._wep._icon,x-1,y);
			x += 40;

			this.drawText(this._wep._name,x, y, this.textWidth(this._wep._name), 'left');
			x += this.textWidth(this._wep._name);

			x = 15;
			this.drawTextEx(this._wep._description, x, y+this._lineHeight);

			x = 15
			this.drawText(wLvl,x, y+this._lineHeight*3+16, 125, 'left');
			x += 25 + this.textWidth(wLvl);

			this.drawText(wExp, x, y+this._lineHeight*3+16, 300, 'left');
			
			x = 15;

			if (bIsRefineSysActive){			
				this.drawText(wRef, x, (y+this._lineHeight*4)+16, 220, 'left');
				x += 25 + this.textWidth(wRef);
			}

			if (bIsRepairSysActive){
				this.drawText(wDur, x, (y+this._lineHeight*4)+16, this.textWidth(wDur), 'left');
			}
		}
	}

	Window_WepStatus.prototype.lineHeight = function() {
	    return 30;
	};

	Window_WepStatus.prototype.expandedInfo = function(){
		if (this._wep){
			this.contents.clear();

			var y = 5;
			var x = 5;

			var wLvl = "Lvl: " + this._wep._level;
			var wExp = "EXP: " + this._wep._exp;
			var wRef = "Refinement: " + this._wep._refLevel;
			var wDur = "Durability: " + this._wep._durability + "/" + this._wep._maxDur;

			var traits = {};

			for (var i1 = 0,i2 = 0; i1 < this._wep._traits.length; i1++){
				if (this._wep._traits[i1].code == 13){
					traits[i2] = this._wep._traits[i1];
					i2++;
				}
			}

			//Base Params
			var wAtk = "Atk:" + ~~this._wep.atk;
			var wDef = "Def:" + ~~this._wep.def;
			var wMat = "Mat:" + ~~this._wep.mat;
			var wMdf = "Mdf:" + ~~this._wep.mdf;
    		var wAgi = "Agi:" + ~~this._wep.agi;
    		var wLuk = "Luk:" + ~~this._wep.luk;
    		var wHit = "Hit:" + ~~this._wep.hit;
    		var wEva = "Eva:" + ~~this._wep.eva;
    		var wCri = "Cri:" + ~~this._wep.cri;
    		var wHrg = "Hrg:" + ~~this._wep.hrg;
    		var wMrg = "Mrg:" + ~~this._wep.mrg;
    		var wTrg = "Trg:" + ~~this._wep.trg;

    		if (bAreExtParmsEnabled){
	    		//Extended Params
			    var wMhp = "Mhp:" + ~~this._wep.mhp;
			    var wMmp = "Mmp:" + ~~this._wep.mmp;
			    var wCev = "Cev:" + ~~this._wep.cev;
			    var wMev = "Mev:" + ~~this._wep.mev;
			    var wCnt = "Cnt:" + ~~this._wep.cnt;
			    var wMfr = "Mfr:" + ~~this._wep.mrf;
			    var wTgr = "Tgr:" + ~~this._wep.tgr;
			    var wGrd = "Grd:" + ~~this._wep.grd;
			    var wRec = "Rec:" + ~~this._wep.rec;
			    var wPha = "Pha:" + ~~this._wep.pha;
			    var wMcr = "Mcr:" + ~~this._wep.mcr;
			    var wTcr = "Tcr:" + ~~this._wep.tcr;
			    var wPdr = "Pdr:" + ~~this._wep.pdr;
			    var wMdr = "Mdr:" + ~~this._wep.mdr;
			    var wFdr = "Fdr:" + ~~this._wep.fdr;
			    var wExr = "Exr:" + ~~this._wep.exr;
			}

			this.drawIcon(this._wep._icon,x-1,y);
			x += 40;

			this.drawText(this._wep._name,x, y, this.textWidth(this._wep._name), 'left');
			x += this.textWidth(this._wep._name);

			this.drawText(wLvl,x+10, y, 125, 'left');
			x += 25 + this.textWidth(wLvl);

			this.drawText(wExp, x, y, 300, 'left');
			x = 20;

			this.drawTextEx(this._wep._description, x, y+this._lineHeight);
			

			if (bIsRefineSysActive){
				this.drawText(wRef, 20, (y+this._lineHeight*3)+16, 220, 'left');
				x += 25 + this.textWidth(wRef);
			}

			if (bIsRepairSysActive){
				this.drawText(wDur, x, (y+this._lineHeight*3)+16, this.textWidth(wDur), 'left');
			}
			
			this.drawHorzLine(0,y+this._lineHeight*5-22);
			this.drawVertLine(this.contentsWidth()/1.58,y+this._lineHeight*5-22);

			this.drawText("Parameters",((this.contentsWidth()/2)/2)-65,y+this._lineHeight*5,150,'center');
			this.drawText("Traits",(this.contentsWidth()/1.65)+55,y+this._lineHeight*5,150,'center');



			//Params
			this.contents.fontSize = 22;

			x = 2;
			this.drawText(wAtk,x,(y+this._lineHeight*6)+15,120,'left');
			x += 15 + this.textWidth(wAtk);

			this.drawText(wDef,x,(y+this._lineHeight*6)+15,120,'left');
			x += this.textWidth(wDef) + 15;

			this.drawText(wMat,x,(y+this._lineHeight*6)+15,120,'left');
			x += this.textWidth(wMat) + 15;			

			this.drawText(wMdf,x,(y+this._lineHeight*6)+15,120,'left');			
			

			x =2;
			this.drawText(wAgi,x,(y+this._lineHeight*7)+15,120,'left');
			x += this.textWidth(wAgi) + 15;

			this.drawText(wLuk,x,(y+this._lineHeight*7)+15,120,'left');
			x += this.textWidth(wLuk) + 15;
			
			this.drawText(wHit,x,(y+this._lineHeight*7)+15,120,'left');
			x += this.textWidth(wLuk) + 15;			

			this.drawText(wEva,x,(y+this._lineHeight*7)+15,120,'left');


			x =2;
			this.drawText(wCri,x,(y+this._lineHeight*8)+15,120,'left');
			x += this.textWidth(wCri) + 15;

			this.drawText(wHrg,x,(y+this._lineHeight*8)+15,120,'left');
			x += 15 + this.textWidth(wHrg);

			this.drawText(wMrg,x,(y+this._lineHeight*8)+15,120,'left');
			x += this.textWidth(wMrg) + 15;

			this.drawText(wTrg,x,(y+this._lineHeight*8)+15,120,'left');


			if (bAreExtParmsEnabled){
				x =2;
				this.drawText(wMhp,x,(y+this._lineHeight*9)+15,120,'left');
				x += this.textWidth(wMhp) + 15;

				this.drawText(wMmp,x,(y+this._lineHeight*9)+15,120,'left');
				x += 15 + this.textWidth(wMmp);

				this.drawText(wCev,x,(y+this._lineHeight*9)+15,120,'left');
				x += this.textWidth(wCev) + 15;

				this.drawText(wMev,x,(y+this._lineHeight*9)+15,120,'left');


				x =2;
				this.drawText(wCnt,x,(y+this._lineHeight*10)+15,120,'left');
				x += this.textWidth(wCnt) + 15;

				this.drawText(wMfr,x,(y+this._lineHeight*10)+15,120,'left');
				x += this.textWidth(wMfr) + 15;

				this.drawText(wTgr,x,(y+this._lineHeight*10)+15,120,'left');
				x += this.textWidth(wTgr) + 15;

				this.drawText(wGrd,x,(y+this._lineHeight*10)+15,120,'left');


				x =2
				this.drawText(wRec,x,(y+this._lineHeight*11)+15,120,'left');
				x += this.textWidth(wRec) + 15;

				this.drawText(wPha,x,(y+this._lineHeight*11)+15,120,'left');
				x += this.textWidth(wRec) + 15;

				this.drawText(wMcr,x,(y+this._lineHeight*11)+15,120,'left');
				x += this.textWidth(wMcr) + 15;

				this.drawText(wTcr,x,(y+this._lineHeight*11)+15,120,'left');


				x =2
				this.drawText(wPdr,x,(y+this._lineHeight*12)+15,120,'left');
				x += this.textWidth(wPdr) + 15;

				this.drawText(wMdr,x,(y+this._lineHeight*12)+15,120,'left');
				x += this.textWidth(wMdr) + 15;

				this.drawText(wFdr,x,(y+this._lineHeight*12)+15,120,'left');
				x += this.textWidth(wFdr) + 15;

				this.drawText(wExr,x,(y+this._lineHeight*12)+15,120,'left');
			}


			//Traits
			var i1 = 0;
			for (var tId in traits){
				x = this.contentsWidth()/1.58+10;
				var y1 = 0;

				if (i1 == 0) { y1 = (y+this._lineHeight*(6+i1)); }
				else { y1 = (y+this._lineHeight*(6+i1))+(5*i1); }
				var trIcon = $dataStates[traits[tId].dataId].iconIndex;
				var trName = $dataStates[traits[tId].dataId].name;
				var trChance = ~~(100*(traits[tId].value)) + "%";

				 this.drawIcon(trIcon,x,y1);
				 x += 40;

				 this.drawText(trName,x,y1,this.textWidth(trName),'left');
				 x += this.textWidth(trName) + 10;

				 this.drawText(trChance,x,y1,60,'left');

				 i1++;
			}
		}
	}


	Window_WepStatus.prototype.levelupInfo = function(){
		if (this._wep){
			this.contents.clear();

			var wLevel = this._wep._level;

			var newTraits = this._wep._lvlBonuses["traits"][wLevel];
			var newParams = this._wep._lvlBonuses["params"] || {};
			var newSParams = this._wep._lvlBonuses["sparams"] || {};
			var newEParams = this._wep._lvlBonuses["eparams"] || {};
			var newDurability = this._wep._lvlBonuses["dur"];

			var newParmLabels = [];

			var y = 5;
			var x = 5;

			var wLvl = "Lvl +1";
			var wExp = "EXP: " + this._wep._exp;
			var wRef = "Refinement: " + this._wep._refLevel;

			var wDur = "";

			wDur = "Durability: " + this._wep._durability + "/" + this._wep._maxDur;
			 
			if (this._wep._refLevel == 0){
				var traits = {};

				for (var i1 = 0,i2 = 0; i1 < this._wep._traits.length; i1++){
					if (this._wep._traits[i1].code == 13){
						traits[i2] = this._wep._traits[i1];
						i2++;
					}
				}

				//For Base Parms
				for (var pId in newParams){
					if (newParams[pId][wLevel] != 0){
						var parmStr = this.getParmName(0,pId) + " " + this.setSign(newParams[pId][wLevel],true) + newParams[pId][wLevel];
						newParmLabels.push(parmStr);
					}
				}

				//For Ex Parms
				for (var pId in newEParams){
					if (newEParams[pId][wLevel] != 0){
						var parmStr = this.getParmName(1,pId) + " " + this.setSign(newEParams[pId][wLevel],true) + newEParams[pId][wLevel];
						newParmLabels.push(parmStr);
					}
				}

				//For SP Parms
				for (var pId in newSParams){
					if (newSParams[pId][wLevel] != 0){
						var parmStr = this.getParmName(2,pId) + " " + this.setSign(newSParams[pId][wLevel],true) + newSParams[pId][wLevel];
						newParmLabels.push(parmStr);
					}
				}

				if (newDurability[wLevel] != 0){
					wDur = "Durability " + this.setSign(newDurability[wLevel],true) + newDurability[wLevel];
				} else{
					wDur = "Durability: " + this._wep._durability + "/" + this._wep._maxDur;
				}
			}

			this.drawIcon(this._wep._icon,x-1,y);
			x += 40;

			this.drawText(this._wep._name,x, y, this.textWidth(this._wep._name), 'left');
			x += this.textWidth(this._wep._name);

			this.changeTextColor("#0FA908");

			this.drawText(wLvl,x+10, y, 125, 'left');
			x += 25 + this.textWidth(wLvl);

			this.resetTextColor();

			this.drawText(wExp, x, y, 300, 'left');
			x = 20;

			this.drawTextEx(this._wep._description, x, y+this._lineHeight);

			if (bIsRefineSysActive){			
				this.drawText(wRef, 20, (y+this._lineHeight*3)+16, 220, 'left');
				x += 25 + this.textWidth(wRef);
			}

			if (bIsRepairSysActive){
				if (this._wep._refLevel == 0){
					if (newDurability[wLevel] != 0){
						this.changeTextColor(pIncColor);
					}
				}

				this.drawText(wDur, x, (y+this._lineHeight*3)+16, 220, 'left');
			}
				this.resetTextColor();
			
			
			this.drawHorzLine(0,y+this._lineHeight*5-22);
			this.drawVertLine(this.contentsWidth()/1.58,y+this._lineHeight*5-22);

			this.drawText("Parameters",((this.contentsWidth()/2)/2)-65,y+this._lineHeight*5,150,'center');
			this.drawText("Traits",(this.contentsWidth()/1.65)+55,y+this._lineHeight*5,150,'center');    		

			if (this._wep._refLevel == 0){
				//Params
				this.contents.fontSize = 24;
				x = 2;
				var yM = 6;
				var y1 = y+this._lineHeight*yM;

				this.changeTextColor(pIncColor);

				for (var i1 = 0, i2 = 0; i1 < newParmLabels.length; i1++){
					var label = newParmLabels[i1];
					
					if (i2 == 4){					
						this.drawText(label,x,y1+15,this.textWidth(label),'left');

						x = 2;
						yM++;
						y1 = y+this._lineHeight*yM;

						i2 = 0;					
					} else{
						this.drawText(label,x,y1+15,this.textWidth(label),'left');
						x += this.textWidth(label) + 15;

						i2++;
					}
				}

				this.resetTextColor();
				
				//Traits
				//Only show a trait under two conditions:
				//First, if the trait is new show the trait, all text green
				//Second, if the trait exists but the chance is being changed then show the trait, only chance text green/red
				this.contents.fontSize = 22;

				var i1 = 0;
				x = this.contentsWidth()/1.58+10;
				var yM1 = 6;
				var yM2 = 5;
				var y1 = (y+this._lineHeight*yM1);
				var y2 = (y+this._lineHeight*yM1)+yM2;			

				for (var nTId in newTraits){
					if (newTraits[nTId].code != 0 && newTraits[nTId].dataId != 0 && newTraits[nTId].value != 0){
						var bTraitExists = false;

						var trIcon = 0;
						var trName = "";
						var trChance = 0;

						for (var tId in traits){					
							if (traits[tId].code == newTraits[nTId].code && traits[tId].dataId == newTraits[nTId].dataId){
								trIcon = $dataStates[traits[tId].dataId].iconIndex;
								trName = $dataStates[traits[tId].dataId].name;
								trChance = this.setSign(100*(newTraits[nTId].value),true) + ~~100 * newTraits[nTId].value + "%";

								y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);

								if (i1 != 0) { y1 = y2 }

								this.drawIcon(trIcon,x,y1);
								x += 40;

								this.drawText(trName,x,y1,this.textWidth(trName),'left');
								x += this.textWidth(trName) + 10;

								this.changeTextColor(pIncColor);
								this.drawText(trChance,x,y1,60,'left');
								this.resetTextColor();

								
								i1++;

								y1 = (y+this._lineHeight*(yM1+i1));
								x = this.contentsWidth()/1.58+10;

								if (i1 != 0){
									yM2++;	
									y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);
								}
								

								bTraitExists = true;
							}
						}

						if (!bTraitExists){
							trIcon = $dataStates[newTraits[nTId].dataId].iconIndex;
							trName = $dataStates[newTraits[nTId].dataId].name;
							trChance = ~~(100*(newTraits[nTId].value)) + "%";

							y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);
							if (i1 != 0) { y1 = y2; }

							this.drawIcon(trIcon,x,y1);
							x += 40;

							this.changeTextColor(pIncColor);
							this.drawText(trName,x,y1,this.textWidth(trName),'left');
							x += this.textWidth(trName) + 10;
							
							this.drawText(trChance,x,y1,60,'left');
							this.resetTextColor();

							i1++;
							y1 = (y+this._lineHeight*(yM1+i1));

							if (i1 != 0){
								yM2++;	
								y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);
							}

							x = this.contentsWidth()/1.58+10;
						}
					}
				}
			}
		}
	}

	Window_WepStatus.prototype.refInfo = function(){
		if (this._wep){
			this.contents.clear();

			var wLevel = 1;

			var newParmLabels = [];

			var y = 5;
			var x = 5;

			var wLvl = "Lvl 1";
			var wExp = "EXP: 0";
			var wRef = "Refinement: +1";

			var wDur = "";
			 
			
			var traits = {};

			for (var i1 = 0,i2 = 0; i1 < this._wep._traits.length; i1++){
				if (this._wep._traits[i1].code == 13){
					traits[i2] = this._wep._traits[i1];
					i2++;
				}
			}

			//For Base Parms
			for (var pId in this._wep._baseParams){
				if (this._wep._baseParams[pId] != 0){
					var parmVal = this._wep._baseParams[pId];
					var finVal = 0;

					if (this._wep._refLevel == 0) { finVal = Math.round(parmVal*this._wep._refBonus) }
					else { finVal = Math.round(parmVal*(this._wep._refBonus*this._wep._refLevel)) }

					var parmStr = this.getParmName(0,pId) + " " + this.setSign(finVal,true) + finVal;
					newParmLabels.push(parmStr);
				}
			}

			//For Ex Parms
			for (var pId in this._wep._exParams){
				if (this._wep._exParams[pId] != 0){
					var parmVal = this._wep._exParams[pId];
					var finVal = 0;

					if (this._wep._refLevel == 0) { finVal = Math.round(parmVal*this._wep._refBonus) }
					else { finVal = Math.round(parmVal*(this._wep._refBonus*this._wep._refLevel)) }

					var parmStr = this.getParmName(1,pId) + " " + this.setSign(finVal,true) + finVal;
					newParmLabels.push(parmStr);
				}
			}

			//For SP Parms
			for (var pId in this._wep._spParams){
				if (this._wep._spParams[pId] != 0){
					var parmVal = this._wep._spParams[pId];
					var finVal = 0;

					if (this._wep._refLevel == 0) { finVal = Math.round(parmVal*this._wep._refBonus) }
					else { finVal = Math.round(parmVal*(this._wep._refBonus*this._wep._refLevel)) }

					var parmStr = this.getParmName(1,pId) + " " + this.setSign(finVal,true) + finVal;
					newParmLabels.push(parmStr);
				}
			}

			this.drawIcon(this._wep._icon,x-1,y);
			x += 40;

			this.drawText(this._wep._name,x, y, this.textWidth(this._wep._name), 'left');
			x += this.textWidth(this._wep._name);

			this.changeTextColor(pIncColor);

			this.drawText(wLvl,x+10, y, 125, 'left');
			x += 25 + this.textWidth(wLvl);

			this.resetTextColor();

			this.changeTextColor(pDecColor);
			this.drawText(wExp, x, y, 300, 'left');
			x = 20;

			this.resetTextColor();

			this.drawTextEx(this._wep._description, x, y+this._lineHeight);

			this.changeTextColor(pIncColor);
			this.drawText(wRef, 20, (y+this._lineHeight*3)+16, 220, 'left');
			x += 25 + this.textWidth(wRef);

			var newDur = 0;

			if (bIsRepairSysActive){
				if (this._wep._refLevel == 0) { newDur = Math.round((this._wep._maxDur * this._wep._refBonus)); }
				else { newDur = Math.round((this._wep._maxDur*(this._wep._refBonus * this._wep._refLevel))); }			
			
				wDur = "Durability " + this.setSign(newDur,true) + newDur;
	
				this.drawText(wDur, x, (y+this._lineHeight*3)+16, 220, 'left');
			}

			this.resetTextColor();
			
			
			this.drawHorzLine(0,y+this._lineHeight*5-22);
			this.drawVertLine(this.contentsWidth()/1.58,y+this._lineHeight*5-22);

			this.drawText("Parameters",((this.contentsWidth()/2)/2)-65,y+this._lineHeight*5,150,'center');
			this.drawText("Traits",(this.contentsWidth()/1.65)+55,y+this._lineHeight*5,150,'center');    		

			
			//Params
			this.contents.fontSize = 24;
			x = 2;
			var yM = 6;
			var y1 = y+this._lineHeight*yM;

			this.changeTextColor(pIncColor);

			for (var i1 = 0, i2 = 0; i1 < newParmLabels.length; i1++){
				var label = newParmLabels[i1];
				
				if (i2 == 4){					
					this.drawText(label,x,y1+15,this.textWidth(label),'left');

					x = 2;
					yM++;
					y1 = y+this._lineHeight*yM;

					i2 = 0;					
				} else{
					this.drawText(label,x,y1+15,this.textWidth(label),'left');
					x += this.textWidth(label) + 15;

					i2++;
				}
			}

			this.resetTextColor();
			
			//Traits
			//Only show a trait under two conditions:
			//First, if the trait is new show the trait, all text green
			//Second, if the trait exists but the chance is being changed then show the trait, only chance text green/red
			this.contents.fontSize = 22;

			var i1 = 0;
			x = this.contentsWidth()/1.58+10;
			var yM1 = 6;
			var yM2 = 5;
			var y1 = (y+this._lineHeight*yM1);
			var y2 = (y+this._lineHeight*yM1)+yM2;							

			for (var tId in traits){
				var trIcon = $dataStates[traits[tId].dataId].iconIndex;
				var trName = $dataStates[traits[tId].dataId].name;
				var newChance = 0;

				if (this._wep._refLevel == 0) { newChance = Math.round(100*(traits[tId].value*this._wep._refBonus)); }
				else { newChance = Math.round(100*(traits[tId].value*(this._wep._refBonus*this._wep._refLevel))); }

				var trChance = this.setSign(newChance,true) + newChance + "%";

				y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);

				if (i1 != 0) { y1 = y2 }

				this.drawIcon(trIcon,x,y1);
				x += 40;

				this.drawText(trName,x,y1,this.textWidth(trName),'left');
				x += this.textWidth(trName) + 10;

				this.changeTextColor(pIncColor);
				this.drawText(trChance,x,y1,60,'left');
				this.resetTextColor();

				
				i1++;

				y1 = (y+this._lineHeight*(yM1+i1));
				x = this.contentsWidth()/1.58+10;

				if (i1 != 0){
					yM2++;	
					y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);
				}				
			}
			
		}
	}

	Window_WepStatus.prototype.synthInfo = function(){
		if (this._donorWep){
			this.contents.clear();

			var y = 5;
			var x = 5;

			var wLvl = "Lvl: " + this._donorWep._level;
			var wExp = "EXP: " + this._donorWep._exp;
			var wRef = "Refinement: " + this._donorWep._refLevel;
			var wDur = "Durability: " + this._donorWep._durability + "/" + this._donorWep._maxDur;

			this.drawIcon(this._donorWep._icon,x-1,y);
			x += 40;

			this.drawText(this._donorWep._name,x, y, this.textWidth(this._donorWep._name), 'left');
			x += this.textWidth(this._donorWep._name);

			x = 15;
			this.drawTextEx(this._donorWep._description, x, y+this._lineHeight);

			x = 15
			this.drawText(wLvl,x, y+this._lineHeight*3+16, 125, 'left');
			x += 25 + this.textWidth(wLvl);

			this.drawText(wExp, x, y+this._lineHeight*3+16, 300, 'left');
			
			x = 15;			

			if (bIsRefineSysActive){
				this.drawText(wRef, x, (y+this._lineHeight*4)+16, 220, 'left');
				x += 25 + this.textWidth(wRef);
			}

			if (bIsRepairSysActive){
				this.drawText(wDur, x, (y+this._lineHeight*4)+16, this.textWidth(wDur), 'left');
			}
		}
	}

	Window_WepStatus.prototype.synth = function(){
		if (this._wep && this._donorWep){
			this.contents.clear();

			var baseParams = this._wep._baseParams || {};
			var baseSParams = this._wep._spParams || {};
			var baseEParams = this._wep._exParams || {};

			var donorParams = this._donorWep._baseParams || {};
			var donorSParams = this._donorWep._spParams || {};
			var donorEParams = this._donorWep._exParams || {};

			var bTraits = {};
			var dTraits = {};
			var bParamExists = false;

			for (var i1 = 0; i1 < this._wep._traits.length; i1++){
				if (this._wep._traits[i1].code == 13){
					bTraits[i1] = this._wep._traits[i1];
				}
			}

			for (var i1 = 0; i1 < this._donorWep._traits.length; i1++){
				if (this._wep._traits[i1].code == 13){
					dTraits[i1] = this._donorWep._traits[i1];
				}
			}

			var newParmLabels = [];

			var y = 5;
			var x = 5;

			var wLvl = "Lvl " + this._wep._maxLvl;
			var wExp = "EXP 0";
			var wRef = "Refinement " + this.setSign(Math.round(this._donorWep._refLevel*1.5),true) +  Math.round(this._donorWep._refLevel*1.5);

			var wDur = "";

			wDur = "Durability " + this.setSign(Math.round((this._donorWep._maxDur*0.2)),true) + Math.round(this._donorWep._maxDur*0.2);			 
			
		
			//For Base Parms
			for (var dPId in donorParams){
				var parmStr = "";

				for (var bPId in baseParams)
				if (donorParams[dPId] != 0 && baseParams[bPId] != 0 && bPId == dPId){
					parmStr = this.getParmName(0,bPId) + " " + this.setSign(Math.round(donorParams[bPId]*0.15),true) + Math.round(donorParams[bPId]*0.15);
					newParmLabels.push(parmStr);

					bParamExists = true;
				}

				if (!bParamExists){
					if (donorParams[dPId] != 0){
						parmStr = this.getParmName(0,dPId) + " " + this.setSign(Math.round(donorParams[dPId]*0.30),true) + Math.round(donorParams[dPId]*0.30);
						newParmLabels.push(parmStr);
					}

					bParamExists = false;
				}
			}

			//For Ex Parms
			for (var dPId in donorEParams){
				var parmStr = "";

				for (var bPId in baseEParams)
				if (donorEParams[dPId] != 0 && baseEParams[bPId] != 0 && bPId == dPId){
					parmStr = this.getParmName(1,bPId) + " " + this.setSign(Math.round(donorEParams[bPId]*0.15),true) + Math.round(donorEParams[bPId]*0.15);
					newParmLabels.push(parmStr);

					bParamExists = true;
				}

				if (!bParamExists){
					if (donorEParams[dPId] != 0){
						parmStr = this.getParmName(1,dPId) + " " + this.setSign(Math.round(donorEParams[dPId]*0.15),true) + Math.round(donorEParams[dPId]*0.3);
						newParmLabels.push(parmStr);
					}

					bParamExists = false;
				}
			}

			//For SP Parms
			for (var dPId in donorSParams){
				var parmStr = "";

				for (var bPId in baseSParams)
				if (donorSParams[dPId] != 0 && baseSParams[bPId] != 0 && bPId == dPId){
					parmStr = this.getParmName(2,bPId) + " " + this.setSign(Math.round(donorSParams[bPId]*0.15),true) + Math.round(donorSParams[bPId]*0.15);
					newParmLabels.push(parmStr);

					bParamExists = true;
				}

				if (!bParamExists){
					if (donorSParams[dPId] != 0){
						parmStr = this.getParmName(2,dPId) + " " + this.setSign(Math.round(donorSParams[dPId]*0.15),true) + Math.round(donorSParams[dPId]*0.30);
						newParmLabels.push(parmStr);
					}

					bParamExists = false;
				}
			}
					

			this.drawIcon(this._wep._icon,x-1,y);
			x += 40;

			this.drawText(this._wep._name,x, y, this.textWidth(this._wep._name), 'left');
			x += this.textWidth(this._wep._name);

			this.changeTextColor(pIncColor);

			this.drawText(wLvl,x+10, y, 125, 'left');
			x += 25 + this.textWidth(wLvl);

			this.resetTextColor();

			this.changeTextColor(pDecColor);
			this.drawText(wExp, x, y, 300, 'left');

			x = 20;

			this.resetTextColor();

			this.drawTextEx(this._wep._description, x, y+this._lineHeight);
			
			this.changeTextColor(pIncColor);			
			if (bIsRefineSysActive){				
				this.drawText(wRef, 20, (y+this._lineHeight*3)+16, 220, 'left');
				x += 25 + this.textWidth(wRef);
			}

			if (bIsRepairSysActive){
				this.drawText(wDur, x, (y+this._lineHeight*3)+16, 220, 'left');
			}

			this.resetTextColor();
			
			this.drawHorzLine(0,y+this._lineHeight*5-22);
			this.drawVertLine(this.contentsWidth()/1.58,y+this._lineHeight*5-22);

			this.drawText("Parameters",((this.contentsWidth()/2)/2)-65,y+this._lineHeight*5,150,'center');
			this.drawText("Traits",(this.contentsWidth()/1.65)+55,y+this._lineHeight*5,150,'center');    		
			
			//Params
			this.contents.fontSize = 24;
			x = 2;
			var yM = 6;
			var y1 = y+this._lineHeight*yM;

			this.changeTextColor(pIncColor);

			for (var i1 = 0, i2 = 0; i1 < newParmLabels.length; i1++){
				var label = newParmLabels[i1];
				
				if (i2 == 4){					
					this.drawText(label,x,y1+15,this.textWidth(label),'left');

					x = 2;
					yM++;
					y1 = y+this._lineHeight*yM;

					i2 = 0;					
				} else{
					this.drawText(label,x,y1+15,this.textWidth(label),'left');
					x += this.textWidth(label) + 15;

					i2++;
				}
			}

			this.resetTextColor();
			
			//Traits
			//Only show a trait under two conditions:
			//First, if the trait is new show the trait, all text green
			//Second, if the trait exists but the chance is being changed then show the trait, only chance text green/red
			this.contents.fontSize = 22;

			var i1 = 0;
			x = this.contentsWidth()/1.58+10;
			var yM1 = 6;
			var yM2 = 5;
			var y1 = (y+this._lineHeight*yM1);
			var y2 = (y+this._lineHeight*yM1)+yM2;			

			for (var dTId in dTraits){
				if (dTraits[dTId].code != 0 && dTraits[dTId].dataId != 0 && dTraits[dTId].value != 0){
					var bTraitExists = false;

					var trIcon = 0;
					var trName = "";
					var trChance = 0;

					for (var bTId in bTraits){					
						if (bTraits[bTId].code == dTraits[dTId].code && bTraits[bTId].dataId == dTraits[dTId].dataId){
							trIcon = $dataStates[bTraits[bTId].dataId].iconIndex;
							trName = $dataStates[bTraits[bTId].dataId].name;
							trChance = this.setSign(100*((dTraits[dTId].value)*0.15),true) + Math.ceil(100 * (dTraits[dTId].value * 0.15)) + "%";

							y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);

							if (i1 != 0) { y1 = y2 }

							this.drawIcon(trIcon,x,y1);
							x += 40;

							this.drawText(trName,x,y1,this.textWidth(trName),'left');
							x += this.textWidth(trName) + 10;

							this.changeTextColor(pIncColor);
							this.drawText(trChance,x,y1,60,'left');
							this.resetTextColor();

							
							i1++;

							y1 = (y+this._lineHeight*(yM1+i1));
							x = this.contentsWidth()/1.58+10;

							if (i1 != 0){
								yM2++;	
								y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);
							}
							

							bTraitExists = true;
						}
					}

					if (!bTraitExists){
						trIcon = $dataStates[dTraits[dTId].dataId].iconIndex;
						trName = $dataStates[dTraits[dTId].dataId].name;
						trChance = ~~Math.ceil(100 * (dTraits[dTId].value * 0.30)) + "%";

						y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);
						if (i1 != 0) { y1 = y2; }

						this.drawIcon(trIcon,x,y1);
						x += 40;

						this.changeTextColor(pIncColor);
						this.drawText(trName,x,y1,this.textWidth(trName),'left');
						x += this.textWidth(trName) + 10;
						
						this.drawText(trChance,x,y1,60,'left');
						this.resetTextColor();

						i1++;
						y1 = (y+this._lineHeight*(yM1+i1));

						if (i1 != 0){
							yM2++;	
							y2 = (y+this._lineHeight*(yM1+i1))+(yM2*i1);
						}

						x = this.contentsWidth()/1.58+10;
					}
				}
			}
		}
	}

	Window_WepStatus.prototype.repairInfo = function(){
		if (this._wep){
			this.contents.clear();

			var y = 5;
			var x = 5;

			var wLvl = "Lvl: " + this._wep._level;
			var wExp = "EXP: " + this._wep._exp;
			var wRef = "Refinement: " + this._wep._refLevel;
			var wDur = "Durability: " + this.setSign((this._wep._maxDur - this._wep._durability),true) + (this._wep._maxDur - this._wep._durability);

			var traits = {};

			for (var i1 = 0,i2 = 0; i1 < this._wep._traits.length; i1++){
				if (this._wep._traits[i1].code == 13){
					traits[i2] = this._wep._traits[i1];
					i2++;
				}
			}

			//Base Params
			var wAtk = "Atk:" + this.setSign(this._wep.atk, false) + ~~this._wep.atk;
			var wDef = "Def:" + this.setSign(this._wep.def, false) + ~~this._wep.def;
			var wMat = "Mat:" + this.setSign(this._wep.mat, false) + ~~this._wep.mat;
			var wMdf = "Mdf:" + this.setSign(this._wep.mdf, false) + ~~this._wep.mdf;
    		var wAgi = "Agi:" + this.setSign(this._wep.agi, false) + ~~this._wep.agi;
    		var wLuk = "Luk:" + this.setSign(this._wep.luk, false) + ~~this._wep.luk;
    		var wHit = "Hit:" + this.setSign(this._wep.hit, false) + ~~this._wep.hit;
    		var wEva = "Eva:" + this.setSign(this._wep.eva, false) + ~~this._wep.eva;
    		var wCri = "Cri:" + this.setSign(this._wep.cri, false) + ~~this._wep.cri;
    		var wHrg = "Hrg:" + this.setSign(this._wep.hrg, false) + ~~this._wep.hrg;
    		var wMrg = "Mrg:" + this.setSign(this._wep.mrg, false) + ~~this._wep.mrg;
    		var wTrg = "Trg:" + this.setSign(this._wep.trg, false) + ~~this._wep.trg;

    		if (bAreExtParmsEnabled){
	    		//Extended Params
			    var wMhp = "Mhp:" + this.setSign(this._wep.mhp, false) + ~~this._wep.mhp;
			    var wMmp = "Mmp:" + this.setSign(this._wep.mmp, false) + ~~this._wep.mmp;
			    var wCev = "Cev:" + this.setSign(this._wep.cev, false) + ~~this._wep.cev;
			    var wMev = "Mev:" + this.setSign(this._wep.mev, false) + ~~this._wep.mev;
			    var wCnt = "Cnt:" + this.setSign(this._wep.cnt, false) + ~~this._wep.cnt;
			    var wMfr = "Mfr:" + this.setSign(this._wep.mrf, false) + ~~this._wep.mrf;
			    var wTgr = "Tgr:" + this.setSign(this._wep.tgr, false) + ~~this._wep.tgr;
			    var wGrd = "Grd:" + this.setSign(this._wep.grd, false) + ~~this._wep.grd;
			    var wRec = "Rec:" + this.setSign(this._wep.rec, false) + ~~this._wep.rec;
			    var wPha = "Pha:" + this.setSign(this._wep.pha, false) + ~~this._wep.pha;
			    var wMcr = "Mcr:" + this.setSign(this._wep.mcr, false) + ~~this._wep.mcr;
			    var wTcr = "Tcr:" + this.setSign(this._wep.tcr, false) + ~~this._wep.tcr;
			    var wPdr = "Pdr:" + this.setSign(this._wep.pdr, false) + ~~this._wep.pdr;
			    var wMdr = "Mdr:" + this.setSign(this._wep.mdr, false) + ~~this._wep.mdr;
			    var wFdr = "Fdr:" + this.setSign(this._wep.fdr, false) + ~~this._wep.fdr;
			    var wExr = "Exr:" + this.setSign(this._wep.exr, false) + ~~this._wep.exr;
			}

			this.drawIcon(this._wep._icon,x-1,y);
			x += 40;

			this.drawText(this._wep._name,x, y, this.textWidth(this._wep._name), 'left');
			x += this.textWidth(this._wep._name);

			this.drawText(wLvl,x+10, y, 125, 'left');
			x += 25 + this.textWidth(wLvl);

			this.drawText(wExp, x, y, 300, 'left');
			x = 20;

			this.drawTextEx(this._wep._description, x, y+this._lineHeight);
			
			if (bIsRefineSysActive){
				this.drawText(wRef, 20, (y+this._lineHeight*3)+16, 220, 'left');
				x += 25 + this.textWidth(wRef);
			}

			this.changeTextColor(pIncColor);
			this.drawText(wDur, x, (y+this._lineHeight*3)+16, this.textWidth(wDur), 'left');
			this.resetTextColor();
			
			this.drawHorzLine(0,y+this._lineHeight*5-22);
			this.drawVertLine(this.contentsWidth()/1.58,y+this._lineHeight*5-22);

			this.drawText("Parameters",((this.contentsWidth()/2)/2)-65,y+this._lineHeight*5,150,'center');
			this.drawText("Traits",(this.contentsWidth()/1.65)+55,y+this._lineHeight*5,150,'center');



			//Params
			this.contents.fontSize = 22;

			x = 2;
			this.drawText(wAtk,x,(y+this._lineHeight*6)+15,120,'left');
			x += 15 + this.textWidth(wAtk);

			this.drawText(wDef,x,(y+this._lineHeight*6)+15,120,'left');
			x += this.textWidth(wDef) + 15;

			this.drawText(wMat,x,(y+this._lineHeight*6)+15,120,'left');
			x += this.textWidth(wMat) + 15;			

			this.drawText(wMdf,x,(y+this._lineHeight*6)+15,120,'left');			
			

			x =2;
			this.drawText(wAgi,x,(y+this._lineHeight*7)+15,120,'left');
			x += this.textWidth(wAgi) + 15;

			this.drawText(wLuk,x,(y+this._lineHeight*7)+15,120,'left');
			x += this.textWidth(wLuk) + 15;
			
			this.drawText(wHit,x,(y+this._lineHeight*7)+15,120,'left');
			x += this.textWidth(wLuk) + 15;			

			this.drawText(wEva,x,(y+this._lineHeight*7)+15,120,'left');


			x =2;
			this.drawText(wCri,x,(y+this._lineHeight*8)+15,120,'left');
			x += this.textWidth(wCri) + 15;

			this.drawText(wHrg,x,(y+this._lineHeight*8)+15,120,'left');
			x += 15 + this.textWidth(wHrg);

			this.drawText(wMrg,x,(y+this._lineHeight*8)+15,120,'left');
			x += this.textWidth(wMrg) + 15;

			this.drawText(wTrg,x,(y+this._lineHeight*8)+15,120,'left');

			if (bAreExtParmsEnabled){
				x =2;
				this.drawText(wMhp,x,(y+this._lineHeight*9)+15,120,'left');
				x += this.textWidth(wMhp) + 15;

				this.drawText(wMmp,x,(y+this._lineHeight*9)+15,120,'left');
				x += 15 + this.textWidth(wMmp);

				this.drawText(wCev,x,(y+this._lineHeight*9)+15,120,'left');
				x += this.textWidth(wCev) + 15;

				this.drawText(wMev,x,(y+this._lineHeight*9)+15,120,'left');


				x =2;
				this.drawText(wCnt,x,(y+this._lineHeight*10)+15,120,'left');
				x += this.textWidth(wCnt) + 15;

				this.drawText(wMfr,x,(y+this._lineHeight*10)+15,120,'left');
				x += this.textWidth(wMfr) + 15;

				this.drawText(wTgr,x,(y+this._lineHeight*10)+15,120,'left');
				x += this.textWidth(wTgr) + 15;

				this.drawText(wGrd,x,(y+this._lineHeight*10)+15,120,'left');


				x =2
				this.drawText(wRec,x,(y+this._lineHeight*11)+15,120,'left');
				x += this.textWidth(wRec) + 15;

				this.drawText(wPha,x,(y+this._lineHeight*11)+15,120,'left');
				x += this.textWidth(wRec) + 15;

				this.drawText(wMcr,x,(y+this._lineHeight*11)+15,120,'left');
				x += this.textWidth(wMcr) + 15;

				this.drawText(wTcr,x,(y+this._lineHeight*11)+15,120,'left');


				x =2
				this.drawText(wPdr,x,(y+this._lineHeight*12)+15,120,'left');
				x += this.textWidth(wPdr) + 15;

				this.drawText(wMdr,x,(y+this._lineHeight*12)+15,120,'left');
				x += this.textWidth(wMdr) + 15;

				this.drawText(wFdr,x,(y+this._lineHeight*12)+15,120,'left');
				x += this.textWidth(wFdr) + 15;

				this.drawText(wExr,x,(y+this._lineHeight*12)+15,120,'left');


			}


			//Traits
			var i1 = 0;
			for (var tId in traits){
				x = this.contentsWidth()/1.58+10;
				var y1 = 0;

				if (i1 == 0) { y1 = (y+this._lineHeight*(6+i1)); }
				else { y1 = (y+this._lineHeight*(6+i1))+(5*i1); }
				var trIcon = $dataStates[traits[tId].dataId].iconIndex;
				var trName = $dataStates[traits[tId].dataId].name;
				var trChance = ~~(100*(traits[tId].value)) + "%";

				 this.drawIcon(trIcon,x,y1);
				 x += 40;

				 this.drawText(trName,x,y1,this.textWidth(trName),'left');
				 x += this.textWidth(trName) + 10;

				 this.drawText(trChance,x,y1,60,'left');

				 i1++;
			}
		}
	}


	Window_WepStatus.prototype.setSign = function(val,bForBonuses){
		if (val > 0 && bForBonuses) { return "+"; }
		else if (val < 0) { return "-"; }
		else { return ""; }
	}

	Window_WepStatus.prototype.getParmName = function(parmType, parmID){
		var bParmNames = ['Mhp','Mmp','Atk','Def','Mat','Mdf','Agi','Luk'];
		var eParmNames = ['Hit','Eva','Cri','Cev','Mev','Mfr','Cnt','Hrg','Mrg','Trg'];
		var sParmNames = ['Tgr','Grd','Rec','Pha','Mcr','Tcr','Pdr','Mdr','Fdr','Exr'];

		if (parmType == 0) { return bParmNames[parmID]; }
		else if (parmType == 1) { return eParmNames[parmID]; }
		else if (parmType == 2) { return sParmNames[parmID]; }
	}

	Window_WepStatus.prototype.drawHorzLine = function(x, y) {
		var lineY = y + this.lineHeight() / 2 - 1;
	    this.contents.paintOpacity = 180;
	    this.contents.fillRect(x, lineY, this.contentsWidth()-x*2, 2, this.lineColor());
	    this.contents.paintOpacity = 255;
	};

	Window_WepStatus.prototype.drawVertLine = function(x, y) {
		var lineY = y + this.lineHeight() / 2 - 1;
	    this.contents.paintOpacity = 180;
	    this.contents.fillRect(x, lineY ,2, this.contentsHeight()-y, this.lineColor());
	    this.contents.paintOpacity = 255;
	};	


	Window_WepStatus.prototype.lineColor = function() {
	    return this.normalColor();
	};


	Window_ActionPane.prototype = Object.create(Window_Selectable.prototype);
	Window_ActionPane.prototype.constructor = Window_ActionPane;

	Window_ActionPane.prototype.initialize = function(w,h,x,y){
		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
		this._selection = "";
		this._w = w;
		this._index = 0;

		this._wep = null;
		this._wID = 0;

		this.prepareWindow();
	}

	Window_ActionPane.prototype.prepareWindow = function(){
		this.buildComList();
	}

	Window_ActionPane.prototype.buildComList = function(){
		this._comList = [];
		this._helpTxtList = [];

		this._comList = ["Level Up"];
		this._helpTxtList = ["Level up a weapon"]

		if (bIsRefineSysActive){
			this._comList.push("Refine");
			this._helpTxtList.push("Refine a weapon");
		}

		if (bIsSynthSysActive){
			this._comList.push("Synthesize");
			this._helpTxtList.push("Synthesize a weapon");
		}

		if (bIsRepairSysActive){
			this._comList.push("Repair");
			this._helpTxtList.push("Repair a weapon");
		}

		this._comList.push("Cancel");
		this._helpTxtList.push("Return to weapon select");
	}

	Window_ActionPane.prototype.setWeapon = function(wep){
		this._wID = wep;
		this._wep = $gameParty.getWeapon(this._wID);
	}

	Window_ActionPane.prototype.drawItem = function(index) {
		this.drawActionItem(index,this._itmX, this._itmY, this._itmW);
	};

	Window_ActionPane.prototype.getSelection = function(){
		return this._selection;
	}

	Window_ActionPane.prototype.maxCols = function() { return 1; };
	Window_ActionPane.prototype.maxItems = function() { return this._comList ? this._comList.length : 1; };
	Window_ActionPane.prototype.itemHeight = function() { return 35; };	
	Window_ActionPane.prototype.numVisibleRows = function() { return 4; };
	Window_ActionPane.prototype.spacing = function() { return 8; };

	Window_ActionPane.prototype.drawActionItem = function(index, itmX, itmY, itmW){
		this.contents.fontSize = 20;
		var rect = this.itemRectForText(index);
		var x = rect.x;
		var y = itmW+rect.y+rect.height/2 - this.lineHeight() * 0.5;
		var w = rect.width -x - this.textPadding();

		if (bIsSynthSysActive){
			if (!this._wep._isSynthed){
				if (this._wep._level == this._wep._maxLvl){
					if (this._comList[index] == "Level Up"){			
						this.contents.paintOpacity = 125;
					} else if (this._comList[index] == "Refine"){
						this.contents.paintOpacity = 255;
					}
				} else {
					if (this._comList[index] == "Refine"){
						this.contents.paintOpacity = 125;
					}
				}	 
			} else{
				if (this._comList[index] == "Level Up" || this._comList[index] == "Refine"){
					this.contents.paintOpacity = 125;
				} else {
					this.contents.paintOpacity = 255;
				}
			}
		} else {
			if (this._wep._level == this._wep._maxLvl){
				if (this._comList[index] == "Level Up"){			
					this.contents.paintOpacity = 125;
				} else if (this._comList[index] == "Refine"){
					this.contents.paintOpacity = 255;
				}
			} else {
				if (this._comList[index] == "Refine"){
					this.contents.paintOpacity = 125;
				}
			}
		}

		this.drawText(this._comList[index],rect.x,rect.y,rect.width,'left');

		this.contents.paintOpacity = 255;
	};

	Window_ActionPane.prototype.updateHelp = function(){
		this._helpWindow.clear();
		this._helpWindow.setText(this._helpTxtList[this._index]);
	};

	Window_ActionPane.prototype.getWidth = function(){
		return this._w;
	}

	Window_ActionPane.prototype.processOk = function(){
		if (this._comList[this.index()] != "Cancel"){
			if (bIsSynthSysActive){
				if (!this._wep._isSynthed){
					if (this._wep._level == this._wep._maxLvl){
						if (this._comList[this._index] == "Level Up"){			
							SoundManager.playCancel();
							return;
						} else if (this._comList[this._index] == "Refine"){
							this._selection = this._comList[this._index];
							Window_Selectable.prototype.processOk.call(this);
						}
					} else {
						if (this._comList[this._index] == "Refine"){
							SoundManager.playCancel();
							return;
						}
					}	 
				} else{
					if (this._comList[this._index] == "Level Up" || this._comList[this._index] == "Refine"){
						SoundManager.playCancel();
						return;
					} else {
						this._selection = this._comList[this._index];
						Window_Selectable.prototype.processOk.call(this);
					}
				}
			} else {
				if (this._wep._level == this._wep._maxLvl){
					if (this._comList[this._index] == "Level Up"){			
						SoundManager.playCancel();
						return;
					} else if (this._comList[this._index] == "Refine"){
						this._selection = this._comList[this._index];
						Window_Selectable.prototype.processOk.call(this);
					}
				} else {
					if (this._comList[this._index] == "Refine"){
						SoundManager.playCancel();
						return;
					}
				}
			}

			this._selection = this._comList[this._index];
			Window_Selectable.prototype.processOk.call(this);
		} else{
			Window_Selectable.prototype.processCancel.call(this);
		}
	}


	Window_LevelUp.prototype = Object.create(Window_Selectable.prototype);
	Window_LevelUp.prototype.constructor = Window_LevelUp;

	Window_LevelUp.prototype.initialize = function(w,h,x,y){
		this._wID = 0;
		this._wep = null;
		this._xpCost = 0;
		this._goldCost = 0;
		this._h = h;
		this._lineHeight = this.lineHeight();

		this._rects = {};

		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	}

	Window_LevelUp.prototype.setWeapon = function(wID){
		this._wID = wID;
		this._wep = $gameParty.getWeapon(this._wID);
	}

	Window_LevelUp.prototype.prepareWindow = function(){
		this.setupCosts();
		this.setupCommands();
		this.setupRects();
	}

	Window_LevelUp.prototype.setupCosts = function(){
		var wepLevel = this._wep._level;

		this._xpCost = ~~eval(this._wep._expForm);
		this._goldCost = ~~eval(this._wep._goldForm);

		if (this._wep._refLevel != 0) {
			this._xpCost = Math.round(this._xpCost + (this._xpCost*(this._wep._refBonus * this._wep._refLevel)));
			this._goldCost = Math.round(this._goldCost + (this._goldCost*(this._wep._refBonus * this._wep._refLevel)));
		}
	}

	Window_LevelUp.prototype.setupCommands = function(){
		this._comList = ["OK","Cancel"];
	}

	Window_LevelUp.prototype.setupRects = function(){
		for (var i1 = 0; i1 < this._comList.length; i1++) { this.itemRectForText(i1); }
	}

	Window_LevelUp.prototype.getWeapon = function(){
		return this._wID;
	}

	Window_LevelUp.prototype.maxCols = function() { return 1; };
	Window_LevelUp.prototype.maxItems = function() { return this._comList ? this._comList.length : 1; };
	Window_LevelUp.prototype.itemHeight = function() { return 35; };	
	Window_LevelUp.prototype.numVisibleRows = function() { return 2; };
	Window_LevelUp.prototype.spacing = function() { return 8; };

	Window_LevelUp.prototype.drawItem = function(index) {
		this.drawReqs();
		this.drawActionItem(index);
	};

	Window_LevelUp.prototype.drawReqs = function(){
		this.contents.fontSize = 18;

		var x = 0;
		var y = 0;

		var xpLabel = "XP: " + this._xpCost;
		var gLabel = "G: " + this._goldCost;

		if (this._wep._exp < this._xpCost) { this.changeTextColor("#CF0C0C"); }

		this.drawText(xpLabel,x,y,this.textWidth(xpLabel),'left');

		this.resetTextColor();


		if ($gameParty.gold() < this._goldCost) { this.changeTextColor("#CF0C0C"); }

		this.drawText(gLabel,x,y+(this._lineHeight),this.textWidth(gLabel),'left');

		this.resetTextColor();
	}

	Window_LevelUp.prototype.drawActionItem = function(index){
		this.contents.fontSize = 20;
		var rect = this.getRect(index);

		var x = rect.x;
		var y = 0;

		if (index == 0) { y = this._h - (rect.y+rect.height*3); }
		else { y = this._h - (rect.y+rect.height); }

		var w = rect.width -x - this.textPadding();

		rect.y = y;

		this.updateRect(rect, index);

		if (index == 0 && (this._wep._exp < this._xpCost || $gameParty.gold() < this._goldCost)){
			this.contents.paintOpacity = 125;
		}

		this.drawText(this._comList[index],rect.x,y,rect.width,'left');

		this.contents.paintOpacity = 255;
	};

	Window_LevelUp.prototype.updateCursor = function() {
	    if (this._cursorAll) {
	        var allRowsHeight = this.maxRows() * this.itemHeight();
	        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
	        this.setTopRow(0);
	    } else if (this.isCursorVisible()) {
	        var rect = this.getRect(this.index());
	        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
	    } else {
	        this.setCursorRect(0, 0, 0, 0);
	    }
	};

	Window_LevelUp.prototype.hitTest = function(x, y) {
	    if (this.isContentsArea(x, y)) {
	        var cx = x - this.padding;
	        var cy = y - this.padding;
	        var topIndex = this.topIndex();
	        for (var i = 0; i < this.maxPageItems(); i++) {
	            var index = topIndex + i;
	            if (index < this.maxItems()) {
	                var rect = this.getRect(index);
	                var right = rect.x + rect.width;
	                var bottom = rect.y + rect.height;
	                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
	                    return index;
	                }
	            }
	        }
	    }
	    return -1;
	};

	Window_LevelUp.prototype.itemRect = function(index) {
	    var rect = new Rectangle();
	    var maxCols = this.maxCols();
	    rect.width = this.itemWidth();
	    rect.height = this.itemHeight();
	    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	    
	    return rect;
	};

	Window_LevelUp.prototype.itemRectForText = function(index) {
	    var rect = this.itemRect(index);
	    rect.x += this.textPadding();
	    rect.width -= this.textPadding() * 2;
	    
	    this._rects[index] = rect;
	};

	Window_LevelUp.prototype.getRect = function(index){
		return this._rects[index];
	}

	Window_LevelUp.prototype.updateRect = function(rect,index){
		this._rects[index] = rect;
	}

	Window_LevelUp.prototype.processOk = function(){
		if (this._comList[this.index()] != "Cancel"){
			if (this._index == 0 && (this._wep._exp < this._xpCost || $gameParty.gold() < this._goldCost)){
				SoundManager.playCancel();
			} else{
				//Remove costs
				$gameParty.loseGold(this._goldCost);
				this._wep.changeExp(-1*this._xpCost);

				if (this._wep._refLevel == 0){
					//Apply updates
					var newTraits = this._wep._lvlBonuses["traits"][this._wep._level];
					var newParams = this._wep._lvlBonuses["params"] || {};
					var newSParams = this._wep._lvlBonuses["sparams"] || {};
					var newEParams = this._wep._lvlBonuses["eparams"] || {};
					var newDurability = this._wep._lvlBonuses["dur"];

					var traits = {};
					var parm = {};

					for (var i1 = 0; i1 < this._wep._traits.length; i1++){
						traits[i1] = this._wep._traits[i1];
					}

					//For Base Parms
					for (var pId in newParams){
						if (newParams[pId][this._wep._level] != 0){
							this._wep._baseParams[pId] += newParams[pId][this._wep._level];
						}
					}

					//For Ex Parms
					for (var pId in newEParams){
						if (newEParams[pId][this._wep._level] != 0){
							this._wep._exParams[pId] += newEParams[pId][this._wep._level];
						}
					}

					//For SP Parms
					for (var pId in newSParams){
						if (newSParams[pId][this._wep._level] != 0){
							this._wep._spParams[pId] += newSParams[pId][this._wep._level];
						}
					}

					for (var nTId in newTraits){
						if (newTraits[nTId].code != 0 && newTraits[nTId].dataId != 0 && newTraits[nTId].value != 0){
							var bTraitExists = false;

							var trIcon = 0;
							var trName = "";
							var trChance = 0;

							for (var tId in traits){					
								if (traits[tId].code == newTraits[nTId].code && traits[tId].dataId == newTraits[nTId].dataId){
									this._wep._traits[tId].value += newTraits[nTId].value;							

									bTraitExists = true;
								}
							}

							if (!bTraitExists){
								var nTrait = {};

								nTrait['code'] = newTraits[nTId].code;
								nTrait['dataId'] = newTraits[nTId].dataId;
								nTrait['value'] = newTraits[nTId].value;

								this._wep._traits.push(nTrait);
							}
						}
					}

					this._wep._maxDur += newDurability[this._wep._level];
					this._wep._durability = this._wep._maxDur;
					
					this._wep.processFinalParams();
				}

				this._wep._level += 1;
				$gameParty.updateWeapon(this._wep,this._wep._id);

				Window_Selectable.prototype.processOk.call(this);
			}
		} else{
			Window_Selectable.prototype.processCancel.call(this);
		}
	}

	Window_PartyGold.prototype = Object.create(Window_Selectable.prototype);
	Window_PartyGold.prototype.constructor = Window_PartyGold;

	Window_PartyGold.prototype.initialize = function(w,h,x,y,gld){
		Window_Selectable.prototype.initialize.call(this,x,y,w,h);

		this._gold = gld;
	}

	Window_PartyGold.prototype.refresh = function(){
		this.contents.clear();
		this.drawItems();
	}

	Window_PartyGold.prototype.updateGold = function(){
		this._gold = $gameParty.gold();
	}

	Window_PartyGold.prototype.drawItems = function(){
		this.contents.fontSize = 22;
		var gLabel = "G:" + this._gold;
		this.drawText(gLabel,0,3,this.textWidth(gLabel),'left');
	}


	Window_Refine.prototype = Object.create(Window_Selectable.prototype);
	Window_Refine.prototype.constructor = Window_Refine;

	Window_Refine.prototype.initialize = function(w,h,x,y){
		this._wep = null;
		this._wID = 0;

		this._goldCost = 0;
		this._h = h;
		this._lineHeight = this.lineHeight();

		this._rects = {};

		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	}

	Window_Refine.prototype.setWeapon = function(wID){
		this._wID = wID;
		this._wep = $gameParty.getWeapon(this._wID);
	}

	Window_Refine.prototype.prepareWindow = function(){
		this.setupCosts();
		this.setupCommands();
		this.setupRects();
	}

	Window_Refine.prototype.setupCosts = function(){
		var wepLevel = this._wep._level;
		this._goldCost = ~~eval(this._wep._goldForm);

		if (this._wep._reLevel != 0) { this._goldCost = Math.round(((this._goldCost/2) + (this._goldCost*((this._wep._refBonus * this._wep._level) * (this._wep._refLevel/1.5))))/this._wep._refBonus); }
		else { this._goldCost = Math.round(((this._goldCost/2) + (this._goldCost*(this._wep._refBonus * this._wep._level)))/this._wep._refBonus); }		
	}

	Window_Refine.prototype.setupCommands = function(){
		this._comList = ["OK","Cancel"];
	}

	Window_Refine.prototype.setupRects = function(){
		for (var i1 = 0; i1 < this._comList.length; i1++) { this.itemRectForText(i1); }
	}

	Window_Refine.prototype.getWeapon = function(){
		return this._wep;
	}

	Window_Refine.prototype.maxCols = function() { return 1; };
	Window_Refine.prototype.maxItems = function() { return this._comList ? this._comList.length : 1; };
	Window_Refine.prototype.itemHeight = function() { return 35; };	
	Window_Refine.prototype.numVisibleRows = function() { return 2; };
	Window_Refine.prototype.spacing = function() { return 8; };

	Window_Refine.prototype.drawItem = function(index) {
		this.drawReqs();
		this.drawActionItem(index);
	};

	Window_Refine.prototype.drawReqs = function(){
		this.contents.fontSize = 18;

		var x = 0;
		var y = 0;

		var gLabel = "G: " + this._goldCost;

		if ($gameParty.gold() < this._goldCost) { this.changeTextColor("#CF0C0C"); }

		this.drawText(gLabel,x,y,this.textWidth(gLabel),'left');

		this.resetTextColor();
	}

	Window_Refine.prototype.drawActionItem = function(index){
		this.contents.fontSize = 20;
		var rect = this.getRect(index);

		var x = rect.x;
		var y = 0;

		if (index == 0) { y = this._h - (rect.y+rect.height*3); }
		else { y = this._h - (rect.y+rect.height); }

		var w = rect.width -x - this.textPadding();

		rect.y = y;

		this.updateRect(rect, index);

		if (index == 0 && ($gameParty.gold() < this._goldCost)){
			this.contents.paintOpacity = 125;
		}

		this.drawText(this._comList[index],rect.x,y,rect.width,'left');

		this.contents.paintOpacity = 255;
	};

	Window_Refine.prototype.updateCursor = function() {
	    if (this._cursorAll) {
	        var allRowsHeight = this.maxRows() * this.itemHeight();
	        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
	        this.setTopRow(0);
	    } else if (this.isCursorVisible()) {
	        var rect = this.getRect(this.index());
	        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
	    } else {
	        this.setCursorRect(0, 0, 0, 0);
	    }
	};

	Window_Refine.prototype.hitTest = function(x, y) {
	    if (this.isContentsArea(x, y)) {
	        var cx = x - this.padding;
	        var cy = y - this.padding;
	        var topIndex = this.topIndex();
	        for (var i = 0; i < this.maxPageItems(); i++) {
	            var index = topIndex + i;
	            if (index < this.maxItems()) {
	                var rect = this.getRect(index);
	                var right = rect.x + rect.width;
	                var bottom = rect.y + rect.height;
	                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
	                    return index;
	                }
	            }
	        }
	    }
	    return -1;
	};

	Window_Refine.prototype.itemRect = function(index) {
	    var rect = new Rectangle();
	    var maxCols = this.maxCols();
	    rect.width = this.itemWidth();
	    rect.height = this.itemHeight();
	    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	    
	    return rect;
	};

	Window_Refine.prototype.itemRectForText = function(index) {
	    var rect = this.itemRect(index);
	    rect.x += this.textPadding();
	    rect.width -= this.textPadding() * 2;
	    
	    this._rects[index] = rect;
	};

	Window_Refine.prototype.getRect = function(index){
		return this._rects[index];
	}

	Window_Refine.prototype.updateRect = function(rect,index){
		this._rects[index] = rect;
	}

	Window_Refine.prototype.processOk = function(){
		if (this._comList[this.index()] != "Cancel"){
			if (this._index == 0 && ($gameParty.gold() < this._goldCost)){
				SoundManager.playCancel();
			} else{
				$gameParty.loseGold(this._goldCost);			

				var traits = {};
				var parm = {};

				for (var i1 = 0; i1 < this._wep._traits.length; i1++){
					traits[i1] = this._wep._traits[i1];
				}

				//For Base Parms
				for (var pId in this._wep._baseParams){
					if (this._wep._baseParams[pId] != 0){
						if (this._wep._refLevel != 0) { this._wep._baseParams[pId] += Math.round(this._wep._baseParams[pId]*(this._wep._refBonus*this._wep._refLevel)); }
						else { this._wep._baseParams[pId] += Math.round(this._wep._baseParams[pId]*this._wep._refBonus); }
					}
				}

				//For Ex Parms
				for (var pId in this._wep._exParams){
					if (this._wep._exParams[pId] != 0){
						if (this._wep._refLevel != 0) { this._wep._exParams[pId] += Math.round(this._wep._exParams[pId]*(this._wep._refBonus*this._wep._refLevel)); }
						else { this._wep._exParams[pId] += Math.round(this._wep._exParams[pId]*this._wep._refBonus); }
					}
				}

				//For SP Parms
				for (var pId in this._wep._spParams){
					if (this._wep._spParams[pId] != 0){
						if (this._wep._refLevel != 0) { this._wep._spParams[pId] += Math.round(this._wep._spParams[pId]*(this._wep._refBonus*this._wep._refLevel)); }
						else { this._wep._spParams[pId] += Math.round(this._wep._spParams[pId]*this._wep._refBonus); }
					}
				}

				
				for (var tId in traits){
					if (this._wep._traits[tId].code == 13){					
						this._wep._traits[tId].value += this._wep._traits[tId].value*this._wep._refBonus;	

						if (this._wep._refLevel != 0) { this._wep._traits[tId].value += this._wep._traits[tId].value*(this._wep._refBonus*this._wep._refLevel); }
						else { this._wep._traits[tId].value += this._wep._traits[tId].value*this._wep._refBonus; }						
					}
				}					

				if (this._wep._refLevel != 0) { this._wep._maxDur += Math.round(this._wep._maxDur*(this._wep._refBonus*this._wep._refLevel)); }
				else { this._wep._maxDur += Math.round(this._wep._maxDur*this._wep._refBonus); }

				this._wep._durability = this._wep._maxDur;
				
				this._wep.processFinalParams();

				//Reset weapon values
				this._wep.changeExp(-1*this._wep._exp);
				this._wep._level = 1;
				this._wep._refLevel++;			

				//this.visible = false;

				$gameParty.updateWeapon(this._wep,this._wep._id);
			
				Window_Selectable.prototype.processOk.call(this);
			}
		} else{
			Window_Selectable.prototype.processCancel.call(this);
		}
	}


	Window_Synthesize.prototype = Object.create(Window_Selectable.prototype);
	Window_Synthesize.prototype.constructor = Window_Synthesize;

	Window_Synthesize.prototype.initialize = function(w,h,x,y){
		this._baseWep = null;
		this._bWID = 0;
		this._donorWep = null;
		this._dWID = 0;
		this._goldCost = 0;
		this._h = h;
		this._lineHeight = this.lineHeight();

		this._rects = {};

		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	}

	Window_Synthesize.prototype.setBaseWeapon = function(wID){
		this._bWID = wID;
		this._baseWep = $gameParty.getWeapon(this._bWID);
	}

	Window_Synthesize.prototype.setDonorWeapon = function (wID){
		this._dWID = wID;
		this._donorWep = $gameParty.getWeapon(this._dWID);
	}

	Window_Synthesize.prototype.prepareWindow = function(){
		this.setupCosts();
		this.setupCommands();
		this.setupRects();
	}

	Window_Synthesize.prototype.setupCosts = function(){
		var wepLevel = this._baseWep._level;

		this._goldCost = ~~(eval(this._baseWep._goldForm));

		if (this._baseWep._reLevel != 0) { this._goldCost = Math.round(((this._goldCost/2) + (this._goldCost*((this._baseWep._refBonus * this._baseWep._level) * (this._baseWep._refLevel/1.5))))/this._baseWep._refBonus); }
		else { this._goldCost = Math.round(((this._goldCost/2) + (this._goldCost*(this._baseWep._refBonus * this._baseWep._level)))/this._baseWep._refBonus); }	

		if (this._baseWep._refLevel != 0) {
			this._goldCost = Math.round((this._goldCost + (this._goldCost * (this._baseWep._refBonus * this._baseWep._refLevel))) * ((this._baseWep._level + this._donorWep._level + this._baseWep._refLevel + this._donorWep._refLevel)*this._baseWep._refBonus));
		} else{
			this._goldCost = Math.round((this._goldCost + (this._goldCost * (this._baseWep._level + this._donorWep._level))));
		}
	}

	Window_Synthesize.prototype.setupCommands = function(){
		this._comList = ["OK","Cancel"];
	}

	Window_Synthesize.prototype.setupRects = function(){
		for (var i1 = 0; i1 < this._comList.length; i1++) { this.itemRectForText(i1); }
	}

	Window_Synthesize.prototype.getWeapon = function(){
		return this._baseWeapon;
	}

	Window_Synthesize.prototype.maxCols = function() { return 1; };
	Window_Synthesize.prototype.maxItems = function() { return this._comList ? this._comList.length : 1; };
	Window_Synthesize.prototype.itemHeight = function() { return 35; };	
	Window_Synthesize.prototype.numVisibleRows = function() { return 2; };
	Window_Synthesize.prototype.spacing = function() { return 8; };

	Window_Synthesize.prototype.drawItem = function(index) {
		this.drawReqs();
		this.drawActionItem(index);
	};

	Window_Synthesize.prototype.drawReqs = function(){
		this.contents.fontSize = 18;

		var x = 0;
		var y = 0;

		var xpLabel = "XP: " + this._xpCost;
		var gLabel = "G: " + this._goldCost;


		if ($gameParty.gold() < this._goldCost) { this.changeTextColor("#CF0C0C"); }

		this.drawText(gLabel,x,y,this.textWidth(gLabel),'left');

		this.resetTextColor();
	}

	Window_Synthesize.prototype.drawActionItem = function(index){
		this.contents.fontSize = 20;
		var rect = this.getRect(index);

		var x = rect.x;
		var y = 0;

		if (index == 0) { y = this._h - (rect.y+rect.height*3); }
		else { y = this._h - (rect.y+rect.height); }

		var w = rect.width -x - this.textPadding();

		rect.y = y;

		this.updateRect(rect, index);

		if (index == 0 && ($gameParty.gold() < this._goldCost)){
			this.contents.paintOpacity = 125;
		}

		this.drawText(this._comList[index],rect.x,y,rect.width,'left');

		this.contents.paintOpacity = 255;
	};

	Window_Synthesize.prototype.updateCursor = function() {
	    if (this._cursorAll) {
	        var allRowsHeight = this.maxRows() * this.itemHeight();
	        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
	        this.setTopRow(0);
	    } else if (this.isCursorVisible()) {
	        var rect = this.getRect(this.index());
	        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
	    } else {
	        this.setCursorRect(0, 0, 0, 0);
	    }
	};

	Window_Synthesize.prototype.hitTest = function(x, y) {
	    if (this.isContentsArea(x, y)) {
	        var cx = x - this.padding;
	        var cy = y - this.padding;
	        var topIndex = this.topIndex();
	        for (var i = 0; i < this.maxPageItems(); i++) {
	            var index = topIndex + i;
	            if (index < this.maxItems()) {
	                var rect = this.getRect(index);
	                var right = rect.x + rect.width;
	                var bottom = rect.y + rect.height;
	                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
	                    return index;
	                }
	            }
	        }
	    }
	    return -1;
	};

	Window_Synthesize.prototype.itemRect = function(index) {
	    var rect = new Rectangle();
	    var maxCols = this.maxCols();
	    rect.width = this.itemWidth();
	    rect.height = this.itemHeight();
	    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	    
	    return rect;
	};

	Window_Synthesize.prototype.itemRectForText = function(index) {
	    var rect = this.itemRect(index);
	    rect.x += this.textPadding();
	    rect.width -= this.textPadding() * 2;
	    
	    this._rects[index] = rect;
	};

	Window_Synthesize.prototype.getRect = function(index){
		return this._rects[index];
	}

	Window_Synthesize.prototype.updateRect = function(rect,index){
		this._rects[index] = rect;
	}

	Window_Synthesize.prototype.processOk = function(){
		if (this._comList[this.index()] != "Cancel"){
			if (this._index == 0 && ($gameParty.gold() < this._goldCost)){
				SoundManager.playCancel();
			} else{
				//Remove costs
				$gameParty.loseGold(this._goldCost);
				this._baseWep.changeExp(-1*this._xpCost);

				//Apply updates
				var baseParams = this._baseWep._baseParams || {};
				var baseSParams = this._baseWep._spParams || {};
				var baseEParams = this._baseWep._exParams || {};

				var donorParams = this._donorWep._baseParams || {};
				var donorSParams = this._donorWep._spParams || {};
				var donorEParams = this._donorWep._exParams || {};

				var bTraits = {};
				var dTraits = {};
				var bParamExists = false;

				for (var i1 = 0; i1 < this._baseWep._traits.length; i1++){
					bTraits[i1] = this._baseWep._traits[i1];
				}

				for (var i1 = 0; i1 < this._donorWep._traits.length; i1++){
					dTraits[i1] = this._donorWep._traits[i1];
				}

				//For Base Parms
				for (var dPId in donorParams){
					for (var bPId in baseParams)
					if (donorParams[dPId] != 0 && baseParams[bPId] != 0 && bPId == dPId){
						this._baseWep._baseParams[bPId] += Math.round(donorParams[dPId]*0.15);

						bParamExists = true;
					}

					if (!bParamExists){
						if (donorParams[dPId] != 0){
							this._baseWep._baseParams[dPId] = Math.round(donorParams[dPid] * 0.3);
						}

						bParamExists = false;
					}
				}

				//For Ex Parms
				for (var dPId in donorEParams){
					for (var bPId in baseEParams)
					if (donorEParams[dPId] != 0 && baseEParams[bPId] != 0 && bPId == dPId){
						this._baseWep._exParams[bPId] += Math.round(donorEParams[dPId]*0.15);

						bParamExists = true;
					}

					if (!bParamExists){
						if (donorEParams[dPId] != 0){
							this._baseWep._exParams[dPId] = Math.round(donorEParams[dPid] * 0.3);
						}

						bParamExists = false;
					}
				}

				//For SP Parms
				for (var dPId in donorSParams){
					for (var bPId in baseSParams)
					if (donorSParams[dPId] != 0 && baseSParams[bPId] != 0 && bPId == dPId){
						this._baseWep._spParams[bPId] += Math.round(donorSParams[dPId]*0.15);

						bParamExists = true;
					}

					if (!bParamExists){
						if (donorSParams[dPId] != 0){
							this._baseWep._spParams[dPId] = Math.round(donorSParams[dPid] * 0.3);
						}

						bParamExists = false;
					}
				}

				for (var dTId in dTraits){
					if (dTraits[dTId].code != 0 && dTraits[dTId].dataId != 0 && dTraits[dTId].value != 0){
						var bTraitExists = false;

						var trIcon = 0;
						var trName = "";
						var trChance = 0;

						for (var bTId in bTraits){					
							if (bTraits[bTId].code == dTraits[dTId].code && bTraits[bTId].dataId == dTraits[dTId].dataId){
								this._baseWep._traits[bTId].value += dTraits[dTId].value * 0.15;							

								bTraitExists = true;
							}
						}

						if (!bTraitExists){
							var nTrait = {};

							nTrait['code'] = dTraits[dTId].code;
							nTrait['dataId'] = dTraits[dTId].dataId;
							nTrait['value'] = dTraits[dTId].value * 0.3;

							this._baseWep._traits.push(nTrait);
						}
					}
				}

				this._baseWep._maxDur += Math.round(this._donorWep._maxDur * 0.2);
				this._baseWep._durability = this._baseWep._maxDur;
				
				this._baseWep.processFinalParams();
				this._baseWep._level = this._baseWep._maxLvl;
				this._baseWep._refLevel += Math.round(this._donorWep._refLevel*1.5);

				$gameParty.removePartyWeapon(this._donorWep._id);
				this._baseWep._isSynthed = true;
				$gameParty.updateWeapon(this._baseWep,this._baseWep._id);
				Window_Selectable.prototype.processOk.call(this);	
			}
		} else{
			Window_Selectable.prototype.processCancel.call(this);
		}
	}


	Window_Repair.prototype = Object.create(Window_Selectable.prototype);
	Window_Repair.prototype.constructor = Window_Repair;

	Window_Repair.prototype.initialize = function(w,h,x,y){
		this._wID = 0;
		this._wep = null;
		this._goldCost = 0;
		this._h = h;
		this._lineHeight = this.lineHeight();

		this._rects = {};

		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	}

	Window_Repair.prototype.setWeapon = function(wID){
		this._wID = wID;
		this._wep = $gameParty.getWeapon(this._wID);
	}

	Window_Repair.prototype.prepareWindow = function(){
		this.setupCosts();
		this.setupCommands();
		this.setupRects();
	}

	Window_Repair.prototype.setupCosts = function(){
		var wepLevel = this._wep._level;

		this._goldCost = ~~eval(this._wep._goldForm);

		this._goldCost = Math.round((this._wep._level*(0.75*this._goldCost))/(0.65*this._wep._level))
	}

	Window_Repair.prototype.setupCommands = function(){
		this._comList = ["OK","Cancel"];
	}

	Window_Repair.prototype.setupRects = function(){
		for (var i1 = 0; i1 < this._comList.length; i1++) { this.itemRectForText(i1); }
	}

	Window_Repair.prototype.getWeapon = function(){
		return this._wID;
	}

	Window_Repair.prototype.maxCols = function() { return 1; };
	Window_Repair.prototype.maxItems = function() { return this._comList ? this._comList.length : 1; };
	Window_Repair.prototype.itemHeight = function() { return 35; };	
	Window_Repair.prototype.numVisibleRows = function() { return 2; };
	Window_Repair.prototype.spacing = function() { return 8; };

	Window_Repair.prototype.drawItem = function(index) {
		this.drawReqs();
		this.drawActionItem(index);
	};

	Window_Repair.prototype.drawReqs = function(){
		this.contents.fontSize = 18;

		var x = 0;
		var y = 0;

		var gLabel = "G: " + this._goldCost;


		if ($gameParty.gold() < this._goldCost) { this.changeTextColor("#CF0C0C"); }

		this.drawText(gLabel,x,y,this.textWidth(gLabel),'left');

		this.resetTextColor();
	}

	Window_Repair.prototype.drawActionItem = function(index){
		this.contents.fontSize = 20;
		var rect = this.getRect(index);

		var x = rect.x;
		var y = 0;

		if (index == 0) { y = this._h - (rect.y+rect.height*3); }
		else { y = this._h - (rect.y+rect.height); }

		var w = rect.width -x - this.textPadding();

		rect.y = y;

		this.updateRect(rect, index);

		if (index == 0 && ($gameParty.gold() < this._goldCost)){
			this.contents.paintOpacity = 125;
		}

		this.drawText(this._comList[index],rect.x,y,rect.width,'left');

		this.contents.paintOpacity = 255;
	};

	Window_Repair.prototype.updateCursor = function() {
	    if (this._cursorAll) {
	        var allRowsHeight = this.maxRows() * this.itemHeight();
	        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
	        this.setTopRow(0);
	    } else if (this.isCursorVisible()) {
	        var rect = this.getRect(this.index());
	        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
	    } else {
	        this.setCursorRect(0, 0, 0, 0);
	    }
	};

	Window_Repair.prototype.hitTest = function(x, y) {
	    if (this.isContentsArea(x, y)) {
	        var cx = x - this.padding;
	        var cy = y - this.padding;
	        var topIndex = this.topIndex();
	        for (var i = 0; i < this.maxPageItems(); i++) {
	            var index = topIndex + i;
	            if (index < this.maxItems()) {
	                var rect = this.getRect(index);
	                var right = rect.x + rect.width;
	                var bottom = rect.y + rect.height;
	                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
	                    return index;
	                }
	            }
	        }
	    }
	    return -1;
	};

	Window_Repair.prototype.itemRect = function(index) {
	    var rect = new Rectangle();
	    var maxCols = this.maxCols();
	    rect.width = this.itemWidth();
	    rect.height = this.itemHeight();
	    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	    
	    return rect;
	};

	Window_Repair.prototype.itemRectForText = function(index) {
	    var rect = this.itemRect(index);
	    rect.x += this.textPadding();
	    rect.width -= this.textPadding() * 2;
	    
	    this._rects[index] = rect;
	};

	Window_Repair.prototype.getRect = function(index){
		return this._rects[index];
	}

	Window_Repair.prototype.updateRect = function(rect,index){
		this._rects[index] = rect;
	}

	Window_Repair.prototype.processOk = function(){
		if (this._comList[this.index()] != "Cancel"){
			if (this._index == 0 && ($gameParty.gold() < this._goldCost)){
				SoundManager.playCancel();
			} else{
				//Remove costs
				$gameParty.loseGold(this._goldCost);

				this._wep._durability = this._wep._maxDur;
				$gameParty.updateWeapon(this._wep, this._wep._id);

				Window_Selectable.prototype.processOk.call(this);
			}
		} else{
			Window_Selectable.prototype.processCancel.call(this);
		}
	}
})();
