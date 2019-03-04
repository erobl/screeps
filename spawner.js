require("prototype.spawn")();

var minimumNumber = {
    harvester: 10,
    upgrader: 1,
    builder: 9,
    repairer: 1
}

module.exports = {
    run: function() {
        for(var name in Memory.creeps) {
            if(Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }

        var name = undefined;
        var energy = Game.spawns["Spawn1"].room.energyCapacityAvailable;

        var builtYet = false;
        var numberOf = {};
        for(var role in minimumNumber) {
            numberOf[role] = _.sum(Game.creeps, (c) => c.memory.role == role);

            if(!builtYet && numberOf[role] < minimumNumber[role]) {
                name = Game.spawns.Spawn1.createCustomCreep(energy, role);
                if (role == "harvester" && name == ERR_NOT_ENOUGH_ENERGY && numberOf["harvester"] == 0) {
                    name = Game.spawns.Spawn1.createCustomCreep(200, "harvester");

                }
                builtYet = true;
            }
        }

        if(name != undefined) {
            for(role in minimumNumber[role]) {
                console.log(role + ": " + numberOf[role] + "/" + minimumNumber[role]);
            }
        }
    }
};