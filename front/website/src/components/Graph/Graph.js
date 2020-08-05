import React from 'react';
import Chart from "react-apexcharts";


export function Graph(props) {
    if (!props.records) {
        console.log("true")
        return <div/>
    } else {
        console.log("false")
        console.log(props.records)
    }

    var records = props.records;

    var chart_options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: records.map((r) => r.record_date)
        }
    };

    var chart_series = [
        {
          name: "Gewicht",
          data: records.map((r) => r.weight)
        }
    ];

    return <div>
        Gewicht:
        <Chart
              options={chart_options}
              series={chart_series}
              type="line"
              width="500"
            />
    </div>
}
