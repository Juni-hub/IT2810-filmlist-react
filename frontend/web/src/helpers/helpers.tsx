import { Select } from "antd";

const { Option } = Select;
const optionItems = ["Drama", "Documentary", "Sports", "Silent", "Adventure", "Western", "Romance", "War", "Comedy", "Horror", "Historical", "Animated"]
export const optionList: React.ReactNode[] = [];

optionItems.forEach((e) => {
    optionList.push(<Option key={e}>{e}</Option>);
})