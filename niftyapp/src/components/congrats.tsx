import '../App.css';
import { useState, useContext, useEffect } from "react";
import {
  Link,
} from "react-router-dom";

interface CongratsProps {
 
}

export const Congrats: React.FC<CongratsProps> = (props) => {

  useEffect(() => {
    console.log("Congrats!");
  }, [])

  return (
    <div className="homeContainer container">
            <div className="header">Congrats! 🎉</div>
            <div className="subheader">You've sent your payment. Enjoy!</div>
            <Link to="/" className="button">Go Back to Projects</Link>
        </div>
  );
};
