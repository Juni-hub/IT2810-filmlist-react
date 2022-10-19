import { Select } from "antd";

const { Option } = Select;
const optionItems = ["Drama", "Documentary", "Sports", "Silent", "Adventure", "Western", "Romance", "War", "Comedy", "Horror", "Historical", "Animated"]
export const optionList: React.ReactNode[] = [];

optionItems.forEach((e) => {
    optionList.push(<Option key={e}>{e}</Option>);
})

export function disabledYear(current: any) {
    return current.year() > 2022 || current.year() < 1900;
}