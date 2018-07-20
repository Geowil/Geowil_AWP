# Geowil_Bank Plugin
Version: 1.0.1

Demo Available: Yes, [Geowil_BankDemo.zip](http://lmpgames.com/RMMV/Plugins/Geowil_AWP_Demo_V1.0.0.zip)

Project Available: Yes, [Geowil_BankProject.zip](http://lmpgames.com/RMMV/Plugins/Geowil_AWP_Demo_ProjectV1.0.0.zip)

Conflicts: Maybe, see [Conflicts](https://github.com/Geowil/Geowil_AWP#conflicts) section

Terms of Use: Free non-commercially or commercially; just give credit

<p align="center"> 
    <img src=""/>
</p>


## What is this?
This repository contains a plugin for Rpg Maker MV which allows the developer to implement advanced weapon features.  It creates instance based weaponry which grows independently of the database weapon stats and cna produce unique weapons.


## Installation Instructions
First, create a backup copy of your rpg_objects file just in case then download the rpg_objects file from this repository.  This file only contains the classes required for this plugin.  Copy and paste them to the end of your rpg_objects file.

That's it!  Everything else takes place in the Geowil_AWP plugin file also located in this repository.  Download it and place it into your plugins folder.



## How does it work?
This plugin works by creating an instance of the weapons in the database.  It then uses these istances instead of the database weapon ids like MV normally does and any and all further interactions throughout the engine do the same thing.  At the Blacksmith, which is part of this plugin as well, a weapon can be level up using gold and collected exp from battle.  As a weapon levels up it can gain both additional parameters and traits based on a few note tag settings.  For more information continue to the features overview.



## Current Features Overview
### Features in V1.0

- Weapon Levels
    -This plugin creates instance based weaponry.  What does this even mean?  might come to your mind.  So, each weapon, when loaded from the database, is turned into a Game_InstanceWeapon upon either loading of a new game while the actors are being equipped or when new items are being added to the game party weapons list through event commands like a shop or the Change Party Weapons event.
    
    As your character fights enemies and gains exp, some or all of that exp is also transfered to their weapons.  You then spend this weapon EXP at a Blacksmith to increase your weapon's level.  As this is done level bonuses can be applied through a note tag on the weapon.  We will cover that later.  Once the weapon reaches its set maximum level other systems are used to improve it further.  
    
    Currently the only costs for any of the features is either gold and/or EXP.  In the future there may be an option to enable an item cost as well.


- Refinement System
    - The refinement system is an optional feature that allows a weapon that has reached its maximum level to be further improved.  Currently there is no maximum refine level setting though one may be added in the future.  As a weapon gains refinements it will gain a +# by its name for each refinement.  Upon refining a weapon its level is set back to 1 and all EXP is removed.  After this point the weapon will no longer gain level bonuses and the only way to improve the weapon's stats is through refining it which becomes progressively more expensive but also progressively increases the weapon's params and trait values.


- Synthesis System
    - The synthesis system allows you to drastically improve a weapon's power.  It works by taking any weapon of the same quality (read as same weapon and refine levels) and combines them. How params and traits are carried over depends on if those params or traits are new to the base weapon.  If they are, they are added at a rate of 30% of the value of the donor weapon. If they are not, then only 15% of the value is carried over but this still can be many times more than refinement depending on the refine bonus note tag setting.
    
    Once a weapon has been synthesized its level is set to the maximum level of the weapon and the refine level is increased through a formula.  Each time you synthesize a weapon, it will become much harder to synthesize it again and much more costly.  Currently any weapon can be synthesized at any time give the above constraints but eventually only weapons that have been refined at least once and that are at their maximum level will be allowed to be synthesized.

- Repair and Durability System
    - The repair and durability system is another optional system.  This one adds a durability system into the game what will damage a weapon when used in battle based on a multiplier set in the note tag.  Once a weapon's durability reaches 0, currently, all damage output from that weapon is reduced by 25%.  Eventually an option may be added that can either change the amount of damage to remove or to "break" the weapon ala-Dark Cloud.  Weapons can be repaired at a Blacksmith and currently the only cost is gold though an item cost may be an additional option in the future.


### Parameters
There are a total of six plugin parameters to customize the plugin with.  I will list them and their functions.

- Param Increase Color
    - Sets the color used when parameters are increased, traits are added, or trait values are increased.

- Param Decrease Color
    - Sets the color used when parameters are decreased, traits are removed, or trait values are decreased.

- Refine System
    - The refine system allows a weapon to be further improved after it has reached its maximum level.  

- Synthesis System
    - When on allows a weapons to be combined if they are the same refine and level, increasing stats drastically.

- Repair and Durability System
    - When enabled cause weapons to degrade every time they are used in battle and enables repair functionality.

- Enable Extended Params
    - When on shows all 28 params in the BS stat window else shows only 12 of the most commonly used params.
    
    

###Plugin Commands
#### Opening the Blacksmith
Use this plugin command to open the Blacksmith window.  Nothing fancy:

```
BSOpen
```

####Toggle the Refinement System
This plugin command allows you to turn On or Off the refine system:

```
AWP RefineSystem On/Off
```

####Toggle the Synthesis System
This plugin command allows you to turn On or Off the synthesis system:

```
AWP SynthesisSystem On/Off
```

####Toggle the Durability and Repair System
This plugin command allows you to turn On or Off the weapon durability and repair system:

```
AWP DurabilitySystem On/Off
```

####Toggle the Extended Parameters
This pugin command allows you to show or hide the extended list of parameters in the weapon status window of the Blacksmith scene.  Note that on level up, refine, or synthesis these stats show up even when this setting is turned off or the Off plugin command has been called:

```
AWP ExtendedParams On/Off 
```



## Weapon Note Tag
A note tag is required for this plugin though some of the attributes are optional if you have disabled some of the systems.  Here is a break down of each attribute and at the end will be a full tag example.

<AWP>|</AWP> - this defines the beginning an end of the tag for the AWP so that any other note tags in the weapon tag box do not interfere with the AWP.  All other tag attributes must be placed between these.

MaxLvl:# - This attribute defines the maximum level for the weapon.  This can be any value but please bear in mind that the exp and gold formulas use this value so if you set a level above 80 be sure to account for this in those attributes to prevent astronomical upgrade costs.

DefDur:# - This attribute sets the default max durability of the weapon.  If you have the durability system enabled this is required.

DurDmg:# - This attribute sets the amount of damage a wepaon will sustain when attacking when the durability system is turned on.  It is therefore required if you use that system but can be left out if you don't.

ExpForm:175 * Math.pow(wepLevel+1, 1.25) - This formula sets the base exp cost for refining and leveling weapons. Please note that the 'wepLevel' variable should be included if you make changes to ensure that your costs remain progressive.

GoldForm:(((175 + (1.25 * (2 * (wepLevel+1 + 65)))) * Math.pow(wepLevel+1,1.25))) - This formula sets the base gold cost for refining and leveling weapons. Please note that the 'wepLevel' variable should be included if you make changes to ensure that your costs remain progressive.

Param:#:#-n - this attribute is used to set parameter level bonuses.  Ensure that you have values for every level for your weapon or crashes may occur.  '#' is the parameter number (you can find a list of these numbers defined under Game_BattlerBase).

This is followed by a comma-delimited list of how much that parameter should be increased per level where the position of that value in the list is the level the increase occurs on.
Example:

```
Param:0:10,0,10,0,25
```
This example shows a weapon with a max level of 5 which increases the maximum hp of the actor by 10 hp on WLV 1, by 10 again on WLV 3, and then by an additional 25 on WLV 5.  Any actor with this weapon equipped while it is at Weapon Level 5 will get an additional 45 health.
     
EParam:#:#-n - this attribute is used to set extended parameter level bonuses.  Ensure that you have values for every level for your weapon or crashes may occur.  '#' is the parameter number (you can find a list of these numbers defined under Game_BattlerBase). This is followed by a comma-delimited list of how much that parameter should be increased per level where the position of that value in the list is the level the increase occurs on.

Example:
```
EParam:0:10,0,10,0,25
```

This example shows a weapon with a max level of 5 which increases the hit rate of the actor by 10 hp on WLV 1, by 10 again on WLV 3, and then by an additional 25 on WLV 5.  Any actor with this weapon equipped while it is at Weapon Level 5 will get an additional 45 hit rate.

SParam:#:#-n - this attribute is used to set special parameter level bonuses.  Ensure that you have values for every level for your weapon or crashes may occur. '#' is the parameter number (you can find a list of these numbers defined under Game_BattlerBase). This is followed by a comma-delimited list of how much that parameter should be increased per level where the position of that value in the list is the level the increase occurs on.

Example:
```
SParam:0:10,0,10,0,25
```

This example shows a weapon with a max level of 5 which increases the target rate of the actor by 10 hp on WLV 1, by 10 again on WLV 3, and then by an additional 25 on WLV 5.  Any actor with this weapon equipped while it is at Weapon Level 5 will get an additional 45 target rate.

LvlTraitCodes:#-n - This attribute is one of three which are required for adding traits to weapons at a particular level.  This one defines what kind of trait you are adding.  I will be compiling a complete list of the trait codes for use with this plugin to help in  setting up these level bonuses.  To define more than one trait at a level, separate each code with a -.

Here is an example:
```
LvlTraitCodes:0,13,0,0,13-13
```

The above example uses our max level 5 weapon again.  It indicated that we are adding a State type trait at WLV2 and two more on WLV 5.  The next attributes will determine the exact states that will be added and the values for those states.

LvlTraitIds:#-n - This attribute defines the trait within the trait category defined in LvlTraitCode to be added at each level.  Ensure that you are matching the position of these values to the position of the codes from LvlTraitIds. In many cases, these IDs will correspond to the values you see in the database for that particular trait object; ie the value next to a state in the State tab is the id you will place here for a type 13 trait.

Consider this example:
```
LevelTraitIds:0,4,0,0,7-10
```

In the above example we are adding the Poison state at WLV 2 and the Rage and Sleep states at WLV 5.  The effective hit rate for these state traits will be defined next. LvlTraitVals:#-n - This attribute defines the rates at which any trait will be applied.  Note that these should always be a decimal value between -1.0 and 1.0 unless you intend a more than 100% increase or decrease.  Some specific trait types may use the actual values or a 0 or 1 flag.  These specific cases will be outlined in the Trait Sheet I will be developing.

Consider this example:
```
LvlTraitVals:0,0.04,0,0,0.15-0.43
```

The above example now sets the rates at which our traits are likely to hit enemies.  Our Poison trait has a 4% change of affecting the target while the Rage trait has a 15% change and the Sleep trait has a 43% chance. If these traits already exist on the weapon, the trait value is increased by the amount designated in LvlTraitVals.  If they do not exist then the trait is added at the specified value.

DurInc:#-n - This attribute sets how much the durability of a weapon is increased at each level.  If you have the durability system enabled this is required.

Example:
```
DurInc:5,2,7,6,14
```

RefBonusRate:# - This attribute sets a value which is used throughout the refine system.  It is used for increasing the value of params and traits during refines, is used in determining refine costs, and other areas when the refine system is enabled, which means it is required if this system is enabled.

Below is an example tag using the examples from above so that you can see the full structure:
```
<AWP>
MaxLevel:5
DefDur:10
DurDmg:0.02
ExpForm:175 * Math.pow(wepLevel+1, 1.25)
GoldForm:(((175+(1.25*(2*(wepLevel+1+65))))*Math.pow(wepLevel+1,1.25)))
Param:0:10,0,10,0,25
Param:2:5,2,2,1,10
Param:7:1,2,1,0,5
EParam:0:10,0,10,0,25
EParam:6:2,6,4,1,4
SParam:7:10,0,0,15,20
LvlTraitCodes:0,13,0,13,13-13-13
LevelTraitIds:0,4,0,5,5-7-10
LvlTraitVals:0,0.04,0,0.25,0.10-0.15-0.43
DurInc:5,2,7,6,14
RefBonusRate:0.15
</AWP>
```

## Planned Features
- Ability to "break" weapons that reach 0 durability
- Ability to limit exp gain on weapons
- Custom name entry for synthesized weapons
- Support for dual wield weapons
- Trait Code Breakdown excel document
- Ability to limit synthesizing only to weapons at max level with at least 1 refine level



## Conflicts
Anything that aliases or overrides any of the following functions will likely conflict with this plugin without any integration work:

 - DataManager.createGameObjects
 - DataManager.makeSaveContents
 - DataManager.extractSaveContents
 - DataManager.isWeapon
 - Game_BattlerBase.prototype.traits
 - Game_BattlerBase.prototype.traitsWithId
 - Game_BattlerBase.prototype.canEquipWeapon
 - Game_BattlerBase.prototype.canEquipArmor
 - Game_BattlerBase.prototype.allTraits
 - Game_Actor.prototype.initEquips
 - Game_Actor.prototype.equips
 - Game_Actor.prototype.discardEquip
 - Game_Actor.prototype.releaseUnequippableItems
 - Game_Actor.prototype.paramPlus
 - Game_Actor.prototype.calcEquipItemPerformance
 - Game_Actor.prototype.gainExp
 - Game_Actor.prototype.changeExp
 - Game_Actor.prototype.forceChangeEquip
 - Game_Actor.prototype.changeEquip
 - Game_Actor.prototype.performAttack
 - Game_Actor.prototype.tradeItemWithParty
 - Game_Actor.prototype.clearEquipments
 - Game_Actor.prototype.optimizeEquipments
 - Game_Actor.prototype.bestEquipItem
 - Game_Actor.prototype.calcEquipItemPerformance
 - Game_Action.prototype.apply
 - Scene_Load.prototype.onLoadSuccess
 - Window_Base.prototype.drawItemName
 - Window_EquipItem.prototype.includes
 - Window_EquipItem.prototype.updateHelp
 - Game_Party.prototype.hasItem
 - Game_Party.prototype.numItems
 - Game_Party.prototype.initAllItems
 - Game_Party.prototype.gainItem
 - Game_Interpreter.prototype.pluginCommand
 
 
 
## Version Changelog
- Version 1.0.0 Changelog:
  - Initial version of plugin uploaded?
