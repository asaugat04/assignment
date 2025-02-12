import { Card } from "antd";

const StatsCard: React.FC<{
  title: string;
  icon?: React.FC<{ size: number; className?: string }>;
  value: string;
  extra?: { label: string; value: string };
}> = ({ title, icon: Icon, value, extra }) => {
  return (
    <Card className="hover:!bg-slate-50 shadow-sm rounded-lg transition-colors">
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-500 text-sm">{title}</p>
          {extra && (
            <p className="font-semibold text-gray-500 text-sm">{extra.label}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2 mt-2 font-bold text-lightDark text-2xl">
            {Icon && <Icon className="font-bold" size={24} />}
            {value}
          </p>
          {extra && (
            <p className="font-semibold text-gray-500 text-sm">{extra.value}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
export default StatsCard;
