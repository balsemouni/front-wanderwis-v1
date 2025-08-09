import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { FaUsers, FaMapMarkerAlt, FaGlobe, FaPlane, FaLeaf, FaMountain } from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    locationCount: 0,
    countryCount: 0,
    travelCount: 0,
    countryRanking: [],
    continentData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        userCount: 1243,
        locationCount: 567,
        countryCount: 89,
        travelCount: 4321,
        countryRanking: [
          { country: 'Italy', travelers: 892 },
          { country: 'Japan', travelers: 765 },
          { country: 'France', travelers: 721 },
          { country: 'Spain', travelers: 689 },
          { country: 'Thailand', travelers: 543 },
          { country: 'USA', travelers: 512 },
          { country: 'Greece', travelers: 487 },
          { country: 'Portugal', travelers: 432 },
          { country: 'Croatia', travelers: 398 },
          { country: 'Vietnam', travelers: 356 }
        ],
        continentData: [
          { name: 'Europe', value: 3239 },
          { name: 'Asia', value: 1664 },
          { name: 'North America', value: 512 },
          { name: 'South America', value: 287 },
          { name: 'Africa', value: 198 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  // Pastel color palette
  const getColorShade = (index) => {
    const pastelColors = [
  "#1E3334", // Deep Teal (cool base)
  "#90A4AB", // Muted Steel Blue (neutral cool)
  "#8A5A44", // Burnt Sienna (muted warm red-brown)
  "#C9A46C", // Desert Gold (warm sand tone)
  "#627D71", // Dusty Sage Green (soft contrast)
  "#A3A9CE", // Smoky Lavender Blue (muted pastel)
  "#6C4F6B", // Faded Plum (moody muted purple)
  "#BDAE9C", // Warm Taupe (balanced neutral)
  "#D5D9CE" , // Pale Mist Green (highlight soft neutral)
     "#2A3026", // Deep Olive Green (earthy anchor)

];


    return pastelColors[index % pastelColors.length];
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="dashboard-header">
        <h1>WanderWise Admin Dashboard</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleString()}</p>
      </header>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers size={28} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.userCount.toLocaleString()}</p>
            <p className="stat-change">↑ 12% from last month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaMapMarkerAlt size={28} />
          </div>
          <div className="stat-content">
            <h3>Total Locations</h3>
            <p className="stat-value">{stats.locationCount.toLocaleString()}</p>
            <p className="stat-change">↑ 8% from last month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaGlobe size={28} />
          </div>
          <div className="stat-content">
            <h3>Total Countries</h3>
            <p className="stat-value">{stats.countryCount.toLocaleString()}</p>
            <p className="stat-change">↑ 3% from last month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaPlane size={28} />
          </div>
          <div className="stat-content">
            <h3>Total Travels</h3>
            <p className="stat-value">{stats.travelCount.toLocaleString()}</p>
            <p className="stat-change">↑ 15% from last month</p>
          </div>
        </div>
      </div>
      
      <div className="data-visualization">
        <div className="continent-section">
          <div className="section-header">
            <h2>Top 5 Continents by Travelers</h2>
          </div>
          <div className="continent-visualization">
            <div className="continent-chart">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.continentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.continentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorShade(index)} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="continent-list">
              {stats.continentData.map((continent, index) => (
                <div key={continent.name} className="continent-item">
                  <div className="continent-info">
                    <span className="continent-rank">{index + 1}</span>
                    <span className="continent-name">{continent.name}</span>
                    <span className="continent-travelers">{continent.value.toLocaleString()} travelers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="countries-section">
          <div className="section-header">
            <h2>Top Countries by Travelers</h2>
          </div>
          <div className="countries-chart">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={stats.countryRanking}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" />
                <YAxis 
                  dataKey="country" 
                  type="category" 
                  width={90} 
                  stroke="#666"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar 
                  dataKey="travelers" 
                  name="Travelers" 
                  radius={[0, 4, 4, 0]}
                >
                  {stats.countryRanking.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getColorShade(index)} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;