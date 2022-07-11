class TextEntity{
    constructor(x, y){
        this.text = document.createElement('a-entity');
        this.text.setAttribute('position', {x:x,y:y,z:0});
       // this.text.setAttribute("width", '10');
        this.text.setAttribute("text", {"color": "black"});
        this.icon = document.createElement('a-image');
        this.icon.setAttribute('src', "3dmodels/icon/co2.png");
    }

    setText(text){
        this.text.setAttribute("text", {value: text, width: '0.7', 'zOffset': 1});
    }
}