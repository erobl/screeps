module.exports = function() {
    StructureSpawn.prototype.createCustomCreep = function(energy, roleName) {
        var currentEnergy = energy;
        var body = [];

        while(currentEnergy >= 50) {
            if(currentEnergy >= 100) {
                body.push(WORK);
                currentEnergy -= 100;
            }
            if(currentEnergy >= 50) {
                body.push(MOVE);
                currentEnergy -= 50;
            }
            if(currentEnergy >= 50) {
                body.push(CARRY);
                currentEnergy -= 50;
            }
        }

        return this.createCreep(body, undefined, {role: roleName, working: false})
    }
}