import { Button, Dropdown, Menu, MenuProps, message, Space , Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { useState } from 'react';

export default function DropdownComponent() {

    const [inputValue, setInputValue] = useState(1);

    const onChange = (newValue: number) => {
        setInputValue(newValue);
    };
    const marks: SliderMarks = {
        1900: '1900',
        2000: '2000'
    };

    return(
        <div>
            <Slider marks={marks} min={1900} max={2000} onChange={onChange} value={typeof inputValue === 'number' ? inputValue : 0} style={{ width: 400 }}/>
        </div>
    );
}