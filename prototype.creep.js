module.exports = function() {
    Creep.prototype.switchState = function() {
        if(this.memory.working && this.carry.energy == 0) {
            return this.memory.working = false;
            this.say("Gathering!")
        } else if (!this.memory.working && this.carry.energy == this.carryCapacity) {
            return this.memory.working = true;
            this.say("Working!")
        }
    }

    Creep.prototype.work = function(workfn) {
        if(this.memory.working) {
            workfn(this)
        } else { 
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if(this.harvest(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        }
    }
}

