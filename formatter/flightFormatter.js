// formatter/flightFormatter.js
const formatData = (data, type) => {
  return {
    status: "success", // সফল অপারেশন নির্দেশ করে
    type: type, // ডেটার ধরন (যেমন airlines, airports, bd_districts)
    data: data,
    name: "Powered by Hasan",
    timestamp: new Date().toISOString(), // বর্তমান সময় যোগ করা হচ্ছে
  };
};

module.exports = formatData;
