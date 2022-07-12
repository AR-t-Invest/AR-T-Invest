class Dashboard{
    constructor(){

        this.dashboard = document.createElement('a-entity');
        /*this.dashboard.setAttribute('obj-model', {
            obj: "url(3dmodels/hexagon/hexa.obj)",
            mtl: "url(3dmodels/hexagon/hexa.mtl)"
        })*/
        this.dashboard.setAttribute('position',{x:0,y:-12,z:-3});
        this.dashboard.setAttribute('scale', "1 1 1");
        this.dashboard.setAttribute('look-at', "#cam");

        this.tempTextEntity = new TextEntity(4.2, 2.7);
        this.humidityTextEntity = new TextEntity(1,-2.7);
        this.co2TextEntity = new TextEntity(7.5,-2.7);

        this.tempTextEntity.setIcon("3dmodels/icons/temperature.png");
        this.co2TextEntity.setIcon("3dmodels/icons/co2.png");
        this.humidityTextEntity.setIcon("3dmodels/icons/humidity.png");

        this.hexagon = document.createElement('a-image');
        this.hexagon.setAttribute('src', "3dmodels/hexagon/Hexagon.png");
        this.hexagon.setAttribute('width', "12");
        this.hexagon.setAttribute('height', "12");

    }
    init(marker){

        this.dashboard.appendChild(this.tempTextEntity.text);
        this.dashboard.appendChild(this.humidityTextEntity.text);
        this.dashboard.appendChild(this.co2TextEntity.text);

        this.dashboard.appendChild(this.tempTextEntity.icon);
        this.dashboard.appendChild(this.humidityTextEntity.icon);
        this.dashboard.appendChild(this.co2TextEntity.icon);

        marker.appendChild(this.dashboard);
        this.dashboard.appendChild(this.hexagon);
        this.displayData(0,0,0);
    }

    displayData(temp, hum, co2){
        let temperatureText = "Temp.: " + temp +  " °C";
        let co2Text = "CO2: " + co2 + " ppm";
        let humidityText = "Humidity: " +hum + " %";

        this.tempTextEntity.setText(temperatureText);
        this.co2TextEntity.setText(co2Text);
        this.humidityTextEntity.setText(humidityText);
    }
}
