import { Button, Dropdown, Menu, MenuProps, message, Select, Space } from 'antd';
import { useState } from 'react';

export default function DropdownComponent() {
    
    const[genreFilter, setGenreFilter] = useState("")
    const { Option } = Select;

    const handleChange = (value: string) => {
        setGenreFilter(value)
      };

    return(
        <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
            <Option value="Drama">Drama</Option>
            <Option value="Documentary">Documentary</Option>
            <Option value="Sports">Sports</Option>
            <Option value="Silent">Silent</Option>
            <Option value="Adventure">Adventure</Option>
            <Option value="Western">Western</Option>
            <Option value="Romance">Romance</Option>
            <Option value="War">War</Option>
            <Option value="Comedy">Comedy</Option>
            <Option value="Horror">Horror</Option>
            <Option value="Historical">Historical</Option>
            <Option value="Animated">Animated</Option>
            <Option value="ShortDocumentary">ShortDocumentary</Option>
      </Select>
    );

    /*
    const handleMenuClick: MenuProps['onClick'] = e => {
        console.log('click', e);
        setInput(e)
    };

    const [itemName, setItemName] = useState("Select User Name");

    const [input, setInput] = useState("");

    const items = [
        {
            label: 'Drama',
            key: '1',
        },
        {
            label: 'Documentary',
            key: '2',
        },
        {
            label: 'Sports',
            key: '3',
        },
        {
            label: 'Silent',
            key: '4',
        },
        {
            label: 'Adventure',
            key: '5',
        },
        {
            label: 'Western',
            key: '6',
        },
        {
            label: 'Romance',
            key: '7',
        },
        {
            label: 'War',
            key: '8',
        },
        {
            label: 'Comedy',
            key: '9',
        },
        {
            label: 'Horror',
            key: '10',
        },
        {
            label: 'Historical',
            key: '11',
        },
        {
            label: 'Animated',
            key: '12',
        },
        {
            label: 'ShortDocumentary',
            key: '13',
        },
      ]

    const menu = (
        <Menu
            selectable
            items={items}
            onSelect={({ key }) => { setItemName(items[key - 1].label) }}
        />
    );

    return(
        <div>
            <Dropdown overlay={menu}>
                <Button>
                    <Space>
                    Genre
                    <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
    */
}