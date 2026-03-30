-- ============================================================
-- SmartFit Supabase Performance Indexes
-- ============================================================
-- Run these SQL commands in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste & Run
-- ============================================================

-- ===================== USERS TABLE =====================
CREATE INDEX IF NOT EXISTS idx_users_email
  ON users(email);

CREATE INDEX IF NOT EXISTS idx_users_reset_token
  ON users(reset_token);

-- ===================== GYM OWNER REQUESTS =====================
-- Used by: /api/gyms, /api/gyms-full, /pending-requests, /owner-gym/:email
CREATE INDEX IF NOT EXISTS idx_gym_owner_requests_status_payment
  ON gym_owner_requests(status, payment_status);

CREATE INDEX IF NOT EXISTS idx_gym_owner_requests_email
  ON gym_owner_requests(email);

-- ===================== TRAINERS =====================
-- Used by: /trainers/:email, /api/gyms-full (bulk)
CREATE INDEX IF NOT EXISTS idx_trainers_gym_email
  ON trainers(gym_email);

-- ===================== SUPPLEMENTS =====================
-- Used by: /supplements/:email, /api/gyms-full (bulk)
CREATE INDEX IF NOT EXISTS idx_supplements_gym_email
  ON supplements(gym_email);

-- ===================== MEMBERSHIPS =====================
-- Used by: /memberships/:email, /api/gyms-full (bulk)
CREATE INDEX IF NOT EXISTS idx_memberships_gym_email
  ON memberships(gym_email);

-- ===================== USER MEMBERSHIPS =====================
-- Used by: /user-memberships/:email, /gym-members/:email, /book-membership
CREATE INDEX IF NOT EXISTS idx_user_memberships_user_email
  ON user_memberships(user_email);

CREATE INDEX IF NOT EXISTS idx_user_memberships_gym_email
  ON user_memberships(gym_email);

CREATE INDEX IF NOT EXISTS idx_user_memberships_status
  ON user_memberships(user_email, gym_email, status);

-- ===================== TRAINER BOOKINGS =====================
-- Used by: /trainer-requests/:email, /user-trainer-bookings/:email
CREATE INDEX IF NOT EXISTS idx_trainer_bookings_gym_email
  ON trainer_bookings(gym_email);

CREATE INDEX IF NOT EXISTS idx_trainer_bookings_user_email
  ON trainer_bookings(user_email);

-- ===================== SUPPLEMENT ORDERS =====================
-- Used by: /supplement-orders/:email, /user-supplement-orders/:email
CREATE INDEX IF NOT EXISTS idx_supplement_orders_gym_email
  ON supplement_orders(gym_email);

CREATE INDEX IF NOT EXISTS idx_supplement_orders_user_email
  ON supplement_orders(user_email);

-- ===================== FREE TRIAL REQUESTS =====================
-- Used by: /user-free-trials/:email, /owner-free-trials/:email
CREATE INDEX IF NOT EXISTS idx_free_trial_requests_gym_email
  ON free_trial_requests(gym_email);

CREATE INDEX IF NOT EXISTS idx_free_trial_requests_user_email
  ON free_trial_requests(user_email);

-- ===================== USER WORKOUTS =====================
-- Used by: /user-workouts/:email
CREATE INDEX IF NOT EXISTS idx_user_workouts_user_email
  ON user_workouts(user_email);

-- ===================== GYM REVIEWS =====================
-- Used by: /reviews/:email
CREATE INDEX IF NOT EXISTS idx_gym_reviews_gym_email
  ON gym_reviews(gym_email);

-- ============================================================
-- DONE! All high-impact indexes created.
-- These optimize the most frequently queried fields.
-- ============================================================
