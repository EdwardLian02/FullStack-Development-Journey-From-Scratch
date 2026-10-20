import { useEffect } from "react";
import { formatMarketCap, formatPrice } from "../util/formatter";

export const CryptoCard = ({crypto}) => {
  useEffect(() => {
    console.log(crypto.image)
  }, [])
  return (
    <div className="crypto-card">
      <div className="crypto-header">
        <div className="crypto-info">
          <img src={crypto.image} alt="Bitcoin" />

          <div>
            <h3>{crypto.name} </h3>
            <p className="symbol">{crypto.symbol} </p>
            <span className="rank">#1</span>
          </div>
        </div>
      </div>

      <div className="crypto-price">
          <p className="price">{formatPrice(crypto.current_price)}</p>
        <p className={`change ${crypto.price_change_percentage_24h >=0? "positive": "negative"}`}>
          {crypto.price_change_percentage_24h >= 0 ? "↑" : "↓"}{" "}
         {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          
          </p>
      </div>

      <div className="crypto-stats">
        <div className="stat">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">
            ${formatMarketCap(crypto.market_cap)}
            </span>
        </div>

        <div className="stat">
          <span className="stat-label">Volume</span>
          <span className="stat-value">$28.5B</span>
        </div>
      </div>
    </div>
  );
};