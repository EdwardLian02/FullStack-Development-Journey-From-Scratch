import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import { fetchChartData, fetchCoinData } from "../api/coinGecko";
import { formatPrice } from "../util/formatter";



const CoinDetail = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleFetchingCoinData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchCoinData(id);
      setCoinData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFetchingChartData = async () => {
    try {
      const response = await fetchChartData(id);
      const formattedData = response.prices.map((price) => (
        {
          'time': new Date(price[0]).toLocaleDateString('en-US', {
            month: "short",
            day: "numeric",
          }
          ),
          'price': price[1].toFixed(2)
        }
      ))

      setChartData(formattedData);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchingCoinData();
    handleFetchingChartData();
  }, [id])

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading coin data...</p>
        </div>
      </div>
    );
  }

  if (!CoinDetail) {
    return (
      <div className="app">
        <div className="no-results">
          <p>Coin not found</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="app">
      <div className="no-results">
        <p>Error Found while fetching coin data: {error}</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  }

  const priceChange = coinData.market_data.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;
  return (

    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Crypto Tracker</h1>
            <p>Real-time cryptocurrency prices and market data</p>
          </div>

          <button className="back-button" onClick={() => navigate('/')}>← Back to List</button>
        </div>
      </header>

      <div className="coin-detail">
        <div className="coin-header">
          <div className="coin-title">
            <img
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              alt="Bitcoin"
            />
            <div>
              <h1>{coinData.name} </h1>
              <p className="symbol">{coinData.symbol} </p>
            </div>
          </div>

          <span className="rank">Rank #1</span>
        </div>

        <div className="coin-price-section">
          <div className="current-price">
            <h2>{formatPrice(coinData.market_data.current_price.usd)} </h2>
            <span
              className={`change-badge ${isPositive ? "positive" : "negative"}`}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(priceChange).toFixed(2)}%
            </span>
          </div>

          <div className="price-ranges">
            <div className="price-range">
              <span className="range-label">24h High</span>
              <span className="range-value"> {formatPrice(coinData.market_data.high_24h.usd)}</span>
            </div>

            <div className="price-range">
              <span className="range-label">24h Low</span>
              <span className="range-value"> {formatPrice(coinData.market_data.low_24h.usd)}</span>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Price Chart (7 Days)</h3>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />

              <XAxis
                dataKey="time"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />

              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
                domain={["auto", "auto"]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 40, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#e0e0e0",
                }}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#ADD8E6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">$1.32T</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Volume (24)</span>
            <span className="stat-value">$28.5B</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Circulating Supply</span>
            <span className="stat-value">19,800,000</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Supply</span>
            <span className="stat-value">21,000,000</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
      </footer>
    </div>
  );
};

export default CoinDetail