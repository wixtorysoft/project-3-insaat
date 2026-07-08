'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon in Leaflet with bundlers
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface MapViewProps {
  lat: number
  lng: number
  zoom?: number
  title?: string
  className?: string
}

export default function MapView({ lat, lng, zoom = 15, title, className }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street')

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom,
      zoomControl: true,
      scrollWheelZoom: false,
    })

    // Default street layer (OpenStreetMap)
    tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Custom marker
    const marker = L.marker([lat, lng]).addTo(map)
    if (title) {
      marker.bindPopup(`<strong>${title}</strong>`).openPopup()
    }

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [lat, lng, zoom, title])

  // Switch map type
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return

    mapInstanceRef.current.removeLayer(tileLayerRef.current)

    if (mapType === 'satellite') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current)
    } else {
      tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)
    }
  }, [mapType])

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      <div ref={mapRef} className="w-full h-full rounded-2xl overflow-hidden z-0" />

      {/* Map type toggle */}
      <div className="absolute top-3 right-3 z-[1000] flex gap-1 bg-background/90 backdrop-blur-md rounded-lg p-1 border border-border/50 shadow-lg">
        <button
          onClick={() => setMapType('street')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            mapType === 'street'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          Harita
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            mapType === 'satellite'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          Uydu
        </button>
      </div>
    </div>
  )
}
