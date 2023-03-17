/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import React, { Component } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface AnalyticsBarData {
  tag: {
    id: number;
    type: string;
  };
  timestamp: string;
}

interface AnalyticsBarProps {
  data: AnalyticsBarData[];
}
export default class AnalyticsBar extends Component<AnalyticsBarProps> {
  private actualData: Array<any>;
  private yaxisData: Array<string>;
  private COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  constructor(props: AnalyticsBarProps) {
    super(props);
    const mapData = new Map();
    const totalObjSet = new Set<string>();

    this.props.data.forEach((value, index) => {
      if (!mapData.has(value.timestamp)) {
        mapData.set(value.timestamp, {});
      }
      if (value.tag.type in mapData.get(value.timestamp)) {
        mapData.get(value.timestamp).value.tag.type += 1;
      } else {
        mapData.get(value.timestamp).value.tag.type = 1;
      }
      if (!totalObjSet.has(value.tag.type)) {
        totalObjSet.add(value.tag.type);
      }
    });
    // converting from map into dictionary to be passed below;
    this.actualData = [];
    this.yaxisData = [...totalObjSet];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of mapData) {
      const newObj = { timestamp: key, ...value };
      this.actualData.push(newObj);
    }
    /* Ideally mapdata should look like this 
    //eg from 1 seconds to 4 seconds
    MapData: 

    Map(4) => {
        1: { 'person': 1, 'tram': 1},
        2: { 'person': 2,},
        3: { 'tram': 1},
        4: { 'person': 3}
    }

    actualData:
    {timestamp: 1, 'person': 1, 'tram': 1},
    {timestamp: 2, 'person': 2},
    {timestamp: 3, 'tram': 1},
    {timestamp: 4, 'person': 3}.
    */
  }

  render(): JSX.Element {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={250} data={this.actualData}>
          <CartesianGrid />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          {this.yaxisData.map((objType, index) => {
            return (
              <Bar
                key={objType}
                dataKey={objType}
                stackId="a"
                fill={this.COLORS[index]}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
