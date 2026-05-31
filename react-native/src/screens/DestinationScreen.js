/**
 * Wandr Destination — Hotels, map, itinerary tabs
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useTravelStore } from '../store/travelStore';
import { colors, spacing, radius, typography } from '../theme';

let TravelMap = null;
if (Platform.OS === 'web') {
  TravelMap = require('../components/TravelMap.web').default;
}

function HotelCard({ hotel, onBook }) {
  const savings = hotel.originalPrice - hotel.price;
  return (
    <View style={s.hotelCard}>
      <View style={s.hotelHeader}>
        <View style={{ flex: 1 }}>
          <Text style={s.hotelName}>{hotel.name}</Text>
          <Text style={s.hotelArea}>📍 {hotel.area} · {'⭐'.repeat(hotel.stars)}</Text>
        </View>
        <View style={s.hotelPriceBlock}>
          <Text style={s.hotelOriginal}>${hotel.originalPrice}</Text>
          <Text style={s.hotelPrice}>${hotel.price}</Text>
          <Text style={s.hotelNight}>/night</Text>
        </View>
      </View>

      {savings > 0 && (
        <View style={s.savingsBadge}>
          <Text style={s.savingsText}>💰 Save ${savings} tonight</Text>
        </View>
      )}

      <Text style={s.hotelTip}>💬 "{hotel.tip}"</Text>

      <View style={s.hotelFooter}>
        <View style={s.hotelRating}>
          <Text style={s.ratingScore}>{hotel.rating}</Text>
          <Text style={s.ratingLabel}>/ 10 · {hotel.reviews.toLocaleString()} reviews</Text>
        </View>
        <TouchableOpacity style={s.bookBtn}
          onPress={() => { if (typeof window !== 'undefined') window.open(hotel.bookUrl, '_blank'); }}>
          <Text style={s.bookBtnText}>Book on {hotel.provider} →</Text>
        </TouchableOpacity>
      </View>

      <View style={s.amenities}>
        {hotel.amenities.map(a => (
          <View key={a} style={s.amenityChip}><Text style={s.amenityText}>{a}</Text></View>
        ))}
      </View>
    </View>
  );
}

function ItineraryDay({ day }) {
  return (
    <View style={s.dayCard}>
      <View style={s.dayHeader}>
        <View style={s.dayBadge}><Text style={s.dayBadgeText}>Day {day.day}</Text></View>
        <Text style={s.dayTheme}>{day.theme}</Text>
      </View>
      {day.items.map((item, i) => (
        <View key={i} style={s.dayItem}>
          <View style={s.dayDot} />
          <Text style={s.dayItemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function DestinationScreen() {
  const { selectedDest, aiMessage, aiHighlight, setPhase, activeTab, setActiveTab,
    budget, setBudget, getFilteredHotels } = useTravelStore();

  if (!selectedDest) return null;

  const hotels = getFilteredHotels();
  const allHotels = selectedDest.hotels;

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => setPhase('home')} style={s.back}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={s.destTitle}>{selectedDest.emoji} {selectedDest.name}</Text>
          <Text style={s.destSub}>{selectedDest.country} · Best: {selectedDest.bestMonths}</Text>
        </View>
        <View style={{ width: 50 }} />
      </View>

      {/* AI summary */}
      <View style={s.aiBox}>
        <Text style={s.aiLabel}>🤖 AI Planner</Text>
        <Text style={s.aiMessage}>{aiMessage}</Text>
        <Text style={s.aiHighlight}>{aiHighlight}</Text>
      </View>

      {/* Tabs */}
      <View style={s.tabs}>
        {['hotels', 'map', 'itinerary'].map(tab => (
          <TouchableOpacity key={tab} style={[s.tab, activeTab === tab && s.tabActive]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>
              {tab === 'hotels' ? '🏨 Hotels' : tab === 'map' ? '🗺️ Map' : '📅 Itinerary'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hotels tab */}
      {activeTab === 'hotels' && (
        <ScrollView style={s.tabContent} contentContainerStyle={{ padding: spacing.md }}>
          {/* Budget filter */}
          <View style={s.budgetRow}>
            {['budget', 'mid', 'luxury'].map(b => (
              <TouchableOpacity key={b} style={[s.budgetChip, budget === b && s.budgetChipActive]}
                onPress={() => setBudget(b)}>
                <Text style={[s.budgetText, budget === b && s.budgetTextActive]}>
                  {b === 'budget' ? '💸 Budget' : b === 'mid' ? '✈️ Mid-range' : '👑 Luxury'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {hotels.length === 0
            ? <Text style={s.noResults}>No hotels in this budget range for {selectedDest.name}. Try a different filter.</Text>
            : hotels.map(h => <HotelCard key={h.id} hotel={h} />)
          }

          <View style={s.disclaimer}>
            <Text style={s.disclaimerText}>Prices from partner sites. Click "Book" to complete booking on their site. Wandr earns a small commission at no cost to you.</Text>
          </View>
        </ScrollView>
      )}

      {/* Map tab */}
      {activeTab === 'map' && (
        <View style={s.mapContainer}>
          {TravelMap ? (
            <TravelMap
              hotels={allHotels}
              attractions={selectedDest.attractions}
              center={selectedDest.coords}
            />
          ) : (
            <View style={s.mapPlaceholder}>
              <Text style={s.mapPlaceholderText}>🗺️ Map view (web only)</Text>
            </View>
          )}
        </View>
      )}

      {/* Itinerary tab */}
      {activeTab === 'itinerary' && (
        <ScrollView style={s.tabContent} contentContainerStyle={{ padding: spacing.md }}>
          <Text style={s.itinTitle}>Your AI-planned {selectedDest.itinerary.length}-day itinerary</Text>
          {selectedDest.itinerary.map(day => <ItineraryDay key={day.day} day={day} />)}
          <TouchableOpacity style={s.exportBtn}>
            <Text style={s.exportBtnText}>📤 Export to Google Calendar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: colors.bg },
  header:         { flexDirection: 'row', alignItems: 'center', padding: spacing.md,
                    borderBottomWidth: 1, borderColor: colors.cardBorder },
  back:           { width: 50 },
  backText:       { color: colors.primary, fontSize: 15, fontWeight: '600' },
  destTitle:      { fontSize: 18, fontWeight: '800', color: colors.text },
  destSub:        { fontSize: 12, color: colors.textMuted },

  aiBox:          { backgroundColor: colors.card, margin: spacing.md, borderRadius: radius.lg,
                    padding: spacing.md, borderWidth: 1, borderColor: colors.primary + '44',
                    borderLeftWidth: 3, borderLeftColor: colors.primary },
  aiLabel:        { fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  aiMessage:      { fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: spacing.sm },
  aiHighlight:    { fontSize: 13, color: colors.textSub, fontStyle: 'italic', lineHeight: 18 },

  tabs:           { flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.cardBorder },
  tab:            { flex: 1, paddingVertical: spacing.md, alignItems: 'center' },
  tabActive:      { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText:        { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  tabTextActive:  { color: colors.primary },
  tabContent:     { flex: 1 },

  budgetRow:      { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  budgetChip:     { flex: 1, paddingVertical: spacing.sm, borderRadius: radius.md,
                    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.cardBorder,
                    alignItems: 'center' },
  budgetChipActive: { backgroundColor: colors.primary + '22', borderColor: colors.primary },
  budgetText:     { fontSize: 12, color: colors.textSub, fontWeight: '600' },
  budgetTextActive: { color: colors.primary },

  hotelCard:      { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
                    marginBottom: spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  hotelHeader:    { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  hotelName:      { fontSize: 16, fontWeight: '800', color: colors.text },
  hotelArea:      { fontSize: 12, color: colors.textMuted, marginTop: 3 },
  hotelPriceBlock:{ alignItems: 'flex-end' },
  hotelOriginal:  { fontSize: 12, color: colors.textMuted, textDecorationLine: 'line-through' },
  hotelPrice:     { fontSize: 24, fontWeight: '900', color: colors.primary },
  hotelNight:     { fontSize: 11, color: colors.textMuted },
  savingsBadge:   { backgroundColor: colors.green + '22', borderRadius: radius.sm, padding: 6,
                    marginBottom: spacing.sm, alignSelf: 'flex-start' },
  savingsText:    { fontSize: 12, color: colors.green, fontWeight: '700' },
  hotelTip:       { fontSize: 13, color: colors.textSub, fontStyle: 'italic', marginBottom: spacing.md,
                    backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.sm },
  hotelFooter:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  hotelRating:    { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  ratingScore:    { fontSize: 22, fontWeight: '900', color: colors.gold },
  ratingLabel:    { fontSize: 12, color: colors.textMuted },
  bookBtn:        { backgroundColor: colors.primary, borderRadius: radius.md,
                    paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  bookBtnText:    { color: colors.black, fontWeight: '800', fontSize: 13 },
  amenities:      { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  amenityChip:    { backgroundColor: colors.surface, borderRadius: radius.round,
                    paddingHorizontal: 10, paddingVertical: 4 },
  amenityText:    { fontSize: 11, color: colors.textSub },

  noResults:      { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl, fontSize: 15 },
  disclaimer:     { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                    marginTop: spacing.md },
  disclaimerText: { fontSize: 11, color: colors.textMuted, lineHeight: 16 },

  mapContainer:   { flex: 1, margin: spacing.md, borderRadius: radius.lg,
                    overflow: 'hidden', borderWidth: 1, borderColor: colors.cardBorder },
  mapPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card },
  mapPlaceholderText: { color: colors.textMuted },

  itinTitle:      { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  dayCard:        { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
                    marginBottom: spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  dayHeader:      { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  dayBadge:       { backgroundColor: colors.primary, borderRadius: radius.round,
                    paddingHorizontal: spacing.md, paddingVertical: 4 },
  dayBadgeText:   { color: colors.black, fontWeight: '800', fontSize: 13 },
  dayTheme:       { fontSize: 15, fontWeight: '700', color: colors.text },
  dayItem:        { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginBottom: 8 },
  dayDot:         { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, marginTop: 6 },
  dayItemText:    { fontSize: 14, color: colors.textSub, flex: 1, lineHeight: 20 },
  exportBtn:      { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                    alignItems: 'center', marginTop: spacing.md, borderWidth: 1, borderColor: colors.cardBorder },
  exportBtnText:  { color: colors.textSub, fontWeight: '700', fontSize: 14 },
});
