class Item extends Obj {
    constructor(name, x, y, file) {
        super(x, y, 20, 20, file);
        this.name = name;
    }

    touched(scene, player) {
        if (this.name === 'HealthPack') {
            player.health += 1;
            scene.objs.splice(scene.objs.indexOf(this), 1);
        }
    }


}



