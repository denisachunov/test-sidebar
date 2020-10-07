import React, { useEffect, useState } from 'react';
import Actions from './components/Actions';
import SidebarList from './components/SidebarList';
import requestData from './transport';
import { DEFAULT_SORT } from './const';
import './App.css';

export default () => {

  const [ data, setData ] = useState ( [] );
  const [ filterData, setFilterData ] = useState ( [] );
  const [ isLoading, setIsLoading ] = useState ( false );
  const [ isOpen, setIsOpen ] = useState ( true );
  const [ sort, setSort ] = useState ( DEFAULT_SORT );

  const getData = async () => {
    setIsLoading ( true );
    try {
      const sortedData = await requestData ( sort );
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

  const handleSearch = e => {
    const { value } = e.target;
    setFilterData ( value === '' ? data : data.filter ( el => el.name.toLowerCase().includes ( value )));
  }

  const handleSort = () => {
    setFilterData ( data.sort (( a, b ) => ( sort === 'DESC' ? 1 : -1 ) * ( b.updated - a.updated )));
    setSort ( sort === 'DESC' ? 'ASC' : 'DESC' );
  }

  return (
    <div className="App">
      {
        isLoading ? 'Loading...' : (
          <div className="sidebar">
              <div className="sidebar-header">
                <h1>Reports {data.length}</h1>
                <Actions { ...{ isOpen, setIsOpen, getData }} />
              </div>
              {
                isOpen ? (
                  <>
                    <div className="sidebar-search">
                      <input placeholder="search reports" onChange={handleSearch} />
                      <i className="fas fa-sort sort" onClick={handleSort}></i>
                    </div>
                    <SidebarList filterData={filterData} />
                  </>
                )
                : <></>
              }
          </div>
        )
      }
    </div>
  );
}