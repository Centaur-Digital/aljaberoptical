import React, { FC, useState } from "react";
import * as FeatherIcon from "react-feather";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

interface Props {
  glassType: string;
}



const CheckoutCountLayout: FC<Props> = ({ glassType })=> {
  const GLASS_NAME = glassType === 'EYE_GLASS' ? 'ROUND HAVANA EYEGLASSES' : 'Gunmetal Square Sunglasses';


  const currencyRates:any = 
  
  glassType ==='EYE_GLASS'?
  {
    AE: { label: "AED", rate: "1,100.00", symbol: "AED" },
    IN: { label: "INR", rate: "22,446.63", symbol: "₹" },
    US: { label: "USD", rate: "312.75", symbol: "$" },
    CA: { label: "CAD", rate: "410.83", symbol: "CAD" },
    GB: { label: "GBP", rate: "194.29", symbol: "£" },
    JP: { label: "JPY", rate: "33,921.58", symbol: "¥" },
    FR: { label: "EUR", rate: "245.42", symbol: "€" },
    CH: { label: "CHF", rate: "255.82", symbol: "CHF" },
  }
  :
  {
    AE: { label: "AED", rate: "1,275.00", symbol: "AED" },
    IN: { label: "INR", rate: "28,854.38", symbol: "₹" },
    US: { label: "USD", rate: "387.94", symbol: "$" },
    CA: { label: "CAD", rate: "506.99", symbol: "CAD" },
    GB: { label: "GBP", rate: "241.92", symbol: "£" },
    JP: { label: "JPY", rate: "42,065.51", symbol: "¥" },
    FR: { label: "EUR", rate: "304.27", symbol: "€" },
    CH: { label: "CHF", rate: "315.71", symbol: "CHF" },
  };
  
  const GLASS_TITLE = "Giorgio Armani";
  
  const currencyOptions = Object.keys(currencyRates).map((code) => (
    <MenuItem key={code} value={code}>
      {currencyRates[code].label}
    </MenuItem>
  ));


  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState("AE");
  const [priceInCurrency, setPriceInCurrency] = useState(glassType === 'EYE_GLASS' ? "AED 1,100.00" :"AED 1,275.00");

  const handleCurrencyChange = (event: any) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    setPriceInCurrency(
      `${currencyRates[selectedCurrency].symbol} ${currencyRates[selectedCurrency].rate}`
    );
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    handleCurrencyChange({ target: { value: currency } });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      handleCurrencyChange({ target: { value: currency } });
    }
  };

  return (
    <React.Fragment>
      <div className="text-[#233468] md:text-3xl text-2xl mb-4 md:mb-4 font-bold mt-16 md:mt-0 md:p-0 p-2">
        {GLASS_TITLE}
      </div>

      <div className="mt-24">
        <div className="font-bold text-2xl md:p-0 p-2 mb-4">
          {GLASS_NAME}
        </div>
        <div className="flex flex-row space-x-4 mb-8">
          <div className="flex flex-row space-x-1 md:text-sm md:p-0 p-2 text-xs text-gray-500">
            <FeatherIcon.Star className="md:text-xs text-sm" />
            <FeatherIcon.Star className="md:text-xs text-sm" />
            <FeatherIcon.Star className="md:text-xs text-sm" />
            <FeatherIcon.Star className="md:text-xs text-sm" />
            <FeatherIcon.Star className="md:text-xs text-sm" />
            <FeatherIcon.Star className="md:text-xs text-sm" />
          </div>
          <div className="text-gray-500 font-medium">{` Be the first to review this product`}</div>
        </div>

        <div className="h-1 w-full bg-gray-200 mb-6"></div>
        <div className="text-3xl text-[#222529] font-bold mb-4 flex flex-row space-x-16">
    <div>      {priceInCurrency}</div>
          <FormControl className=" w-1/2" >
          <InputLabel id="currency-select-label" className="bg-white p-2">
            Currency
          </InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency}
            onChange={handleCurrencyChange}
          >
            {currencyOptions}
          </Select>
        </FormControl>
        </div>
        <div>
          <div className="font-thin text-md flex flex-row mb-8">
            {`AVAILABILITY : `}{" "}
            <div className="font-bold ml-2">{` IN STOCK`}</div>
          </div>
        </div>
        <div className="w-full border border-gray-100"></div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 w-full ">
          <div className="h-28 w-full flex md:flex-row flex-col space-x-4 items-center ">
            <div className="md:w-1/2 md:p-0 p-2 w-full h-full flex items-center justify-center  space-x-4">
            <div className="h-3/5 w-full md:w-1/2 border border-gray-200 flex flex-row ">
              <div
                className="w-3/12 h-full border flex justify-center text-3xl cursor-pointer items-center border-gray-200 "
                onClick={decrementQuantity}
              >{` - `}</div>
              <div className="flex-1 border flex items-center justify-center text-2xl font-extrabold border-gray-200">
                {quantity}
              </div>
              <div
                className="w-3/12 h-full border flex items-center text-3xl justify-center cursor-pointer border-gray-200 "
                onClick={incrementQuantity}
              >{` + `}</div>
            </div>
            <div className="h-3/5 w-full md:w-1/2 border border-gray-200 bg-black text-white font-black flex flex-row space-x-4 hover:bg-[#222529] cursor-pointer items-center justify-center ">
              <FeatherIcon.ShoppingBag />
              <div>{`ADD TO CART`}</div>
            </div>
            </div>
            <div className="h-3/5 w-full md:w-1/2 text-white font-black flex flex-row space-x-4 cursor-pointer">
              <div className="h-4/6 mt-0 left-0 w-12 flex items-center justify-center border text-gray-800 border-gray-200">
                <FeatherIcon.Heart size={28} />
              </div>
              <div className="h-4/6 mt-0 left-0 w-12 flex items-center justify-center font-extrabold border text-gray-800 border-gray-200">
                <FeatherIcon.BarChart size={28} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border border-gray-100 mb-8"></div>
        <div className="flex flex-row space-x-4">
          <div className="rounded-full border-gray-200 border-4 p-2">
            <FeatherIcon.Facebook />
          </div>
          <div className="rounded-full border-gray-200 border-4 p-2">
            <FeatherIcon.Twitter />
          </div>
          <div className="rounded-full border-gray-200 border-4 p-2">
            <FeatherIcon.Linkedin />
          </div>
          <div className="rounded-full border-gray-200 border-4 p-2">
            <FeatherIcon.Mail />
          </div>
        </div>

  
      </div>
    </React.Fragment>
  );
}
export default CheckoutCountLayout;