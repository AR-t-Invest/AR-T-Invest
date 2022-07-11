class Dashboard{
    constructor(){

        this.dashboard = document.createElement('a-entity');
        /*this.dashboard.setAttribute('obj-model', {
            obj: "url(3dmodels/hexagon/hexa.obj)",
            mtl: "url(3dmodels/hexagon/hexa.mtl)"
        })*/
        this.dashboard.setAttribute('position',{x:0,y:-12,z:-3});
        this.dashboard.setAttribute('scale', "12 12 12");
        this.dashboard.setAttribute('material', {color: 'blue'});
        this.dashboard.setAttribute('look-at', "[camera]");

        this.hexagon = document.createElement('a-image');
        this.hexagon.setAttribute('src', "3dmodels/hexagon/hexagon.png");

        this.tempTextEntity = new TextEntity(0.25, 0.14);
        this.humidityTextEntity = new TextEntity(0.115,-0.115);
        this.co2TextEntity = new TextEntity(0.40,-0.115);
    }
    init(marker){
        marker.appendChild(this.dashboard);
        this.dashboard.appendChild(this.hexagon);
        this.dashboard.appendChild(this.tempTextEntity.text);
        this.dashboard.appendChild(this.humidityTextEntity.text);
        this.dashboard.appendChild(this.co2TextEntity.text);
    }

    displayData(temp, hum, co2){
        let temperatureText = "Temp.: " + temp +  "°C";
        let co2Text = "CO2: " + co2 + " ppn";
        let humidityText = "Humidity: " +hum + " %";

        this.tempTextEntity.setText(temperatureText);
        this.co2TextEntity.setText(co2Text);
        this.humidityTextEntity.setText(humidityText);

    }
}