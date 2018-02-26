const navIcon = {
  /*@ngInject*/
  controller: function () {
    let ctrl = this;
  },
  bindings: {
    navegacion: '='
  },
  template: `
    <ion-nav-title>
        <div class="row">
            <div class="nav-titulo col col-33">
                <h4>Movida</h4>
            </div>
            <div class="titulo col col-33">
            </div>
            <div class="nav-img col col-33">
                <img src="{{$ctrl.navegacion}}">
            </div>
        </div>
    </ion-nav-title>
  `
};

export default navIcon;
