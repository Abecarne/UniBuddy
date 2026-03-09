import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { fetchMapLocations } from '../../src/services/mapService';
import { MAP_CATEGORIES } from '../../src/constants/categories';
import type { MapLocation } from '../../src/types/map';
import { colors, fontSize, spacing, borderRadius } from '../../src/constants/theme';

// Keimyung University Seongseo Campus center
const CAMPUS_REGION = {
  latitude: 35.8554,
  longitude: 128.4887,
  latitudeDelta: 0.008,
  longitudeDelta: 0.008,
};

const CATEGORY_COLORS: Record<string, string> = {
  classroom: '#3B82F6',
  library: '#8B5CF6',
  cafeteria: '#F59E0B',
  admin: '#6B7280',
  dormitory: '#10B981',
  international: '#EC4899',
  sports: '#EF4444',
  medical: '#14B8A6',
};

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMapLocations('keimyung')
      .then(setLocations)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        mapType="satellite"
        initialRegion={CAMPUS_REGION}
        showsUserLocation={false}
        showsCompass
        showsScale
      >
        {locations.map((loc) => {
          if (loc.map_y == null || loc.map_x == null) return null;

          const cat = MAP_CATEGORIES.find((c) => c.key === loc.category);
          const pinColor = CATEGORY_COLORS[loc.category ?? ''] ?? colors.primary;

          return (
            <Marker
              key={loc.id}
              coordinate={{
                latitude: loc.map_y,
                longitude: loc.map_x,
              }}
              pinColor={pinColor}
              title={loc.name}
              description={loc.building_code ?? undefined}
            >
              <Callout tooltip>
                <View style={styles.callout}>
                  <View style={styles.calloutHeader}>
                    <Text style={styles.calloutIcon}>{cat?.icon ?? '📍'}</Text>
                    <View style={styles.calloutTitleWrap}>
                      <Text style={styles.calloutTitle}>{loc.name}</Text>
                      {loc.building_code && (
                        <Text style={styles.calloutCode}>{loc.building_code}</Text>
                      )}
                    </View>
                  </View>
                  {loc.description && (
                    <Text style={styles.calloutDesc} numberOfLines={3}>
                      {loc.description}
                    </Text>
                  )}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.sm + 4,
    width: 220,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  calloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  calloutIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  calloutTitleWrap: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.text,
  },
  calloutCode: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 1,
  },
  calloutDesc: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
