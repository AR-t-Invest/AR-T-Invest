class TextEntity{
    constructor(x, y){
        this.text = document.createElement('a-entity');
        this.text.setAttribute('position', {x:x,y:y,z:0});
       // this.text.setAttribute("width", '10');
        this.text.setAttribute("text", {"color": "black"});
        this.icon = document.createElement('a-image');
        this.text.setAttribute('align', "center");

        this.icon.setAttribute('position', {x:x-4.25,y:y+1.5,z:0.5});
        this.icon.setAttribute('width', 1.5);
        this.icon.setAttribute('height', 1.5);
        this.icon.setAttribute('material', 'alphaTest','0.5');

    }

    setText(text){
        this.text.setAttribute("text", {value: text, width: '12', zOffset: 0.5});
    }
    setIcon(icon)
    {
        this.icon.setAttribute('src', icon)
    }
}
