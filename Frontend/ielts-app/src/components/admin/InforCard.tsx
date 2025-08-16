import React from "react";

export interface AdminBasicInfo {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  role: string;
}

const infoList: AdminBasicInfo[] = [
  {
    id: "1",
    fullName: "Nguyen Thanh Duy",
    email: "[email@protected]",
    phoneNumber: "89104-71829",
    createdAt: "16 Jan 2024, 11:15 AM",
    role: "Instructor"
  },
];

function InforCard() {
  return (
    <>
      {infoList.map((info, idx) => (
        <div className="card" key={idx}>
          <div className="card-body">
            <h5 className="fs-18 pb-3 border-bottom mb-3">Basic Information</h5>
            <div className="row">
              <div className="col-md-4"><div className="mb-3"><h6>Id</h6><span>{info.id}</span></div></div>
              <div className="col-md-4"><div className="mb-3"><h6>Full Name</h6><span>{info.fullName}</span></div></div>
              <div className="col-md-4"><div className="mb-3"><h6>Email</h6><span>{info.email}</span></div></div>
              <div className="col-md-4"><div className="mb-3"><h6>Phone Number</h6><span>{info.phoneNumber}</span></div></div>
              <div className="col-md-4"><div className="mb-3"><h6>Role</h6><span>{info.role}</span></div></div>
              <div className="col-md-4"><div className="mb-3"><h6>Created at</h6><span>{info.createdAt}</span></div></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default InforCard;
