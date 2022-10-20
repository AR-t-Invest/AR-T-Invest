class Markerconnection {
    constructor(firstMarker, secondMarker) {
        this.connection = document.createElement('a-entity');
        this.connection.setAttribute('connect', {firstMarker: firstMarker, secondMarker: secondMarker});
        scene.appendChild(this.connection);
    }

    airthings_sensor(marker) {
        this.sensor = document.createElement('a-image');
        this.sensor.setAttribute('scale', "1 1 1")

        this.text = document.createElement('a-entity')
        this.text.setAttribute('position', "-0.15 0.01 0");

        this.sensor.setAttribute('src', "url(Assets/luftdinge.png)");
        this.sensor.setAttribute('position', {x: 2, y: 0, z: 0});
        this.sensor.setAttribute('width', "1.85");
        this.sensor.setAttribute('height', "1");
        this.sensor.setAttribute('look-at', '#cam');
        marker.appendChild(this.sensor);
        this.setSensorText("loading...")

        this.image = document.createElement('a-image');
        this.image.setAttribute('material', {
            alphaTest: 0.45,
            color: '#00ff3c',
            blending: 'none',
            dithering: 'false'
        });
        this.image.setAttribute('src', 'Assets/glow3.png')
        this.image.setAttribute('scale', "1 1 1")
        this.image.setAttribute('width', 0.25);
        this.image.setAttribute('height', 0.25);
        this.image.setAttribute('position', {x: 0, y: 0.25, z: 0.2});

        this.icon = document.createElement('a-image');
        this.icon.setAttribute('material', {
            alphaTest: 0.5,
        });
        this.icon.setAttribute('src', '3dmodels/icons/co2.png')
        this.icon.setAttribute('scale', "1 1 1")
        this.icon.setAttribute('width', 0.2);
        this.icon.setAttribute('height', 0.2);
        this.icon.setAttribute('position', {x: 0.15, y: 0.01, z: 0.1});

        this.sensor.appendChild(this.text);
        this.sensor.appendChild(this.image);
        this.sensor.appendChild(this.icon);
    }

    setSensorText(text) {
        this.text.setAttribute('text', {value: text, zOffset: 0.1, color: 'black', align: 'center', width: 1.75})
    }

    setIcon(icon) {
        this.icon.setAttribute('src', icon)
    }
}
