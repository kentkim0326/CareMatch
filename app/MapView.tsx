'use client'
import { useEffect, useRef } from 'react'
import type { Lang } from './i18n'

interface Carer {
  emoji: string
  nick: string
  sub: string
  tags: string[]
  score: number
  lat: number
  lng: number
  city: 'seoul' | 'osaka'
}

const CARERS: Carer[] = [
  { emoji:'🦊', nick:'하늘여우', sub:'서울 강남구', tags:['치매케어','日本語OK'], score:98, lat:37.5172, lng:127.0473, city:'seoul' },
  { emoji:'🐼', nick:'달빛판다', sub:'서울 마포구', tags:['재활보조','야간가능'], score:91, lat:37.5540, lng:126.9108, city:'seoul' },
  { emoji:'🦁', nick:'든든사자', sub:'서울 송파구', tags:['말벗동행','병원동행'], score:87, lat:37.5145, lng:127.1059, city:'seoul' },
  { emoji:'🐯', nick:'호랑별', sub:'서울 종로구', tags:['식사보조','투약관리'], score:84, lat:37.5704, lng:126.9910, city:'seoul' },
  { emoji:'🐻', nick:'따뜻한곰', sub:'서울 노원구', tags:['야간돌봄','치매케어'], score:89, lat:37.6543, lng:127.0563, city:'seoul' },
  { emoji:'🦝', nick:'너구리스타', sub:'오사카 나니와구', tags:['認知症ケア','韓国語OK'], score:94, lat:34.6645, lng:135.4950, city:'osaka' },
  { emoji:'🐨', nick:'코알라상', sub:'오사카 추오구', tags:['リハビリ','夜間可'], score:88, lat:34.6741, lng:135.5022, city:'osaka' },
  { emoji:'🐺', nick:'늑대달빛', sub:'오사카 요도가와구', tags:['話し相手','食事介助'], score:85, lat:34.7335, lng:135.4920, city:'osaka' },
]

interface MapViewProps {
  lang: Lang
  onSelect: (carer: Carer) => void
}

export default function MapView({ lang, onSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      const map = L.map(mapRef.current!, {
        center: [37.5665, 126.9780],
        zoom: 6,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map)

      mapInstanceRef.current = map

      CARERS.forEach(carer => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            background: ${carer.city === 'seoul' ? '#e94560' : '#14b8a6'};
            color: white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            width: 40px; height: 40px;
            display: flex; align-items: center; justify-content: center;
            font-size: 18px;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          "><span style="transform:rotate(45deg)">${carer.emoji}</span></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -44],
        })

        const marker = L.marker([carer.lat, carer.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:sans-serif;min-width:180px;padding:4px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <span style="font-size:24px">${carer.emoji}</span>
                <div>
                  <div style="font-weight:600;font-size:14px">${carer.nick}</div>
                  <div style="font-size:12px;color:#666">${carer.sub}</div>
                </div>
                <div style="margin-left:auto;font-weight:700;color:${carer.city==='seoul'?'#e94560':'#14b8a6'};font-size:15px">${carer.score}%</div>
              </div>
              <div style="display:flex;gap:4px;flex-wrap:wrap">
                ${carer.tags.map(t => `<span style="padding:2px 8px;background:#f0f0f0;border-radius:4px;font-size:11px">${t}</span>`).join('')}
              </div>
            </div>
          `)

        marker.on('click', () => onSelect(carer))
        markersRef.current.push(marker)
      })

      const seoulGroup = L.featureGroup(
        markersRef.current.filter((_, i) => CARERS[i].city === 'seoul')
      )
      const osakaGroup = L.featureGroup(
        markersRef.current.filter((_, i) => CARERS[i].city === 'osaka')
      )

      const bounds = L.latLngBounds([
        [seoulGroup.getBounds().getCenter().lat, seoulGroup.getBounds().getCenter().lng],
        [osakaGroup.getBounds().getCenter().lat, osakaGroup.getBounds().getCenter().lng],
      ])
      map.fitBounds(bounds.pad(0.4))
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [onSelect])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '420px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
    />
  )
}

export type { Carer }
