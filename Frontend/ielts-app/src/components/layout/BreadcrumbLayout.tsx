import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../../assets/css/custom.css";

function BreadcrumbLayout() {
  return (
    <div className="breadcrumb-bar text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <h2 className="breadcrumb-title mb-2">Course Grid</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Course Grid
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadcrumbLayout;