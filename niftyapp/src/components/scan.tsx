import { useEffect, useState } from "react";
import '../App.css';
import { Tab } from "../types";
import { parseURL } from '@solana/pay';
const QrReader = require('react-qr-scanner');

interface ScanProps {
  setTab: (tab: Tab) => void;
  setProps: (props: any) => void;
}

//hard coding pay url for now. Remove this for Scanner
const PAY_URL =
    'solana:HTgS8ZvA2kFJ7iQwacKrGndeqas7LkiuviAZiysGUEVP?amount=0.01&reference=UZVpbo8tMziKMvbAC6FgTFGntqKgvQMv2GuaExEPSDf&label=Michael&message=Thanks%20for%20all%20the%20fish&memo=OrderId5678';
export const Scan: React.FC<ScanProps> = (props) => {
  const [url, setUrl] = useState('');
  const [urlData, setUrlData] = useState({});

  useEffect(() => {
    setUrl(PAY_URL);
    return () => setUrl('');
  },[]);

  useEffect(() => {
    if(url) {
      setUrlData(parseURL(url))
    }
  },[url]);
  return (
    <div className="scanContainer container">
      <div className="top">
        <img src="./backarrow.png" onClick={() => props.setTab(Tab.Home)} height="20px" className="backArrow" alt=""></img>
        <p className="header">Scan QR Code</p>
        <p>&nbsp; &nbsp; &nbsp;</p>
      </div>
      <div className="content" onClick={() => {props.setTab(Tab.Benefits); props.setProps({ urlData })}}>
        {!url && <QrReader
          delay={200}
          onError={console.error}
          onScan={(data: any) => { console.log(data); setUrl(data?.text) }}
        />
        }
        <p>{url}</p>
      </div>
    </div>
  );
};
