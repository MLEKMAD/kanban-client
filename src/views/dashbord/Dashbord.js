import React, { useEffect, useState } from "react";
import makeApiServices from "../../api/ApiServices";
import PageHeader from "../components/PageHeader";
import "./dashboard.css";

const ApiServices = makeApiServices();
const { serverService } = ApiServices;

const Dashbord = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      let { data } = await serverService.getAllTasks();
      data = data.reduce((tasks, task) => {
        task.status.id === 1
          ? tasks.splice(0, 0, task.title)
          : task.status.id === 2
          ? tasks.splice(1, 0, task.title)
          : tasks.splice(2, 0, task.title);
        return tasks;
      }, []);
      setTasks([data]);
      console.log("data", data);
    };
    getTasks();
  }, []);
  const columns = ["To Do", "Doing", "Done"];

  return (
    <div className='page '>
      <div className='container'>
        <PageHeader title='Tasks' />
        <div className='row'>
          <div className='col-md-8'>
            <div className='card '>
              <div className='card-body p-0'>
                <div
                  style={{ height: "300px", maxHeight: "300px" }}
                  className='list  overflow-auto list-row list-hoverable'
                >
                  <div className='card'>
                    <div className='table-responsive'>
                      <table className='table card-table table-vcenter text-nowrap datatable'>
                        <thead>
                          <tr>
                            {columns.map((column, index) => (
                              <th key={index}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((objectRow, indextr) => (
                            <tr key={indextr}>
                              {objectRow.map((element, indextd) => (
                                <td
                                  key={indextd}
                                  style={{
                                    whiteSpace: "nowrap ",
                                  }}
                                >
                                  <a href="/">{element}</a>
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
    </div>
  );
};

export default Dashbord;
