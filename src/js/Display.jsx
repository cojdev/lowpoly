import React from 'react';
import styled from 'styled-components';
import theme from './common/theme';
import { hexToRgb } from './common/colour';
import { drawImageProp } from './common/helpers';

const StyledDisplay = styled.div`
    text-align: center;
    bottom: 0;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	display: flex;
	align-items: center;
    justify-content: center;
    width: 100%;

    @media screen and (min-width: 800px) {
        width: calc(100% - ${theme.controls.width});
    }
`;

const Canvas = styled.canvas`
    max-width: 100%;
	max-height: 100%;
	box-shadow: 0 2px 5px rgba(hexToRgb(#000), .2),
				0 5px 20px rgba(hexToRgb(#000), .1);
`;

const HiddenCanvas = styled.canvas`
    display: none;
`;

export default class Display extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas1,
            canvas2 = this.refs.canvas2;
        
           this.refs.loader.style.display = 'none';

        this.drawCanvas(canvas,canvas2);
    }

    componentDidUpdate(previousProps, previousState) {
        const canvas = this.refs.canvas1,
            canvas2 = this.refs.canvas2,
            self = this;

        

        if (previousProps.settings !== this.props.settings) {
            self.refs.loader.style.display = 'flex';

            var draw = window.setTimeout(this.drawCanvas.bind(this, canvas,canvas2, () => { console.log('callback'); self.refs.loader.style.display = 'none'; }), 5);
        }
    }
    /**
     * Draw the source gradient or image
     * @param {CanvasRenderingContext2D} context Canvas context
     * @param {HTMLCanvasElement} canvas Canvas element
     */
    drawCanvas(canvas, canvas2, callback) {
        const geometry = this.props.settings.geometry;

        const self = this;

        var imgd;
        var maxCols;
        var maxRows;
        var cellSize = 50;//size of a single grid square
        var variance = 0.2;
        var ovA = 0.5;
        var cRange = {value: geometry.cellSize};
		var vRange = {value: geometry.variance};
        var oAmount = {value: geometry.depth/2};
        var cvs = canvas;
        var ctx = cvs.getContext('2d');
        var points;

        var gridWidth = cvs.width + cellSize * 2;
		var gridHeight = cvs.height + cellSize * 2;

        const drawBG = (context, canvas, hidden, callback) => {

            context.clearRect(0, 0, canvas.width, canvas.height);

            if (this.props.settings.image && this.props.settings.useImage) {
                let base_image = new Image();
                base_image.crossOrigin = "Anonymous";
                base_image.src = this.props.settings.image;
                
                base_image.onload = function () {
                    // use image instead of gradient
                    drawImageProp(context, base_image);
                    // context.drawImage(base_image, 0, 0);
                    callback();
                };
            }
            else {
                context.globalCompositeOperation = "multiply";
            
                // colours
                var inputs = self.props.settings.colour;
                
                // loop colours and create gradient
                var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs.length > 1) {
                        gradient.addColorStop(i / (inputs.length - 1), inputs[i]);
                        // console.log(inputs[i]);
                    } else {
                        gradient = inputs[i];
                    }
                }

                // draw gradient on canvas
                context.fillStyle = gradient;
                context.beginPath();
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.closePath();
                context.fill();
                
                // draw subtle gradient overlay
                context.beginPath();
                var overlay = context.createLinearGradient(0, 0, 0, cvs.height);
                overlay.addColorStop(0, "#fff");
                overlay.addColorStop(1, "#ccc");
                context.fillStyle = overlay;
                context.fillRect(0, 0, cvs.width, cvs.height);
                context.closePath();
                context.fill();
                context.globalCompositeOperation = "source-over";
            }

            

            // check context is of the defined hidden canvas
            if (hidden) { imgd = context; }
        }

        // generate a grid of point objects
        const generatePoints = (amount) => {

            let points = [];
            var row = 0;
            var col = 0;

            for (var i = 0; i < amount; i++) {

                let temp = {x: 0, y: 0, r: 0, c: 0};

                if (row % 2 == 0) {
                    temp.x = (col * cellSize) - cellSize;
                    temp.x = temp.x + (Math.random() - .5) * variance * cellSize * 2;
                }
                else {
                    temp.x = (col * cellSize) - cellSize - cellSize / 2;
                    temp.x = temp.x + (Math.random() - .5) * variance * cellSize * 2;
                }

                temp.y = (row * cellSize * 0.866) - cellSize;
                temp.y = temp.y + (Math.random() - .5) * variance * cellSize * 2;
                temp.r = row;
                temp.c = col;

                points.push(temp);

                col = col + 1;

                if ((i + 1) % maxCols == 0) {
                    row = row + 1;
                    col = 0;
                }
            }

            return points;
        }

        const draw = (obj, rand) => {

            var red, blue, green, alpha;
    
            const setColour = function (xpos, ypos) {
                if (xpos < 0) {
                    xpos = 0;
                }
                if (xpos > cvs.width - 1) {
                    xpos = cvs.width - 1;
                }
                if (ypos < 0) {
                    ypos = 0;
                }
                if (ypos > cvs.height - 1) {
                    ypos = cvs.height - 1;
                }
                // console.log(imgd);
                red = imgd.getImageData(xpos, ypos, 1, 1).data[0];
                green = imgd.getImageData(xpos, ypos, 1, 1).data[1];
                blue = imgd.getImageData(xpos, ypos, 1, 1).data[2];
                alpha = imgd.getImageData(xpos, ypos, 1, 1).data[3];
    
            }
    
            var filler = function () {
                if (rand) {
                    var temp = (Math.random() * 2 * ovA) - ovA;
                    ctx.fillStyle = "rgba(" + Math.round(red - red * temp) + ", " + Math.round(green - green * temp) + ", " + Math.round(blue - blue * temp) + ", " + alpha / 255 + ")";
                } else {
                    ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha / 255 + ")";
                }
            }
    
            for (var i = 0; i < points.length; i++) {
                
                // even rows
                if (obj == points[i] && obj.r % 2 == 0 && points[i + maxCols + 1] && obj.c < maxCols - 1) {
                    //setColour(obj.x,obj.y+2*cellSize/3);
                    setColour(Math.round(obj.c / maxCols * gridWidth), Math.round(obj.r / maxRows * gridHeight + 2 * cellSize / 3));
                    filler();
                    //console.log(obj.c);
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(points[i + maxCols].x, points[i + maxCols].y);
                    ctx.lineTo(points[i + maxCols + 1].x, points[i + maxCols + 1].y);
                    ctx.closePath();
                    ctx.fill();
                    //ctx.stroke();
    
                    //setColour(obj.x+cellSize/2,obj.y+cellSize/3);
                    setColour(Math.round(obj.c / maxCols * gridWidth + cellSize / 2), Math.round(obj.r / maxRows * gridHeight + cellSize / 3));
                    filler();
                    //ctx.fillStyle = "green";
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(points[i + 1].x, points[i + 1].y);
                    ctx.lineTo(points[i + maxCols + 1].x, points[i + maxCols + 1].y);
                    ctx.closePath();
                    ctx.fill();
                    //console.log("YES");
                }
                // odd rows
                if (
                    obj == points[i]
                    && obj.r % 2 != 0
                    && points[i + maxCols + 1]
                    && obj.c > 0
                ) {
    
                    //setColour(obj.x-cellSize/2,obj.y+cellSize/3);
                    setColour(Math.round((obj.c - 1) / maxCols * gridWidth), Math.round(obj.r / maxRows * gridHeight + cellSize / 3));
                    //if (!setColour(Math.round((obj.c-1)/maxCols*gridWidth),200)) {console.log(obj)}
                    filler();
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(points[i - 1].x, points[i - 1].y);
                    ctx.lineTo(points[i + maxCols - 1].x, points[i + maxCols - 1].y);
                    ctx.closePath();
                    ctx.fill();
                    //ctx.stroke();
    
                    //setColour(obj.x,obj.y+2*cellSize/3);
                    setColour(Math.round((obj.c - 1) / maxCols * gridWidth + cellSize / 2), Math.round(obj.r / maxRows * gridHeight + 2 * cellSize / 3));
                    filler();
                    //ctx.fillStyle = "green";
                    ctx.beginPath();
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(points[i + maxCols - 1].x, points[i + maxCols - 1].y);
                    ctx.lineTo(points[i + maxCols].x, points[i + maxCols].y);
                    ctx.closePath();
                    ctx.fill();
                    //console.log("NO");
                }
            }
        }

        const drawPoly = () => {
            for (var i = 0; i < points.length; i++) {
                draw(points[i], true);
            };
        };

        cellSize = (cRange.value * 3) + 30;
        variance = vRange.value / 100;
        gridWidth = cvs.width + cellSize * 2;
        gridHeight = cvs.height + cellSize * 2;
        maxCols = Math.ceil(gridWidth / cellSize) + 2;
        maxRows = Math.ceil(gridHeight / (cellSize * 0.865))
        //console.log(maxCols);
        var x = maxCols;
        var y = maxRows;
        points = generatePoints(x * y);

		ovA = oAmount.value / 100;
		ctx.clearRect(0, 0, cvs.width, cvs.height);
        drawBG(canvas2.getContext('2d'), canvas2, true, drawPoly);
        drawBG(ctx, cvs, false, drawPoly);

		for (var i = 0; i < points.length; i++) {
			draw(points[i], true);
		};

		// saveImage();
        const outputDataURL = canvas.toDataURL();

        this.props.updateOutput(outputDataURL);
        
        // this.state.loaded = true;
        if (callback) {
            callback();
        }
        
    }

    render() {
        const width = this.props.settings.dimensions.width,
            height = this.props.settings.dimensions.height;

        return (
            <StyledDisplay>
                <div
                    className='loader'
                    ref='loader'>
                        <div
                            className="spinner"></div>
                </div>
                <Canvas
                    ref="canvas1"
                    width={width}
                    height={height} />
                <HiddenCanvas
                    ref="canvas2"
                    width={width}
                    height={height} />
            </StyledDisplay>
        );
    }
}