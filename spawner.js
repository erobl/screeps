require("prototype.spawn")();

var minimumNumber = {
    harvester: 3,
    upgrader: 1,
    builder: 3,
    repairer: 1
}

var creepPriority = {
    harvester: 0,
    upgrader: 1,
    builder: 2,
    repairer: 3
}


module.exports = {
    run: function(spawn) {
        for(var name in Memory.creeps) {
            if(Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }

        var name = undefined;
        var energy = spawn.room.energyCapacityAvailable;

        var builtYet = false;
        spawn.room.memory.numberOf = {};
        for(var role in minimumNumber) {
            spawn.room.memory.numberOf[role] = _.sum(Game.creeps, (c) => c.memory.role == role) + 
                             _.sum(spawn.memory.spawnQueue, (r) => r == role);

            var needsUpdate = false;

            for(var i = 0; i < minimumNumber[role] - spawn.room.memory.numberOf[role]; i++) {
                needsUpdate = true;
                spawn.enqueueCreep(role)
            }
        }

        if(needsUpdate) {
            spawn.sortQueue()
        }

        if(spawn.memory.spawnQueue.length > 0) {
            role = spawn.peekQueue();
            name = spawn.createCustomCreep(energy, role);
            if (role == "harvester" && name == ERR_NOT_ENOUGH_ENERGY && spawn.room.memory.numberOf["harvester"] == 0) {
                name = spawn.createCustomCreep(300, "harvester");
            } else if (typeof(name) == typeof("string")) {
                spawn.popQueue();
            }
        }

        if(builtYet) {
            for(role in minimumNumber) {
                console.log(role + ": " + spawn.room.memory.numberOf[role] + "/" + minimumNumber[role]);
            }
        }
    }
};