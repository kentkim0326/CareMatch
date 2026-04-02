'use client'
import { useEffect, useRef } from 'react'
import type { Lang } from './i18n'

export interface Carer {
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

interface Props { lang: Lang; onSelect: (c: Carer) => void }

export default function MapView({ lang, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    // Inject Leaflet CSS once
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    if (!containerRef.current || mapRef.current) return

    let cancelled = false

    const init = async () => {
      const L = (await import('leaflet')).default

      // Fix default marker icon path issue in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (cancelled || !containerRef.current) return

      const map = L.map(containerRef.current, {
        center: [36.5, 131.0],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      mapRef.current = map

      CARERS.forEach(carer => {
        const color = carer.city === 'seoul' ? '#e94560' : '#14b8a6'
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:44px;height:44px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;font-size:20px;border:3px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.35);cursor:pointer"><span style="transform:rotate(45deg);line-height:1">${carer.emoji}</span></div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 44],
          popupAnchor: [0, -48],
        })

        const popup = L.popup({ maxWidth: 220, className: 'cm-popup' }).setContent(`
          <div style="font-family:system-ui,sans-serif;padding:2px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span style="font-size:28px">${carer.emoji}</span>
              <div style="flex:1">
                <div style="font-weight:600;font-size:14px;color:#111">${carer.nick}</div>
                <div style="font-size:12px;color:#666;margin-top:1px">${carer.sub}</div>
              </div>
              <div style="font-size:16px;font-weight:700;color:${color}">${carer.score}%</div>
            </div>
            <div style="display:flex;gap:4px;flex-wrap:wrap">
              ${carer.tags.map(t => `<span style="padding:3px 8px;background:${color}22;color:${color};border-radius:20px;font-size:11px;font-weight:500">${t}</span>`).join('')}
            </div>
          </div>
        `)

        L.marker([carer.lat, carer.lng], { icon })
          .addTo(map)
          .bindPopup(popup)
          .on('click', () => onSelect(carer))
      })

      // Fit bounds to show both cities
      const allPoints: [number,number][] = CARERS.map(c => [c.lat, c.lng])
      map.fitBounds(L.latLngBounds(allPoints).pad(0.15))
    }

    init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, []) // eslint-disable-line

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '440px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        background: '#1a2235',
      }}
    />
  )
}
