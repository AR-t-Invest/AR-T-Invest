class Dashboard{
    constructor(){
        this.dashboard = document.createElement('a-entity');
        this.dashboard.setAttribute('id', "dashboard")
        this.dashboard.setAttribute('obj-model', {
            obj: "url(3dmodels/hexa.obj)",
            mtl: "url(3dmodels/hexa.mtl)"
        })
        this.dashboard.setAttribute('scale',);
    }
    init(marker){
        marker.appendChild(this.dashboard);
    }
}