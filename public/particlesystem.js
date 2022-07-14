class Particlesystem {
    constructor() {
        this.particleSystem = document.createElement('a-entity');
        this.co2text = document.createElement('a-entity')
        this.particleSystem.setAttribute('particle-system',{preset: 'dust',texture:'Assets/glow.png'})
    }
    init(marker)
    {
        marker.appendChild(this.particleSystem);
    }
    evaluateAirQuality(quality,radius){
        this.co2text.setAttribute('text',{value:`${quality}`})
        if(quality<=800){
            this.particleSystem.setAttribute('particle-system',{particleCount:  '200' , color: '#00ff8c',size:radius})
        }else if(quality>=800 && quality <= 1400)
        {
            this.particleSystem.setAttribute('particle-system',{particleCount:  '600' , color: 'yellow',size:radius})
        }else if(quality>=1400)
        {
            this.particleSystem.setAttribute('particle-system',{particleCount:  '4000' , color: 'red',size:radius})
        }

    }

    createVent() {
        this.particleSystem.setAttribute('position',{x:0,y:0,z:0});
        this.particleSystem.setAttribute('scale',{x:-1,y:-1,z:-1});
        this.particleSystem.setAttribute('particle-system', {
            texture:'Assets/dust.png',
            particleCount: '400',
            positionSpread: "2 0 0",
            direction:"-1",
            accelerationValue: "2 2 2",
            accelerationSpread: "5 5 5",
            velocityValue: "0.2 10 0.2",
            velocitySpread: "0.2 3 0.2",
            color: '#92defc',
            size: "1, 0",
            maxAge: "1",
            rotationAngleSpread: "0.2"
        })

    }
}
