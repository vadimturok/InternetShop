import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
export const Footer = () => {
  return (
    <MDBFooter style={{backgroundColor: "#E0E0E0"}} className="font-small mt-5">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <p>All Rights Reserved</p>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};
export default Footer;
