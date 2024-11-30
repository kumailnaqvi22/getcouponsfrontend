import React from "react";
import "./HomeAbout.css"; // Create this CSS file for styling

const HomeAbout = () => {
  return (
    <div className="home-about-container">
      <div className="home-about-content">
        {/* Image Section */}
        <div className="home-about-image">
          <img
            src="https://cdn-assets.valuecom.com/_nuxt/assets/img/icons/value.com/home-image-sale.cb02f09.webp"
            alt="Discount Offers"
          />
        </div>

        {/* Text Section */}
        <div className="home-about-text">
          <h1>Couponsworth.com is your source for discount codes and source of inspiration</h1>
          <p>
            Welcome to couponsworth.com! Our mission is to reduce your shopping costs for online shopping. 
            We organize our promotional events according to the promotions of more than 20,000 online stores we work with. 
            You'll find the latest deals from across the web each month at couponsworth.com. Whether you're looking for kitchenware, 
            electronics, hardware equipment, apparel; from student discounts to free shipping promotions, to holiday sales, 
            we have all your needs covered. A wide selection of 2024 top-brand coupons and discount codes are waiting for you here, 
            and you won't be able to resist!
          </p>
          <p>
            By clicking on your favorite stores, you will find the best coupon codes, and we want you to know about every 
            new deal and promo code that will save your budget immediately. Couponsworth.com also keeps trying to discover 
            new online stores that you may be interested in so that you can have fun shopping! Whatever the problem, you can 
            send an email via “contact us” and we will handle it for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
