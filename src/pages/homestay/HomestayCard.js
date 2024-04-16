import React from 'react'

const HomestayCard = ({homestay}) => {
  return (
    <div className="searchItem">
      <img
        src={homestay.homestayImg}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{homestay.homestayName}</h1>
        <span className="siDistance">{homestay.homestayType}</span>
        <span className="siDistance">{homestay.city}</span>
        <span className="siDistance">{homestay.homestayAddress}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          {homestay.description}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$112</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  )
}

export default HomestayCard