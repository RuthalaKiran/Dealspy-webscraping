import React from "react";

const About = () => {
  return (
    <section className="py-20 px-20  flex flex-col gap-10">
      <h2 className="text-center text-2xl font-bold">About DealSpy</h2>
      <div className="flex flex-col gap-2 text-gray-600">
        <p>
          {" "}
          Welcome to DealSpy, your go-to solution for smart shopping and saving
          on Amazon. Our mission is to help you find the best deals and
          discounts on your favorite products, making your shopping experience
          efficient and cost-effective.
        </p>
        <p>
          {" "}
          At DealSpy, we use advanced web scraping technology to monitor prices
          and alert you when there are price drops or special discounts on
          products you love. Simply enter the Amazon link of the product you
          want to track, and we'll do the rest. Our user-friendly interface and
          powerful tracking features ensure you never miss out on a great deal.
        </p>
      </div>
      <div className=" flex flex-col gap-2">
      <p className="text-xl text-gray-800 font-semibold">Why choose DealSpy?</p>
      <ul className="flex flex-col gap-1 text-gray-600">
        <li>Easy-to-use platform: Track prices with just a few clicks.</li>
        <li>Real-time alerts: Get notified immediately when prices drop.</li>
        <li>Save money: Always buy at the best price.</li>
        <li>Comprehensive tracking: Monitor multiple products effortlessly.</li>
      </ul>
      </div>
    </section>
  );
};

export default About;
