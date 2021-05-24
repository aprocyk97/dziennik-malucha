import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner from '../../../media/banner.jpg';
import photo1 from '../../../media/1.jpg';
import photo2 from '../../../media/2.jpg';
import photo3 from '../../../media/3.jpg';
import photo4 from '../../../media/4.jpg';
import photo5 from '../../../media/5.jpg';

import styled from "styled-components";

const Logo = styled.img`
    width: 100%;
    max-width: 100%;
    height: 300px;
    margin: 0;
    object-position:  0% 39%;
    position: relative;
    object-fit: cover;
    
`;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Logo src={photo1}/>
          </div>
          <div>
            <Logo src={photo2}/>
          </div>
          <div>
            <Logo src={photo3}/>
          </div>
          <div>
            <Logo src={photo4}/>  
          </div>
          <div>
          <Logo src={photo5}/>
          </div>
        </Slider>
      </div>
    );
  }
}