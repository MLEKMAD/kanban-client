/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

// import { AppContext } from "../../context/AppContext";
import CRUDTable from "../components/CRUDTable";
import makeApiServices from "../../api/ApiServices";
// import { Link } from "react-router-dom";
const ApiServices = makeApiServices();
const { serverService } = ApiServices;
const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  useEffect(() => {
    const ListDevs = [];
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
                <CRUDTable columns={columns} data={developers}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
