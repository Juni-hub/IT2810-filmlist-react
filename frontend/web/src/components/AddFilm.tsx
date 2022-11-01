import { Form, Input, Modal, Select } from "antd";

import { CreateFormProps } from '../utils/Interface';
import { optionList } from "../helpers/helpers";

/** 
* Const for creating a form 
* @param open function for when the modal opens
* @param onCreate function to be usen when creating an filmitem
* @param onCancel function to be sent in onCancel
* @return modal for creating a filmitem
*/
export const CreateForm: React.FC<CreateFormProps> = ({
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