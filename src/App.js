import React, { useEffect, useState } from 'react';
import { timestampToDate } from './util';
import './App.css';

export default () => {

  const [ data, setData ] = useState ( [] );
  const [ filterData, setFilterData ] = useState ( [] );
  const [ isLoading, setIsLoading ] = useState ( false );
  const [ isOpen, setIsOpen ] = useState ( true );
  const [ sort, setSort ] = useState ( 'DESC' );

  const getData = async () => {
    setIsLoading ( true );
    try {
      const response = await fetch ( './sidebar.json' );
      const responseJson = await response.json();
      const sortedData = responseJson.sort (( a, b ) => b.updated - a.updated );
      setData ( sortedData );
      setFilterData ( sortedData );
    }
    catch {}
    finally {
      setIsLoading ( false );
    }
  }

  useEffect ( () => {
    getData();
  }, []);

  
  const actions = () => {
    const handleClose = () => {
      setIsOpen ( !isOpen );
    }
    return (
      <div className="sidebar-actions">
        {
          isOpen ? (
            <>
              <i className="fas fa-redo-alt" onClick={getData}></i>
              <i className="fas fa-times" onClick={handleClose}></i>
            </>
          )
          : <i className="far fa-folder-open" onClick={handleClose}></i>
        }
      </div>
    )
  }

  const handleSearch = e => {
    const { value } = e.target;
    setFilterData ( value === '' ? data : data.filter ( el => el.name.toLowerCase().includes ( value )));
  }

  const handleSort = () => {
    if ( sort === 'DESC' ) {
      setFilterData ( data.sort (( a, b ) => a.updated - b.updated ));
      setSort ( 'ASC' );
    }
    else {
      setFilterData ( data.sort (( a, b ) => b.updated - a.updated ));
      setSort ( 'DESC' );
    }
  }

  return (
    <div className="App">
      { isLoading ? 'Loading...' : (
            <div className="sidebar">
                <div className="sidebar-header">
                  <h1>Reports {data.length}</h1>
                  {actions()}
                </div>
                <div className="sidebar-search">
                  <input placeholder="search reports" onChange={handleSearch} />
                  <i className="fas fa-sort sort" onClick={handleSort}></i>
                </div>
                <div className="sidebar-list">
                {
                  isOpen ? (
                    filterData.length ? (
                      filterData.map ( el => {
                          const { time, date } = timestampToDate ( el.updated );
                          return (
                            <div key={el.id} className="sidebar-list-item">
                              <div className="name-type">
                                <div className="name">
                                  {el.name}
                                </div>
                                <div className="type-location">
                                  <span className="type">{el.type}</span>
                                  <span className="location">{el.location}</span>
                                </div>
                              </div>
                              <div className="updated">
                                <div>{date}</div>
                                <div>{time}</div>
                              </div>
                            </div>
                          )
                        })
                      )
                      : "No reports"
                  )
                  : <></>
                }
                </div>
              </div>
            )
      }
    </div>
  );
}