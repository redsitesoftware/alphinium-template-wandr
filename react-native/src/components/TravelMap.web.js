/**
 * TravelMap.web.js — Leaflet map for hotels + attractions
 */
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

if (typeof window !== 'undefined') {
  const L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

function makeIcon(color, emoji) {
  const L = require('leaflet');
  return L.divIcon({
    className: '',
    html: `<div style="background:${color};color:#000;font-size:14px;width:34px;height:34px;
      border-radius:50%;display:flex;align-items:center;justify-content:center;
      border:2px solid rgba(0,0,0,0.3);box-shadow:0 2px 6px rgba(0,0,0,0.5)">${emoji}</div>`,
    iconSize: [34,34], iconAnchor: [17,17], popupAnchor: [0,-20],
  });
}

const hotelIcon = () => makeIcon('#00D4FF', '🏨');
const attractionIcon = (emoji) => makeIcon('#FFD166', emoji);

export default function TravelMap({ hotels, attractions, center }) {
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css'; link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13}
      style={{ width: '100%', height: '100%', background: '#0D1526' }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; CartoDB" maxZoom={19} />
      {hotels.map(h => (
        <Marker key={h.id} position={[h.lat, h.lng]} icon={hotelIcon()}>
          <Popup>
            <div style={{ fontFamily:'sans-serif', minWidth:160 }}>
              <strong>{h.name}</strong>
              <div style={{color:'#666',fontSize:12,margin:'4px 0'}}>{h.area} · {'⭐'.repeat(h.stars)}</div>
              <div style={{fontSize:16,fontWeight:900,color:'#00D4FF'}}>${h.price}<span style={{fontSize:11,color:'#999'}}>/night</span></div>
              <div style={{fontSize:12,color:'#333',marginTop:4}}>{h.rating}/10 · {h.reviews.toLocaleString()} reviews</div>
              <button onClick={() => typeof window !== 'undefined' && window.open(h.bookUrl,'_blank')}
                style={{marginTop:8,background:'#00D4FF',color:'#000',border:'none',
                  borderRadius:6,padding:'6px 12px',cursor:'pointer',fontSize:12,fontWeight:700}}>
                Book on {h.provider} →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      {attractions.map(a => (
        <Marker key={a.id} position={[a.lat, a.lng]} icon={attractionIcon(a.emoji)}>
          <Popup>
            <div style={{ fontFamily:'sans-serif' }}>
              <strong>{a.name}</strong>
              <div style={{fontSize:12,color:'#666',marginTop:4}}>{a.type} · {a.free ? '✅ Free entry' : '🎟️ Paid entry'}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
