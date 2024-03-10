import React, { useCallback, useState } from 'react';
import Chart, {
  Series,
  Aggregation,
  ArgumentAxis,
  Grid,
  Label,
  ValueAxis,
  Margin,
  Legend,
  Tooltip,
  Pane,
} from 'devextreme-react/chart';
import RangeSelector, {
  Size,
  Scale,
  Chart as RsChart,
  ValueAxis as RsValueAxis,
  Series as RsSeries,
  Aggregation as RsAggregation,
  Behavior,
  RangeSelectorTypes,
} from 'devextreme-react/range-selector';
import { dataSource } from './data.js';

const App = () => {
  const [visualRange, setVisualRange] = useState({});

  const updateVisualRange = useCallback((e) => {
    setVisualRange(e.value);
  }, [setVisualRange]);


  const customizeLabel = ({ value }) => {
    return value.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div id="chart-demo">
      <Chart id="zoomedChart" dataSource={dataSource}>
        <Pane name="pricePane" />
        <Pane name="volumePane" height={80} />
        <Series
          type="candlestick"
          openValueField="Open"
          highValueField="High"
          lowValueField="Low"
          closeValueField="Close"
          argumentField="Date"
          pane="pricePane"
        >
          <Aggregation enabled={true} />
        </Series>
        <Series
          type="bar"
          valueField="Volume"
          argumentField="Date"
          pane="volumePane"
        />
        <ArgumentAxis
          visualRange={visualRange}
          valueMarginsEnabled={false}
          argumentType="datetime"
        >
          <Grid visible={true} />
          <Label visible={false} />
          {/* Customizing for time-only display */}
          <Label customizeText={customizeLabel} />
        </ArgumentAxis>
        <ValueAxis valueType="numeric" pane="pricePane" />
        <ValueAxis valueType="numeric" pane="volumePane" position="right" />
        <Margin right={10} />
        <Legend visible={false} />
        <Tooltip enabled={true} />
      </Chart>
      <RangeSelector dataSource={dataSource} onValueChanged={updateVisualRange}>
        <Size height={120} />
        <RsChart>
          <RsValueAxis valueType="numeric" />
          <RsSeries type="line" valueField="Open" argumentField="Date">
            <RsAggregation enabled={true} />
          </RsSeries>
          
          <RsSeries
            type="line"
            valueField="RSI"  
            argumentField="Date"
          >
            <RsAggregation enabled={true} />
          </RsSeries>
        </RsChart>
        <Scale
          placeholderHeight={20}
          minorTickInterval="day"
          tickInterval="month"
          valueType="datetime"
          aggregationInterval="week"
        />
        <Behavior snapToTicks={false} valueChangeMode="onHandleMove" />
      </RangeSelector>
    </div>
  );
}

export default App;
