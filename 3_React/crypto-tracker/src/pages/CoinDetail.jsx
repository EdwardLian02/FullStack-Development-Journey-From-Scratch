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




const chartData = [
  { time: "Oct 14", price: 62000 },
  { time: "Oct 15", price: 63500 },
  { time: "Oct 16", price: 62800 },
  { time: "Oct 17", price: 65100 },
  { time: "Oct 18", price: 64300 },
  { time: "Oct 19", price: 66800 },
  { time: "Oct 20", price: 67450 },
];

 const CoinDetail = () => {

  const navigate = useNavigate();
  const param = useParams();
  
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
              <h1>Bitcoin</h1>
              <p className="symbol">BTC</p>
            </div>
          </div>

          <span className="rank">Rank #1</span>
        </div>

        <div className="coin-price-section">
          <div className="current-price">
            <h2>$67,450.00</h2>
            <span className="change-badge positive">↑ 2.45%</span>
          </div>

          <div className="price-ranges">
            <div className="price-range">
              <span className="range-label">24h High</span>
              <span className="range-value">$68,200.00</span>
            </div>

            <div className="price-range">
              <span className="range-label">24h Low</span>
              <span className="range-value">$65,900.00</span>
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