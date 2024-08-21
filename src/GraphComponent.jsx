import React, { useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartType, setChartType] = useState('line'); // Default chart type is 'line'
  const chartRef = useRef(null);

  const handleAddLabel = () => {
    setChartData((prevData) => [...prevData, { label: '', values: [] }]);
  };

  const handleLabelChange = (index, label) => {
    setChartData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].label = label;
      return updatedData;
    });
  };

  const handleValuesChange = (index, values) => {
    const parsedValues = values.split(',').map((val) => {
      const trimmedVal = val.trim();
      return trimmedVal ? parseFloat(trimmedVal) : null;
    });

    setChartData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].values = parsedValues.filter((val) => !isNaN(val));
      return updatedData;
    });
  };

  const handleRemoveLabel = (index) => {
    setChartData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1); // Remove the label and its associated data
      return updatedData;
    });
  };

  const generateChart = () => {
    if (chartRef.current && chartData.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      const datasets = chartData.map((dataItem) => ({
        label: dataItem.label,
        data: dataItem.values.filter((val) => !isNaN(val)),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
        pointRadius: 6,
      }));

      const newChartInstance = new Chart(ctx, {
        type: chartType,
        data: {
          labels: getCombinedLabels(chartData),
          datasets: datasets,
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      setChartInstance(newChartInstance);
    }
  };

  const getRandomColor = () => {
    const randomColor = `rgba(${Math.floor(Math.random() * 200) + 55}, ${
      Math.floor(Math.random() * 200) + 55
    }, ${Math.floor(Math.random() * 200) + 55}, 0.7)`;
    return randomColor;
  };

  const getCombinedLabels = (chartData) => {
    let combinedLabels = [];
    chartData.forEach((dataItem) => {
      combinedLabels = [...combinedLabels, ...dataItem.values.filter((val) => !isNaN(val))];
    });
    return combinedLabels;
  };

  const downloadChartDataAsCSV = () => {
    if (chartData.length > 0) {
      const csvContent = chartData.reduce((acc, dataItem) => {
        const row = `${dataItem.label},${dataItem.values.join(',')}\n`;
        return acc + row;
      }, 'Label,Values\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'chart_data.csv');
    }
  };

  const downloadChartAsPNG = () => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      canvas.toBlob(function (blob) {
        saveAs(blob, 'chart_image.png');
      });
    }
  };

  const downloadChartAsHTML = () => {
    if (chartInstance && chartData.length > 0) {
      const canvas = chartRef.current;
      const chartImage = canvas.toDataURL('image/png');

      const datasets = chartData.map((dataItem) => ({
        label: dataItem.label,
        data: dataItem.values.filter((val) => !isNaN(val)),
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        borderWidth: 1,
      }));

      const chartHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Interactive Chart</title>
        </head>
        <body>
          <h1>Interactive Chart</h1>
          <div style="text-align: center;">
            <canvas id="chartCanvas" width="400" height="400"></canvas>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <script>
            const ctx = document.getElementById('chartCanvas').getContext('2d');
            new Chart(ctx, {
              type: '${chartType}',
              data: ${JSON.stringify({ labels: getCombinedLabels(chartData), datasets: datasets })},
              options: {
                scales: {
                  y: { beginAtZero: true }
                }
              }
            });
          </script>
        </body>
        </html>
      `;

      const blob = new Blob([chartHTML], { type: 'text/html;charset=utf-8' });
      saveAs(blob, 'chart.html');
    }
  };

  return (
    <div>
      {chartData.map((dataItem, index) => (
        <div key={index}>
          <h4>Add Label:</h4>
          <input
            type="text"
            placeholder={`Enter label ${index + 1}`}
            value={dataItem.label}
            onChange={(e) => handleLabelChange(index, e.target.value)}
          />
          <input
            type="text"
            placeholder={`Enter values for ${dataItem.label} (comma separated)`}
            value={dataItem.values.join(', ')}
            onChange={(e) => handleValuesChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveLabel(index)}>Remove Label</button>
        </div>
      ))}
      <button onClick={handleAddLabel}>Add Label</button>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="scatter">Scatter Plot</option>
        <option value="bubble">Bubble Chart</option>
      </select>
      <button onClick={generateChart}>Generate Chart</button>
      <button onClick={downloadChartDataAsCSV}>Download CSV</button>
      <button onClick={downloadChartAsPNG}>Download PNG</button>
      <button onClick={downloadChartAsHTML}>Download HTML (with Chart)</button>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default ChartComponent;
