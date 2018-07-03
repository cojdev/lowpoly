import React from 'react';

export default class Display extends React.Component {
    componentDidMount() {
        const cvs = this.refs.canvas1,
            cvs2 = this.refs.canvas2;
        
        const ctx = cvs.getContext('2d'),
            ctx2 = cvs2.getContext('2d');
        
    }

    drawCanvas(canvas, canvas2) {
        const drawGradient = function (context, canvas) {

            const self = this;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = "multiply";
            var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    
            // Duskish gradient
            // dusk = {
            // 	colours: ["#0e1b32","#c28993","#ffc7af"],
            // 	stops: [0, 0.8, 1]
            // };
            
            // draw gradient
            var inputs = ["#0e1b32", "#c28993", "#ffc7af"];
            for (var i = 0; i < inputs.length; i++) {
                if (inputs.length > 1) {
                    gradient.addColorStop(i / (inputs.length - 1), inputs[i]);
                    console.log(inputs[i]);
                } else {
                    gradient = inputs[i];
                }
                colours[i] = inputs[i];
            }
            context.fillStyle = gradient;
            context.beginPath();
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.closePath();
            context.fill();
            

            context.beginPath();
            var overlay = context.createLinearGradient(0, 0, 0, cvs.height);
            overlay.addColorStop(0, "#fff");
            overlay.addColorStop(1, "#ccc");
            context.fillStyle = overlay;
            context.fillRect(0, 0, cvs.width, cvs.height);
            context.closePath();
            context.fill();
            context.globalCompositeOperation = "source-over";

            // use image instead of gradient
            // ctx.drawImage(base_image, 0, 0);

            // hidden canvas
            if (context == self.ctx2) { imgd = context; }

            // 
            else if (imgd.getImageData(0, 0, 1, 1).data[3] < 255 || imgd.getImageData(canvas.width - 1, canvas.height - 1, 1, 1).data[3] < 255) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }

    render() {
        const width = this.props.width,
            height = this.props.height;

        return (
            <div
                className="display">
                <canvas
                    ref="canvas1"
                    className="canvas1"
                    width={width}
                    height={height}></canvas>
                <canvas
                    ref='canvas2'
                    className="canvas2"
                    width={width}
                    height={height}></canvas>
            </div>
        );
    }
}