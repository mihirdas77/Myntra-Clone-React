import React, { useState } from "react";
// import "./styles.css";

import CardReactFormContainer from "card-react";
import "card-react/lib/card.css";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// import Plastic from "react-plastic";

export default function Payment() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const navigate =useNavigate()
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeNumber = (e) => {
    setNumber(e.target.value);
  };
  const changeExpiry = (e) => {
   
    setExpiry(e.target.value);
  };
  const changeCvv = (e) => {
    setCvc(e.target.value);
  };

  return (
    <> 
  <Heading color='blue.700' mt='40px' fontWeight={500}>Procced To Your Payment</Heading>
    <Box className="App" width={{base:'90%',lg:'60%'}} margin='auto' marginTop='40px'  marginBottom='30px' display={{lg:'flex'}} justifyContent={{lg:'space-evenly'}}>
      {/* <Plastic
        type="mastercard"
        name="Peter Sagan"
        expiry="10/20"
        number="444466666655555"
        cvc="3333"
        back={false}
      /> */}

      <div id="card-wrapper"></div>
      <br />
      <br />
      <CardReactFormContainer
        // the id of the container element where you want to render the card element.
        // the card component can be rendered anywhere (doesn't have to be in ReactCardFormContainer).
        container="card-wrapper" // required
        // an object contain the form inputs names.
        // every input must have a unique name prop.
        formInputsNames={{
          number: "CCnumber", // optional — default "number"
          expiry: "CCexpiry", // optional — default "expiry"
          cvc: "CCcvc", // optional — default "cvc"
          name: "CCname" // optional - default "name"
        }}
        // initial values to render in the card element
        initialValues={{
          number: "4242424242424242", // optional — default •••• •••• •••• ••••
          cvc: " ", // optional — default •••
          expiry: " ", // optional — default ••/••
          name: "Cardholder Name" // optional — default FULL NAME
        }}
        // the class name attribute to add to the input field and the corresponding part of the card element,
        // when the input is valid/invalid.
        classes={{
          valid: "valid-input", // optional — default 'jp-card-valid'
          invalid: "invalid-input" // optional — default 'jp-card-invalid'
        }}
        // specify whether you want to format the form inputs or not
        formatting={false} // optional - default true
      >
        <form>
          <Input
            value={name}
            onChange={changeName}
            type="text"
            name="CCname"
            placeholder="Enter Cardholder Name"
          />
          <br />
          <br />
          <Input
            value={number}
            onChange={changeNumber}
            type="text"
            name="CCnumber"
            placeholder="Card Number"
          />
          <br />
          <br />
          <Input
            value={expiry}
            onChange={changeExpiry}
            type="text"
            name="CCexpiry"
            placeholder="Enter mm/yy"
          />
          <br />
          <br />
          <Input
            value={cvc}
            onChange={changeCvv}
            type="text"
            name="CCcvc"
            placeholder="Enter CVC here"
          />
          <br />
          <br />
          <Box>

          <Button onClick={()=>navigate('/success')} padding='10px 100px' _hover={{cursor:'pointer',bg:'green.500',color:'white'}}>Submit</Button>
          </Box>
        </form>
      </CardReactFormContainer>
    </Box>
    </>
  );
}
