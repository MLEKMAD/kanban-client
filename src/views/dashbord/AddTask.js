/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import makeApiServices from "../../api/ApiServices";

const ApiServices = makeApiServices();
const { serverService } = ApiServices;

function AddTask() {
  const [developers, setDevelopers] = useState([]);
  const [types, setTypes] = useState([]);

  const [inputs, setInputs] = useState({
    title: "",
    type: "",
    nbHoursReal: 0,
    nbHoursForecast: 0,
  });

  useEffect(() => {
    const getDevs = async () => {
      let { data } = await serverService.getDevelopers();
      data = data.map((dev) => {
        return {
          value: [dev],
          label: [dev.firstname, dev.lastname].join(" "),
        };
      });
      setDevelopers(data);
    };
    const getTypes = async () => {
      let { data } = await serverService.getAllTypes();
      data = data.map((type) => {
        return {
          value: type,
          label: type.label,
        };
      });
      setTypes(data);
    };
    getDevs();
    getTypes();
  }, []);

  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  const handleInputsChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const handleDevChange = (e) => {
    console.log("type",e)
    setInputs((inputs) => ({
      ...inputs,
      "developers": e.value,
    }));
  };
  const handleTypeChange = (e) => {
    console.log("type",e)
    setInputs((inputs) => ({
      ...inputs,
      "type": e.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("inputs", inputs);
    const response = await serverService.createTask(inputs);
    console.log({response})
    //history.push("/dashbord");
  };

  return (
    <div className='page'>
      <div className='page-single'>
        <div className='container'>
          <div className='row'>
            <div className='col col-md-4 mx-auto'>
              <form className='card' onSubmit={handleSubmit}>
                <div className='card-body '>
                  <div className='card-title'>Add Task</div>
                  <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input
                      onChange={handleInputsChange}
                      defaultValue={inputs.title}
                      name='title'
                      type='text'
                      className='form-control'
                      placeholder='Name'
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Type</label>
                    <Select
                       placeholder="Type"
                       options={types} 
                       onChange={handleTypeChange} 
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Real Hours</label>
                    <input
                      onChange={handleInputsChange}
                      defaultValue={inputs.nbHoursReal}
                      type='number'
                      name='nbHoursReal'
                      className='form-control'
                      placeholder='Real Hours'
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Forecast Hours</label>
                    <input
                      onChange={handleInputsChange}
                      defaultValue={inputs.nbHoursForecast}
                      type='number'
                      name='nbHoursForecast'
                      className='form-control'
                      placeholder='Forecast Hours'
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Developers</label>
                    <Select
                     placeholder="Developers"
                     options={developers} 
                     onChange={handleDevChange} 
                    />
                  </div>
                </div>

                <div className='card-footer'>
                  <button
                    type='submit'
                    className='btn btn-block  btn-primary '
                    onClick={() => setLoading(true)}
                  >
                    Add Task
                  </button>
                </div>
                <ClipLoader
                  css={css`
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    border-color: blue;
                  `}
                  size={70}
                  color={"#123abc"}
                  loading={Loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
