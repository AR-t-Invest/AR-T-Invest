class Heatcoils {
    constructor() {
        this.heatcoils = document.createElement('a-entity');
        this.heatcoils.setAttribute('id', "heizspule")
        this.heatcoils.setAttribute('obj-model', {
            obj: "url(Heizspule/Heizspule.obj)",
            mtl: "url(Heizspule/Heizspule.mtl)"
        })
        this.heatcoils.setAttribute('scale', {x: 18, y: 18, z: 18});
    }

    init(marker) {
        marker.appendChild(this.heatcoils)
    }

    evaluateTemperature(lastValue) {
        let calcValue = (Math.round(lastValue * 100) / 100);
        let roomTemp = 22
        console.log("temperature: " + (calcValue));
        //TODO dashboard
        //dashboard.setAttribute("text", {value:calcValue})

        let c = '#FFFFFF';
        if (calcValue > 22) {

            c = this.rgbToHex(this.HSBToRGB(230, Math.round(Math.abs(calcValue - roomTemp) * 5), 100));
        } else if (calcValue < 22) {

            c = this.rgbToHex(this.HSBToRGB(0, Math.round(Math.abs(calcValue - roomTemp) * 5), 100));
        }
        console.log(c);

        this.heatcoils.setAttribute('material', {color: c}, 'emissive', {color: c})

    }

    HSBToRGB (h, s, b){
        s /= 100;
        b /= 100;
        const k = (n) => (n + h / 60) % 6;
        const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
        return [
            Math.round(255 * f(5)),
            Math.round(255 * f(3)),
            Math.round(255 * f(1))];
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(rgba) {

        return "#" + this.componentToHex(rgba[0]) + this.componentToHex(rgba[1]) + this.componentToHex(rgba[2]);
    }
}
