import { useRef, useState, useCallback } from "react";
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

const PROTOCOL_MARKERS = [
  { name: "Uniswap", color: "#FF007A", lng: -74.006, lat: 40.7128, value: "$12.4K" },
  { name: "Aave", color: "#B6509E", lng: 2.3522, lat: 48.8566, value: "$8.2K" },
  { name: "Lido", color: "#00A3FF", lng: 37.6173, lat: 55.7558, value: "$15.6K" },
  { name: "Compound", color: "#00D395", lng: -122.4194, lat: 37.7749, value: "$3.1K" },
  { name: "Curve", color: "#FF6B6B", lng: 139.6917, lat: 35.6895, value: "$5.8K" },
  { name: "MakerDAO", color: "#1AAB9B", lng: -0.1276, lat: 51.5074, value: "$7.3K" },
];

interface HoveredProtocol {
  name: string;
  value: string;
  color: string;
  x: number;
  y: number;
}

export default function ExplorePage() {
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hovered, setHovered] = useState<HoveredProtocol | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
    const map = mapRef.current?.getMap();
    if (map) {
      map.setFog({
        color: "rgb(230, 235, 240)",
        "high-color": "rgb(180, 200, 220)",
        "horizon-blend": 0.08,
        "space-color": "rgb(210, 220, 235)",
        "star-intensity": 0.15,
      });
    }
  }, []);

  const handleProtocolClick = (name: string, lng: number, lat: number) => {
    setSelectedProtocol(name);
    setSidebarOpen(true);
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 5,
      duration: 1500,
      essential: true,
    });
  };

  return (
    <div className="h-screen w-screen bg-background relative overflow-hidden">
      {/* Top nav bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4 md:px-8">
          <a href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Orbitfolio
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="/explore" className="text-sm text-foreground font-medium">
              Explore
            </a>
          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-foreground border border-border hover:border-primary/50 hover:bg-primary/5 transition-all px-4 py-2 rounded-lg">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Sidebar panel */}
      <div
        className={`absolute top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-[380px] bg-background/95 backdrop-blur-xl border-r border-border transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-8 top-4 z-50 w-8 h-8 bg-background border border-border rounded-r-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen ? <path d="M9 2L4 7l5 5" /> : <path d="M5 2l5 5-5 5" />}
          </svg>
        </button>

        {/* Header */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg mb-4">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="7" />
              <path d="M8 1a11 11 0 0 1 3 7 11 11 0 0 1-3 7 11 11 0 0 1-3-7 11 11 0 0 1 3-7z" />
              <path d="M1 8h14" />
            </svg>
            <span className="text-sm font-medium">Protocols ({PROTOCOL_MARKERS.length})</span>
          </div>

          <div className="relative">
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <circle cx="6" cy="6" r="5" />
              <path d="M13 13l-3-3" />
            </svg>
            <input
              type="text"
              placeholder="Search protocols..."
              className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        {/* Protocol list */}
        <div className="divide-y divide-border">
          {PROTOCOL_MARKERS.map((protocol) => (
            <button
              key={protocol.name}
              onClick={() => handleProtocolClick(protocol.name, protocol.lng, protocol.lat)}
              className={`w-full text-left px-5 py-4 hover:bg-card/80 transition-colors flex items-center gap-4 ${
                selectedProtocol === protocol.name ? "bg-card" : ""
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${protocol.color}15` }}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: protocol.color }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="label-caps text-muted-foreground/60 text-2xs">DeFi</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {protocol.name}
                </h3>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground">{protocol.value} value</span>
                </div>
              </div>

              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground shrink-0">
                <path d="M5 2l5 5-5 5" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="absolute inset-0 pt-14">
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: 10,
            latitude: 30,
            zoom: 1.5,
          }}
          projection={{ name: "globe" } as any}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          onLoad={handleMapLoad}
          attributionControl={false}
          renderWorldCopies={false}
        >
          {PROTOCOL_MARKERS.map((protocol) => (
            <Marker
              key={protocol.name}
              longitude={protocol.lng}
              latitude={protocol.lat}
              anchor="center"
              onClick={() => handleProtocolClick(protocol.name, protocol.lng, protocol.lat)}
            >
              <div
                className="relative cursor-pointer group"
                onMouseEnter={(e) =>
                  setHovered({
                    name: protocol.name,
                    value: protocol.value,
                    color: protocol.color,
                    x: e.clientX,
                    y: e.clientY,
                  })
                }
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="absolute -inset-3 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: protocol.color }}
                />
                <div
                  className="w-4 h-4 rounded-full border-2 shadow-lg transition-transform group-hover:scale-150"
                  style={{
                    backgroundColor: protocol.color,
                    borderColor: "hsl(var(--background))",
                    boxShadow: `0 0 12px ${protocol.color}80`,
                  }}
                />
              </div>
            </Marker>
          ))}
        </Map>

        {!mapLoaded && (
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Loading globe...</p>
            </div>
          </div>
        )}
      </div>

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="fixed z-[100] pointer-events-none bg-background/95 backdrop-blur-sm border border-border px-4 py-3 rounded-xl shadow-lg"
          style={{ left: hovered.x + 16, top: hovered.y - 20 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hovered.color }} />
            <span className="text-sm font-semibold text-foreground">{hovered.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{hovered.value} in positions</span>
        </div>
      )}

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 md:px-8 py-2">
          <span className="text-2xs text-muted-foreground">© Orbitfolio 2026</span>
          <div className="flex items-center gap-4">
            <button className="text-2xs text-muted-foreground hover:text-foreground transition-colors">
              List Project
            </button>
            <span className="w-px h-3 bg-border" />
            <button className="text-2xs text-muted-foreground hover:text-foreground transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
