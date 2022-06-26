import React from "react";
import style from "./Form.module.css";
class Form extends React.Component {
  render() {
    return (
      <div className={`${style["form_container"]} `}>
        <form className={`${style["form"]} bg-dark`}>
          <div className={`${style["input_container"]}`}>
            <label for="pname">Product name:</label>
            <input type="text" id="pname" name="pname"></input>
          </div>
          <div className={`${style["input_container"]}`}>
            <label for="pprice">Product price:</label>
            <input type="text" id="pprice"></input>
          </div>
          <div className={`${style["input_container"]}`}>
            <label for="pdesc">Product description:</label>
            <textarea rows={"5"} cols="30" id="pdesc"></textarea>
          </div>

          {/* <label for="pprice">Product image:</label> */}
        </form>
      </div>
    );
  }
}
export default Form;
