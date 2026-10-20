import React, { useEffect, useState } from 'react'
import { fetchCryptos } from '../api/coinGecko';
import { CryptoCard } from '../components/CryptoCard';

const Home = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Rank")



    const fetchCryptoData = async () => {
        try {
            const response = await fetchCryptos();
            setCryptoList(response);

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }

    const filterAndSort = () => {
        const filtered = cryptoList.filter((crypto) => crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()))

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "price":
                    return a.current_price - b.current_price;
                case "price_desc":
                    return b.current_price - a.current_price;
                case "change":
                    return a.price_change_percentage_24h - b.price_change_percentage_24h;
                case "market_cap":
                    return a.market_cap - b.market_cap;
                default:
                    return a.market_cap_rank - b.market_cap_rank;
            }
        });


        setFilteredList(filtered)
    }

    useEffect(() => {
        // const interval = setInterval(fetchCryptoData, 3000);

        // return () => clearInterval(interval);

        fetchCryptoData();
    }, [])

    useEffect(() => {
        filterAndSort();

    }, [searchQuery, sortBy, cryptoList]);





    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1>🚀 Crypto Tracker</h1>
                        <p>Real-time cryptocurrency prices and market data</p>
                    </div>
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search cryptos..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>
            <div className="controls">
                <div className="filter-group">
                    <label>Sort by:</label>
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="market_cap_rank">Rank</option>
                        <option value="name">Name</option>
                        <option value="price">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                        <option value="change">24h Change</option>
                        <option value="market_cap">Market Cap</option>
                    </select>
                </div>
                <div className="view-toggle">
                    <button
                        className={`${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        Grid
                    </button>
                    <button
                        className={`${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        List
                    </button>
                </div>
            </div>


            {
                isLoading && !cryptoList ? <div className="loading">
                    <div className="spinner" />
                    <p>Loading crypto data...</p>
                </div>
                    :
                    <div className={`crypto-container ${viewMode === 'grid' ? 'grid' : ''}`}>
                        {
                            filteredList.map((c) => (
                                <CryptoCard key={c.id} crypto={c} />
                            ))
                        }
                    </div>

            }




            <footer className="footer">
                <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
            </footer>
        </div>
    );
}

export default Home