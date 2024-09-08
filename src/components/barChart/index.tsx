import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { IFollowers } from "../../interfaces/github.types";
import "../../styles/chart.scss"

interface IProps {
  data: IFollowers[];
  title?: string;
}

const ChartComponent = ({ data, title }: IProps) => {
  return (
    <div className="chart_container" style={{ height: "100%" }}>
      {title && (
        <div className="chart_container__title">
          <h2>{title}</h2>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={100} height={40} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="login" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="followers" fill="#89B2CF" width={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
