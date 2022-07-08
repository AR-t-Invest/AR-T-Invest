class Particlesystem {
    constructor() {
        this.particleSystem = document.createElement('a-entity');
    }
    init(marker)
    {
            marker.appendChild(this.particleSystem);
    }
    evaluateAirQuality(quality,radius){
        if(quality<=800){
            this.particleSystem.setAttribute('position',{x:0,y:2.25,z:-15});
            this.particleSystem.setAttribute('particle-system',{preset: 'dust', particleCount:  '100' , color: 'green',size:radius})
        }else if(quality>=800 && quality <= 1400)
        {
            this.particleSystem.setAttribute('position',{x:0,y:2.25,z:-15});
            this.particleSystem.setAttribute('particle-system',{preset: 'dust', particleCount:  '600' , color: 'yellow',size:radius})
        }else if(quality>=1400)
        {
            this.particleSystem.setAttribute('position',{x:0,y:2.25,z:-15});
            this.particleSystem.setAttribute('particle-system',{preset: 'dust', particleCount:  '4000' , color: 'red',size:radius})
        }
    }
    createVent()
    {
        this.particleSystem.setAttribute('position',{x:0,y:0,z:0});
        this.particleSystem.setAttribute('particle-system',{particleCount:  '2000' , color: 'cyan',size:1})
    }

}
