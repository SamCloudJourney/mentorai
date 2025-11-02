# Data Model  
  
This document outlines the Supabase tables used in the MentorAI MVP.  
  
## users  
id (PK), email, role (student/parent/teacher), created_at  
  
## profiles  
user_id (FK), name, country, school_year, exam_board, goals_json  
  
## subjects  
id (PK), slug, name  
  
## topics  
id (PK), subject_id (FK), name, parent_topic_id (FK)  
  
## progress  
user_id (FK), topic_id (FK), mastery (0-100), last_seen  
  
## sessions  
id (PK), user_id (FK), subject_id (FK), started_at, ended_at, tokens_in, tokens_out  
  
## messages  
id (PK), session_id (FK), role (user/assistant/system), content (JSONB), created_at  
  
## assessments  
id (PK), user_id (FK), subject_id (FK), type (diagnostic/quiz/exam), score, detail, created_at  
  
## plans  
id (PK), user_id (FK), week_start, plan_json 
