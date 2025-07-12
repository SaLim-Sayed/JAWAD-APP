import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

type Coordinates = {
  lat: number;
  lng: number;
};

type MapComponentProps = {
  latitude?: string | number;
  longitude?: string | number;
  address?: string;
  url?: string;
  mapHeight?: number;
  apiKey?: string; // Pass your API key as a prop
};

const DEFAULT_DELTA = 0.01;
const DEFAULT_MAP_HEIGHT = 200;
const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export default function MapComponent({
  latitude,
  longitude,
  address,
  url,
  mapHeight = DEFAULT_MAP_HEIGHT,
  apiKey = 'YOUR_API_KEY', // Default key (should use env vars in production)
}: MapComponentProps) {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const geocodeAddress = useCallback(async (addr: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${GOOGLE_GEOCODE_URL}?address=${encodeURIComponent(addr)}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setCoords({ lat, lng });
      } else {
        setError(data.error_message || 'No results found for this address');
      }
    } catch (err) {
      console.warn('Geocoding error:', err);
      setError('Failed to fetch location data');
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const extractQueryFromURL = useCallback((mapUrl: string): string | null => {
    try {
      const decoded = decodeURIComponent(mapUrl);
      const match = decoded.match(/q=([^&]+)/) || decoded.match(/maps\/place\/([^/]+)/);
      return match ? match[1].replace(/\+/g, ' ') : null;
    } catch (e) {
      console.warn('URL parsing error:', e);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (url) {
        const extracted = extractQueryFromURL(url);
        if (extracted) {
          await geocodeAddress(extracted);
        } else {
          setError('Could not extract address from URL');
          setLoading(false);
        }
      } else if (latitude && longitude) {
        const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
        const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
        
        if (!isNaN(lat) && !isNaN(lng)) {
          setCoords({ lat, lng });
        } else {
          setError('Invalid latitude/longitude values');
        }
        setLoading(false);
      } else if (address) {
        await geocodeAddress(address);
      } else {
        setError('No location data provided');
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [url, latitude, longitude, address, geocodeAddress, extractQueryFromURL]);

  const getInitialRegion = (): Region | undefined => {
    if (!coords) return undefined;
    
    return {
      latitude: coords.lat,
      longitude: coords.lng,
      latitudeDelta: DEFAULT_DELTA,
      longitudeDelta: DEFAULT_DELTA,
    };
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center, { height: mapHeight }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center, { height: mapHeight }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height: mapHeight }]}>
      <MapView
        style={styles.map}
        initialRegion={getInitialRegion()}
        scrollEnabled={false}
        zoomEnabled={false}
        loadingEnabled={true}
      >
        {coords && (
          <Marker
            coordinate={{ latitude: coords.lat, longitude: coords.lng }}
            title={address || url || 'Location'}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  map: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 16,
  },
});