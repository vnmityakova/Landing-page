require( [
    "initial-block/initialBlockVIew",
    "we-like-block/weLikeView",
    "our-client-right/view",
    "spektr/view",
    "people/view",
    "find-yourself/view",
    'fabric',
], function(
         MainView, 
         WeLikeView, 
         ClientRightView, 
         SpektrView,
         PeopleView,
         FindYourselfView,
         fabric
) {
    var mainView = new MainView();
    $("#content").append( mainView.render().$el );

    var weLikeView = new WeLikeView();
    $("body").append( weLikeView.render().$el);
    var weLikeCanvas = new fabric.StaticCanvas('weLikeCircle', {
     selection: false
    });
    weLikeView.setAnimation(weLikeCanvas);
    
    var clientRightView = new ClientRightView();
    $("body").append( clientRightView.render().$el );
    
    var spektrView = new SpektrView();
    $("body").append( spektrView.render().$el ); 
    
    var peopleView = new PeopleView();
    $("body").append( peopleView.render().$el );
    
    var findYourselfView = new FindYourselfView();
    $("body").append( findYourselfView.render().$el );
    
});