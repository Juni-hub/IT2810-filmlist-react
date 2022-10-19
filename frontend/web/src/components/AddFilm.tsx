import { Form, Input, Modal, Select } from "antd";

interface Values {
    title: string;
    description: string;
    modifier: string;
}
  
interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const optionItems = ["Drama", "Documentary", "Sports", "Silent", "Adventure", "Western", "Romance", "War", "Comedy", "Horror", "Historical", "Animated"]
const optionList: React.ReactNode[] = [];


const { Option } = Select;
optionItems.forEach((e) => {
    optionList.push(<Option key={e}>{e}</Option>);
})

export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();

    return (
      <Modal
        open={open}
        title="Insert a new film"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
            form
            .validateFields()
            .then(values => {
                form.resetFields();
                onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
            <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title of the film!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            name="year"
            label="Year"
            >
                <Input />
            </Form.Item>

            <Form.Item
            name="cast"
            label="Cast"
            >
                <Input />
            </Form.Item>

            <Form.Item
            name="genres"
            label="Genres"
            >
            <Select>
                {optionList}
            </Select>
            </Form.Item>
        </Form>
      </Modal>
    );
};