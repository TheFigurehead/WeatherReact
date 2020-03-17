import React, {useState, useEffect, createRef} from 'react';

import blender from './../libs/blender';

const BackgroundColorSlider = (props) =>{

    const min = -30;
    const max = 40;
    const input = createRef();

    const [temp, setTemp] = useState((props.data) ? props.data.main.temp : 0);

    useEffect(()=>{
        changeBodyColor(temp);
    });

    const changeBodyColor = (temp) => {
        const temp_range_pers = ((temp - (min-1)) * 100) / (max - (min-1));
        const color = blender('#3d5afe', '#f0f4c3', temp_range_pers/100);
        document.body.style.backgroundColor = color;
    }

    const onChange = () => {
        setTemp(input.current.value);
    }

    return (
        <React.Fragment>
            Change background color (min: {min}, max: {max}): {temp}℃
            <input type="range" ref={input} id="vol" name="vol" min="-30" max="40" defaultValue={10} onChange={onChange} />
        </React.Fragment>
    );

}

export default BackgroundColorSlider;