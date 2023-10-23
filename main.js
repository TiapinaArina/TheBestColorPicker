const colorPicker = document.querySelector('.colorPicker');
const block1 = document.querySelector('.block1');
const block2 = document.querySelector('.block2');
const block3 = document.querySelector('.block3');
const block4 = document.querySelector('.block4');

let changeBlocks = function () {
    block1.style.backgroundColor = hex2rgb(colorPicker.value, 50, 53, 44);
    block2.style.backgroundColor = hex2rgb(colorPicker.value, -58, 31, -58);
    block3.style.backgroundColor = hex2rgb(colorPicker.value, 86, 95, 86);
    block4.style.backgroundColor = hex2rgb(colorPicker.value, -102, 0, -102);
}

colorPicker.addEventListener('input', function () {
    changeBlocks();
});

function hex2rgb(c, x, y, z) {
    let bright = parseInt(c.split('#')[1], 16);
    let r = (bright >> 16) & 255;
    let g = (bright >> 7) & 255;
    let b = bright & 255;
    return 'rgb(' + (r + x) + ',' + (g + y) + ',' + (b + z) + ')';
};

let rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')

let colorChenger = function (block) {
    let arr = (colorValues(block.style.backgroundColor));
    let r = arr[0];
    let g = arr[1];
    let b = arr[2];
    colorPicker.value = rgbToHex(r, g, b);
    changeBlocks();
};

block1.addEventListener('click', function () {
    colorChenger(block1);
    console.log(navigator.clipboard.writeText(colorPicker.value));
});
block2.addEventListener('click', function () {
    colorChenger(block2);
    console.log(navigator.clipboard.writeText(colorPicker.value));
});
block3.addEventListener('click', function () {
    colorChenger(block3);
    console.log(navigator.clipboard.writeText(colorPicker.value));
});
block4.addEventListener('click', function () {
    colorChenger(block4);
    console.log(navigator.clipboard.writeText(colorPicker.value));
});

let blockPar=function(block,p){
    let arr = (colorValues(block.style.backgroundColor));
    let r = arr[0];
    let g = arr[1];
    let b = arr[2];
    p.textContent=rgbToHex(r, g, b);
    p.classList.add('paragraph-show');
}

block1.addEventListener('mouseenter', function () {
    let p = block1.querySelector('.paragraph');
    blockPar(block1,p)
})

block1.addEventListener('mouseleave', function () {
    let p = block1.querySelector('.paragraph');
    p.classList.remove('paragraph-show');
})

block2.addEventListener('mouseenter', function () {
    let p = block2.querySelector('.paragraph');
    blockPar(block2,p)
})

block2.addEventListener('mouseleave', function () {
    let p = block2.querySelector('.paragraph');
    p.classList.remove('paragraph-show');
})

block3.addEventListener('mouseenter', function () {
    let p = block3.querySelector('.paragraph');
    blockPar(block3,p)
})

block3.addEventListener('mouseleave', function () {
    let p = block3.querySelector('.paragraph');
    p.classList.remove('paragraph-show');
})
block4.addEventListener('mouseenter', function () {
    let p = block4.querySelector('.paragraph');
    blockPar(block4,p)
})

block4.addEventListener('mouseleave', function () {
    let p = block4.querySelector('.paragraph');
    p.classList.remove('paragraph-show');
})

/*/РАЗБИЕНИЕ RGB НА КОМПОНЕНТЫ/*/
function colorValues(color) {
    if (color === '')
        return;
    if (color.toLowerCase() === 'transparent')
        return [0, 0, 0, 0];
    if (color[0] === '#') {
        if (color.length < 7) {
            // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
            color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
        }
        return [parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
        color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1];
    }
    if (color.indexOf('rgb') === -1) {
        // convert named colors
        var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
        var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
        temp_elem.style.color = flag;
        if (temp_elem.style.color !== flag)
            return; // color set failed - some monstrous css rule is probably taking over the color of our object
        temp_elem.style.color = color;
        if (temp_elem.style.color === flag || temp_elem.style.color === '')
            return; // color parse failed
        color = getComputedStyle(temp_elem).color;
        document.body.removeChild(temp_elem);
    }
    if (color.indexOf('rgb') === 0) {
        if (color.indexOf('rgba') === -1)
            color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
        return color.match(/[\.\d]+/g).map(function (a) {
            return +a
        });
    }
}