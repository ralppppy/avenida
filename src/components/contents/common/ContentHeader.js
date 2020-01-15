import React from "react"

function ContentHeader({ title }) {
   return (
      <div className="content-header">
         <div className="container-fluid">
            <div className="row mb-2">
               <div className="col-sm-6">
                  <h1 className="m-0 text-dark">{title}</h1>
               </div>
               <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right"></ol>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContentHeader
