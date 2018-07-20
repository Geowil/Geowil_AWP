/*
    Classes for instance weapons for Geowil_AWP
*/
function Game_InstanceWeaponHandler(){
    this.initialize.apply(this,arguments);
};

//Game_InstanceWeaponHandler.prototype = Object.create(Object.prototype);
Game_InstanceWeaponHandler.prototype.constructor = Game_InstanceWeaponHandler;

Object.defineProperties(Game_InstanceWeaponHandler.prototype,{
    partyWeaps: { get function() { return this._partyWeapons; }, configurable: true},
    actorWeaps: { get function() { return this._actorWeapons; }, configurable: true}
});

Game_InstanceWeaponHandler.prototype.initialize = function(){
    this.initMembers();
}

Game_InstanceWeaponHandler.prototype.initMembers = function(){
    this._partyWeapons = {};
    this._actorWeapons = {};
}

Game_InstanceWeaponHandler.prototype.createSaveContents = function(){
    var wpID = 0;

    for (var aID in $gameActors._data){
        if (aID != 0){
            var actor = $gameActors._data[aID];
            this._actorWeapons[wpID] = {};

            var baseParams = this.genParams(actor._equips[0]._baseParams);
            var addParams = this.genParams(actor._equips[0]._addParams);
            var exParams = this.genParams(actor._equips[0]._exParams);
            var spParams = this.genParams(actor._equips[0]._spParams);
            var finalParams = this.genParams(actor._equips[0]._finalParams);
            var traits = this.genTraits(actor._equips[0]._traits);
            var lvlBonuses = this.genLvBonuses(actor._equips[0]._lvlBonuses);

            this._actorWeapons[wpID]['id'] = actor._equips[0]._id;
            this._actorWeapons[wpID]['name'] = actor._equips[0]._name;
            this._actorWeapons[wpID]['description'] = actor._equips[0]._description;
            this._actorWeapons[wpID]['baseParams'] = baseParams;
            this._actorWeapons[wpID]['addParams'] = addParams;
            this._actorWeapons[wpID]['finalParams'] = finalParams
            this._actorWeapons[wpID]['spParams'] = spParams;
            this._actorWeapons[wpID]['exParams'] = exParams;
            this._actorWeapons[wpID]['iType'] = actor._equips[0]._iType;
            this._actorWeapons[wpID]['wType'] = actor._equips[0]._wType;
            this._actorWeapons[wpID]['slotId'] = 0;
            this._actorWeapons[wpID]['icon'] = actor._equips[0]._icon;
            this._actorWeapons[wpID]['traits'] = traits;
            this._actorWeapons[wpID]['note'] = actor._equips[0]._note;
            this._actorWeapons[wpID]['price'] = actor._equips[0]._price;
            this._actorWeapons[wpID]['level'] = actor._equips[0]._level;
            this._actorWeapons[wpID]['exp'] = actor._equips[0]._exp;
            this._actorWeapons[wpID]['durability'] = actor._equips[0]._durability;
            this._actorWeapons[wpID]["lvlBonuses"] = lvlBonuses;
            this._actorWeapons[wpID]["maxLvl"] = actor._equips[0]._maxLvl;
            this._actorWeapons[wpID]["maxDur"] = actor._equips[0]._maxDur;
            this._actorWeapons[wpID]["expForm"] = actor._equips[0]._expForm;
            this._actorWeapons[wpID]["goldForm"] = actor._equips[0]._goldForm;
            this._actorWeapons[wpID]["refLvl"] = actor._equips[0]._refLevel;
            this._actorWeapons[wpID]["refBonus"] = actor._equips[0]._refBonus;
            this._actorWeapons[wpID]["isSynthed"] = actor._equips[0]._isSynthed;
            this._actorWeapons[wpID]["durDmg"] = actor._equips[0]._durDmg;
            this._actorWeapons[wpID]["actID"] = actor._actorId;
            wpID += 1;
        }
    }

   for (var pWID in $gameParty._weapons){
        var gPWeapon = $gameParty._weapons[pWID];
        this._partyWeapons[pWID] = {};

        var baseParams = this.genParams(gPWeapon._baseParams);
        var addParams = this.genParams(gPWeapon._addParams);
        var exParams = this.genParams(gPWeapon._exParams);
        var spParams = this.genParams(gPWeapon._spParams);
        var finalParams = this.genParams(gPWeapon._finalParams);
        var traits = this.genTraits(gPWeapon._traits);
        var lvlBonuses = this.genLvBonuses(gPWeapon._lvlBonuses);

        
        this._partyWeapons[pWID]['id'] = gPWeapon._id;
        this._partyWeapons[pWID]['name'] = gPWeapon._name;
        this._partyWeapons[pWID]['description'] = gPWeapon._description;
        this._partyWeapons[pWID]['baseParams'] = baseParams;
        this._partyWeapons[pWID]['addParams'] = addParams;
        this._partyWeapons[pWID]['finalParams'] = finalParams
        this._partyWeapons[pWID]['spParams'] = spParams;
        this._partyWeapons[pWID]['exParams'] = exParams;
        this._partyWeapons[pWID]['iType'] = gPWeapon._iType;
        this._partyWeapons[pWID]['wType'] = gPWeapon._wType;
        this._partyWeapons[pWID]['slotId'] = 0;
        this._partyWeapons[pWID]['icon'] = gPWeapon._icon;
        this._partyWeapons[pWID]['traits'] = traits;
        this._partyWeapons[pWID]['note'] = gPWeapon._note;
        this._partyWeapons[pWID]['price'] = gPWeapon._price;
        this._partyWeapons[pWID]['level'] = gPWeapon._level;
        this._partyWeapons[pWID]['exp'] = gPWeapon._exp;
        this._partyWeapons[pWID]['durability'] = gPWeapon._durability;
        this._partyWeapons[pWID]["lvlBonuses"] = lvlBonuses;
        this._partyWeapons[pWID]["maxLvl"] = gPWeapon._maxLvl;
        this._partyWeapons[pWID]["maxDur"] = gPWeapon._maxDur;
        this._partyWeapons[pWID]["expForm"] = gPWeapon._expForm;
        this._partyWeapons[pWID]["goldForm"] = gPWeapon._goldForm;
        this._partyWeapons[pWID]["refLvl"] = gPWeapon._refLevel;
        this._partyWeapons[pWID]["refBonus"] = gPWeapon._refBonus;
        this._partyWeapons[pWID]["isSynthed"] = gPWeapon._isSynthed;
        this._partyWeapons[pWID]["durDmg"] = gPWeapon._durDmg;
    }
}

Game_InstanceWeaponHandler.prototype.genParams = function(pList){
    var params = {};

    for (var i1 = 0; i1 < pList.length; i1++){
        params[i1] = pList[i1];
    }

    return params;
}

Game_InstanceWeaponHandler.prototype.genTraits = function(traits){
    var rtnTraits = {};

    for (var i1 = 0; i1 < traits.length; i1++){
        var newTrait = {};

        newTrait.code = traits[i1].code;
        newTrait.dataId = traits[i1].dataId;
        newTrait.value = traits[i1].value;

        rtnTraits[i1] = newTrait;
    }

    return rtnTraits;
}

Game_InstanceWeaponHandler.prototype.genLvBonuses = function(bonuses){
    var lvBonuses = {};

    var dur = {};
    var eParms = {};
    var parms = {};
    var sParms = {};
    var traits = {};

    if (Object.keys(bonuses).length > 0){
        Object.keys(bonuses).forEach(function(bonus){
            //dur
            if (bonus == "dur"){
                var valList = {};

                for (var i1 = 0; i1 < bonuses[bonus].length; i1++){
                    valList[i1] = bonuses[bonus][i1];
                }

                dur = valList;
            }

            //eparams
            else if(bonus == "eparams"){
                Object.keys(bonuses[bonus]).forEach(function(parmID){
                    var valList = {};

                    var vList = bonuses[bonus][parmID];

                    for (var i1 = 0; i1 < vList.length; i1++){
                        valList[i1] = vList[i1];
                    }

                    eParms[parmID] = valList;
                });
            }

            //params
            else if (bonus == "params"){
                Object.keys(bonuses[bonus]).forEach(function(parmID){
                    var valList = {};

                    var vList = bonuses[bonus][parmID];

                    for (var i1 = 0; i1 < vList.length; i1++){
                        valList[i1] = vList[i1];
                    }

                    parms[parmID] = valList;
                });
            } 

            //sparams
            else if (bonus == "sparams"){
                Object.keys(bonuses[bonus]).forEach(function(parmID){
                    var valList = {};

                    var vList = bonuses[bonus][parmID];

                    for (var i1 = 0; i1 < vList.length; i1++){
                        valList[i1] = vList[i1];
                    }

                    sParms[parmID] = valList;
                });
            }

            //traits
            else if (bonus == "traits"){
                var lvl = {};
                for (var i1 = 0; i1 < bonuses[bonus].length;i1++){                
                    var tArray = bonuses[bonus][i1];
                    var traits2 = {};

                    for (var i2 = 0; i2 < tArray.length;i2++){
                        var newTrait = {};

                        newTrait.code = tArray[i2].code;
                        newTrait.dataId = tArray[i2].dataId;
                        newTrait.value = tArray[i2].value;

                        traits2[i2] = newTrait;
                    }

                    lvl[i1] = traits2;
                }

                traits = lvl;
            }       
        });

        lvBonuses["dur"] = dur;
        lvBonuses["eparams"] = eParms;
        lvBonuses["params"] = parms;
        lvBonuses["sparams"] = sParms;
        lvBonuses["traits"] = traits;
    }

    return lvBonuses;
}

Game_InstanceWeaponHandler.prototype.processLoadContents = function(){
    var actorWeaps = this._actorWeapons;
    var partyWeaps = this._partyWeapons;

    $gameParty._weapons = [];

    for (var actWep in actorWeaps){
        var actor = $gameActors.actor([actorWeaps[actWep]['actID']]);
        var sId = actorWeaps[actWep]['slotId'];
        var actWeapon = new Game_InstanceWeapon();

        var baseParams = this.decodeParam(actorWeaps[actWep]['baseParams']);
        var addParams = this.decodeParam(actorWeaps[actWep]['addParams']);
        var exParams = this.decodeParam(actorWeaps[actWep]['exParams']);
        var spParams = this.decodeParam(actorWeaps[actWep]['spParams']);
        var finalParams = this.decodeParam(actorWeaps[actWep]['finalParams']);
        var lvlBonuses = this.decodeLvBonuses(actorWeaps[actWep]["lvlBonuses"]);
        var traits = this.decodeTraits(actorWeaps[actWep]['traits']);

        actWeapon._id = actorWeaps[actWep]['id'];
        actWeapon._name = actorWeaps[actWep]['name'];
        actWeapon._description = actorWeaps[actWep]['description'];
        actWeapon._baseParams = baseParams;
        actWeapon._addParams = addParams;
        actWeapon._finalParams = finalParams;
        actWeapon._spParams = spParams;
        actWeapon._exParams = exParams;
        actWeapon._iType = actorWeaps[actWep]['iType'];
        actWeapon._wType = actorWeaps[actWep]['wType'];
        actWeapon._icon = actorWeaps[actWep]['icon'];
        actWeapon._traits = traits;
        actWeapon._note = actorWeaps[actWep]['note'];
        actWeapon._price = actorWeaps[actWep]['price'];
        actWeapon._level = actorWeaps[actWep]['level'];
        actWeapon._exp = actorWeaps[actWep]['exp'];
        actWeapon._durability = actorWeaps[actWep]['durability'];
        actWeapon._lvlBonuses = lvlBonuses;
        actWeapon._maxLvl = actorWeaps[actWep]["maxLvl"];
        actWeapon._maxDur = actorWeaps[actWep]["maxDur"];
        actWeapon._expForm = actorWeaps[actWep]["expForm"];
        actWeapon._goldForm = actorWeaps[actWep]["goldForm"];
        actWeapon._refLevel = actorWeaps[actWep]["refLvl"];
        actWeapon._refBonus = actorWeaps[actWep]["refBonus"];
        actWeapon._isSynthed = actorWeaps[actWep]["isSynthed"];
        actWeapon._durDmg = actorWeaps[actWep]["durDmg"];

        actor._equips[sId] = actWeapon;
    }

    for (var pWep in partyWeaps){
        var prtyWeapon = new Game_InstanceWeapon();

        var baseParams = this.decodeParam(partyWeaps[pWep]['baseParams']);
        var addParams = this.decodeParam(partyWeaps[pWep]['addParams']);
        var exParams = this.decodeParam(partyWeaps[pWep]['exParams']);
        var spParams = this.decodeParam(partyWeaps[pWep]['spParams']);
        var finalParams = this.decodeParam(partyWeaps[pWep]['finalParams']);
        var lvlBonuses = this.decodeLvBonuses(partyWeaps[pWep]["lvlBonuses"]);
        var traits = this.decodeTraits(partyWeaps[pWep]['traits']);

        prtyWeapon._id = partyWeaps[pWep]['id'];
        prtyWeapon._actId = [partyWeaps[pWep]['actID']];
        prtyWeapon._slotId = [partyWeaps[pWep]['slotId']];
        prtyWeapon._name = partyWeaps[pWep]['name'];
        prtyWeapon._description = partyWeaps[pWep]['description'];
        prtyWeapon._baseParams = baseParams;
        prtyWeapon._addParams = addParams;
        prtyWeapon._finalParams = finalParams;
        prtyWeapon._spParams = spParams;
        prtyWeapon._exParams = exParams;
        prtyWeapon._iType = partyWeaps[pWep]['iType'];
        prtyWeapon._wType = partyWeaps[pWep]['wType'];
        prtyWeapon._icon = partyWeaps[pWep]['icon'];
        prtyWeapon._traits = traits;
        prtyWeapon._note = partyWeaps[pWep]['note'];
        prtyWeapon._price = partyWeaps[pWep]['price'];
        prtyWeapon._level = partyWeaps[pWep]['level'];
        prtyWeapon._exp = partyWeaps[pWep]['exp'];
        prtyWeapon._durability = partyWeaps[pWep]['durability'];
        prtyWeapon._lvlBonuses = lvlBonuses;
        prtyWeapon._maxLvl = partyWeaps[pWep]["maxLvl"];
        prtyWeapon._maxDur = partyWeaps[pWep]["maxDur"];
        prtyWeapon._expForm = partyWeaps[pWep]["expForm"];
        prtyWeapon._goldForm = partyWeaps[pWep]["goldForm"];
        prtyWeapon._refLevel = partyWeaps[pWep]["refLvl"];
        prtyWeapon._refBonus = partyWeaps[pWep]["refBonus"];
        prtyWeapon._isSynthed = partyWeaps[pWep]["isSynthed"];
        prtyWeapon._durDmg = partyWeaps[pWep]["durDmg"];

        $gameParty._weapons.push(prtyWeapon);
    }
}

Game_InstanceWeaponHandler.prototype.decodeParam = function(parms){
    var parmList = [];

    Object.keys(parms).forEach(function(pID){
        parmList.push(parms[pID]);
    });

    return parmList;
}

Game_InstanceWeaponHandler.prototype.decodeTraits = function(traits){
    var rtnTraits = [];

    Object.keys(traits).forEach(function(tID){        
        var newTrait = {};

        newTrait.code = traits[tID].code;
        newTrait.dataId = traits[tID].dataId;
        newTrait.value = traits[tID].value;                                 

        rtnTraits.push(newTrait);        
    });

    return rtnTraits;
}

Game_InstanceWeaponHandler.prototype.decodeLvBonuses = function(bonuses){
    var lvlBonuses = {};

    var dur = [];
    var eParms = {};
    var parms = {};
    var sParms = {};
    var traits = [];

    if (Object.keys(bonuses).length > 0){
        Object.keys(bonuses).forEach(function(bonus){
            if (bonus == "dur"){
                Object.keys(bonuses[bonus]).forEach(function(lvl){
                    dur.push(bonuses[bonus][lvl]);
                });
            }

            else if (bonus == "eparams"){
                Object.keys(bonuses[bonus]).forEach(function(paramID){
                    eParms[paramID] = {};

                    Object.keys(bonuses[bonus][paramID]).forEach(function(lvl){
                        eParms[paramID][lvl] = bonuses[bonus][paramID][lvl];
                    });
                });
            }

            else if (bonus == "params"){
                Object.keys(bonuses[bonus]).forEach(function(paramID){
                    parms[paramID] = {};

                    Object.keys(bonuses[bonus][paramID]).forEach(function(lvl){
                        parms[paramID][lvl] = bonuses[bonus][paramID][lvl];
                    });
                });
            }

            else if (bonus == "sparams"){
                Object.keys(bonuses[bonus]).forEach(function(paramID){
                    sParms[paramID] = {};

                    Object.keys(bonuses[bonus][paramID]).forEach(function(lvl){
                        sParms[paramID][lvl] = bonuses[bonus][paramID][lvl];
                    });
                });
            }

            else if (bonus == "traits"){
                Object.keys(bonuses[bonus]).forEach(function(lvl){
                    var newLvl = [];

                    var x = 0;
                    Object.keys(bonuses[bonus][lvl]).forEach(function(traitList){
                        var newTrait = {};

                        newTrait.code = bonuses[bonus][lvl][traitList].code;
                        newTrait.dataId = bonuses[bonus][lvl][traitList].dataId;
                        newTrait.value = bonuses[bonus][lvl][traitList].value;

                                              

                        newLvl.push(newTrait);
                    });                    
                    
                    traits.push(newLvl);
                });
            }
        });
    }

    lvlBonuses["dur"] = dur;
    lvlBonuses["eparams"] = eParms;
    lvlBonuses["params"] = parms;
    lvlBonuses["sparams"] = sParms;
    lvlBonuses["traits"] = traits;

    return lvlBonuses;
}


function Game_InstanceWeapon(){
    this.initialize.apply(this,arguments);
};

//Game_InstanceWeapon.prototype = Object.create(Object.prototype);
Game_InstanceWeapon.prototype.constructor = Game_InstanceWeapon;

Object.defineProperties(Game_InstanceWeapon.prototype,{
    mhp: { get: function() { return this.finalParams(0); }, configurable: true }, // Maximum Hit Points
    mmp: { get: function() { return this.finalParams(1); }, configurable: true }, // Maximum Magic Points
    atk: { get: function() { return this.finalParams(2); }, configurable: true }, // ATtacK power
    def: { get: function() { return this.finalParams(3); }, configurable: true }, // DEFense power
    mat: { get: function() { return this.finalParams(4); }, configurable: true }, // Magic ATtack power
    mdf: { get: function() { return this.finalParams(5); }, configurable: true }, // Magic DeFense power
    agi: { get: function() { return this.finalParams(6); }, configurable: true }, // AGIlity
    luk: { get: function() { return this.finalParams(7); }, configurable: true }, // LUcK
    hit: { get: function() { return this.exParams(0); }, configurable: true }, // HIT rate
    eva: { get: function() { return this.exParams(1); }, configurable: true }, // EVAsion rate
    cri: { get: function() { return this.exParams(2); }, configurable: true }, // CRItical rate
    cev: { get: function() { return this.exParams(3); }, configurable: true }, // Critical EVasion rate
    mev: { get: function() { return this.exParams(4); }, configurable: true }, // Magic EVasion rate
    mrf: { get: function() { return this.exParams(5); }, configurable: true }, // Magic ReFlection rate
    cnt: { get: function() { return this.exParams(6); }, configurable: true }, // CouNTer attack rate
    hrg: { get: function() { return this.exParams(7); }, configurable: true }, // Hp ReGeneration rate
    mrg: { get: function() { return this.exParams(8); }, configurable: true }, // Mp ReGeneration rate
    trg: { get: function() { return this.exParams(9); }, configurable: true }, // Tp ReGeneration rate
    tgr: { get: function() { return this.spParams(0); }, configurable: true }, // TarGet Rate
    grd: { get: function() { return this.spParams(1); }, configurable: true }, // GuaRD effect rate // GuaRD effect rate
    rec: { get: function() { return this.spParams(2); }, configurable: true }, // RECovery effect rate
    pha: { get: function() { return this.spParams(3); }, configurable: true }, // PHArmacology
    mcr: { get: function() { return this.spParams(4); }, configurable: true }, // Mp Cost Rate
    tcr: { get: function() { return this.spParams(5); }, configurable: true }, // Tp Charge Rate
    pdr: { get: function() { return this.spParams(6); }, configurable: true }, // Physical Damage Rate
    mdr: { get: function() { return this.spParams(7); }, configurable: true }, // Magical Damage Rate
    fdr: { get: function() { return this.spParams(8); }, configurable: true }, // Floor Damage Rate
    exr: { get: function() { return this.spParams(9); }, configurable: true } // EXperience Rate
});

//Initialize the instance weapon using an itme id and type
Game_InstanceWeapon.prototype.initialize = function(weap, weapType, slotID, bIsWeapInstance){
    this.initMembers();

    if (weap && !bIsWeapInstance){
        this._id = $gameParty._weapons.length;
        this._wType = weapType;
        this._iType = 1; //Weapon

        var wName = weap.name;
        var wIcon = weap.iconIndex;
        var wAnim = weap.animationId;
        var wDesc = weap.description;
        var wNote = weap.note;
        var wPrice = weap.price;
        
        this._name = wName;
        this._icon = wIcon;
        this._animation = wAnim;
        this._description = wDesc;
        this._note = wNote;
        this._price = wPrice;
        this._slotId = slotID;
        this._actId = 0;
        
        this.processParams(weap.params)
        this.processTraits(weap.traits);
        this.processParamTraits();
        this.processFinalParams();
        this.processNoteTag();
    } else if (weap){
        this._baseParams = weap["baseParams"];
        this._addParams = weap["addParams"];
        this._finalParams = weap["finalParams"];
        this._spParams = weap["spParams"];
        this._exParams = weap["exParams"];
        this._name = weap["name"];
        this._description = weap["description"];
        this._id = weap["id"];
        this._iType = weap["iType"];
        this._wType = weap["wType"];
        this._traits = weap["traits"];
        this._price = weap["price"];
        this._icon = weap["icon"];
        this._animation = weap["animation"];
        this._note = weap["note"];
        this._level = weap["level"];
        this._exp = weap["exp"];
        this._durability = weap["durability"];
        this._lvlBonuses = weap["lvlBonuses"];
        this._maxLvl = weap["maxLvl"];
        this._maxDur = weap["maxDur"];
        this._expForm = weap["expForm"];
        this._goldForm = weap["goldForm"];
        this._refLevel = weap["refLvl"];
        this._isSynthed = weap["isSynthed"];
        this._durDmg = weap["durDmg"];
        this._actId = weap["actID"];
    }
};

Game_InstanceWeapon.prototype.initMembers = function(){
    //Instance Weap Vars
    this._baseParams = [0,0,0,0,0,0,0,0];
    this._addParams = [0,0,0,0,0,0,0,0];
    this._finalParams = [0,0,0,0,0,0,0,0];
    this._spParams = [0,0,0,0,0,0,0,0,0,0];
    this._exParams = [0,0,0,0,0,0,0,0,0,0];
    this._name = "";
    this._description = "";
    this._id = 0;
    this._iType = 0; //What type of item it is (always weapon here)
    this._wType = 0; //What type of weapon this itme is
    this._traits = [];
    this._price = 0;
    this._icon = 0;
    this._animation = 0;
    this._note = "";
    this._slotId = 0;

    //AWP Vars
    this._id = 0;
    this._level = 1;
    this._maxLvl = 1;
    this._maxDur = 0;
    this._expForm = "";
    this._goldForm = "";
    this._refLevel = 0;
    this._exp = 0;
    this._durability = 0.0;
    this._lvlBonuses = {};
    this._refBonus = 0.0;
    this._isSynthed = false;
    this._durDmg = 0.0;
};

Game_InstanceWeapon.prototype.finalParams = function(pID){
    return this._finalParams[pID];
}

Game_InstanceWeapon.prototype.exParams = function(pID){
    return this._exParams[pID];
}

Game_InstanceWeapon.prototype.spParams = function(pID){
    return this._spParams[pID];
}

Game_InstanceWeapon.prototype.processParamTraits = function(){
    var params = [0,0,0,0,0,0,0,0];
    var spParams = [0,0,0,0,0,0,0,0,0,0];
    var exParams = [0,0,0,0,0,0,0,0,0,0];

    var traits = this._traits;

    Object.keys(traits).forEach(function(traitID){
        var code = traits[traitID].code;
        var dataId = traits[traitID].dataId;
        var dataVal = traits[traitID].value;

        //Params
        if (code == 21){
            switch(dataId){
                case 0: //Max HP
                    params[0] += dataVal;
                    break;

                case 1: //Max MP
                    params[1] += dataVal;
                    break;

                case 2: //Atk
                    params[2] += dataVal;
                    break;

                case 3: //Def
                    params[3] += dataVal;
                    break;

                case 4: //Mg Atk
                    params[4] += dataVal;
                    break;

                case 5: //Mg Def
                    params[5] += dataVal;
                    break;

                case 6: //Agi
                    params[6] += dataVal;
                    break;

                case 7: //Luk
                    params[7] += dataVal;
                    break;

                default:
                    break;
            }
        } else if (code == 22) { //Ex Params
            switch(dataId){
                case 0: //Hit Rate
                    exParams[0] += dataVal;
                    break;

                case 1: //Eva Rate
                    exParams[1] += dataVal;
                    break;

                case 2: //Crit Rate
                    exParams[2] += dataVal;
                    break;

                case 3: //Crit Eva Rate
                    exParams[3] += dataVal;
                    break;

                case 4: //Mg Eva Rate
                    exParams[4] += dataVal;
                    break;

                case 5: //Mg Reflect Rate
                    exParams[5] += dataVal;
                    break;

                case 6: //Counter Rate
                    exParams[6] += dataVal;
                    break;

                case 7: //HP Regen Rate
                    exParams[7] += dataVal;
                    break;

                case 8: //MP Regen Rate
                    exParams[8] += dataVal;
                    break;

                case 9: //TP Regen Rate
                    exParams[9] += dataVal;
                    break;

                default:
                    break;
            }
        } else if (code == 23) { //Sp Params
            switch(dataId){
                case 0: //Targ Rate
                    spParams[0] += dataVal;
                    break;

                case 1: //Guard Eff Rate
                    spParams[1] += dataVal;
                    break;

                case 2: //Recov Eff Rate
                    spParams[2] += dataVal;
                    break;

                case 3: //Pharmacology
                    spParams[3] += dataVal;
                    break;

                case 4: //MP Cost Rate
                    spParams[4] += dataVal;
                    break;

                case 5: //TP Charge Rate
                    spParams[5] += dataVal;
                    break;

                case 6: //Phys Dmg Rate
                    spParams[6] += dataVal;
                    break;

                case 7: //Mg Dmg Rate
                    spParams[7] += dataVal;
                    break;

                case 8: //Floor Fmg Rate
                    spParams[8] += dataVal;
                    break;

                case 9: //EXP Rate
                    spParams[9] += dataVal;
                    break;
                    
                default:
                    break;
            }
        }
    });

    for (var i1 = 0; i1 < 10; i1++){
        if (i1 < 8){
            this._addParams[i1] += params[i1];
        }

        this._spParams[i1] += spParams[i1];
        this._exParams[i1] += exParams[i1];
    }
};

Game_InstanceWeapon.prototype.processTraits = function (dbTraits){
    for (var i1 = 0; i1 < dbTraits.length; i1++){
        var newTrait = {};

        newTrait["code"] = dbTraits[i1].code;
        newTrait["dataId"] = dbTraits[i1].dataId;
        newTrait["value"] = dbTraits[i1].value;

        this._traits.push(newTrait);
    }
}

Game_InstanceWeapon.prototype.processParams = function (dbParams){
    for (var i1 = 0; i1 < dbParams.length; i1++){
        var parm = 0;

        parm = dbParams[i1];
        this._baseParams[i1] = parm;
    }
}

Game_InstanceWeapon.prototype.processFinalParams = function(){
    for (var i1 = 0; i1 < this._baseParams.length; i1++){
        var finParam = 0;

        finParam = this._baseParams[i1] + (this._baseParams[i1] * this._addParams[i1]);

        this._finalParams[i1] = finParam;
    }
};

Game_InstanceWeapon.prototype.changeExp = function(exp){
    if (this._exp + exp >= 0){
        this._exp += exp
    } else { this._exp = 0; }
}

Game_InstanceWeapon.prototype.processNoteTag = function(){
    var tagStart = "<AWP>";
    var tagEnd = "<\/AWP>";
    var bInNoteTag = false;

    var traitCodes = [];
    var traitIds = [];
    var traitVals = [];

    this._lvlBonuses["params"] = {};
    this._lvlBonuses["sparams"] = {};
    this._lvlBonuses["eparams"] = {};
    this._lvlBonuses["traits"] = [];
            

    if (this._note !== null && this._note !== "") {
        if (this._note !== "\r" && this._note !== "\n"){
            //alert(obj.note);
            var noteData = this._note.split(/[\r\n]+/);
            //alert(JSON.stringify(noteData));

            for (var dataId in noteData){
                var str = noteData[dataId];
                if (str == tagStart){
                    bInNoteTag = true;                           
                } else if (str == tagEnd) { bInNoteTag = false; }

                if (bInNoteTag){
                    switch (str){
                        case tagStart:
                            break;

                        default:
                            var wepData = str.split(':');
                            
                            if (wepData[0] == "MaxLvl") { this._maxLvl = parseInt(wepData[1]); }
                            if (wepData[0] == "RefBonusRate") { this._refBonus = parseFloat(wepData[1]); }
                            else if (wepData[0] == "DefDur") {
                                this._maxDur = parseInt(wepData[1]);
                                this._durability = this._maxDur;
                            } else if (wepData[0] == "DurDmg") { this._durDmg = parseFloat(wepData[1]); }
                            else if (wepData[0] == "ExpForm") { this._expForm = wepData[1]; }
                            else if (wepData[0] == "GoldForm") { this._goldForm = wepData[1]; }
                            else if (wepData[0] == "Param") {
                                var paramID = parseInt(wepData[1]);
                                var params = wepData[2].split(',');

                                for (var i1 = 0; i1 < params.length; i1++){
                                    params[i1] = parseInt(params[i1]);
                                }

                                this._lvlBonuses["params"][paramID] = params;
                            }  else if (wepData[0] == "EParam") {
                                var paramID = parseInt(wepData[1]);
                                var params = wepData[2].split(',');

                                for (var i1 = 0; i1 < params.length; i1++){
                                    params[i1] = parseInt(params[i1]);
                                }

                                this._lvlBonuses["eparams"][paramID] = params;
                            }  else if (wepData[0] == "SParam") {
                                var paramID = parseInt(wepData[1]);
                                var params = wepData[2].split(',');

                                for (var i1 = 0; i1 < params.length; i1++){
                                    params[i1] = parseInt(params[i1]);
                                }

                                this._lvlBonuses["sparams"][paramID] = params;
                            } else if (wepData[0] == "LvlTraitCodes") {traitCodes = wepData[1].split(','); }
                            else if (wepData[0] == "LvlTraitIds") { traitIds = wepData[1].split(','); }
                            else if (wepData[0] == "LvlTraitVals") { traitVals = wepData[1].split(','); }
                            else if (wepData[0] == "DurInc") {
                                var durInc = wepData[1].split(',');

                                for (var i1 = 0; i1 < durInc.length; i1++){
                                    durInc[i1] = parseInt(durInc[i1]);
                                }

                                this._lvlBonuses["dur"] = durInc;
                            }

                            break;
                    }
                }
            }

            //Process traits
            if (traitCodes.length > 0){
                if (traitCodes.length == traitIds.length && traitCodes.length == traitVals.length){                    
                    for (var i1 = 0; i1 < traitCodes.length; i1++){
                        var lvl = [];
                        var trait = {};

                        var lvlTCodes = [];
                        var lvlTIds = [];
                        var lvlTVals = [];

                        if (traitCodes[i1].contains("-")){
                            lvlTCodes = traitCodes[i1].split('-');
                            lvlTIds = traitIds[i1].split('-');
                            lvlTVals = traitVals[i1].split('-');

                            for (var i2 = 0; i2 < lvlTCodes.length; i2++){
                                var trait2 = {};
                                trait2["code"] = parseInt(lvlTCodes[i2]);
                                trait2["dataId"] = parseInt(lvlTIds[i2]);
                                trait2["value"] = Number(Number(lvlTVals[i2]).toFixed(2));

                                lvl.push(trait2);

                            }

                        } else{
                            trait["code"] = parseInt(traitCodes[i1]);
                            trait["dataId"] = parseInt(traitIds[i1]);
                            trait["value"] = Number(Number(traitVals[i1]).toFixed(2));

                            lvl.push(trait);
                        }

                        this._lvlBonuses["traits"][i1] = lvl;
                    }
                } else{

                }

            }
        }
    }
}

Game_InstanceWeapon.prototype.processRefine = function(){
    for (var i1 = 0; i1 < this._baseParams.length; i1++){
        this._baseParams[i1] += this._refBonus * this._baseParams[i1];
    }

    for (var i1 = 0; i1 < this._traits.length; i1++){
        this._traits[i1].value += this._refBonus * this._traits[i1].value;
    }

    this._maxDur += this._refBonus * this._maxDur;
    this._durability = this._maxDur;

    this._level = 1;
    this._refLevel++;
}
