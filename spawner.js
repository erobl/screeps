require("prototype.spawn")();

var minimumNumber = {
    harvester: 6,
    upgrader: 1,
    builder: 4,
    repairer: 1
}

module.exports = {
    run: function(spawn) {
        for(var name in Memory.creeps) {
            if(Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }

        var energy = spawn.room.energyCapacityAvailable;

        var builtYet = false;
        var needsUpdate = false;
        spawn.room.memory.numberOf = {};
        for(var role in minimumNumber) {
            spawn.room.memory.numberOf[role] = _.sum(Game.creeps, (c) => c.memory.role == role) + 
                                               _.sum(spawn.memory.spawnQueue, (r) => r == role);
            for(var i = 0; i < minimumNumber[role] - spawn.room.memory.numberOf[role]; i++) {
                needsUpdate = true;
                spawn.enqueueCreep(role)
            }
        }

        if(needsUpdate) {
            spawn.sortQueue()
        }

        if(spawn.memory.spawnQueue.length > 0) {
            var name = undefined;

            role = spawn.peekQueue();
            name = spawn.createCustomCreep(energy, role);
            if (role == "harvester" && name == ERR_NOT_ENOUGH_ENERGY && spawn.room.memory.numberOf["harvester"] == 0) {
                name = spawn.createCustomCreep(300, "harvester");
            } else if (typeof(name) == typeof("string")) {
                spawn.popQueue();
            }

            if(builtYet) {
                for(role in minimumNumber) {
                    console.log(role + ": " + spawn.room.memory.numberOf[role] + "/" + minimumNumber[role]);
                }
            }
        }

    }
};