

  export const isMobileNo=(mobileNo:string)=>{
    mobileNo = mobileNo.replace(/[-\s]/g, '');
  
    // Check if the string consists of 11 digits and starts with 01
    const regex = /^01[3-9]\d{8}$/;
  
    return regex.test(mobileNo);
  }