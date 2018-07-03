class Canvas {
    constructor(props) {
        this.props = props;
        this.cvs = [
            document.getElementById(this.props.id),
            document.getElementById(this.props.id2)
        ];
        this.ctx = [
            this.cvs[0].getContext("2d"),
            this.cvs[1].getContext("2d")
        ];
        this.cvs2 = document.getElementById(this.props.id2);
        this.ctx2 = this.cvs2.context;
        // this.cvs.height = props.height;
        // this.cvs.width = props.width;
    }
    refresh () {

    }

    drawPattern (inputs) {
        for (let i = this.cvs.length - 1; i >= 0; i--) {
            let canvas = this.cvs[i];
            let context = this.ctx[i];

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = "multiply";
            let bg = context.createLinearGradient(0, 0, canvas.width, 0);
            
		    for (var j = 0; j < inputs.length; j++) {
                if (inputs.length > 1) {
                    bg.addColorStop(j / (inputs.length - 1), inputs[j]);
                    console.log(inputs[j]);
                } else {
                    bg = inputs[j];
                }
            }

            context.fillStyle = bg;
            context.beginPath();
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.closePath();
            context.fill();

            context.beginPath();
            var bg2 = context.createLinearGradient(0, 0, 0, canvas.height);
            bg2.addColorStop(0, "#fff");
            bg2.addColorStop(1, "#ccc");
            context.fillStyle = bg2;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.closePath();
            context.fill();
            
            context.globalCompositeOperation = "source-over";
        }

    }
    // Return canvas dimensions
    getSize () {
        return {
            w: this.width,
            h: this.height
        };
    }
    // Set canvas dimensions
    setSize (width, height) {
        this.cvs[0].width = width;
        this.cvs[0].height = height;
        console.log(this.cvs[0]);
    }
}

let display = new Canvas({
    id: "canvas",
    id2: "canvas2"
});

var app = new Vue({
    el: "#app",
    data: {
        loading: true,
        variance: 40,
        cellSize: 40,
        depth: 10,
        activePreset: 0,
        totalColours: 0,
        presets: [
            {w: 1280, h: 720},
            {w: 1920, h: 1080},
            {w: 3840, h: 2160, label: "4K "},
            {w: 640, h: 1152, label: "IPhone 5/SE"},
            {w: 750, h: 1334, label: "IPhone 6/7/8"},
            {w: 1080, h: 1920, label: "IPhone 6+/7+/8+"},
            {w: 1125, h: 2436, label: "IPhone X"}

        ],
        height: 720,
        width: 1280,
        activePalette: [],
        palettes: [
            // Default
            ["#22bbee", "#8855cc", "#ee2266", "#ee7722"],
            // Dusk
            ["#0e1b32","#c28993","#ffc7af"],
            // Chalk
            ["#f8f7f5", "#dddcda"]
        ],
        href: ""
    },

    computed: {
        selected: function () {
            return {
                w: this.presets[this.activePreset].w,
                h: this.presets[this.activePreset].h
            };
        }
    },

    created: function () {
        console.log(this.palettes[0]);
        this.activePalette = this.palettes[0].slice();
    },

    watch: {
        activePalette: {
            handler: function () {
                this.totalColours = this.activePalette.length;
            }
        }
    },

    methods: {
        saveImage: function () {
            // body...
            let dataURL = display.cvs[0].toDataURL();
            this.href = dataURL;
        },
        presetLabel: function (preset) {
            var label = preset.label;
            var label = label !== undefined ? (label + " ") : "";
            return label + "(" +preset.w + "×" + preset.h +")";
        },
        setSize: function () {
            w = this.selected.w;
            h = this.selected.h;
            if (w * h > 9e+6) {
                alert("Dimensions to high!");
            }
            else {
                this.width = w;
                this.height = h;
            }
            display.drawPattern(this.activePalette);
            this.saveImage(display);
        }
    }
});

//Duskish gradient
	/*bg.addColorStop(0,);
	bg.addColorStop(0.8,);
	bg.addColorStop(1,);*/

	//Pink/Purple Gradient
	/*bg.addColorStop(0,"#85c");
	bg.addColorStop(1,"#d14");*/

	//Whitish
	/*bg.addColorStop(0,);
	bg.addColorStop(1,);*/
	