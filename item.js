class Item extends Obj {
    constructor(name, x, y, file) {
        super(x, y, 20, 20, file);
        this.name = name;
        this.birthTime = iteration;
    }

    touched(scene, player) {
        if (this.name === 'HealthPack') {
            if (player.health < 5) {
                player.health += 1;
            }
            scene.objs.splice(scene.objs.indexOf(this), 1);
        }
    }


}



