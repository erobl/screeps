var creepPriority = {
    harvester: 0,
    upgrader: 1,
    builder: 2,
    repairer: 3
}

module.exports = function() {
    StructureSpawn.prototype.createCustomCreep = function(energy, roleName) {
        var currentEnergy = energy;
        var body = [];

        while(currentEnergy >= 50) {
            if(currentEnergy >= 50) {
                body.push(MOVE);
                currentEnergy -= 50;
            }
            if(currentEnergy >= 50) {
                body.push(CARRY);
                currentEnergy -= 50;
            }
            if(currentEnergy >= 100) {
                body.push(WORK);
                currentEnergy -= 100;
            }
        }

        return this.createCreep(body, undefined, {role: roleName, working: false})
    }

    StructureSpawn.prototype.enqueueCreep = function(role) {
        return this.memory.spawnQueue.push(role);
    }

    StructureSpawn.prototype.sortQueue = function() {
        return this.memory.spawnQueue.sort(function(a,b) {
            return creepPriority[a] - creepPriority[b];
        })
    }   

    StructureSpawn.prototype.peekQueue = function() {
        return this.memory.spawnQueue[0];
    }

    StructureSpawn.prototype.popQueue = function() {
        return this.memory.spawnQueue.shift();
    }
}