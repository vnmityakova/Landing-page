define(['fabric', "../initial-block/blinkingSquare"], function (fabric, BlinkingSquare) {

    var SquaresGroup = function (canvas, width, height, scaleIndex) {
        this.animDuration = 500;
        this.movePathLength = 100*scaleIndex;
        this.timeBeforeNextAnim = 500;
        this.numberOfItems = 4;
        this.canvas = canvas;
        var baseLeftOffset = 150*scaleIndex;
        this.squares = [];
        var square;
        var self = this;

        for(var j=0;j < this.numberOfItems; j++){
            square =  new BlinkingSquare({
                left: width,
                top: canvas.getHeight() / 2 - 8,
                width: 10 * scaleIndex,
                height: 10 * scaleIndex,
                fill: '#F1737A',
                index: 1,
                hasBorders: false,
                'opacity': 0
            });
            canvas.add(square);
            this.squares.push(square);

            this.slideToPosition(square, width - baseLeftOffset + 20*j*scaleIndex);
        }

        this.squares[0].intervalBeforeNextState = 7000;
        this.squares[0].addBlinking();
        this.squares[2].intervalBeforeNextState = 10000;
        this.squares[2].addBlinking();

        //выполнять после появления сбоку
        setTimeout(function(){
            self.animateGroup(self.squares);
        }, 1000);

        $("body").on("animation-end", function(){
            setTimeout(function(){
                self.animateGroup(self.squares);
            }, 10000);
        });

    };

    SquaresGroup.prototype.reinit = function (width, scaleIndex) {
        var baseLeftOffset = 150*scaleIndex;
        for(var j=0;j < this.numberOfItems; j++){
            this.squares[j].set({
                left: width - baseLeftOffset + 20*j*scaleIndex,
                top: this.canvas.getHeight() / 2 - 8,
                width: 10 * scaleIndex,
                height: 10 * scaleIndex,
            });
        }
    };

    SquaresGroup.prototype.animateGroup = function (squares) {
        for (var i = 0; i < this.numberOfItems; i++) {
            this.moveSquareToLeft(i, squares[i]);
        }
        for (i = 0; i < this.numberOfItems; i++) {
            this.moveSquareToRight(this.numberOfItems + i, squares[this.numberOfItems - i -1]);
        }
    };


    SquaresGroup.prototype.moveSquareToLeft = function (i, square) {
        var self = this;
        setTimeout(function () {
            square.animate({
                'left': square.getLeft() - self.movePathLength
            }, {
                duration: self.animDuration,
                easing: fabric.util.ease.easeInOutExpo
            });
        }, i*(this.timeBeforeNextAnim + this.animDuration));
    };


    SquaresGroup.prototype.moveSquareToRight = function (i, square) {
        var self = this;
        setTimeout(function () {
            square.animate({
                'left': square.getLeft() + self.movePathLength
            }, {
                duration: self.animDuration,
                easing: fabric.util.ease.easeInOutExpo,
                onComplete: function(){
                    if(i == 7 ){
                        $("body").trigger("animation-end")
                    }
                }
            });
        }, i*(this.timeBeforeNextAnim + this.animDuration));
    };


    SquaresGroup.prototype.slideToPosition = function (square, leftPos) {
        square.animate({
            'left': leftPos,
            'opacity': 1
        }, {
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
            onComplete: function () {

            }
        });
    };

    return SquaresGroup;

});