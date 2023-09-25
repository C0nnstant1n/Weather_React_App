import * as React from "react";
import "./banner.scss";
export default function Banner(props) {
  return (
    <>
      <div className='banner'>
        <div className='banner-filter'>
          <div className='banner-wraper'>
            <div className='banner-content'>
              <h3>Тут могла быть ваша рекламма</h3>
              <span>{props.children}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
