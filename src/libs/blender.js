// code based on https://coderwall.com/p/z8uxzw/javascript-color-blender

function blender(color1, color2, percentage)
{
    // check input
    color1 = color1 || '#000000';
    color2 = color2 || '#ffffff';
    percentage = percentage || 0.5;

    // 1: validate input, make sure we have provided a valid hex
    if (color1.length !== 4 && color1.length !== 7)
        throw new Error('colors must be provided as hexes');

    if (color2.length !== 4 && color2.length !== 7)
        throw new Error('colors must be provided as hexes');    

    if (percentage > 1 || percentage < 0)
        throw new Error('percentage must be between 0 and 1');

    if (color1.length === 4)
        color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
    else
        color1 = color1.substring(1);
    if (color2.length === 4)
        color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
    else
        color2 = color2.substring(1);   

    // we have valid input, convert colors to rgb
    color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];

    // blend
    var color3 = [ 
        (1 - percentage) * color1[0] + percentage * color2[0], 
        (1 - percentage) * color1[1] + percentage * color2[1], 
        (1 - percentage) * color1[2] + percentage * color2[2]
    ];

    // convert to hex
    color3 = '#' + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

    return color3;
}

function int_to_hex(num)
{
    var hex = Math.round(num).toString(16);
    if (hex.length === 1)
        hex = '0' + hex;
    return hex;
}

export default blender;