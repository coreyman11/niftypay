import { useState, useContext, useEffect, useCallback } from "react";
import '../App.css';

interface NiftyProps {
  jsonRawData: any
}

export const Nifty: React.FC<NiftyProps> = (props) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>();
  const [niftyName, setNiftyName] = useState<string | undefined>();

  const fetchNFT = useCallback(async (arweaveUri: string) => {
    const resp = await fetch(arweaveUri);
    const json = await resp.json();
    setNiftyName(json.name);
    setImgSrc(json.image);
  }, [])

  useEffect(() => {
    fetchNFT(props.jsonRawData);
  }, [fetchNFT, props.jsonRawData]);

  return (
    <div className="niftyContainer">
      <img className="niftyImg" src={imgSrc}></img>
      <div className="niftyLabel">{niftyName}</div>
    </div>
  );
};
