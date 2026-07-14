import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use a ref so the recursive setTimeout always calls the latest version
  const fetchRef = useRef(null);

  const fetchPortfolio = useCallback(async (retriesLeft = 4, delay = 1000) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout per attempt
      const res = await fetch(`${API_URL}/api/portfolio`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && data.data) {
        setPortfolio(data.data);
        setLoading(false);
      } else {
        throw new Error(data.message || 'Invalid response');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.warn(`Portfolio fetch timed out. Retries left: ${retriesLeft}`);
      } else {
        console.error(`Portfolio fetch failed (retries left: ${retriesLeft}):`, err.message);
      }
      if (retriesLeft > 0) {
        // Use ref to call latest version of fetchPortfolio (avoids stale closure)
        setTimeout(() => fetchRef.current?.(retriesLeft - 1, Math.min(delay * 1.5, 8000)), delay);
      } else {
        console.error('Portfolio fetch exhausted all retries.');
        setLoading(false);
      }
    }
  }, []);

  // Always keep ref in sync with latest callback
  useEffect(() => {
    fetchRef.current = fetchPortfolio;
  }, [fetchPortfolio]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return (
    <PortfolioContext.Provider value={{ portfolio, loading, fetchPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
