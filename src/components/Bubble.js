import React, { forwardRef } from "react";
import AntImage  from "../assets/ant-image.png";
//const URL = "https://loremflickr.com/120/120/ant";

const Bubble = forwardRef(({ text, id }, ref) => (
    
  <div ref={ref}>
    <div className="circle">
    {/* <span
        className="image"
        style={{
          backgroundImage: `url('${URL}?random=${id}')`
        }}
      /> */}
    <img src={AntImage} alt="" className="circle" />
    </div> 
    <br />
    
    <p className="text">{text}</p>
  </div>
));

export default Bubble;