import { VisualizeBarChart } from './common';
import { Field } from '@ossinsight-lite/ui/components/form';
import AxisFields from './AxisFields';

export default function LineChartVisualizeConfig ({}: VisualizeBarChart) {
  return (
    <>
      <Field
        label="Title"
        control={<input className="bg-transparent text-white outline-none flex-1 border-b px-2 py-1" placeholder="Input a title" />}
        name="title"
      />
      <AxisFields axis="x" />
      <AxisFields axis="y" />
    </>
  );
}
