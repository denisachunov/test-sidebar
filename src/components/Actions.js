import React from 'react';

export default props => {
    const handleClose = () => {
      props.setIsOpen ( !props.isOpen );
    }
    return (
      <div className="sidebar-actions">
        {
          props.isOpen ? (
            <>
              <i className="fas fa-redo-alt" onClick={props.getData}></i>
              <i className="fas fa-times" onClick={handleClose}></i>
            </>
          )
          : <i className="far fa-folder-open" onClick={handleClose}></i>
        }
      </div>
    )
  }