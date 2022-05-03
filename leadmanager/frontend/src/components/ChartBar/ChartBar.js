import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

function ChartBar({data, argument, value, title}) {
    console.log(data);
    return (
        <Paper>
          <Chart
            data={data}
          >
            <ArgumentAxis />
            <ValueAxis max={7} />
  
            <BarSeries
              valueField={value}
              argumentField={argument}
            />
            <Title text={title} />
            <Animation />
          </Chart>
        </Paper>
      );
}

export default ChartBar;