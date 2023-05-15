import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = () => {
    const [ isError, setIsError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(false);
    const [ selectFilter, setSelectFilter ] = useState(7);
    const [ chartData, setChartData] = useState([]);

    useEffect(()=>{
        setIsError(false);
        const fetchData = async () => {

            try{
                const response = await fetch( window.graphWidgetSettings.siteUrl + 'rankmath/v1/widget/dashboard' );
                const data = await response.json();
                setChartData(data);
            }catch (error){
                setIsError(true);
                setErrorMessage(error);
            }
        }

        fetchData();
    },[]);

    const handleChange = (event) => {
        setSelectFilter(event.target.value);
    }

    const filteredData = chartData.slice(-selectFilter);

    return (
        <div className={'dashboard-widget'}>
            {
                isError ?
                    <div className={'dashboard-widget-error'}>Error in loading Data : <br/> {errorMessage}</div> :
                    <div className={'dashboard-widget-container'}>
                        <div className={'dashboard-select'}>
                            <select
                                id={'filter-select'}
                                data-testId={'filter-select'}
                                value={selectFilter}
                                onChange={handleChange}
                            >
                                <option value={7}> Last 7 DAYS </option>
                                <option value={15}> Last 15 DAYS </option>
                                <option value={30}> Last 30 DAYS </option>
                            </select>
                        </div>
                        <ResponsiveContainer width={'100%'} height={'100%'} aspect={1}>
                            <LineChart width={'100%'} height={400} data={filteredData}>
                                <CartesianGrid strokeDasharray="3,4" />
                                <XAxis dataKey={'day'} />
                                <YAxis dataKey={'value'} />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
            }
        </div>
    )
};
export default Chart;
