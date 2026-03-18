import { useCallback } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * useActivityTracker
 * Logs user behaviour events to Firestore: users/{uid}/activity/{autoId}
 *
 * Usage:
 *   const { logEvent } = useActivityTracker();
 *   logEvent("mood_selected", { mood: "Relaxing" });
 *
 * Event types:
 *   mood_selected       — user picks a mood on Dashboard
 *   climate_selected    — user picks a climate on Dashboard
 *   search_started      — user clicks "Find Trips"
 *   state_visited       — user opens a state details page
 *   attraction_clicked  — user clicks a sightseeing card
 *   route_requested     — user requests a driving route
 *   trip_saved          — user saves a state or attraction
 *   trip_removed        — user removes a saved item
 */
export function useActivityTracker() {
  const logEvent = useCallback(async (eventType, data = {}) => {
    try {
      const user = auth.currentUser;
      if (!user) return;                 // never log unauthenticated events

      await addDoc(collection(db, "users", user.uid, "activity"), {
        event: eventType,
        ...data,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      // Silently swallow — tracking must never break the main UX
      console.warn("[ActivityTracker] Failed to log event:", err);
    }
  }, []);

  return { logEvent };
}
