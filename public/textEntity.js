class TextEntity{
    constructor(x, y){
        this.text = document.createElement('a-entity');
        this.text.setAttribute('position', {x:x,y:y,z:0});
       // this.text.setAttribute("width", '10');
        this.text.setAttribute("text", {"color": "black"});
        this.icon = document.createElement('a-image');


        this.icon.setAttribute('position', {x:x,y:y+0.3,z:0.1});
        this.icon.setAttribute('width', 0.25);
        this.icon.setAttribute('height', 0.25);
        this.icon.setAttribute('material', 'alphaTest','0.5');

    }

    setText(text){
        this.text.setAttribute("text", {value: text, width: '3', zOffset: 0.05,align: "center"});
    }
    setIcon(icon)
    {
        this.icon.setAttribute('src', icon)
    }
}
