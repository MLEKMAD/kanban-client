/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

import makeApiServices from "../../api/ApiServices";
const ApiServices = makeApiServices();
const { serverService } = ApiServices;
const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  useEffect(() => {
    const getDevs = async() => {
      let {data} = await serverService.getDevelopers();
      data = data.map(dev => {
        return [
          dev.firstname,
          dev.lastname,
          dev.startContract
        ]
      })
      setDevelopers(data)
    }
    getDevs();

    
  }, []);
  const columns = ["First Name", "Last Name", "Start Contract"]

  return (
    <div className='container'>
      <PageHeader title='Developers' />
      <div className='row'>
        <div className='col-md-8'>
          <div className='card '>
            <div className='card-body p-0'>
              <div
                style={{ height: "300px", maxHeight: "300px" }}
                className='list  overflow-auto list-row list-hoverable'
              >
                <div className="card">
      <div className="table-responsive">
        <table className="table card-table table-vcenter text-nowrap datatable">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {developers.map((objectRow, indextr) => (
              <tr key={indextr}>
                {objectRow.map((element, indextd) => (
                  <td
                    key={indextd}
                    style={{
                      whiteSpace: "nowrap ",
                    }}
                  >
                    {element}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
