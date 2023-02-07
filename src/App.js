import React, { useState, useRef, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, ChartDataLabels, Title, Tooltip, Legend);

const originalJson = [
  {
    "componentA": {
      "value1_cc": 45,
      "value2_ic": 80,
      "value3_bl": "url1",
      "fortifyResult": "SUCCESS",
      "fortifyURL": "url2",
      "fortifyScore": 21,
      "fossURL": "url3",
      "fossSeverValue": 12,
      "fossCritical": 0,
      "fossResult": "SUCCESS",
      "sonarResult": "SUCCESS",
      "componentName": "componentA",
      "appBranch": "Develop"
    }
  },
  {
    "componentB": {
      "value1_cc": 89,
      "value2_ic": 50,
      "value3_bl": "url4",
      "fortifyResult": "SUCCESS",
      "fortifyURL": "url5",
      "fortifyScore": 89,
      "fossURL": "url6",
      "fossSeverValue": 100,
      "fossCritical": 0,
      "fossResult": "SUCCESS",
      "sonarResult": "FAILURE",
      "componentName": "componentB",
      "appBranch": "Develop"
    }
  },
  {
    "componentC": {
      "value1_cc": 70,
      "value2_ic": 60,
      "value3_bl": "url4",
      "fortifyResult": "SUCCESS",
      "fortifyURL": "url5",
      "fortifyScore": 56,
      "fossURL": "url6",
      "fossSeverValue": 37,
      "fossCritical": 0,
      "fossResult": "SUCCESS",
      "sonarResult": "SUCCESS",
      "componentName": "componentC",
      "appBranch": "Develop"
    }
  },
  {
    "componentD": {
      "value1_cc": 120,
      "value2_ic": 12,
      "value3_bl": "url4",
      "fortifyResult": "SUCCESS",
      "fortifyURL": "url5",
      "fortifyScore": 21,
      "fossURL": "url6",
      "fossSeverValue": 87,
      "fossCritical": 0,
      "fossResult": "SUCCESS",
      "sonarResult": "FAILURE",
      "componentName": "componentD",
      "appBranch": "Develop"
    }
  }
];

var initialData = [];
var labels;

export default function App(props) {

  const [displayData, setdisplayData] = useState(initialData);
  const [value1_cc_values, setvalue1_cc_values] = useState(originalJson.map(item => Object.values(item)[0].value1_cc));
  const [value2_ic_values, setvalue2_ic_values] = useState(originalJson.map(item => Object.values(item)[0].value2_ic));
  const [fortifyScore_value, setfortifyScore_value] = useState(originalJson.map(item => Object.values(item)[0].fortifyScore));
  const [fossScore_value, setfossScore_value] = useState(originalJson.map(item => Object.values(item)[0].fossSeverValue));
  const [sonarResult_value, setdsonarResult_value] = useState(originalJson.map(item => Object.values(item)[0].sonarResult));
  const [sonarResult_display_value, setdsonarResult_display_value] = useState(originalJson.map(item => 10));

  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef = useRef();

  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
      setdisplayData(initialData);
      setvalue1_cc_values(originalJson.map(item => Object.values(item)[0].value1_cc));
      setvalue2_ic_values(originalJson.map(item => Object.values(item)[0].value2_ic));
      setfortifyScore_value(originalJson.map(item => Object.values(item)[0].fortifyScore));
      setfossScore_value(originalJson.map(item => Object.values(item)[0].fossSeverValue));
      setdsonarResult_value(originalJson.map(item => Object.values(item)[0].sonarResult));
      setdsonarResult_display_value(originalJson.map(item => 10));
      
      setClickedOutside(true);
    }
  };

  const handleClickInside = () => setClickedOutside(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });


  const initial = () => {
    initialData = JSON.parse(JSON.stringify(originalJson));
    labels = initialData.map(item => Object.keys(item));

    return initialData;
  }

  initial();

  const value1_cc_ChartOptions = {
    responsive: true,
    cales: {
      xAxes: [{
        barThickness: 6,
        maxBarThickness: 8,
        beginAtZero: true,
      }]
    },
    plugins: {
      legend: {
        // position: 'top' as const,
        display: false
      },
      title: {
        display: true,
        text: 'value1_cc Value Chart',
      },
      datalabels: {
        display: true,
        color: 'black'
      }
    },
    onClick: function (evt, element) {
      if (element.length > 0) {
        changeData(element[0].index);
      }
    }
  };

  const value2_ic_ChartOptions = {
    responsive: true,
    cales: {
      xAxes: [{
        barThickness: 6,
        maxBarThickness: 8
      }]
    },
    plugins: {
      legend: {
        // position: 'top' as const,
        display: false
      },
      title: {
        display: true,
        text: 'value2_ic Value Chart',
      },
      datalabels: {
        display: true,
        color: 'black'
      }
    },
    onClick: function (evt, element) {
      if (element.length > 0) {
        changeData(element[0].index);
      }
    }
  };

  const fortifyScore_Option = {
    plugins: {
      title: {
        display: true,
        text: "fortifyScore Value Chart",
        align: "center",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      datalabels: {
        display: false,
        color: 'black'
      }
    },
    onClick: function (evt, element) {
      if (element.length > 0) {
        changeData(element[0].index);
      }
    }
  }

  const fossScore_option = {
    plugins: {
      title: {
        display: true,
        text: "fossScore Value Chart",
        align: "center",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      datalabels: {
        display: false,
        color: 'black'
      }
    },
    onClick: function (evt, element) {
      if (element.length > 0) {
        changeData(element[0].index);
      }
    }
  }

  const sonarResult_Option = {
    plugins: {
      title: {
        display: true,
        text: "sonarResult Chart",
        align: "center",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      datalabels: {
        display: false,
        color: 'black'
      }
    },
    onClick: function (evt, element) {
      console.log("fsadfsadfas");
      if (element.length > 0) {
        changeData(element[0].index);
      }
    }
  }

  const value1_cc_ChartData = {
    labels,
    datasets: [
      {
        label: 'value1_cc',
        data: value1_cc_values,
        backgroundColor: value1_cc_values.map(item => item < 80 ? 'rgb(255, 255, 0)' : 'rgb(0, 227, 150)'),
        borderColor: "#ffffff",
        borderWidth: 2,
      }
    ]
  };

  const value2_ic_ChartData = {
    labels,
    datasets: [
      {
        label: 'value2_ic',
        data: value2_ic_values,
        backgroundColor: value2_ic_values.map(item => item < 80 ? 'rgb(255, 255, 0)' : 'rgb(0, 227, 150)'),
        borderColor: "#ffffff",
        borderWidth: 2,
      }
    ]
  };

  const fortifyScore_data = {
    datasets: [
      {
        label: 'fortifyScore',
        data: fortifyScore_value,
        backgroundColor: fortifyScore_value.map(item => item < 80 ? 'rgb(255, 255, 0)' : 'rgb(0, 227, 150)'),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const fossScore_data = {
    datasets: [
      {
        label: 'fossScore',
        data: fossScore_value,
        backgroundColor: fossScore_value.map(item => item < 80 ? 'rgb(255, 255, 0)' : 'rgb(0, 227, 150)'),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const sonarResult_data = {
    datasets: [
      {
        label: 'sonarResult',
        data: sonarResult_display_value,
        backgroundColor: sonarResult_value.map(item => item === 'SUCCESS' ? 'rgb(0, 227, 150)' : 'rgb(255, 255, 0)'),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const changeData = (filterValue) => {
    let tempArr = [];
    tempArr.push(originalJson[filterValue]);

    const values1 = value1_cc_values.map((item, index) => {
      if (index !== filterValue) {
        return undefined;
      }
      else {
        return item;
      }
    });
    setvalue1_cc_values(values1);

    const values2 = value2_ic_values.map((item, index) => {
      if (index !== filterValue) {
        return undefined;
      }
      else {
        return item;
      }
    });
    setvalue2_ic_values(values2);

    const values3 = fortifyScore_value.map((item, index) => {
      if (index !== filterValue) {
        return undefined;
      }
      else {
        return item;
      }
    });
    setfortifyScore_value(values3);

    const values4 = fossScore_value.map((item, index) => {
      if (index !== filterValue) {
        return undefined;
      }
      else {
        return item;
      }
    });
    setfossScore_value(values4);


    const values5 = sonarResult_value.map((item, index) => {
      if (index !== filterValue) {
        return undefined;
      }
      else {
        return item;
      }
    });
    setdsonarResult_value(values5);
    
    const values6 = sonarResult_display_value.map((item, index) => {
      if (index !== filterValue) {
        return undefined;
      }
      else {
        return item;
      }
    });
    setdsonarResult_display_value(values6);

    setdisplayData(tempArr);
  }

  const TableRows = () => {
    return displayData.map((item, index) => {
      return (<tr key={index}>
        <td>{Object.values(item)[0].componentName}</td>
        <td>{Object.values(item)[0].value1_cc}</td>
        <td>{Object.values(item)[0].value2_ic}</td>
        <td>{Object.values(item)[0].value3_bl}</td>
        <td>{Object.values(item)[0].fortifyResult}</td>
        <td>{Object.values(item)[0].fortifyURL}</td>
        <td>{Object.values(item)[0].fortifyScore}</td>
        <td>{Object.values(item)[0].fossURL}</td>
        <td>{Object.values(item)[0].fossSeverValue}</td>
        <td>{Object.values(item)[0].fossCritical}</td>
        <td>{Object.values(item)[0].fossResult}</td>
        <td>{Object.values(item)[0].sonarResult}</td>
        <td>{Object.values(item)[0].appBranch}</td>
      </tr>)
    })
  }

  return <div className='chartContainar' >
    <div className='chartContainarInRow' ref={myRef} onClick={handleClickInside}>
      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <Bar options={value1_cc_ChartOptions} data={value1_cc_ChartData} />
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <Bar options={value2_ic_ChartOptions} data={value2_ic_ChartData} />
        </div>
      </div>
      <div className='row mt-100'>
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
          <Doughnut data={fortifyScore_data} options={fortifyScore_Option} />
        </div>
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
          <Doughnut data={fossScore_data} options={fossScore_option} />
        </div>
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
          <Pie data={sonarResult_data} options={sonarResult_Option} />
        </div>
      </div>
    </div>

    <div className='tableSection'>
      <Table striped bordered hover variant="dark" className='mt-100'>
        <thead>
          <tr>
            <th>componentName</th>
            <th>value1_cc</th>
            <th>value2_ic</th>
            <th>value3_bl</th>
            <th>fortifyResult</th>
            <th>fortifyURL</th>
            <th>fortifyScore</th>
            <th>fossURL</th>
            <th>fossSeverValue</th>
            <th>fossCritical</th>
            <th>fossResult</th>
            <th>sonarResult</th>
            <th>appBranch</th>
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </Table>
    </div>

  </div>
}
