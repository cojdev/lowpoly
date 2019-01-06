export default {
    palettes: [
        ["#22bbee", "#8855cc", "#ee2266", "#ee7722"],
        ['#e14', '#e82', '#de2', '#4e2', '#2ae', '#22d', '#82e'],
        ['#0e1b32', '#c28993', '#ffc7af'],
        ['#82c', '#e31', '#fe6'],
        ['#48c', '#6cf'],
        ['#213', '#236'],
        ['#f6c', '#84d', '#2fc'],
    ],
    presets: [
        {
            label: 'Mobile',
            values: [
                {
                    width: 640,
                    height: 1152,
                    label: 'iPhone 5/5s',
                },
                {
                    width: 750,
                    height: 1334,
                    label: 'iPhone 6/7/8',
                },
                {
                    width: 1080,
                    height: 1920,
                    label: 'iPhone 6+/7+/8+',
                },
                {
                    width: 1125,
                    height: 2436,
                    label: 'iPhone X',
                },
                {
                    width: 1440,
                    height: 2960,
                    label: 'Samsung Galaxy S8/S9',
                },
            ]
        },
        {
            label: 'Desktop',
            values: [
                {
                    width: 1280,
                    height: 720,
                    label: '1280x720',
                },
                {
                    width: 1366,
                    height: 768,
                    label: '1366x768',
                },
                {
                    width: 1920,
                    height: 1080,
                    label: '1920x1080',
                },
                {
                    width: 3840,
                    height: 2160,
                    label: '3840x2160 (4K)',
                },
            ],
        }
    ],
}