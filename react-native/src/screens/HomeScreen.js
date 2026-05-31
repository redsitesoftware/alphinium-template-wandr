/**
 * Wandr Home — AI trip planner landing
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useTravelStore, DESTINATIONS } from '../store/travelStore';
import { colors, spacing, radius, typography } from '../theme';

const SUGGESTIONS = [
  { label: '🌸 Cherry blossoms in Japan', query: 'Tokyo Japan spring' },
  { label: '🏄 Surf & temples in Bali', query: 'Bali surf culture temples' },
  { label: '🥐 Paris romance & food', query: 'Paris France romance food' },
];

export default function HomeScreen() {
  const { searchDestination, aiTyping, setPhase, selectDest } = useTravelStore();
  const [inputText, setInputText] = useState('');

  const handleSearch = () => {
    if (inputText.trim()) searchDestination(inputText.trim());
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content}>
        {/* Hero */}
        <View style={s.hero}>
          <Text style={s.logo}>✈️ Wandr</Text>
          <Text style={s.heroTitle}>Your AI Travel Planner</Text>
          <Text style={s.heroSub}>Tell me where you want to go — I'll handle the rest</Text>
        </View>

        {/* AI Search */}
        <View style={s.searchBox}>
          <TextInput
            style={s.input}
            placeholder="e.g. 'I want to surf in Bali for a week in July'"
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            numberOfLines={3}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={[s.searchBtn, aiTyping && s.searchBtnDisabled]}
            onPress={handleSearch} disabled={aiTyping}>
            {aiTyping
              ? <ActivityIndicator color={colors.black} size="small" />
              : <Text style={s.searchBtnText}>✨ Plan My Trip</Text>
            }
          </TouchableOpacity>
          {aiTyping && <Text style={s.typingText}>🤖 Your AI planner is researching...</Text>}
        </View>

        {/* Quick suggestions */}
        <Text style={s.sectionLabel}>Popular trips</Text>
        {SUGGESTIONS.map(s2 => (
          <TouchableOpacity key={s2.query} style={s.suggestion}
            onPress={() => { setInputText(s2.query); searchDestination(s2.query); }}>
            <Text style={s.suggestionText}>{s2.label}</Text>
            <Text style={s.suggestionArrow}>→</Text>
          </TouchableOpacity>
        ))}

        {/* Destination cards */}
        <Text style={s.sectionLabel}>Trending destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={s.destRow}>
            {Object.values(DESTINATIONS).map(dest => (
              <TouchableOpacity key={dest.id} style={s.destCard} onPress={() => selectDest(dest.id)}>
                <Text style={s.destEmoji}>{dest.emoji}</Text>
                <Text style={s.destName}>{dest.name}</Text>
                <Text style={s.destCountry}>{dest.country}</Text>
                <Text style={s.destTagline} numberOfLines={2}>{dest.tagline}</Text>
                <Text style={s.destFrom}>from ${dest.avgBudget.budget}/day</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Value props */}
        <View style={s.features}>
          {[
            { icon: '🤖', title: 'AI Itineraries', sub: 'Personalised day-by-day plans in seconds' },
            { icon: '🗺️', title: 'Map View', sub: 'Hotels & attractions on an interactive map' },
            { icon: '💰', title: 'Price Compare', sub: 'Best rates across Booking.com, Expedia & more' },
          ].map(f => (
            <View key={f.title} style={s.feature}>
              <Text style={s.featureIcon}>{f.icon}</Text>
              <Text style={s.featureTitle}>{f.title}</Text>
              <Text style={s.featureSub}>{f.sub}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: colors.bg },
  content:        { padding: spacing.md, paddingBottom: spacing.xxl },
  hero:           { alignItems: 'center', paddingVertical: spacing.xxl },
  logo:           { fontSize: 32, marginBottom: spacing.sm },
  heroTitle:      { ...typography.hero, color: colors.primary, textAlign: 'center', fontSize: 36 },
  heroSub:        { ...typography.body, color: colors.textSub, textAlign: 'center', marginTop: spacing.sm },

  searchBox:      { backgroundColor: colors.card, borderRadius: radius.xl, padding: spacing.md,
                    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: spacing.lg },
  input:          { color: colors.text, fontSize: 15, minHeight: 70, textAlignVertical: 'top', padding: 4 },
  searchBtn:      { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md,
                    alignItems: 'center', marginTop: spacing.sm },
  searchBtnDisabled: { opacity: 0.6 },
  searchBtnText:  { color: colors.black, fontWeight: '800', fontSize: 16 },
  typingText:     { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: spacing.sm },

  sectionLabel:   { fontSize: 13, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5,
                    marginBottom: spacing.sm, marginTop: spacing.lg },

  suggestion:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md,
                    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  suggestionText: { fontSize: 15, color: colors.text, fontWeight: '600' },
  suggestionArrow:{ color: colors.primary, fontSize: 18 },

  destRow:        { flexDirection: 'row', gap: spacing.md, paddingRight: spacing.md },
  destCard:       { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md,
                    width: 180, borderWidth: 1, borderColor: colors.cardBorder },
  destEmoji:      { fontSize: 36, marginBottom: spacing.sm },
  destName:       { fontSize: 18, fontWeight: '800', color: colors.text },
  destCountry:    { fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm },
  destTagline:    { fontSize: 13, color: colors.textSub, lineHeight: 18, marginBottom: spacing.sm },
  destFrom:       { fontSize: 13, color: colors.primary, fontWeight: '700' },

  features:       { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  feature:        { flex: 1, backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md,
                    alignItems: 'center', borderWidth: 1, borderColor: colors.cardBorder },
  featureIcon:    { fontSize: 28, marginBottom: spacing.sm },
  featureTitle:   { fontSize: 13, fontWeight: '800', color: colors.text, textAlign: 'center', marginBottom: 4 },
  featureSub:     { fontSize: 11, color: colors.textMuted, textAlign: 'center', lineHeight: 15 },
});
