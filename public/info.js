class Info {

    constructor() {
        //this.infoBox = document.createElement("a-box")
        this.linie = document.createElement("a-entity")
        this.linieZwei = document.createElement("a-entity")
        this.infoText = document.createElement("a-text")

        //this.infoBox.setAttribute("position", "0 0.5 0")

        this.linie.setAttribute("line" , {start: "0.5 2 0", end: "1.5 2 0 ", color: "white"})
        //this.linieZwei.setAttribute("line" ,{start: "1.5 2 0", end: " 2.5 1 -5", color: "blue"})
this.textValue = "";
        this.infoText.setAttribute("value" , this.textValue+ "\n Marke: Airthings \n")
        this.infoText.setAttribute("shader", "msdf")
        this.infoText.setAttribute("font", "https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/montserrat/Montserrat-Bold.json")
        this.infoText.setAttribute("scale", "0.5 1 1");
        this.infoText.setAttribute("position", "1.5 2 0")
        this.infoText.setAttribute("look-at", "#cam")
    }
    
    init(marker)
    {
        marker.appendChild( this.linie);
       // marker.appendChild(this.linieZwei)
        marker.appendChild(this.infoText)
    }

    setText(text){
        this.textValue = text;
        this.infoText.setAttribute("value" , this.textValue+ "\n Marke: Airthings \n")
    }
}
